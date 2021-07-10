import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
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

  // Sort price
  handleChangeSortPrice = (event) =>{
    this.handleUpdateFilter({ sort_p: event.target.value, page : 0 });
  }

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
    const { location, listProducts, total, listCategory, t } = this.props;
    const filter = getFilterParams(location.search);
    return (
      <div className="single-product-area">
        <div className="container my-3">
          <div className="row">
            <div className="col-12 my-2">
              <a className="text-decoration-none directory rounded p-2" href="/#/">{t('header.home.menu')}</a>
              <i className="fa fa-chevron-right px-2 w-25-px"></i>
            </div>
            <div className="col-12">
              <h1 className="font-weight-bold">{t("search.label")}</h1>
            </div>
          </div>
          {total > 0 && <div className="row">
            <div className="col-12">
              <h3 className="border-bottom pb-2">{t('search.result.title')} '{filter.keyword}'</h3> 
            </div>
            <div className="col-12">
              <button type="button" 
              className={(filter.category === null || filter.category === undefined) ? "rounded-pill shadow-sm bg-info text-dark my-2 mr-2 position-relative btn-padding" : "rounded-pill shadow-sm bg-active text-dark my-2 mr-2 position-relative btn-padding"} 
              onClick={()=>this.onSetCategory(null)}>{t('common.all')}</button>
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
                <div className="col-6">
                <p>{t('shop.search.first')} {total} {t('shop.search.last')}</p>
                </div>
                <div className="col-6">
                <select value={filter.sort_p} className="form-select float-end w-fit-content" onChange={this.handleChangeSortPrice}>
                  <option key={-1} value="0">{t('shop.sort.price')}</option>
                  <option value="1">{t('shop.sort.inc')}</option>
                  <option value="-1">{t('shop.sort.des')}</option>
                </select>
                </div>
              </div>
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
          </div>}
          {total === 0 && <div className="row my-1">
            <div className="col-12">
              <div className="text-center my-5 py-5">
                <div className="h-120">
                  <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a60759ad1dabe909c46a817ecbf71878.png" alt="404 not found"></img>
                </div>
                <h3>{t('search.not-yet.h3')}</h3>
              </div>
            </div>
          </div>}
          {total > 0 && <div className="row">
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
          </div>}
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