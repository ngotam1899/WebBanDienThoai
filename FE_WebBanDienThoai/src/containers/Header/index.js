import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import {connect} from 'react-redux';
import './styles.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from '../../constants/assetsImage';
import AuthorizationActions from '../../redux/actions/auth'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalPrice: 0
    }
  }
  componentDidMount(){
    const {onGetProfile} = this.props;
    const token = localStorage.getItem('AUTH_USER')
    onGetProfile(null,token);
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
    const {total, totalPrice}=this.state;
    const {userInfo, isLogin} = this.props;
    return (
      <>
        <div className="header-area">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="user-menu">
                  <ul>
                    {userInfo && <li><a href="#"><FontAwesomeIcon icon={faUser} /> {userInfo.firstname} {userInfo.lastname}</a></li>}
                    <li><a href="cart.html"><i className="fa fa-heart"></i> My Cart</a></li>
                    <li><a href="checkout.html"><i className="fa fa-user"></i> Checkout</a></li>
                    {isLogin===false
                    ? <li><a href="/user/dang-nhap"><i className="fa fa-user"></i> Login</a></li>
                    : <li><button type="button" className="btn-logout" style={{'outline': 'none'}} onClick={() => this.setLogout()}><i className="fa fa-user"></i> Logout</button></li>}
                  </ul>
                </div>
              </div>

              <div className="col-md-4">
                <div className="header-right">
                  <ul className="list-inline ">
                    <li className="dropdown dropdown-small">
                      <a data-toggle="dropdown" data-hover="dropdown" className="dropdown-toggle" href="#"><span className="key">currency :</span><span className="value">USD </span><b className="caret"></b></a>
                      <ul className="dropdown-menu">
                        <li><a href="#">USD</a></li>
                        <li><a href="#">INR</a></li>
                        <li><a href="#">GBP</a></li>
                      </ul>
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
                  <Link to="/carts">Cart - <span className="cart-amunt">$ {totalPrice}</span> <i className="fa fa-shopping-cart"></i> <span className="product-count">{total}</span></Link>
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
                    <MenuLink label="Điện thoại" to="/products/dien-thoai" activeOnlyWhenExact={true} />
                    <li className="nav-item">
                      <a className="nav-link px-3" href="#">Phụ kiện</a>
                    </li>
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
    isLogin: state.auth.loggedIn
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
		onGetProfile : (data, headers) =>{
			dispatch(AuthorizationActions.onGetProfile(data, headers))
    },
    onLogout : ()=>{
      dispatch(AuthorizationActions.onLogout())
    }
	}
};


export default connect(mapStateToProps, mapDispatchToProps) (Header);