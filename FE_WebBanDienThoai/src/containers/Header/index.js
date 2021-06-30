import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { connect } from 'react-redux';
import { compose } from 'redux';
import qs from "query-string";
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
import getFilterParams from "../../utils/getFilterParams";
import tryConvert from '../../utils/changeMoney'
import { toastInfo } from '../../utils/toastHelper';
import {INITIAL_IMAGE} from '../../constants';
const ENDPOINT = 'http://localhost:3000';
let socket = io(ENDPOINT);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalPrice: 0,
      currencyCode: "VND",
      language: "en",
      keyword: "",
      itemsCount: 0,
      status: -1,
      order: "",
      installment: "",
    }
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
  }
  
  componentDidMount(){
    const {onGetProfile, onGetListCategory} = this.props;
    const token = localStorage.getItem('AUTH_USER')
    onGetProfile(null,token);
    onGetListCategory({ accessories: -1 });
  }

  handleChangeCurrency = (event) => {
    const {onChangeCurrency} = this.props;
    this.setState({
      currencyCode: event.target.value
    })
    onChangeCurrency(event.target.value);
  }

  changeLanguage = (event) => {
    this.setState({ language: event.target.value})
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
      onGetNewestNotifications({user, limit: 5, page: 0})
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
    onFilter(value);
  }

  // Chuyển router (thêm vào params) 
  handleUpdateFilter = (data) => {
    const {location, history} = this.props;
    const {search} = location;
    let queryParams = getFilterParams(search);
    queryParams = {
      ...queryParams,
      ...data,
    };
    history.push(`https://localhost:5000/#/products/dien-thoai/?${qs.stringify(queryParams)}`);
  };

  pressSearch = (event) => {
    const {keyword} = this.state;
    const {history} = this.props;
    if(event.key === 'Enter'){
      history.push(`/#/search?keyword=${keyword}`)
      window.location.reload()
    }
  }

  // Button search
  searchKeyWorld = () => {
    const {keyword} = this.state;
    const {history} = this.props;
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

  render() {
    const MenuLink = ({ label, to, activeOnlyWhenExact, onClick }) => {
      return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
          var active = match ? ' active' : 'nav-item';
          return (
            <li className={`nav-item ${active}`}>
              <Link onClick={onClick} exact={`${activeOnlyWhenExact}`} className="nav-link rounded px-3" to={to}>{label}</Link>
            </li>
          )
        }} />
      )
    }
    const {total, totalPrice, currencyCode, language, keyword, itemsCount}=this.state;
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
                        <a href="/#/carts/checkout" className="text-decoration-none">
                          <i className="fa fa-credit-card"></i> {t('header.checkout.button')}
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
                    <select className="select-box" onChange={this.handleChangeCurrency}>
                      <option value="VND">{t('header.vnd.select')}</option>
                      <option value="USD">{t('header.usd.select')}</option>
                      <option value="CNY">{t('header.cny.select')}</option>
                      <option value="EUR">{t('header.eur.select')}</option>
                      <option value="JPY">{t('header.jpy.select')}</option>
                    </select>
                    </li>
                    <li className="dropdown dropdown-small">
                    <i className="fa fa-globe-europe"></i>
                    <select className="select-box" onChange={this.changeLanguage}>
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
                <div className="input-group shadow rounded-pill position-relative">
                  <input type="text" className="form-control rounded-pill" value={keyword} name="keyword" onKeyPress={this.pressSearch} onChange={this.handleFilter} placeholder={t('search.placeholder.input')}></input>
                  <div className="input-group-append position-absolute btn-circle" style={{right: '5px', top: '5px'}}>
                    <button className="btn btn-danger h-100 rounded-circle p-revert" onClick={() => this.searchKeyWorld()}><i className="fa fa-search"></i></button>
                  </div>
                </div>
                <div style={{ position: "absolute", width: "95%" }}>
                  <div className="card" style={{ zIndex: 1}}>
                  {listProducts && keyword && listProducts.map((product, index) =>{
                    return (
                      <Link to={`/product/${product.pathseo}/${product._id}`} className="text-decoration-none">
                      <div className="row text-dark text-decoration-none " style={{height: "80px"}} key={index}>
                        <div className="col-3 my-auto">
                          <><img style={{height: "80px"}} src={product.bigimage.public_url} alt={product.name}></img></>
                        </div>
                        <div className="col-9 text-left my-auto">
                          <p className="mb-0">{product.name}</p>
                          <p className="mb-0">{currency==="VND" ? product.price_min : parseFloat(tryConvert(product.price_min, currency, false)).toFixed(2)} {currency}</p>
                        </div>
                      </div>
                      <div className="border-bottom"></div>
                      </Link>
                    )
                  })}
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-3 align-self-center py-1">
                <div className="shopping-item rounded-pill shadow">
                  <Link to="/carts" className="text-decoration-none" data-tip data-for='cart'>
                    {t('header.cart.button')} - <span className="cart-amunt">{notVND} {currencyCode}</span> 
                    <i className="fa fa-shopping-cart"></i>
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

        <div className="mainmenu-area">
          <div className="container">
            <div className="row">
              <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                  <ul className="navbar-nav mr-auto mt-lg-0">
                    <MenuLink label={t('header.home.menu')} to="/" activeOnlyWhenExact={true}/>
                    {location.hash.indexOf("account") === -1 && listCategories && <>
                      {listCategories.map((category, index)=>{
                        return (
                          <MenuLink key={index} label={language ==="vn" ? category.name : category.name_en} to={`/products/${category.pathseo}.${category._id}`} activeOnlyWhenExact={true} />
                        )
                      })}
                      <MenuLink label={t('header.accessories.menu')} to={"/products/accessories"} activeOnlyWhenExact={true} />
                      <MenuLink label={t('header.promotion.menu')} to={"/promotion"} activeOnlyWhenExact={true} />
                    </>}
                    {location.hash.indexOf("account") !== -1 &&<>
                    <MenuLink label={t('header.account.menu')} to={"/account/detail"} activeOnlyWhenExact={true} />
                    <MenuLink label={t('header.order.menu')} to={"/account/purchase"} activeOnlyWhenExact={true} />
                    <MenuLink label={t('header.installment.menu')} to={"/account/installment"} activeOnlyWhenExact={true} />
                    <MenuLink label={t('header.notification.menu')} to={"/account/notification"} activeOnlyWhenExact={true} /></>}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          {/* <MessengerCustomerChat
            pageId="104334418256109"
            appId="804609327113718"
            htmlRef="https://localhost:5000"
          /> 
          <Widget
            socketUrl={"http://localhost:5005"}
            socketPath={"/socket.io/"}
            customData={{"language": "en"}} // arbitrary custom data. Stay minimal as this will be added to the socket
            title={"TellMe - Mobile Shopping Online"}
            profileAvatar={assets("logo_fe.png")}
          /> */}
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
    onFilter: (keyword) => {
      dispatch(ProductsActions.onFilter(keyword));
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