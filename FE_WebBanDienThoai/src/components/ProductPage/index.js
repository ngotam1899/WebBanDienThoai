import React, { Component } from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
import draftToHtml from 'draftjs-to-html';
import './styles.css';
// @Function
import getFilterParams from "../../utils/getFilterParams";
import {LOCAL} from '../../constants/index';
// @Components
import ProductItem from "../../containers/ProductItem"
import Pagination from "react-js-pagination";
// @Actions
import ProductsSelectors from "../../redux/selectors/products";
import ProductsActions from "../../redux/actions/products";
import BrandActions from "../../redux/actions/brands";
import CategoryActions from "../../redux/actions/categories";

class ProductPage extends Component {
  constructor(props) {
    const {match, location} = props;
    const filter = getFilterParams(location.search);
    super(props);
    this.state = {
      keyword: filter.keyword ===null ? "" : filter.keyword,
      min_p: filter.min_p ===null ? "" : filter.min_p,
      max_p: filter.max_p ===null ? "" : filter.max_p,
      filter: {
        limit: 12,
        page: 0,
        active: 1,
        category: match.params.categoryID ? match.params.categoryID : null
      },
      more: false
    }
  }

  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
  }

  setPage = (value) =>{
    this.handleUpdateFilter({ page: value });
  }
  
  //??
  UNSAFE_componentWillMount() {
    const { onGetList, onGetListBrand, onGetCategory, location, match } = this.props;
    const { filter } = this.state;
    const filters = getFilterParams(location.search);
    var params = {
      ...filter,
      ...filters
    };
    onGetListBrand(params);
    onGetList(params);
    onGetCategory(match.params.categoryID);
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

  componentDidUpdate(prevProps) {
    try{
      /*global FB*/
      if (FB) {
        FB.XFBML.parse();
      }
      const {location, category, onGetList, onGetListBrand} = this.props
      if (prevProps.location.search !== location.search) {
        const filters = getFilterParams(location.search);
        const { filter } = this.state;
        var params = {
          ...filter,
          ...filters
        };
        onGetList(params);
        onGetListBrand(params);
      }
      if(prevProps.category !== category && category){
        document.title = `${category.name} | ${category.name_en}`
      }
    }
    catch(err){
    }
  }

  // Sort with brands
  onSetBrand = (value) => {
    this.handleUpdateFilter({ brand: value, page: 0 });
  }

  onSetFilter = (event) => {
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.handleUpdateFilter({ [name]: value });
  }

  // Change distance price
  distancePrice = (min, max, e) => {
    const {min_p, max_p} = this.state;
    if(min !== undefined && max !== undefined){
      this.handleUpdateFilter({ min_p: min, max_p: max, page: 0});
    }
    else{
      this.handleUpdateFilter({ min_p, max_p, page: 0});
    }
  }

  // Sort price
  handleChangeSortPrice = (event) =>{
    this.handleUpdateFilter({ sort_p: event.target.value, page : 0 });
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

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  render() {
    const {min_p, max_p, more} = this.state;
    const { listProducts, totalBrand, t, location, total, category } = this.props;
    const filter = getFilterParams(location.search);
    return (
    <div className="container mb-3">
      <div className="row">
        {category && <div className="my-2">
          <a className="text-decoration-none" href="/#/">{t('header.home.menu')}</a>
          <i className="fa fa-chevron-right px-2 w-25-px "></i>
          <a className="text-decoration-none" href={`/#/products/${category.pathseo}.${category._id}`}>{category.name}</a>
        </div>}
        <div className="col-12 col-md-3">
          <div className="row">
            <div className="col-6 col-md-12 mb-3">
              <div className="shadow-sm rounded">
                <div className="px-3 py-2">
                  <h3 className="mb-1">{t('shop.distance.label')}</h3>
                  <div className="mb-2 border-bottom"></div>
                  {category && <ul className="pl-0 mb-0">
                    <li className="form-check">
                      <input type="radio" 
                      checked={(filter.max_p === null || filter.max_p === undefined) && (filter.min_p === null || filter.min_p === undefined) && "checked"} 
                      className="form-check-input" id="price" name="price" onChange={(e) => this.distancePrice(null, null, e)}/>
                      <label htmlFor="price" className="form-check-label">{t('shop.all.radio-button')}</label>
                    </li>
                    {category.price.map(price =>{
                      return (
                      <li className="form-check" key={price._id}>
                        <input type="radio" id={price._id} name="price"
                        checked={(filter.max_p === price.max && filter.min_p === price.min) && "checked"} 
                        className="form-check-input"  onChange={(e) => this.distancePrice(price.min, price.max, e)}/>
                        <label htmlFor={price._id} className="form-check-label">{price.name}</label>
                      </li>
                      )
                    })}
                  </ul>}
                  <div className="row input-group mx-auto mb-1">
                    <input type="number" value={min_p} name="min_p" step={100000} min={0} onChange={this.onChange} placeholder={t('shop.distance.from')} className="form-control w-40"></input>
                    <input type="number" value={max_p} name="max_p" step={100000} min={100000} onChange={this.onChange} placeholder={t('shop.distance.to')} className="form-control w-40"></input>
                  </div>
                  <button className="btn btn-primary w-100 mb-2" onClick={() => this.distancePrice()}>
                  <i className="fa fa-search-dollar"></i> Áp dụng
                  </button>
                </div>
              </div>
            </div>
            {category && category.filter.map(item=>{
              return (
                <div className="col-6 col-md-12 mb-3" key={item._id._id}>
                  <div className="shadow-sm rounded">
                    <div className="px-3 py-2">
                      <h3 className="mb-1">{item._id.name}</h3>
                      <div className="mb-2 border-bottom"></div>
                      <ul className="pl-0">
                        <li className="form-check">
                          <input type="radio" checked={(filter[`${item.query}`] === "" || filter[`${item.query}`] === undefined) && "checked"} className="form-check-input" value="" id={item.query} name={item.query} onChange={this.onSetFilter}/>
                          <label htmlFor={item.query} className="form-check-label">{t('shop.all.radio-button')}</label>
                        </li>
                        {item._id.selections.map(selector =>{
                          return (
                          <li className="form-check" key={selector._id}>
                            <input type="radio" checked={filter[`${item.query}`] === selector._id && "checked"} value={selector._id} id={selector._id} name={item.query} className="form-check-input" onChange={this.onSetFilter} />
                            <label htmlFor={selector._id} className="form-check-label">{selector.name}</label>
                          </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div> 
              )
            })}
          </div>
        </div>
        <div className="col-md-9 col-12">
          <div className="row">
            <div className="col-12">
            <button type="button" 
            className={(filter.brand === null || filter.brand === undefined) ? "rounded-pill shadow-sm bg-aqua text-dark my-2 mr-2 position-relative btn-padding" : "rounded-pill shadow-sm bg-light text-dark my-2 mr-2 position-relative btn-padding"} 
            onClick={()=>this.onSetBrand(null)}>Độc quyền</button>
            {totalBrand && 
            totalBrand.map((brand, index) =>{
            return(
              <button type="button" 
              className={filter.brand === brand._id._id ? "rounded-pill shadow-sm bg-aqua text-dark mr-2 my-2 position-relative btn-padding" : "rounded-pill shadow-sm bg-light text-dark mr-2 my-2 position-relative btn-padding"} 
              key={index} onClick={()=>this.onSetBrand(brand._id._id)}>
                <img alt={brand._id.name} style={{height: "20px"}} src={brand._id.image.public_url}/>
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
            <select value={filter.sort_p} className="form-select float-end" style={{width: "fit-content"}} onChange={this.handleChangeSortPrice}>
              <option key={-1} value="0">{t('shop.sort.price')}</option>
              <option value="1">{t('shop.sort.inc')}</option>
              <option value="-1">{t('shop.sort.des')}</option>
            </select>
            </div>
          </div>
          <div className="row">
            {listProducts.map((product, index) => {
              return (
                  <ProductItem product={product} key={index} />
                )
            })}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="product-pagination text-center">
          <nav className="float-end">
          <Pagination
            activePage={filter.page ? parseInt(filter.page)+1 : 1}
            itemsCountPerPage={4}
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
      {category && <>
      <div className={ more ? "row" : "row description"}>
        {category.description ? <div className="text-center" dangerouslySetInnerHTML={{__html: draftToHtml(JSON.parse(category.description))}}></div> : ""}
        <div className="view-more" onClick={() => this.setState({ more: true })}>
          <p>Đọc thêm giới thiệu<span><i className="fa fa-angle-down ml-2"></i></span></p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="fb-comments" data-href={`${LOCAL}/#/products/${category.pathseo}.${category._id}`} data-width="100%" data-numposts="5"></div>
        </div>
      </div></>}
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listProducts: ProductsSelectors.getList(state),
    listColor: state.color.list,
    listBrand: state.brands.list,
    totalBrand: state.brands.total,
    total: state.products.total,
    category : state.categories.detail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(ProductsActions.onGetList(params))
    },
    onGetListBrand: (params) => {
      dispatch(BrandActions.onGetList(params))
    },
    onGetCategory: (id) => {
      dispatch(CategoryActions.onGetDetail(id))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(ProductPage);