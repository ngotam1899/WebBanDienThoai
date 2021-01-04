import React, { Component } from 'react';
import { connect } from "react-redux";
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
import './styles.css';
// @Function
import getFilterParams from "../../utils/getFilterParams";
// @Components
import ProductItem from "../../containers/ProductItem"
import Pagination from "react-js-pagination";
// @Actions
import ProductsSelectors from "../../redux/selectors/products";
import ProductsActions from "../../redux/actions/products";
import BrandActions from "../../redux/actions/brands";
import ColorActions from "../../redux/actions/color";

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
        limit: 4,
        page: 0,
        category: match.params.categoryID ? match.params.categoryID : null
      },

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
    const { onGetList, onGetListColor, onGetListBrand, location } = this.props;
    const { filter } = this.state;
    onGetListColor();
    onGetListBrand();
    const filters = getFilterParams(location.search);
    var params = {
      ...filter,
      ...filters
    };
    onGetList(params);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const filters = getFilterParams(this.props.location.search);
      const { filter } = this.state;
      var params = {
        ...filter,
        ...filters
      };
      this.props.onGetList(params);
    }
  }

  // Sort with brands
  onSetBrand = (value) => {
    this.handleUpdateFilter({ brand: value });
  }

  // Sort with colors
  onSetColor = (value) => {
    this.handleUpdateFilter({ color: value });
  }

  // Button search
  searchKeyWorld = (e) => {
    const {keyword} = this.state;
    this.handleUpdateFilter({ keyword});
  }

  // Change distance price
  distancePrice = (e) => {
    const {min_p, max_p} = this.state;
    this.handleUpdateFilter({ min_p, max_p});
  }

  // Sort name
  /* handleChangeSortName = (event) =>{
    this.handleUpdateFilter({ sort_n: event.target.value });
  } */

  // Sort price
  handleChangeSortPrice = (event) =>{
    this.handleUpdateFilter({ sort_p: event.target.value });
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
    const {keyword, min_p, max_p} = this.state;
    const { listProducts, onAddProductToCart,listColor, listBrand, t, location, total } = this.props;
    const filter = getFilterParams(location.search);
    return (
      <>
        <div className="product-big-title-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                  <div className="row my-5 justify-content-center">
                    <div className="col-8">
                      <div className="row input-group">
                        <input type="text" className="form-control" name="keyword" value={keyword} onChange={this.onChange} placeholder={t('search.placeholder.input')}></input>
                        <div className="input-group-append">
                          <button className="btn btn-danger h-100" onClick={() => this.searchKeyWorld()}>{t('shop.search.button')}</button>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="single-product-area">
          <div className="zigzag-bottom"></div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3">
                <div className="row">
                  <div className="col-6 col-md-12 ">
                    <div className="card bg-light mb-3">
                      <div className="card-header bg-info text-white"><h5 className="m-0">{t('shop.brand.card')}</h5></div>
                      <div className="card-body">
                        <form>
                          <div className="radio">
                            <label className="m-0"><input className="mr-2" type="radio" name="brand" onChange={()=>this.onSetBrand(null)} 
                            checked={(filter.brand === null || filter.brand === undefined) && "checked"}/>{t('shop.all.radio-button')}</label>
                          </div>
                          {listBrand && 
                          listBrand.map((brand, index) =>{
                          return(
                          <div className="radio" key={index}>
                            <label className="m-0"><input className="mr-2" type="radio" name="brand" onChange={()=>this.onSetBrand(brand._id)} 
                            checked={filter.brand === brand._id && "checked"}/>{brand.name}</label>
                          </div>
                          )})}
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-12 ">
                    <div className="card bg-light mb-3">
                      <div className="card-header bg-info text-white"><h5 className="m-0">{t('shop.color.card')}</h5></div>
                      <div className="card-body">
                        <form>
                          <div className="radio">
                            <label className="m-0"><input className="mr-2" type="radio" name="color" onChange={()=>this.onSetColor(null)}
                            checked={(filter.color === null || filter.brand === undefined) && "checked"}/>{t('shop.all.radio-button')}</label>
                          </div>
                          {listColor && listColor.map((color, index) =>{
                            return (
                            <div className="radio" key={index}>
                              <label className="m-0"><input className="mr-2" type="radio" name="color" onChange={()=>this.onSetColor(color._id)}
                              checked={filter.color === color._id && "checked"}/>{color.color}</label>
                            </div>
                            )
                          })}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-12">
                <div className="row">
                  <div className="col-6 col-md-5">
                    <div className="card border-info mb-3 w-100">
                      <div className="row no-gutters">
                        <div className="col-sm-5">
                          <div className="card-header h-100 text-info mb-0"><h5 className="card-title mb-0">{t('shop.sort.label')}</h5></div>
                        </div>
                        <div className="col-sm-5">
                          <div className="card-body py-md-3 py-2 px-3 px-md-2">
                            {/* <select className="mr-3" onChange={this.handleChangeSortName}>
                              <option key={-1} value="0">Tên sản phẩm</option>
                              <option value="-1">Tên: Từ A - Z</option>
                              <option value="1">Tên: Từ Z - A</option>
                            </select> */}
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
                              <div class="input-group-append">
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
                        <ProductItem product={product} key={index} 
                        onAddProductToCart={onAddProductToCart} />
                      )
                  })}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="product-pagination text-center">
                <nav className="float-right">
                <Pagination
                  activePage={filter.page ? parseInt(filter.page)+1 : 1}
                  itemsCountPerPage={4}
                  totalItemsCount={total}
                  pageRangeDisplayed={3}
                  linkClass="page-link"
                  itemClass="page-item"
                  prevPageText={t('shop.pagination.prev')}
                  nextPageText={t('shop.pagination.next')}
                  hideFirstLastPages="true"
                  onChange={this.handlePageChange.bind(this)}
                />
                </nav>
                </div>
              </div>
            </div>
          </div>
        </div></>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listProducts: ProductsSelectors.getList(state),
    listImages: state.cloudinary.list,
    listColor: state.color.list,
    listBrand: state.brands.list,
    total: state.products.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(ProductsActions.onGetList(params))
    },
    onAddProductToCart: (product) => {
      dispatch(ProductsActions.onAddProductToCart(product, 1));
    },
    onGetListBrand: () => {
      dispatch(BrandActions.onGetList())
    },
    onGetListColor: () => {
      dispatch(ColorActions.onGetList())
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(ProductPage);