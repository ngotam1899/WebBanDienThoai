import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import {connect} from 'react-redux';
import './styles.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from '../../constants/assetsImage';
import tryConvert from '../../utils/changeMoney'

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
    }
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
  }
  componentDidMount(){
    const {onGetProfile, onGetListCategory} = this.props;
    const token = localStorage.getItem('AUTH_USER')
    onGetProfile(null,token);
    onGetListCategory();
  }

  handleChangeCurrency(event) {
    const {onChangeCurrency} = this.props;
    this.setState({
      currencyCode: event.target.value
    })
    onChangeCurrency(event.target.value);
  }

  componentWillReceiveProps(props) {
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
              <Link exact={activeOnlyWhenExact} className="nav-link px-3" to={to}>{label}</Link>
            </li>
          )
        }} />
      )
    }
    const {total, totalPrice, currencyCode}=this.state;
    const {userInfo, isLogin, listCategories} = this.props;
    const notVND = currencyCode=="VND" ? totalPrice : parseFloat(tryConvert(totalPrice, currencyCode, false)).toFixed(2);
    
    /* console.log("currencyCode",currencyCode)
    console.log("currencyCode",notVND) */
    return (
      <>
        <div className="header-area">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="user-menu">
                  <ul>
                    {userInfo && <><li><a href="/#/account/detail"><FontAwesomeIcon icon={faUser} /> {userInfo.firstname} {userInfo.lastname}</a></li>
                    <li><a href="/#/carts"><i className="fa fa-luggage-cart"></i> My Cart</a></li>
                    <li><a href="/#/carts/checkout"><i className="fa fa-credit-card"></i> Checkout</a></li></>}
                    {isLogin===false
                    ? <><li><a href="/user/dang-nhap"><i className="fa fa-sign-in-alt"></i> Login</a></li>
                      <li><a href="/user/dang-ky"><i className="fa fa-user-plus"></i> Signup</a></li></>
                    : <li><button type="button" className="btn-logout" style={{'outline': 'none'}} onClick={() => this.setLogout()}><i className="fa fa-sign-out-alt"></i> Logout</button></li>}
                  </ul>
                </div>
              </div>

              <div className="col-md-4">
                <div className="header-right">
                  <ul className="list-inline ">
                    <li className="dropdown dropdown-small">
                    <select className="select-box" onChange={this.handleChangeCurrency}>
                      <option value="VND">Việt Nam đồng - VND</option>
                      <option value="USD">Đô la Mỹ - USD</option>
                      <option value="CNY">Nhân dân tệ TQ - CNY</option>
                      <option value="EUR">Đồng Euro - EUR</option>
                      <option value="JPY">Đồng Yên Nhật - JPY</option>
                    </select>
                    </li>
                    <li className="dropdown dropdown-small">
                      <a data-toggle="dropdown" data-hover="dropdown" className="dropdown-toggle" href="#"><span className="key">language :</span><span className="value">English </span><b className="caret"></b></a>
                      <ul className="dropdown-menu">
                        <li><a href="#">English</a></li>
                        <li><a href="#">French</a></li>
                        <li><a href="#">German</a></li>
                      </ul>
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
                  <Link to="/carts">Cart - <span className="cart-amunt">{notVND} {currencyCode}</span> <i className="fa fa-shopping-cart"></i> <span className="product-count">{total}</span></Link>
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
                    <MenuLink label="Trang chủ" to="/" activeOnlyWhenExact={true} />
                    {listCategories && listCategories.map((category, index)=>{
                      return (
                        <MenuLink key={index} label={category.name} to={`/products/${category.pathseo}/${category._id}`} activeOnlyWhenExact={true} />
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


export default connect(mapStateToProps, mapDispatchToProps) (Header);