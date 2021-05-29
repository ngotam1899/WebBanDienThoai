import React, { Component } from 'react';
import './styles.css';
import { assets } from '../../constants/assetsImage';
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux';
import { compose } from 'redux';

import ProductItem from "../../containers/ProductItem"
// @Actions
import ProductsActions from "../../redux/actions/products";

class HomePage extends Component {
  componentDidMount(){
    const {onGetBestSeller, onGetFavorite, onGetNewest} = this.props;
    document.title = "[TellMe] Trang bán hàng"
    onGetBestSeller();
    onGetFavorite();
    onGetNewest();
  }

  render() {
    const { t, bestSeller, newest, favorite } = this.props;
    return (<>
      <div className="product-big-title-area search-fixed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <div className="row my-5 justify-content-center">
                </div>
              </div>
            </div>
          </div>
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
    bestSeller: state.products.best,
    favorite: state.products.favorite,
    newest: state.products.new
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetBestSeller: () => {
      dispatch(ProductsActions.onGetBestSeller());
    },
    onGetFavorite: () => {
      dispatch(ProductsActions.onGetFavorite());
    },
    onGetNewest: () => {
      dispatch(ProductsActions.onGetNewest());
    }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(HomePage);