import React, { Component } from 'react';
import './styles.css';
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import ProductItem from "../../containers/ProductItem"
// @Actions
import ProductsActions from "../../redux/actions/products";
import AdActions from "../../redux/actions/ad";

class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeIndex: 0,
      animating: false
    }
  }

  componentDidMount(){
    const {onGetBestSeller, onGetFavorite, onGetNewest, onGetListAd} = this.props;
    document.title = "[TellMe] Trang bán hàng"
    onGetListAd();
    onGetBestSeller();
    onGetFavorite();
    onGetNewest();
  }
  next = () => {
    const {activeIndex, animating} = this.state;
    const {listAd} = this.props;
    if (animating) return;
    const nextIndex = activeIndex === listAd.length - 1 ? 0 : activeIndex + 1;
    this.setState({activeIndex : nextIndex});
  }

  previous = () => {
    const {animating, activeIndex} = this.state;
    const {listAd} = this.props;
    if (animating) return;
    const nextIndex = activeIndex === 0 ? listAd.length - 1 : activeIndex - 1;
    this.setState({activeIndex : nextIndex});
  }

  goToIndex = (newIndex) => {
    const {animating} = this.state
    if (animating) return;
    this.setState({activeIndex : newIndex});
  }

  render() {
    const {activeIndex} = this.state;
    const { t, bestSeller, newest, favorite, listAd } = this.props;
    
    return (<>
      <div className="promo-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="single-promo promo1">
                <i className="fa fa-sync-alt"></i>
                <p>{t('home.feature.1')}</p>
              </div>
              <div className="single-promo promo2">
                <i className="fa fa-truck"></i>
                <p>{t('cart.free-ship')}</p>
              </div>
            </div>
            {listAd && <div className="col-12 col-sm-6">
              <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
              >
                <CarouselIndicators items={listAd} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {listAd.map((item) => {
                  return (
                    <CarouselItem
                      onExiting={() => this.setState({animating: true})}
                      onExited={() => this.setState({animating: false})}
                      key={item._id}
                    >
                      <img src={item.image.public_url} alt={item.name} />
                    </CarouselItem>
                  );
                })}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </Carousel>
            </div>}
            <div className="col-md-3 col-sm-6">
              <div className="single-promo promo3">
                <i className="fa fa-lock"></i>
                <p>{t('home.feature.3')}</p>
              </div>
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
    </>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    bestSeller: state.products.best,
    favorite: state.products.favorite,
    newest: state.products.new,
    listAd: state.ad.list,
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
    },
    onGetListAd: () => {
      dispatch(AdActions.onGetList());
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(HomePage);