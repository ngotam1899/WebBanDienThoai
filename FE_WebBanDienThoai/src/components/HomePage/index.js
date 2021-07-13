import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import ProductItem from "../../containers/ProductItem"
import Loader from '../../containers/ProductItem/ItemLoader';
import ContentLoader from "react-content-loader"
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
    onGetListAd({active: 1});
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
            <div className="col-md-3 col-sm-6 d-none d-md-block align-self-center">
              <div className="single-promo promo1 my-1 rounded">
                <i className="fa fa-sync-alt"></i>
                <p>{t('home.feature.1')}</p>
              </div>
              <div className="single-promo promo2 my-1 rounded">
                <i className="fa fa-truck"></i>
                <p>{t('cart.free-ship')}</p>
              </div>
            </div>
            {listAd ? <div className="col-12 col-md-6 align-self-center">
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
                        <Link to={item.link.replace("https://localhost:5000/#", "")}>
                        <img src={item.image.public_url} alt={item.name} />
                        </Link>
                        
                      </CarouselItem>
                    
                  );
                })}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
              </Carousel>
            </div> : <div className="col-12 col-md-6 align-self-center"><ContentLoader 
                speed={0}
                width="100%"
                height={276}
                viewBox="0 0 636 276"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="3" y="3" rx="12" ry="12" width="636" height="276" />
              </ContentLoader></div>}
            <div className="col-md-3 col-sm-6 d-none d-md-block align-self-center">
              <div className="single-promo promo3 my-1 rounded">
                <i className="fa fa-lock"></i>
                <p>{t('home.feature.3')}</p>
              </div>
              <div className="single-promo promo4 my-1 rounded">
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
                <h2 className="text-center">{t('home.list.best')}</h2>
                <div className="shadow p-3 mb-5 bg-white rounded">
                  <div className="row">
                    {bestSeller ? bestSeller.map((product, index) => {
                      return (
                          <ProductItem product={product._id} key={index} />
                        )
                    }) : <Loader/>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-2">
              <div className="latest-product">
                <h2 className="text-center">{t('home.list.new')}</h2>
                <div className="shadow p-3 mb-5 bg-white rounded">
                  <div className="row">
                    {newest ? newest.map((product, index) => {
                      return (
                          <ProductItem product={product} key={index} />
                        )
                    }) : <Loader/>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-2">
              <div className="latest-product">
                <h2 className="text-center">{t('home.list.favorite')}</h2>
                <div className="shadow p-3 mb-5 bg-white rounded">
                  <div className="row">
                    {favorite ? favorite.map((product, index) => {
                      return (
                          <ProductItem product={product} key={index} />
                        )
                    }) : <Loader/>}
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
    onGetListAd: (params) => {
      dispatch(AdActions.onGetList(params));
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(HomePage);