import React, { Component } from 'react';
import { connect } from "react-redux";
import { get } from "lodash";
import './styles.css';
// @Components
import ProductItem from "../../containers/ProductItem"
// @Actions
import ProductsSelectors from "../../redux/selectors/products";
import ProductsActions from "../../redux/actions/products";
import ImagesActions from "../../redux/actions/cloudinary";
import BrandActions from "../../redux/actions/brands";
import ColorActions from "../../redux/actions/color";

class ProductPage extends Component {
  componentDidMount() {
    const { onGetListByCat, onGetListImage, onGetListColor, onGetListBrand, match } = this.props;
    onGetListImage();
    onGetListColor();
    onGetListBrand();
    onGetListByCat(match.params.categoryID);
  }
  
  setImage = (image) => {
    const {listImages} = this.props;
    const img = listImages.find(obj => obj._id === image);
    return get(img, "public_url");
  }

  onSetProducts = (id) =>{
    console.log(id);
  }

  render() {
    const { listProducts, onAddProductToCart, listImages, listColor, listBrand } = this.props;
    return (
      <>
        <div className="product-big-title-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                    <div className="row my-5 justify-content-center">
                      <div className="col-md-6 col-9">
                        <input type="text" className="w-100"></input>
                      </div>
                      <div className="col-md-2 col-3">
                        <button className="btn btn-danger w-100 h-100">Tìm kiếm</button>
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
                            <label className="m-0"><input className="mr-2" type="radio" name="brand" onChange={()=>this.onSetProducts(null)}/>Tất cả</label>
                          </div>
                          {listBrand && 
                          listBrand.map((brand, index) =>{
                          return(
                          <div className="radio" key={index}>
                            <label className="m-0"><input className="mr-2" type="radio" name="brand" onChange={()=>this.onSetProducts(brand._id)}/>{brand.name}</label>
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
                            <label className="m-0"><input className="mr-2" type="radio" name="color" onChange={()=>this.onSetProducts(null)}/>Tất cả</label>
                          </div>
                          {listColor && listColor.map((color, index) =>{
                            return (
                            <div className="radio" key={index}>
                              <label className="m-0"><input className="mr-2" type="radio" name="color" onChange={()=>this.onSetProducts(color._id)}/>{color.color}</label>
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
                  {listImages && listProducts.map((product, index) => {
                    return (
                        <ProductItem product={product} key={index} 
                        onAddProductToCart={onAddProductToCart}
                        setImage={this.setImage} />
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
    onGetListByCat: (id) => {
      dispatch(ProductsActions.onGetListByCat(id))
    },
    onAddProductToCart: (product) => {
      dispatch(ProductsActions.onAddProductToCart(product, 1));
    },
    onGetListImage: () => {
      dispatch(ImagesActions.onGetList())
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