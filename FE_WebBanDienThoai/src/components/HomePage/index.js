import React, { Component } from 'react';
import './styles.css';
import { assets } from '../../constants/assetsImage';
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom'

import ProductItem from "../../containers/ProductItem"
// @Actions
import ProductsActions from "../../redux/actions/products";
// @Function
import tryConvert from '../../utils/changeMoney'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    }
  }

  componentDidMount(){
    const {onGetBestSeller, onGetFavorite, onGetNewest} = this.props;
    document.title = "[TellMe] Trang bán hàng"
    this.improveScreen();
    onGetBestSeller();
    onGetFavorite();
    onGetNewest();
  }

  improveScreen() {
    (function($){
      // Slidder home 4
      if($('#bxslider-home4').length >0){
        var slider = $('#bxslider-home4').bxSlider({
          nextText:'<i className="fa fa-angle-right"></i>',
          prevText:'<i className="fa fa-angle-left"></i>',
          auto: true,
          onSliderLoad:function(currentIndex){
            $('#bxslider-home4 li').find('.caption').each(function(i){
              $(this).show().addClass('animated fadeInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('fadeInRight animated');
              });
            })                      
          },
          onSlideBefore:function(slideElement, oldIndex, newIndex){
            //slideElement.find('.sl-description').hide();
            slideElement.find('.caption').each(function(){                    
              $(this).hide().removeClass('animated fadeInRight'); 
            });                
          },
          onSlideAfter: function(slideElement, oldIndex, newIndex){  
              //slideElement.find('.sl-description').show();
            setTimeout(function(){
              slideElement.find('.caption').each(function(){                    
                $(this).show().addClass('animated fadeInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                  $(this).removeClass('fadeInRight animated');
                }); 
              });
            }, 500);                                
          }
        });
        //slider.reloadSlider();
      }
    })(jQuery); // End of use strict
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

  onAddToCart = (product) => {
    const { onAddProductToCart } = this.props;
    onAddProductToCart(product);
  }

  render() {
    const { keyword } = this.state;
    const { t, listProducts, currency, bestSeller, newest, favorite } = this.props;
    return (<>
      <div className="product-big-title-area search-fixed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <div className="row my-5 justify-content-center">
                  <div className="col-md-6 col-9">
                    <input type="text" className="w-100 form-control" value={keyword} name="keyword" onChange={this.handleFilter} placeholder={t('search.placeholder.input')}></input>
                    <div style={{ position: "absolute", width: "95%" }}>
                      <div className="card">
                      {listProducts && keyword && listProducts.map((product, index) =>{
                        return (
                          <Link to={`/product/${product.pathseo}/${product._id}`}>
                          <div className="row text-dark text-decoration-none" style={{height: "80px"}} key={index}>
                            <div className="col-3 my-auto">
                              <><img style={{height: "80px"}} src={product.bigimage.public_url}></img></>
                            </div>
                            <div className="col-9 text-left my-auto">
                              <p className="mb-0">{product.name}</p>
                              <p className="mb-0">{currency=="VND" ? product.price_min : parseFloat(tryConvert(product.price_min, currency, false)).toFixed(2)} {currency}</p>
                            </div>
                          </div>
                          <div className="border-bottom"></div>
                          </Link>
                        )
                      })}
                      </div>
                    </div>
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
              <img src={assets("products/h4-slide.png")} alt="Slide" />
              <div className="caption-group">
                <h2 className="caption title">
                  iPhone <span className="primary">6 <strong>Plus</strong></span>
                </h2>
                <h4 className="caption subtitle">Dual SIM</h4>
                <a className="caption button-radius" href="#"><span className="icon"></span>{t('home.shop.button')}</a>
              </div>
            </li>
            <li>
              <img src={assets("products/h4-slide2.png")} alt="Slide" />
              <div className="caption-group">
                <h2 className="caption title">
                  by one, get one <span className="primary">50% <strong>off</strong></span>
                </h2>
                <h4 className="caption subtitle">school supplies & backpacks.*</h4>
                <a className="caption button-radius" href="#"><span className="icon"></span>Shop now</a>
              </div>
            </li>
            <li>
              <img src={assets("products/h4-slide3.png")} alt="Slide" />
              <div className="caption-group">
                <h2 className="caption title">
                  Apple <span className="primary">Store <strong>Ipod</strong></span>
                </h2>
                <h4 className="caption subtitle">Select Item</h4>
                <a className="caption button-radius" href="#"><span className="icon"></span>Shop now</a>
              </div>
            </li>
            <li>
              <img src={assets("products/h4-slide4.png")} alt="Slide" />
              <div className="caption-group">
                <h2 className="caption title">
                  Apple <span className="primary">Store <strong>Ipod</strong></span>
                </h2>
                <h4 className="caption subtitle">& Phone</h4>
                <a className="caption button-radius" href="#"><span className="icon"></span>Shop now</a>
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
      <div className="maincontent-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-12 my-2">
              <div className="latest-product">
                <h2 className="section-title mb-0">Best seller Products</h2>
                <div className="shadow p-3 mb-5 bg-white rounded">
                  <div className="row">
                    {bestSeller && bestSeller.map((product, index) => {
                      return (
                          <ProductItem product={product._id} key={index} />
                        )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-2">
              <div className="latest-product">
                <h2 className="section-title mb-0">Newest Products</h2>
                <div className="shadow p-3 mb-5 bg-white rounded">
                  <div className="row">
                    {newest && newest.map((product, index) => {
                      return (
                          <ProductItem product={product} key={index} />
                        )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-2">
              <div className="latest-product">
                <h2 className="section-title mb-0">Favorite Products</h2>
                <div className="shadow p-3 mb-5 bg-white rounded">
                  <div className="row">
                    {favorite && favorite.map((product, index) => {
                      return (
                          <ProductItem product={product} key={index} />
                        )
                    })}
                  </div>
                </div>
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
                  <img src={assets("products/brand1.png")} alt="" />
                  <img src={assets("products/brand2.png")} alt="" />
                  <img src={assets("products/brand3.png")} alt="" />
                  <img src={assets("products/brand4.png")} alt="" />
                  <img src={assets("products/brand5.png")} alt="" />
                  <img src={assets("products/brand6.png")} alt="" />
                  <img src={assets("products/brand1.png")} alt="" />
                  <img src={assets("products/brand2.png")} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    listProducts: state.products.list,
    currency: state.currency,
    bestSeller: state.products.best,
    favorite: state.products.favorite,
    newest: state.products.new
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilter: (keyword) => {
      dispatch(ProductsActions.onFilter(keyword));
    },
    onGetBestSeller: () => {
      dispatch(ProductsActions.onGetBestSeller());
    },
    onGetFavorite: () => {
      dispatch(ProductsActions.onGetFavorite());
    },
    onGetNewest: () => {
      dispatch(ProductsActions.onGetNewest());
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(HomePage);