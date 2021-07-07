import React, { Component } from 'react'
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import qs from "query-string";
// @Components
import ImageGalleries from '../DetailPage/ImageGalleries';
// @Actions
import ProductsActions from "../../redux/actions/products";
import CategoryActions from "../../redux/actions/categories";
// @Function
import getFilterParams from "../../utils/getFilterParams";
import tryConvert from '../../utils/changeMoney'
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
    if (prevProps.category !== category && listProducts || prevProps.location.search !== location.search) {
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
    const { location } = this.props;
    const filters = getFilterParams(location.search);
    var compareString = filters.compare || "" ;
    var compare = filters.compare ? filters.compare.split(",") : [];
    const index = compare.findIndex(item => item === productID)
    if(index === -1){
      compare = compare.concat(productID);
      compareString = compare.join()
    }
    else {
      toastError("Sản phẩm này đã có sẵn trong danh sách so sánh của bạn")
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
    const { t, listProducts, category, listSearch, currency } = this.props;
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-12 my-2">
            <a className="text-decoration-none directory rounded p-2" href="/#/">{t('header.home.menu')}</a>
            <i className="fa fa-chevron-right px-2 w-25-px "></i>
            {category && <>
            <a className="text-decoration-none directory rounded p-2" href={`/#/products/${category.pathseo}.${category._id}`}>{category.name}</a>
            <i className="fa fa-chevron-right px-2 w-25-px "></i></>}
          </div>
          <h1 className="my-0 font-weight-bold">So sánh sản phẩm</h1>
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
                  </div>
                )
              })
              }
              {listProducts && listProducts.length <3 && <div className="col-4">
                <div className="rounded border p-2 my-2 shadow-sm form-inline">
                  <div className="form-group w-100">
                    <div className="position-relative w-100">
                      <input className="form-control w-100" type="text" placeholder="Nhập sản phẩm cần so sánh" value={keyword} name="keyword" onChange={this.handleFilter}/>
                      <div className="card position-absolute w-100" style={{ zIndex: 1}}>
                      {listSearch && keyword && listSearch.map((item, index) =>{
                        return (
                          <div key={index} onClick={()=> this.setCompare(item._id)}>
                            <div className="row text-dark text-decoration-none " style={{height: "80px"}}>
                              <div className="col-4 my-auto">
                                <img style={{height: "80px"}} src={item.bigimage.public_url} alt={item.name}></img>
                              </div>
                              <div className="col-8 text-left my-auto">
                                <p className="mb-0">{item.name}</p>
                                <p className="mb-0">{currency==="VND" ? item.price_min : parseFloat(tryConvert(item.price_min, currency, false)).toFixed(2)} {currency}</p>
                              </div>
                            </div>
                            <div className="border-bottom"></div>
                          </div>
                        )
                      })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-5 py-4 text-center">
                  <img className="w-50 my-3" src="https://cdn.cellphones.com.vn/media/icon/icon-phtb-2.png"></img>
                  <h4 className="my-3">Thêm sản phẩm để so sánh</h4>
                </div>
              </div>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="shadow-sm rounded">
              <div className="px-3 py-2">
                <h3 className="mb-1">Thông tin cơ bản</h3>
                <table className="table">
                <tbody>
                  {specifications && specifications.map(item => {
                    return(
                    <tr key={item._id}>
                      <th colSpan="1" style={{width: "16%"}}>{item.name}</th>
                      {item.product.map((element, index) => {
                        return (
                          <td colSpan="1" style={{width: "28%"}} key={index}>{element.length > 0 ? element : "Đang cập nhật"}</td>
                        )
                      })}
                      {item.product.length !== 3 && Array.from({ length: 3 - item.product.length }, (_, k) => (<td key={k} colSpan="1" style={{width: "28%"}}></td>))}
                    </tr>
                    )
                  })}
                </tbody>
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