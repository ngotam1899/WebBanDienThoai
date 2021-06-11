import React, { Component } from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
// @Actions
import ProductsActions from '../../redux/actions/products'
import CategoryActions from '../../redux/actions/categories'
// @Functions
import getFilterParams from "../../utils/getFilterParams";
// @Components
import ProductItem from "../../containers/ProductItem"
import Pagination from "react-js-pagination";

class SearchPage extends Component {
  constructor(props){
    super(props);
    const {location} = props;
    const filter = getFilterParams(location.search);
    this.state = {
      keyword: filter.keyword ===null ? "" : filter.keyword,
      filter: {
        limit: 12,
        page: 0,
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {location, onGetList, onGetListCategory} = this.props
    if (prevProps.location.search !== location.search) {
      const filters = getFilterParams(location.search);
      const { filter } = this.state;
      var params = {
        ...filter,
        ...filters
      };
      onGetList(params);
      onGetListCategory(params);
    }
  }

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

  // Sort with categories
  onSetCategory = (value) => {
    this.handleUpdateFilter({ category: value, page: 0 });
  }
  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  UNSAFE_componentWillMount() {
    const { onGetList, location, onGetListCategory } = this.props;
    const { filter, keyword } = this.state;
    document.title = `Kết quả tìm kiếm '${keyword}'`
    const filters = getFilterParams(location.search);
    var params = {
      ...filter,
      ...filters
    };
    onGetList(params);
    onGetListCategory(params)
  }

  render() {
    const {location, listProducts, total, listCategory, t} = this.props;
    const filter = getFilterParams(location.search);
    return (
      <div className="single-product-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="border-bottom pb-2">Kết quả tìm kiếm: '{filter.keyword}'</h3> 
            </div>
            <div className="col-12">
              <button type="button" 
              className={(filter.category === null || filter.category === undefined) ? "rounded-pill shadow-sm bg-info text-dark my-2 mr-2 position-relative btn-padding" : "rounded-pill shadow-sm bg-active text-dark my-2 mr-2 position-relative btn-padding"} 
              onClick={()=>this.onSetCategory(null)}>Tất cả</button>
              {listCategory && 
              listCategory.map((category, index) =>{
              return(
                <button type="button" 
                className={filter.category === category._id._id ? "rounded-pill shadow-sm bg-info text-dark mr-2 my-2 position-relative btn-padding" : "rounded-pill shadow-sm bg-active text-dark mr-2 my-2 position-relative btn-padding"} 
                key={index} onClick={()=>this.onSetCategory(category._id._id)}>
                  {category._id.name}
                  <span className="product-count">{category.count}</span>
                </button>
              )})}
            </div>
            <div className="col-12">
              <div className="row">
                {listProducts && listProducts.map((product, index) => {
                  return (
                      <ProductItem product={product} key={index} />
                    )
                })}
              </div>
            </div>
              {/* <div className="col-md-9 col-12">
                <div className="row">
                  <div className="col-6 col-md-5">
                    <div className="card border-info mb-3 w-100">
                      <div className="row no-gutters">
                        <div className="col-sm-5">
                          <div className="card-header h-100 text-info mb-0"><h5 className="card-title mb-0">{t('shop.sort.label')}</h5></div>
                        </div>
                        <div className="col-sm-5">
                          <div className="card-body py-md-3 py-2 px-3 px-md-2">
                            <select value={filter.sort_p} className="" onChange={this.handleChangeSortPrice}>
                              <option key={-1} value="0">{t('shop.sort.price')}</option>
                              <option value="1">{t('shop.sort.inc')}</option>
                              <option value="-1">{t('shop.sort.des')}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 col-6">
                    <div className="card border-info mb-3 w-100">
                      <div className="row no-gutters">
                        <div className="col-sm-4">
                          <div className="card-header h-100 text-info mb-0"><h5 className="card-title mb-0">{t('shop.distance.label')}</h5></div>
                        </div>
                        <div className="col-sm-8 d-md-block d-none">
                          <div className="card-body py-md-2 py-0">
                            <div className="row input-group mx-auto">
                              <input type="number" value={min_p} name="min_p" step={100000} min={0} onChange={this.onChange} placeholder={t('shop.distance.from')} className="form-control w-40"></input>
                              <input type="number" value={max_p} name="max_p" step={100000} min={100000} onChange={this.onChange} placeholder={t('shop.distance.to')} className="form-control w-40"></input>
                              <div className="input-group-append">
                                <button onClick={() => this.distancePrice()} className="btn btn-primary"><i className="fa fa-search-dollar"></i></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-8 d-md-none d-block">
                          <div className="card-body py-1">
                              <input type="number" value={min_p} name="min_p" step={100000} min={0}  onChange={this.onChange} placeholder={t('shop.distance.from')} style={{borderBottomLeftRadius: "unset", borderBottomRightRadius: "unset"}} className="form-control"></input>
                              <input type="number" value={max_p} name="max_p" step={100000} min={100000} onChange={this.onChange} placeholder={t('shop.distance.to')} style={{borderRadius: "unset"}} className="form-control"></input>
                            <button onClick={() => this.distancePrice()} className="btn btn-primary w-100" style={{borderTopLeftRadius: "unset", borderTopRightRadius: "unset"}}><i className="fa fa-search-dollar"></i> {t('shop.distance.button')}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p style={{fontStyle: 'italic'}}>{t('shop.search.first')} {total} {t('shop.search.last')}</p>
                <div className="row">
                  {listProducts.map((product, index) => {
                    return (
                        <ProductItem product={product} key={index} />
                      )
                  })}
                </div>
              </div>
            </div>*/}
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
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) =>{
  return {
    listProducts: state.products.list,
    listCategory: state.categories.search,
    total: state.products.total,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetList: (params) => {
      dispatch(ProductsActions.onGetList(params))
    },
    onGetListCategory: (params) => {
      dispatch(CategoryActions.onGetListKeyword(params))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(SearchPage);