import React, { Component } from 'react';
import './styles.css';
import { assets } from '../../constants/assetsImage';

class Header extends Component {
    render() {
        return (
            <>
                <div className="header-area">
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="user-menu">
                        <ul>
                            <li><a href="#"><i className="fa fa-user"></i> My Account</a></li>
                            <li><a href="#"><i className="fa fa-heart"></i> Wishlist</a></li>
                            <li><a href="cart.html"><i className="fa fa-user"></i> My Cart</a></li>
                            <li><a href="checkout.html"><i className="fa fa-user"></i> Checkout</a></li>
                            <li><a href="#"><i className="fa fa-user"></i> Login</a></li>
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
                        <h1><a href="./"><img src={assets("brand.png")} alt="" className="w-100"/></a></h1>
                    </div>
                </div>
                
                <div className="col-sm-6 col-md-7 col-lg-8 col-xl-9">
                    <div className="shopping-item">
                        <a href="#">Cart - <span className="cart-amunt">$100</span> <i className="fa fa-shopping-cart"></i> <span className="product-count">5</span></a>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    
    <div className="mainmenu-area">
        <div className="container">
            <div className="row">
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto mt-lg-0">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="dropdownId">
              <a class="dropdown-item" href="#">Action 1</a>
              <a class="dropdown-item" href="#">Action 2</a>
            </div>
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