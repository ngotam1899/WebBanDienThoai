import React, { Component } from 'react';
import './styles.css';
import { assets } from '../../constants/assetsImage';
import { withTranslation } from 'react-i18next'

class HomePage extends Component {
    
    render() {
        const {t} = this.props;
        return (
            <>
            <div className="product-big-title-area search-fixed">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                    <div className="row my-5 justify-content-center">
                      <div className="col-md-6 col-9">
                        <input type="text" className="w-100" name="keyword" placeholder="Input what you want"></input>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
               <div className="slider-area">
			<div className="block-slider block-slider4">
				<ul className="" id="bxslider-home4">
					<li>
						<img src={ assets("products/h4-slide.png") } alt="Slide"/>
						<div className="caption-group">
							<h2 className="caption title">
								iPhone <span className="primary">6 <strong>Plus</strong></span>
							</h2>
							<h4 className="caption subtitle">Dual SIM</h4>
							<a className="caption button-radius" href="#"><span className="icon"></span>{t('home.shop.button')}</a>
						</div>
					</li>
				</ul>
			</div>
    </div> 
    
    <div className="promo-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-3 col-sm-6">
                    <div className="single-promo promo1">
                        <i className="fa fa-sync-alt"></i>
                        <p>{t('home.feature.1')}</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="single-promo promo2">
                        <i className="fa fa-truck"></i>
                        <p>{t('cart.free-ship')}</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="single-promo promo3">
                        <i className="fa fa-lock"></i>
                        <p>{t('home.feature.3')}</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="single-promo promo4">
                        <i className="fa fa-gift"></i>
                        <p>{t('home.feature.4')}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div className="brands-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="brand-wrapper">
                        <div className="brand-list">
                            <img src={ assets("products/brand1.png")} alt=""/>
                            <img src={ assets("products/brand2.png")} alt=""/>
                            <img src={ assets("products/brand3.png")} alt=""/>
                            <img src={ assets("products/brand4.png")} alt=""/>
                            <img src={ assets("products/brand5.png")} alt=""/>
                            <img src={ assets("products/brand6.png")} alt=""/>
                            <img src={ assets("products/brand1.png")} alt=""/>
                            <img src={ assets("products/brand2.png")} alt=""/>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    {/* <div className="product-widget-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="single-product-widget">
                        <h2 className="product-wid-title">Top Sellers</h2>
                        <a href="" className="wid-view-more">View All</a>
                        <div className="single-wid-product">
                            <a href="single-product.html"><img src={ assets("products/product-thumb-1.jpg")} alt="" className="product-thumb"/></a>
                            <h2><a href="single-product.html">Sony Smart TV - 2015</a></h2>
                            <div className="product-wid-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product-wid-price">
                                <ins>$400.00</ins> <del>$425.00</del>
                            </div>                            
                        </div>
                        <div className="single-wid-product">
                            <a href="single-product.html"><img src={ assets("products/product-thumb-2.jpg")} alt="" className="product-thumb"/></a>
                            <h2><a href="single-product.html">Apple new mac book 2015</a></h2>
                            <div className="product-wid-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product-wid-price">
                                <ins>$400.00</ins> <del>$425.00</del>
                            </div>                            
                        </div>
                        <div className="single-wid-product">
                            <a href="single-product.html"><img src={ assets("products/product-thumb-3.jpg")} alt="" className="product-thumb"/></a>
                            <h2><a href="single-product.html">Apple new i phone 6</a></h2>
                            <div className="product-wid-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product-wid-price">
                                <ins>$400.00</ins> <del>$425.00</del>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-product-widget">
                        <h2 className="product-wid-title">Recently Viewed</h2>
                        <a href="#" className="wid-view-more">View All</a>
                        <div className="single-wid-product">
                            <a href="single-product.html"><img src={ assets("products/product-thumb-4.jpg")} alt="" className="product-thumb"/></a>
                            <h2><a href="single-product.html">Sony playstation microsoft</a></h2>
                            <div className="product-wid-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product-wid-price">
                                <ins>$400.00</ins> <del>$425.00</del>
                            </div>                            
                        </div>
                        <div className="single-wid-product">
                            <a href="single-product.html"><img src={ assets("products/product-thumb-1.jpg")} alt="" className="product-thumb"/></a>
                            <h2><a href="single-product.html">Sony Smart Air Condtion</a></h2>
                            <div className="product-wid-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product-wid-price">
                                <ins>$400.00</ins> <del>$425.00</del>
                            </div>                            
                        </div>
                        <div className="single-wid-product">
                            <a href="single-product.html"><img src={ assets("products/product-thumb-2.jpg")} alt="" className="product-thumb"/></a>
                            <h2><a href="single-product.html">Samsung gallaxy note 4</a></h2>
                            <div className="product-wid-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product-wid-price">
                                <ins>$400.00</ins> <del>$425.00</del>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="single-product-widget">
                        <h2 className="product-wid-title">Top New</h2>
                        <a href="#" className="wid-view-more">View All</a>
                        <div className="single-wid-product">
                            <a href="single-product.html"><img src={ assets("products/product-thumb-3.jpg")} alt="" className="product-thumb"/></a>
                            <h2><a href="single-product.html">Apple new i phone 6</a></h2>
                            <div className="product-wid-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product-wid-price">
                                <ins>$400.00</ins> <del>$425.00</del>
                            </div>                            
                        </div>
                        <div className="single-wid-product">
                            <a href="single-product.html"><img src={ assets("products/product-thumb-4.jpg")} alt="" className="product-thumb"/></a>
                            <h2><a href="single-product.html">Samsung gallaxy note 4</a></h2>
                            <div className="product-wid-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product-wid-price">
                                <ins>$400.00</ins> <del>$425.00</del>
                            </div>                            
                        </div>
                        <div className="single-wid-product">
                            <a href="single-product.html"><img src={ assets("products/product-thumb-1.jpg")} alt="" className="product-thumb"/></a>
                            <h2><a href="single-product.html">Sony playstation microsoft</a></h2>
                            <div className="product-wid-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <div className="product-wid-price">
                                <ins>$400.00</ins> <del>$425.00</del>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div> 
      </div> */}
            </>
        );
    }
}

export default withTranslation() (HomePage);