import React, { Component } from 'react';
import { connect } from "react-redux";
import qs from "query-string";
import './styles.css';
// @Function
import getFilterParams from "../../utils/getFilterParams";
// @Components
import ProductItem from "../../containers/ProductItem"
// @Actions
import ProductsSelectors from "../../redux/selectors/products";
import ProductsActions from "../../redux/actions/products";
import BrandActions from "../../redux/actions/brands";
import ColorActions from "../../redux/actions/color";

class ProductPage extends Component {
  constructor(props) {
    const {match} = props;
    super(props);
    this.state = {
      keyword: "",
      filter: {
        /* limit: 10,
        page: 1, */
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
  
  //??
  componentWillMount() {
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

  render() {
    const {keyword} = this.state;
    const { listProducts, onAddProductToCart,listColor, listBrand } = this.props;
    return (
      <>
        <div className="product-big-title-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                    <div className="row my-5 justify-content-center">
                      <div className="col-md-6 col-9">
                        <input type="text" className="w-100" name="keyword" value={keyword} onChange={this.onChange}></input>
                      </div>
                      <div className="col-md-2 col-3">
                        <button className="btn btn-danger w-100 h-100" onClick={() => this.searchKeyWorld()}>Tìm kiếm</button>
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
                      <div className="card-header bg-info text-white"><h5 className="m-0">Brands</h5></div>
                      <div className="card-body">
                        <form>
                          <div className="radio">
                            <label className="m-0"><input className="mr-2" type="radio" name="brand" onChange={()=>this.onSetBrand(null)}/>Tất cả</label>
                          </div>
                          {listBrand && 
                          listBrand.map((brand, index) =>{
                          return(
                          <div className="radio" key={index}>
                            <label className="m-0"><input className="mr-2" type="radio" name="brand" onChange={()=>this.onSetBrand(brand._id)}/>{brand.name}</label>
                          </div>
                          )})}
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-12 ">
                    <div className="card bg-light mb-3">
                      <div className="card-header bg-info text-white"><h5 className="m-0">Colors</h5></div>
                      <div className="card-body">
                        <form>
                          <div className="radio">
                            <label className="m-0"><input className="mr-2" type="radio" name="color" onChange={()=>this.onSetColor(null)}/>Tất cả</label>
                          </div>
                          {listColor && listColor.map((color, index) =>{
                            return (
                            <div className="radio" key={index}>
                              <label className="m-0"><input className="mr-2" type="radio" name="color" onChange={()=>this.onSetColor(color._id)}/>{color.color}</label>
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
                  <nav>
                    <ul className="pagination">
                      <li>
                        <a href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li><a href="#">1</a></li>
                      <li><a href="#">2</a></li>
                      <li><a href="#">3</a></li>
                      <li><a href="#">4</a></li>
                      <li><a href="#">5</a></li>
                      <li>
                        <a href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);