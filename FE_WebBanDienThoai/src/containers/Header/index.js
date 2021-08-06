import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './styles.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from '../../constants/assetsImage';
import { withTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip';
import Widget from 'rasa-webchat';
// @Actions
import AuthorizationActions from '../../redux/actions/auth'
import CategoryActions from "../../redux/actions/categories";
import ProductsActions from '../../redux/actions/products'
import NotificationActions from '../../redux/actions/notification'
import io from 'socket.io-client';

// @Functions
import numberWithCommas from '../../utils/formatPrice'
import tryConvert from '../../utils/changeMoney'
import { toastError, toastInfo } from '../../utils/toastHelper';
import {INITIAL_IMAGE} from '../../constants';
const ENDPOINT = 'https://be-phonestore.herokuapp.com';
let socket = io(ENDPOINT);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalPrice: 0,
      currencyCode: localStorage.getItem("CURRENCY") || "VND",
      language: localStorage.getItem("LANGUAGE") ||"en",
      keyword: "",
      itemsCount: 0,
      status: -1,
      order: "",
      installment: "",
      edit: false
    }
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
  }
  
  componentDidMount(){
    const {language} = this.state;
    const {onGetProfile, onGetListCategory} = this.props;
    const token = localStorage.getItem('AUTH_USER');
    onGetProfile(null,token);
    onGetListCategory({ accessories: -1 });
    this.props.i18n.changeLanguage(language);
  }

  handleChangeCurrency = (event) => {
    const {onChangeCurrency} = this.props;
    this.setState({
      currencyCode: event.target.value
    })
    localStorage.setItem("CURRENCY", event.target.value)
    onChangeCurrency(event.target.value);
  }

  changeLanguage = (event) => {
    const {onChangeLanguage} = this.props
    this.setState({ language: event.target.value})
    localStorage.setItem("LANGUAGE", event.target.value)
    onChangeLanguage(event.target.value)
    this.props.i18n.changeLanguage(event.target.value)
  }
  
  componentDidUpdate(prevProps, prevState) {
    var total = 0;
    var totalPrice = 0;
    const { cart, onGetNewestNotifications, totalNotification, userInfo, t } = this.props;
    const { itemsCount, order, installment, status, type } = this.state;
    if (cart !== prevProps.cart) {
      for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].quantity
        totalPrice = totalPrice + cart[i].quantity * cart[i].product.colors.find(item=> item._id === cart[i].color).price
      }
      this.setState({
        total,
        totalPrice
      })
    }
    if (userInfo !== prevProps.userInfo && userInfo) {
      var user = userInfo._id;
      onGetNewestNotifications({user, limit: 5, page: 0});
    }
    if (totalNotification !== prevProps.totalNotification) {
      this.setState({itemsCount: totalNotification})
    }
    if(userInfo){
      socket.on(`order_${userInfo._id}`, res => {
        this.setState({itemsCount: itemsCount + 1, status: res.status, order: res.order, type: 0});
      });
      socket.on(`installment_${userInfo._id}`, res => {
        this.setState({itemsCount: itemsCount + 1, status: res.status, installment: res.installment, type: 2});
      });
    }
    if (itemsCount !== prevState.itemsCount && itemsCount > totalNotification) {
      if(type === 2){
        toastInfo(`${t('header.toastify.installment.first')} ${installment} ${t('header.toastify.installment.accept')}`);
        onGetNewestNotifications({user: userInfo._id, limit: 5, page: 0})
      }
      else {
        switch (status) {
          case 0:
            toastInfo(`${t('header.toastify.cart.first')} ${order} ${t('header.toastify.cart.export')}`);
            onGetNewestNotifications({user: userInfo._id, limit: 5, page: 0})
            break;
          case 1:
            toastInfo(`${t('header.toastify.cart.first')} ${order} ${t('header.toastify.cart.done')}`);
            onGetNewestNotifications({user: userInfo._id, limit: 5, page: 0})
            break;
          default:
            onGetNewestNotifications({user: userInfo._id, limit: 5, page: 0})
        }
      }
    }
  }

  setLogout= () => {
    const {onLogout, history} = this.props;
    localStorage.removeItem('AUTH_USER')
    history.push("/")
    onLogout()
  }

  handleFilter = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })
    const { onFilter } = this.props;
    onFilter({keyword: value});
  }

  pressSearch = (event) => {
    const { keyword } = this.state;
    const { history, t } = this.props;
    if(event.key === 'Enter'){
      if(keyword === "") return toastError(t("header.toastify.search"))
      history.push(`/#/search?keyword=${keyword}`)
      window.location.reload()
    }
  }

  // Button search
  searchKeyWorld = () => {
    const { keyword } = this.state;
    const { history, t } = this.props;
    if(keyword === "") return toastError(t("header.toastify.search"))
    history.push(`/#/search?keyword=${keyword}`)
    window.location.reload()
  }

  sortNotification = (listNotification) => {
    const { t } = this.props;
    var order = [];
    var ad = [];
    var installment = [];
    listNotification.map(item => {
      if(item.type === 0){
        order.push(item)
      }
      else if(item.type === 1){
        ad.push(item)
      }
      else {
        installment.push(item)
      }
    })
    return (<>
      {order.length > 0 && <>
        <h4>{t('header.toastify.cart.first')}</h4>
        {order.map((notification, index)=>{
          return(
          <div className="row" key={index}>
            <div className="col-3">
            <img className="w-100 rounded" src={notification.image ? notification.image.public_url : INITIAL_IMAGE} alt={index}></img>
            </div>
            <div className="col-9">
        <p className="mb-0">{notification.name}</p>
            </div>
          </div>
          )
        })}
        <div className="my-2 border-bottom"></div>
      </>}
      {ad.length > 0 && <>
        <h4>{t('header.promotion.menu')}</h4>
        <>{ad.map((notification, index)=>{
          return(
          <div className="row" key={index}>
            <div className="col-3">
            <img className="w-100 rounded" src={notification.image ? notification.image.public_url : INITIAL_IMAGE} alt={index}></img>
            </div>
            <div className="col-9">
        <p className="mb-0">{notification.name}</p>
            </div>
          </div>
          )
        })}</>
        <div div className="my-2 border-bottom"></div>
      </>}
      {installment.length > 0 && <>
        <h4>{t('header.installment.menu')}</h4>
        {installment.map((notification, index)=>{
          return(
          <div className="row" key={index}>
            <div className="col-3">
            <img className="w-100 rounded" src={notification.image ? notification.image.public_url : INITIAL_IMAGE} alt={index}></img>
            </div>
            <div className="col-9">
        <p className="mb-0">{notification.name}</p>
            </div>
          </div>
          )
        })}
      </>}
      </>
    )
  }

  onReload = () => {
    this.setState({edit: false})
    setTimeout(()=>{
      window.location.reload(false);
    }, 500);
  }

  render() {
    const MenuLink = ({ label, image, to, activeOnlyWhenExact, onClick, last }) => {
      return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
          var active = match ? 'active' : '';
          var border = last ? '' : 'border-right'
          return (
            <li className={`nav-item ${border} ${active}`}>
              <Link onClick={onClick} exact={`${activeOnlyWhenExact}`} className="nav-link rounded p-1" to={to}><img src={image} alt="" style={{height: '40px'}}></img><p className="mb-0 float-end ml-2 mr-1 py-2">{label}</p></Link>
            </li>
          )
        }} />
      )
    }
    const { total, totalPrice, currencyCode, language, keyword, itemsCount, edit }=this.state;
    const {userInfo, isLogin, listCategories, t, listProducts, currency, location, listNotification, cart} = this.props;
    const notVND = currencyCode==="VND" ? numberWithCommas(totalPrice) : numberWithCommas(parseFloat(tryConvert(totalPrice, currencyCode, false)).toFixed(2));
    return (
      <>
        <div className="header-area">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="user-menu">
                  <ul>
                    {userInfo && <>
                      <li>
                        <a href="/#/account/detail" className="text-decoration-none">
                          <FontAwesomeIcon icon={faUser} /> {userInfo.firstname} {userInfo.lastname}
                        </a>
                      </li>
                      <li>
                        <a href="/#/account/notification" className="text-decoration-none" data-tip data-for='notification'>
                          <i className="fa fa-bell"></i> {t('header.notification.menu')}
                          {itemsCount > 0 && <span className="notification-count ml-1 pl-1">{itemsCount}</span>}
                        </a>
                        <ReactTooltip id='notification' place="bottom" type="light" class="shadow-sm bg-white" effect="solid" getContent={(dataTip) => 
                          {
                            return (
                              <div>
                                <h3 className="mb-1">{t('header.notification.menu')}</h3>
                                <div className="mb-2 border-bottom"></div>
                                {listNotification && listNotification.length > 0 ? <>{this.sortNotification(listNotification)}</>
                                : <div className="row">
                                  <div className="col-12 text-center">
                                    <div className="h-120">
                                      <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/fa4e2b534c2928596a6deded9c730a21.png" alt="404 not found"></img>
                                    </div>
                                    <p className="my-3">{t('header.notification.empty')}</p>
                                  </div>  
                                </div>}
                              </div> 
                            )
                          }
                        }/>
                      </li>
                    </>}
                    {isLogin===false
                    ? <>
                        <li>
                          <a href="/user/dang-nhap" className="text-decoration-none">
                            <i className="fa fa-sign-in-alt"></i> {t('header.login.button')}
                            </a>
                          </li>
                        <li>
                          <a href="/user/dang-ky"  className="text-decoration-none">
                            <i className="fa fa-user-plus"></i> {t('header.signup.button')}
                          </a>
                        </li>
                      </>
                    : <li><button type="button" className="btn-logout" style={{'outline': 'none'}} onClick={() => this.setLogout()}><i className="fa fa-sign-out-alt"></i> {t('header.logout.button')}</button></li>}
                  </ul>
                </div>
              </div>

              <div className="col-md-4">
                <div className="header-right">
                  <ul className="list-inline ">
                    <li className="dropdown dropdown-small">
                    <i className="fa fa-money-bill-wave"></i>
                    <select className="select-box" onChange={this.handleChangeCurrency} value={currencyCode}>
                      <option value="VND">{t('header.vnd.select')}</option>
                      <option value="USD">{t('header.usd.select')}</option>
                      <option value="CNY">{t('header.cny.select')}</option>
                      <option value="EUR">{t('header.eur.select')}</option>
                      <option value="JPY">{t('header.jpy.select')}</option>
                    </select>
                    </li>
                    <li className="dropdown dropdown-small">
                    <i className="fa fa-globe-europe"></i>
                    <select className="select-box" onChange={this.changeLanguage} value={language}>
                      <option value="en" name="language">{t('header.english.select')}</option>
                      <option value="vn" name="language">{t('header.vietnamese.select')}</option>
                    </select>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-branding-area">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3">
                <div className="logo">
                  <Link to="/"><img src={assets("brand.png")} alt="" className="w-100" /></Link>
                </div>
              </div>
              <div className="col-md-6 col-12 align-self-center py-1">
                <div className="input-group shadow-sm rounded-pill position-relative">
                  <input type="text" className="form-control rounded-pill" value={keyword} name="keyword" onKeyPress={this.pressSearch} onChange={this.handleFilter} 
                  placeholder={t('search.placeholder.input')} onFocus={()=> this.setState({edit: true})}></input>
                  <div className="input-group-append position-absolute btn-circle" style={{right: '5px', top: '5px'}}>
                    <button className="btn btn-danger h-100 rounded-circle p-revert" onClick={() => this.searchKeyWorld()}><i className="fa fa-search"></i></button>
                  </div>
                </div>
                <div style={{ position: "absolute", width: "95%" }}>
                  {listProducts && listProducts.length > 0 && keyword && edit &&
                  <div className="card py-2 shadow-sm" style={{ zIndex: 5}}>
                  <><h4 className="mb-0 mx-3">{t("header.search.recommended")}</h4>
                  {listProducts.map((product, index) =>{
                    return (
                      <Link to={`/product/${product.pathseo}.${product._id}`} className="text-decoration-none directory rounded p-2 mx-2" key={index}
                      onClick={()=> this.onReload()} style={{textDecoration: 'none'}}>
                      <div className="row text-dark text-decoration-none " style={{height: "60px"}}>
                        <div className="col-3 my-auto">
                          <><img style={{height: "60px"}} src={product.bigimage.public_url} alt={product.name}></img></>
                        </div>
                        <div className="col-9 text-left my-auto">
                          <p className="mb-0">{product.name}</p>
                          <p className="mb-0 smaller text-secondary">{currency==="VND" ? product.price_min : parseFloat(tryConvert(product.price_min, currency, false)).toFixed(2)} {currency}</p>
                        </div>
                      </div>
                      </Link>
                    )
                  })}</>
                  </div>}
                </div>
              </div>
              <div className="col-12 col-xl-3 align-self-center py-1">
                <div className="shopping-item rounded-pill shadow-sm">
                  <Link to="/carts" className="text-decoration-none" data-tip data-for='cart'>
                    <span className="rounded-circle bg-danger" style={{padding: "0.15rem 0.25rem"}}><i className="fa fa-shopping-cart text-white"></i></span> · <span className="cart-amunt">{notVND ? `${notVND} ${currencyCode}` : "Empty"}</span> 
                    <span className="product-count">{total}</span>
                  </Link>
                  <ReactTooltip id='cart' place="bottom" type="light" class="shadow-sm bg-white" effect="solid" getContent={(dataTip) => 
                    <div>
                      <h3 className="mb-1">{t('header.cart.button')}</h3>
                      <div className="mb-2 border-bottom"></div>
                      {cart && cart.length > 0 ? cart.map((item, index)=>{
                        return(
                        <div className="row" key={index}>
                          <div className="col-3">
                          <img className="w-100 rounded" src={item.product.bigimage ? item.product.bigimage.public_url : INITIAL_IMAGE} alt={index}></img>
                          </div>
                          <div className="col-9">
                      <p className="font-weight-bold mb-0">{item.product.name}</p>
                      <p className="mb-0">{t('common.color')} {item.product.colors.find(i => i._id === item.color).name_en}</p>
                          </div>
                        </div>
                        )
                      })
                    : <div className="row">
                      <div className="col-12 text-center">
                        <div className="h-120">
                          <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png" alt="404 not found"></img>
                        </div>
                        <p className="my-3">{t('header.cart.empty')}</p>
                      </div>  
                    </div>}
                    </div> 
                  }/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mainmenu-area bg-light">
          <div className="container">
            <div className="row">
              <nav className="navbar navbar-expand-sm navbar-light">
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse py-2" id="collapsibleNavId">
                  <ul className="navbar-nav mr-auto mt-lg-0">
                    <MenuLink image={assets("online-shop.png")} label={t('header.home.menu')} to="/" activeOnlyWhenExact={true}/>
                    {location.hash.indexOf("account") === -1 && listCategories && <>
                      {listCategories.map((category, index)=>{
                        return (
                          <MenuLink key={index} image={category.image.public_url} label={language ==="vn" ? category.name : category.name_en} to={`/products/${category.pathseo}.${category._id}`} activeOnlyWhenExact={true} />
                        )
                      })}
                      <MenuLink image={assets("module.png")} label={t('header.accessories.menu')} to={"/products/accessories"} activeOnlyWhenExact={true} />
                      <MenuLink image={assets("web-advertising.png")} last={true} label={t('header.promotion.menu')} to={"/promotion"} activeOnlyWhenExact={true} />
                    </>}
                    {location.hash.indexOf("account") !== -1 &&<>
                    <MenuLink image={assets("user-menu.png")} label={t('header.account.menu')} to={"/account/detail"} activeOnlyWhenExact={true} />
                    <MenuLink image={assets("paid-search.png")} label={t('header.order.menu')} to={"/account/purchase"} activeOnlyWhenExact={true} />
                    <MenuLink image={assets("credit-card-interest.png")} label={t('header.installment.menu')} to={"/account/installment"} activeOnlyWhenExact={true} />
                    <MenuLink image={assets("push-notifications.png")} last={true} label={t('header.notification.menu')} to={"/account/notification"} activeOnlyWhenExact={true} /></>}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          {/* <MessengerCustomerChat
            pageId="104334418256109"
            appId="804609327113718"
            htmlRef="https://localhost:5000"
          />  */}
          <Widget
            socketUrl={"http://localhost:5005"}
            socketPath={"/socket.io/"}
            customData={{"language": "en"}} // arbitrary custom data. Stay minimal as this will be added to the socket
            title={"TellMe - Mobile Shopping Online"}
            profileAvatar={assets("logo_fe.png")}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    cart: state.cart,
    listProducts: state.products.filter,
    currency: state.currency,
    userInfo: state.auth.detail,
    isLogin: state.auth.loggedIn,
    listCategories: state.categories.list,
    listNotification: state.notification.detail,
    totalNotification: state.notification._total,
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
    onFilter: (payload) => {
      dispatch(ProductsActions.onFilter(payload));
    },
		onGetProfile : (data, headers) =>{
			dispatch(AuthorizationActions.onGetProfile(data, headers))
    },
    onLogout : ()=>{
      dispatch(AuthorizationActions.onLogout())
    },
    onGetListCategory: (params) => {
      dispatch(CategoryActions.onGetList(params))
    },
    onChangeLanguage: (payload) => {
      dispatch(ProductsActions.onChangeLanguage(payload));
    },
    onChangeCurrency: (unit) => {
      dispatch(ProductsActions.onChangeCurrency(unit));
    },
    onGetNewestNotifications : (params) =>{
			dispatch(NotificationActions.onGetNewest(params))
    },
    onUpdateAllNotifications : (data) =>{
			dispatch(NotificationActions.onUpdateAll(data))
    },
	}
};
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(Header);