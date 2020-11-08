import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import './styles.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { assets } from '../../constants/assetsImage';

class Header extends Component {
    
    render() {
        const MenuLink = ({label, to, activeOnlyWhenExact })=>{
            return (
              <Route path={to} exact={activeOnlyWhenExact} children={({ match })=>{
                var active = match ? ' active' : 'nav-item';
                return (
                  <li className={`nav-item ${active}`}>
                    <Link exact={activeOnlyWhenExact} className="nav-link px-3" to={to}>{label}</Link>
                  </li>
                )
              }}/>
            )
          }
        return (
            <>
                <div className="header-area">
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="user-menu">
                        <ul>
                            <li><a href="#"><FontAwesomeIcon icon={faUser} /> My Account</a></li>
                            <li><a href="#"><i className="fa fa-heart"></i> Wishlist</a></li>
                            <li><a href="cart.html"><i className="fa fa-user"></i> My Cart</a></li>
                            <li><a href="checkout.html"><i className="fa fa-user"></i> Checkout</a></li>
                            <li><a href="/user/dang-nhap"><i className="fa fa-user"></i> Login</a></li>
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
                        <Link to="/"><img src={assets("brand.png")} alt="" className="w-100"/></Link>
                    </div>
                </div>
                
                <div className="col-sm-6 col-md-7 col-lg-8 col-xl-9">
                    <div className="shopping-item">
                        <Link to="/carts">Cart - <span className="cart-amunt">$100</span> <i className="fa fa-shopping-cart"></i> <span className="product-count">5</span></Link>
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
          <MenuLink label="Trang chủ" to="/" activeOnlyWhenExact={true}/>
          <MenuLink label="Điện thoại" to="/products/dien-thoai" activeOnlyWhenExact={true}/>
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

export default Header;