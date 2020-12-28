import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import {connect} from 'react-redux';
import {compose} from 'redux';
import './styles.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from '../../constants/assetsImage';
import tryConvert from '../../utils/changeMoney'
import { withTranslation } from 'react-i18next'

// @Actions
import AuthorizationActions from '../../redux/actions/auth'
import CategoryActions from "../../redux/actions/categories";
import ProductsActions from '../../redux/actions/products'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalPrice: 0,
      currencyCode: "VND",
      language: "en"
    }
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
  }
  
  componentDidMount(){
    const {onGetProfile, onGetListCategory} = this.props;
    const token = localStorage.getItem('AUTH_USER')
    onGetProfile(null,token);
    onGetListCategory();
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

  UNSAFE_componentWillReceiveProps(props) {
    var total = 0;
    var totalPrice = 0;
    var { cart } = this.props;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].quantity
      totalPrice = totalPrice + cart[i].quantity * cart[i].product.price
    }
    this.setState({
      total,
      totalPrice
    })
  }

  setLogout= () => {
    const {onLogout} = this.props;
    localStorage.removeItem('AUTH_USER')
    onLogout()
  }
  

  render() {
    const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
      return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
          var active = match ? ' active' : 'nav-item';
          return (
            <li className={`nav-item ${active}`}>
              <Link exact={`${activeOnlyWhenExact}`} className="nav-link px-3" to={to}>{label}</Link>
            </li>
          )
        }} />
      )
    }
    const {total, totalPrice, currencyCode, language}=this.state;
    const {userInfo, isLogin, listCategories, t} = this.props;
    const notVND = currencyCode=="VND" ? totalPrice : parseFloat(tryConvert(totalPrice, currencyCode, false)).toFixed(2);
    
    return (
      <>
        <div className="header-area">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="user-menu">
                  <ul>
                    {userInfo && <>
                      <li><a href="/#/account/detail"><FontAwesomeIcon icon={faUser} /> {userInfo.firstname} {userInfo.lastname}</a></li>
                      <li><a href="/#/carts"><i className="fa fa-luggage-cart"></i> {t('header.mycart.button')}</a></li>
                      <li><a href="/#/carts/checkout"><i className="fa fa-credit-card"></i> {t('header.checkout.button')}</a></li></>}
                    {isLogin===false
                    ? <>
                        <li><a href="/user/dang-nhap"><i className="fa fa-sign-in-alt"></i> {t('header.login.button')}</a></li>
                        <li><a href="/user/dang-ky"><i className="fa fa-user-plus"></i> {t('header.signup.button')}</a></li>
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

              <div className="col-sm-6 col-md-7 col-lg-8 col-xl-9">
                <div className="shopping-item">
                  <Link to="/carts">{t('header.cart.button')} - <span className="cart-amunt">{notVND} {currencyCode}</span> <i className="fa fa-shopping-cart"></i><span className="product-count">{total}</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mainmenu-area">
          <div className="container">
            <div className="row">
              <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                  <ul className="navbar-nav mr-auto mt-lg-0">
                    <MenuLink label={t('header.home.menu')} to="/" activeOnlyWhenExact={true} />
                    {listCategories && listCategories.map((category, index)=>{
                      return (
                        <MenuLink key={index} label={language ==="vn" ? category.name : category.name_en} to={`/products/${category.pathseo}/${category._id}`} activeOnlyWhenExact={true} />
                      )
                    })}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    cart: state.cart,
    userInfo: state.auth.detail,
    isLogin: state.auth.loggedIn,
    listCategories: state.categories.list
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
		onGetProfile : (data, headers) =>{
			dispatch(AuthorizationActions.onGetProfile(data, headers))
    },
    onLogout : ()=>{
      dispatch(AuthorizationActions.onLogout())
    },
    onGetListCategory: () => {
      dispatch(CategoryActions.onGetList())
    },
    onChangeCurrency: (unit) => {
      dispatch(ProductsActions.onChangeCurrency(unit));
    },
	}
};
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(Header);