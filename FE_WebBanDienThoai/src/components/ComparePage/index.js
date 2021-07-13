import React, { Component } from 'react'
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import qs from "query-string";
// @Components
import ImageGalleries from '../DetailPage/ImageGalleries';
import Rating from 'react-rating'
// @Actions
import ProductsActions from "../../redux/actions/products";
import CategoryActions from "../../redux/actions/categories";
// @Function
import getFilterParams from "../../utils/getFilterParams";
import tryConvert from '../../utils/changeMoney'
import numberWithCommas from "../../utils/formatPrice";
import { toastError } from '../../utils/toastHelper';

class ComparePage extends Component {
  constructor(props){
    super(props);
    const {location} = props;
    const filter = getFilterParams(location.search);
    this.state = {
      filter: {
        compare: filter.compare,
      },
      keyword: "",
      specifications: []
    }
  }

  componentDidMount() {
    document.title = "[TellMe] Trang bán hàng"
    const { onCompare, onGetCategory, location, match } = this.props;
    const { filter } = this.state;
    const filters = getFilterParams(location.search);
    var params = {
      ...filter,
      ...filters
    };
    onCompare(params);
    onGetCategory(match.params.categoryID);
  }

  componentDidUpdate(prevProps) {
    const { location, category, listProducts } = this.props;
    const { filter } = this.state;
    if (prevProps.location.search !== location.search) {
      const filters = getFilterParams(location.search);
      var params = {
        ...filter,
        ...filters
      };
      this.props.onCompare(params);
    }
    if ((prevProps.category !== category && listProducts) || (prevProps.listProducts !== listProducts && category && listProducts)) {
      var specifications = category.specifications;
      for(let i = 0; i < specifications.length; i++){
        var product = [];
        for(let j = 0; j < listProducts.length; j++){
          if(listProducts[j].specifications[i].selection.length > 0){
            var selection = []
            listProducts[j].specifications[i].selection.map(item => selection.push(item.name))
            selection = selection.join(", ");
            product.push(selection)
          }
          else product.push(listProducts[j].specifications[i].value)
          specifications[i].product = product;
        }
      }
      this.setState({specifications})
    }
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

  setCompare = (productID) => {
    const { location, t } = this.props;
    const filters = getFilterParams(location.search);
    var compareString = filters.compare || "" ;
    var compare = filters.compare ? filters.compare.split(",") : [];
    const index = compare.findIndex(item => item === productID)
    if(index === -1){
      compare = compare.concat(productID);
      compareString = compare.join()
    }
    else {
      toastError(t("compare.toastify.error"))
    }
    this.setState({ keyword: "" })
    this.handleUpdateFilter({ compare: compareString });
  }

  removeCompare = (productID) => {
    const { location } = this.props;
    const filters = getFilterParams(location.search);
    var compareString = filters.compare;
    var compare = filters.compare.split(",");
    const index = compare.indexOf(productID)
    if(index > -1){
      compare.splice(index, 1);
      compareString = compare.join()
    }
    this.handleUpdateFilter({ compare: compareString });
    if(compareString === "") window.location.reload()
  }

  handleFilter = (event) => {
    const { keyword } = this.state;
    const { onCompareFilter, match } = this.props;
		var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]: value
    })
    onCompareFilter({
      keyword,
      category: match.params.categoryID
    });
	}

  render() {
    const { keyword, specifications } = this.state;
    const { t, listProducts, category, listSearch, currency, history, language } = this.props;
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-12 my-2">
            <a className="text-decoration-none directory rounded p-2" href="/#/">{t('header.home.menu')}</a>
            <i className="fa fa-chevron-right px-2 w-25-px "></i>
            {category && <>
            <a className="text-decoration-none directory rounded p-2" href={`/#/products/${category.pathseo}.${category._id}`}>{language==="vn" ? category.name : category.name_en}</a>
            <i className="fa fa-chevron-right px-2 w-25-px "></i></>}
          </div>
          <h1 className="my-0 font-weight-bold">{t("compare.page.title")}</h1>
        </div>
        <div className="row my-3">
          <div className="col-2">
            
          </div>
          <div className="col-10">
            <div className="row">
              {listProducts && listProducts.map(product => {
                return (
                  <div className="col-4" key={product._id}>
                    <div className="rounded border p-2 my-2 shadow-sm form-inline">
                      <h3 className="my-0">{product.name}</h3>
                      <div className="form-check form-switch ml-auto">
                        <button type="button" className="btn-close rounded-circle bg-light p-2" onClick={()=> this.removeCompare(product._id)}></button>
                      </div>
                    </div>
                    <ImageGalleries imageDetail={product.image}/>
                    <div className="row">
                      <div className="col-12 text-center">
                      <ins className="text-decoration-none font-weight-bold mr-2">
                        {currency === "VND" && product.price_min 
                          ? numberWithCommas(product.price_min)
                          : numberWithCommas(
                              parseFloat(
                                tryConvert(product.price_min, currency, false)
                              ).toFixed(2)
                            )}{" "}
                        {currency}
                      </ins>
                      {product.real_price_min && product.real_price_min > product.price_min && <del>
                        {currency === "VND" && product.real_price_min 
                          ? numberWithCommas(product.real_price_min)
                          : numberWithCommas(
                              parseFloat(
                                tryConvert(product.real_price_min, currency, false)
                              ).toFixed(2)
                            )}{" "}
                        {currency}
                      </del>}
                      </div>
                      {product.stars &&<div className="col-12 col-xl-6 text-center my-1"><Rating
                          initialRating={product.stars}
                          emptySymbol="fa fa-star text-secondary"
                          fullSymbol="fa fa-star text-warning"
                          readonly
                        /><span className="ml-2 text-secondary font-size-12">{product.reviewCount} {t('common.review')}</span></div>}
                      <div className={product.stars ? "col-12 col-xl-6" : "col-12"}>
                        <button type="button" className="btn btn-primary w-100" onClick={() => {history.push(`/product/${product.pathseo}.${product._id}`)}}>{t("common.detail.button")}</button>
                      </div>
                    </div>
                  </div>
                )
              })
              }
              {listProducts && listProducts.length <3 && <div className="col-4">
                <div className="rounded border p-2 my-2 shadow-sm form-inline">
                  <div className="form-group w-100">
                    <div className="position-relative w-100">
                      <input className="form-control w-100" type="text" placeholder={t("compare.placeholder.input")} value={keyword} name="keyword" 
                      onChange={this.handleFilter}/>
                      {listSearch && keyword &&<div className="card position-absolute w-100 shadow-sm py-2" style={{ zIndex: 1}}>
                       <>{listSearch.map((item, index) =>{
                        return (
                          <div className=" directory rounded p-2 mx-2" key={index} onClick={()=> this.setCompare(item._id)}>
                            <div className="row text-dark text-decoration-none" style={{height: "60px"}}>
                              <div className="col-xl-3 my-auto d-none d-xl-block">
                                <img style={{height: "60px"}} src={item.bigimage.public_url} alt={item.name}></img>
                              </div>
                              <div className="col-12 col-xl-9 text-left my-auto">
                                <p className="mb-0">{item.name}</p>
                                <p className="mb-0 smaller text-secondary">{currency==="VND" ? item.price_min : parseFloat(tryConvert(item.price_min, currency, false)).toFixed(2)} {currency}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}</>
                      </div>}
                    </div>
                  </div>
                </div>
                <div className="my-5 py-4 text-center">
                  <img className="w-50 my-3" src="https://cdn.cellphones.com.vn/media/icon/icon-phtb-2.png" alt=""></img>
                  <h4 className="my-3">{t("compare.not-yet.h4")}</h4>
                </div>
              </div>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 my-2">
            <div className="shadow-sm rounded">
              <div className="px-3 py-2">
                <h3 className="mb-1">{t("compare.primary.h3")}</h3>
                <table className="table">
                <tbody>
                  {specifications.map(item => {
                    return(
                    <tr key={item._id}>
                      <th colSpan="1" style={{width: "16%"}}>{item.name}</th>
                      {item.product && item.product.length > 0 && item.product.map((element, index) => {
                        return (
                          <td colSpan="1" style={{width: "28%"}} key={index}>{element.length > 0 ? element : t("common.update.label")}</td>
                        )
                      })}
                      {item.product && item.product.length !== 3 && Array.from({ length: 3 - item.product.length }, (_, k) => (<td key={k} colSpan="1" style={{width: "28%"}}></td>))}
                    </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
            </div>
          </div>
          <div className="col-12 my-2">
            <div className="shadow-sm rounded">
              <div className="px-3 py-2">
                <h3 className="mb-1">{t("compare.secondary.h3")}</h3>
                <table className="table">
                {listProducts && <tbody>
                  <tr>
                    <th colSpan="1" style={{width: "16%"}}>{t("detail.warranty.label")}</th>
                    {listProducts.map(item => {
                      return(
                        <td colSpan="1" style={{width: "28%"}}>{item ? (item.warrently || t("common.update.label")) : ""}</td>
                      )
                    })}
                    {listProducts.length !== 3 && Array.from({ length: 3 - listProducts.length }, (_, k) => (<td key={k} colSpan="1" style={{width: "28%"}}></td>))}
                  </tr>
                  <tr>
                    <th colSpan="1" style={{width: "16%"}}>{t("detail.included.label")}</th>
                    {listProducts.map(item => {
                      return(
                        <td colSpan="1" style={{width: "28%"}}>{item ? (item.included || t("common.update.label")) : ""}</td>
                      )
                    })}
                    {listProducts.length !== 3 && Array.from({ length: 3 - listProducts.length }, (_, k) => (<td key={k} colSpan="1" style={{width: "28%"}}></td>))}
                  </tr>
                  <tr>
                    <th colSpan="1" style={{width: "16%"}}>{t("detail.size.label")} (cm)</th>
                    {listProducts.map(item => {
                      return(
                        <td colSpan="1" style={{width: "28%"}}>{item ? (item.height && item.length && item.width ? `${item.height} - ${item.length} - ${item.width}` : t("common.update.label")) : ""}</td>
                      )
                    })}
                    {listProducts.length !== 3 && Array.from({ length: 3 - listProducts.length }, (_, k) => (<td key={k} colSpan="1" style={{width: "28%"}}></td>))}
                  </tr>
                  <tr>
                    <th colSpan="1" style={{width: "16%"}}>{t("detail.weight.label")} (g)</th>
                    {listProducts.map(item => {
                      return(
                        <td colSpan="1" style={{width: "28%"}}>{item ? (item.weight || t("common.update.label")) : ""}</td>
                      )
                    })}
                    {listProducts.length !== 3 && Array.from({ length: 3 - listProducts.length }, (_, k) => (<td key={k} colSpan="1" style={{width: "28%"}}></td>))}
                  </tr>
                </tbody>}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    listProducts: state.products.list,
    currency: state.currency,
    category : state.categories.detail,
    listSearch: state.products.compare,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCompare: (params) => {
      dispatch(ProductsActions.onCompare(params))
    },
    onGetCategory: (id) => {
      dispatch(CategoryActions.onGetDetail(id))
    },
    onCompareFilter: (payload) => {
      dispatch(ProductsActions.onCompareFilter(payload));
    },
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withTranslation())(ComparePage)