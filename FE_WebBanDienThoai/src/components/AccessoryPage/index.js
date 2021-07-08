import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import {connect} from 'react-redux';
import {compose} from 'redux';
import qs from "query-string";
// @Actions
import CategoryActions from "../../redux/actions/categories";
import BrandActions from "../../redux/actions/brands";
import ProductsActions from "../../redux/actions/products";
// @Components
import ProductItem from "../../containers/ProductItem"
import Loader from '../../containers/ProductItem/ItemLoader';
import Pagination from "react-js-pagination";
// @Functions
import {LOCAL} from '../../constants/index';
import accessoryData from './accessory.json'
import getFilterParams from "../../utils/getFilterParams";

class AccessoryPage extends Component {
  constructor(props){
    super(props);
    const {location} = props;
    const filter = getFilterParams(location.search);
    this.state = {
      more: false,
      min_p: filter.min_p ===null ? "" : filter.min_p,
      max_p: filter.max_p ===null ? "" : filter.max_p,
      filter: {
        limit: 20,
        page: 0,
      },
    }
  }

  componentWillMount(){
    /* FB comment plugin */
    window.fbAsyncInit = () => {
      /* eslint-disable */
      window.FB.init({
        appId: '308035613517523',
        xfbml: true,
        version: 'v2.6'
      });
      FB.XFBML.parse();
      /* eslint-disable */
    };

    (function(d, s, id){
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /* FB comment plugin */
  }

  componentDidMount(){
    document.title = "Phụ kiện | Accessories";
    const { onGetAccessory, onGetListBrand, onGetListProduct, location } = this.props;
    const { filter } = this.state;
    const filters = getFilterParams(location.search);
    var params = {
      ...filter,
      ...filters
    };
    onGetAccessory({
      ...params,
      accessories : 1
    })
    onGetListBrand();
    onGetListProduct(params)
  }

  componentDidUpdate(prevProps) {
    const {location, onGetListProduct} = this.props
    try{
      /*global FB*/
      if (FB) {
        FB.XFBML.parse();
      }
      if (prevProps.location.search !== location.search) {
        const filters = getFilterParams(location.search);
        const { filter } = this.state;
        var params = {
          ...filter,
          ...filters
        };
        onGetListProduct(params);
      }
    }
    catch(err){
    }
  }

  redirectCategory = (category) =>{
    const {history} = this.props;
    history.push(`/products/${category.pathseo}.${category._id}`)
  }

  // Sort with brands
  onSetBrand = (value) => {
    this.handleUpdateFilter({ brand: value, page: 0 });
  }

  // Sort price
  handleChangeSortPrice = (event) =>{
    this.handleUpdateFilter({ sort_p: event.target.value, page : 0 });
  }

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  // Chuyển router (thêm vào params) 
  handleUpdateFilter = (data) => {
    const {location, history} = this.props;
    const {pathname, search} = location;
    let queryParams = getFilterParams(search);
    queryParams = {
      ...queryParams,
      ...data,
    };
    history.push(`${pathname}?${qs.stringify(queryParams)}`);
  };

  destroyFilter = () => {
    const {location, history} = this.props;
    const {pathname} = location;
    history.push(pathname)
  }

  componentWillUnmount(){
    const {onClearStateBrand} = this.props;
    onClearStateBrand();
  }

  render() {
    const { more } = this.state;
    const { t, listAccessory, totalBrand, listProducts, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-12 my-2">
            <a className="text-decoration-none directory rounded p-2" href="/#/">{t('header.home.menu')}</a>
            <i className="fa fa-chevron-right px-2 w-25-px"></i>
          </div>
          <div className="col-12">
            <h1 className="font-weight-bold">{t('accessory.page.title')}</h1>
          </div>
          <div className="col-12 my-2">
            <div className="rounded shadow-sm my-2">
              <div className="px-3 py-2">
                <h3 className="mb-1">{t('accessory.category.title')}</h3>
                <div className="mb-2 border-bottom"></div>
                <div className="row">
                  {listAccessory && listAccessory.map(item => {
                    return (
                    <div className="col-3 col-md-2 col-xl-1">
                      <div className="square">
                        <button className="rounded content bg-light" onClick={() => this.redirectCategory(item)}>
                        <img src={item.image.public_url} alt=""></img>
                        </button>
                      </div>
                      <p className="text-center font-weight-bold x-small">{item.name}</p>
                    </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button type="button" 
            className={(filter.brand === null || filter.brand === undefined) ? "rounded-pill shadow-sm bg-aqua text-dark my-2 mr-2 position-relative btn-padding" : "rounded-pill shadow-sm bg-light text-dark my-2 mr-2 position-relative btn-padding"} 
            onClick={()=>this.onSetBrand(null)}>{t('common.all')}</button>
            {totalBrand && 
            totalBrand.map((brand, index) =>{
            return(
              <button type="button" 
              className={filter.brand === brand._id._id ? "rounded-pill shadow-sm bg-aqua text-dark mr-2 my-2 position-relative btn-padding" : "rounded-pill shadow-sm bg-light text-dark mr-2 my-2 position-relative btn-padding"} 
              key={index} onClick={()=>this.onSetBrand(brand._id._id)}>
                <img alt={brand._id.name} style={{height: "20px"}} src={brand._id.image && brand._id.image.public_url}/>
                <span className="product-count">{brand.count}</span>
              </button>
            )})}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p>{t('shop.search.first')} {total} {t('shop.search.last')}</p>
          </div>
          <div className="col-6">
            <select value={filter.sort_p} className="form-select float-end w-fit-content" onChange={this.handleChangeSortPrice}>
              <option key={-1} value="0">{t('shop.sort.price')}</option>
              <option value="1">{t('shop.sort.inc')}</option>
              <option value="-1">{t('shop.sort.des')}</option>
            </select>
            {location.search.length > 0 && <button type="button" className="btn btn-light float-end shadow-sm mr-2" onClick={()=> this.destroyFilter()}>
              <i className="fa fa-eraser mr-1"></i>
              {t('common.clear-filter.button')}
            </button>}
          </div>
        </div>
        <div className="row">
          {listProducts ? listProducts.map((product, index) => {
            return (
                <ProductItem product={product} key={index}/>
              )
          }) : <Loader/>}
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="product-pagination text-center">
              <nav className="float-end">
              <Pagination
                activePage={filter.page ? parseInt(filter.page)+1 : 1}
                itemsCountPerPage={12}
                totalItemsCount={total ? total : 10}
                pageRangeDisplayed={3}
                linkClass="page-link"
                itemClass="page-item"
                prevPageText={t('shop.pagination.prev')}
                nextPageText={t('shop.pagination.next')}
                hideFirstLastPages={true}
                onChange={this.handlePageChange.bind(this)}
              />
              </nav>
            </div>
          </div>
        </div>
        <div className={ more ? "row" : "row description"}>
          <div className="col-12">
          {accessoryData.accessoryAd.map(item => {
            return (
              <>
                <h3>{item.title}</h3>
                {item.content.map(line => {
                  return (
                    <p>{line}</p>
                  )
                })}
                {item.image && 
                <div className="text-center">
                  <img src={item.image} alt=""></img>
                </div> }
              </>
            )
          })}
          </div>
          {!more && <div className="view-more" onClick={() => this.setState({ more: true })}>
            <p>{t('common.readmore.button')}<span><i className="fa fa-angle-down ml-2"></i></span></p>
          </div>}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="fb-comments" data-href={`${LOCAL}/#/products/accessories`} data-width="100%" data-numposts="5"></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    listAccessory: state.categories.accessories,
    totalBrand: state.brands.list,
    listProducts: state.products.list,
    total: state.products.total,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClearStateBrand: () =>{
      dispatch(BrandActions.onClearState())
    },
    onGetListProduct: (params) => {
      dispatch(ProductsActions.onGetAccessory(params))
    },
    onGetAccessory: (payload) => {
      dispatch(CategoryActions.onGetAccessory(payload))
    },
    onGetListBrand: (params) => {
      dispatch(BrandActions.onGetAccessory(params))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(AccessoryPage);