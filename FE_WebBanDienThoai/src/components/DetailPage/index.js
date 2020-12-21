import React, { Component } from 'react';
import {connect} from 'react-redux';
import { get } from "lodash";
// @Actions
import ProductsActions from '../../redux/actions/products'
import BrandActions from "../../redux/actions/brands";
import CategoryActions from "../../redux/actions/categories";
import OperationActions from "../../redux/actions/operations";
import ColorActions from "../../redux/actions/color";
// @Components
import ImageGalleries from './ImageGalleries';
import './styles.css';
// @Functions
import tryConvert from '../../utils/changeMoney'

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    }
  }

  componentDidMount(){
    const {match, onGetDetailProduct, onGetListBrand, onGetListCategory, onGetListColor, onGetListOperation} = this.props;
    onGetListBrand();
    onGetListCategory();
    onGetListColor();
    onGetListOperation();
    onGetDetailProduct(match.params.productID);
  }

  setBrand = (brand) =>{
    const {listBrands} = this.props;
    const brandName = listBrands.find(obj => obj._id === brand);
    return get(brandName, "name");
  }

  setCategory = (category) =>{
    const {listCategories} = this.props;
    const categoryName = listCategories.find(obj => obj._id === category);
    return get(categoryName, "name");
  }

  setColor = (color) =>{
    const {listColor} = this.props;
    const colorName = listColor.find(obj => obj._id === color);
    return get(colorName, "color");
  }

  setOperation = (operation) =>{
    const {listOperations} = this.props;
    const operationName = listOperations.find(obj => obj._id === operation);
    return get(operationName, "operation");
  }

  onUpdateQuantity = (product, quantity) => {
    var {onUpdateProductInCart} = this.props;
    if(quantity > 0){
      this.setState({quantity})
      onUpdateProductInCart(product, quantity);
    }
  }

  onAddToCart = (product, quantity) =>{
		var {onAddProductToCart} = this.props;
		onAddProductToCart(product, quantity);
	}

  render() {
    const {product, currency} = this.props;
    const {quantity} = this.state;
    return (<>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>Shop</h2>
              </div>
            </div> 
          </div>
        </div>
      </div>
      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-content-right">
                <div className="product-breadcroumb">
                  <a href="/#/">Home</a>
                  <a href="#">{product && this.setCategory(product.category)}</a>
                  <a href="#">{product && product.name}</a>
                </div>

                {product && <div className="row">
                  

                  <div className="col-sm-5">
                    {product.image && <ImageGalleries imageDetail={product.image}/> }
                  </div>

                  <div className="col-sm-7">
                    <div className="product-inner">
                      <h2 className="product-name">{product.name}</h2>
                      <div className="product-inner-price">
                        <ins>{currency=="VND" ? product.price : parseFloat(tryConvert(product.price, currency, false)).toFixed(2)} {currency}</ins> 
                        <del>{currency=="VND" ? product.price*1.2 : parseFloat(tryConvert(product.price, currency, false)*1.2).toFixed(2)} {currency}</del>
                      </div>

                      <form action="" className="cart">
                        <div className="quantity">
                          <div className="quantity buttons_added">
                            <input type="button" className="minus" value="-" onClick={() => this.onUpdateQuantity(product,quantity - 1)}/>
                            <input type="number" size="4" className="input-text qty text" title="Qty" value={quantity} min="0"
                              step="1" />
                            <input type="button" className="plus" value="+" onClick={() => this.onUpdateQuantity(product, quantity + 1)}/>
                          </div>
                        </div>
                        <button className="add_to_cart_button" type="button" onClick={() => {this.onAddToCart(product, quantity)}}>Add to cart</button>
                      </form>

                      <div className="product-inner-category">
                        <p className="m-0">Category: <a href="">{this.setCategory(product.category)}</a></p>
                        <p className="m-0">Brand: <a href="">{this.setBrand(product.brand)}</a></p>
                        <p>Color: <a href="">{this.setColor(product.detail_info.mobile.color)}</a></p>
                      </div>

                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab" href="#description">Description</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-toggle="tab" href="#review">Reviews</a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div className="tab-pane container active" id="description">
                          <br />
                          <table  class="table table-inverse table-responsive">
                            <thead class="thead-inverse">
                              <tbody>
                                <tr>
                                  <td scope="row">Display</td>
                                  <td>{product.detail_info.mobile.display}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Revolution</td>
                                  <td>{product.detail_info.mobile.revolution}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Widescreen</td>
                                  <td>{product.detail_info.mobile.widescreen}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Operation</td>
                                  <td>{this.setOperation(product.detail_info.mobile.operation)}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Camera 1</td>
                                  <td>{product.detail_info.mobile.camera1}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Camera 2</td>
                                  <td>{product.detail_info.mobile.camera2}</td>
                                </tr>
                                <tr>
                                  <td scope="row">CPU</td>
                                  <td>{product.detail_info.mobile.cpu}</td>
                                </tr>
                                <tr>
                                  <td scope="row">RAM</td>
                                  <td>{product.detail_info.mobile.ram} GB</td>
                                </tr>
                                <tr>
                                  <td scope="row">Memory</td>
                                  <td>{product.detail_info.mobile.memory} GB</td>
                                </tr>
                                <tr>
                                  <td scope="row">Microcard</td>
                                  <td>{product.detail_info.mobile.microcard}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Sim</td>
                                  <td>{product.detail_info.mobile.sim}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Network</td>
                                  <td>{product.detail_info.mobile.network}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Pin</td>
                                  <td>{product.detail_info.mobile.pin}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Quick Charging</td>
                                  <td>{product.detail_info.mobile.quickcharging}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Weight</td>
                                  <td>{product.detail_info.mobile.weight}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Thick</td>
                                  <td>{product.detail_info.mobile.thick}</td>
                                </tr>
                              </tbody>
                            </thead>
                          </table>
                        </div>
                        <div className="tab-pane container fade" id="review">
                          <br />
                          <div className="submit-review">
                            <p><label>Name</label> <input name="name" type="text" /></p>
                            <p><label>Email</label> <input name="email" type="email" /></p>
                            <div className="rating-chooser">
                              <p className="m-0">Your rating</p>

                              <div className="rating-wrap-post">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                              </div>
                            </div>
                            <p><label>Your review</label> <textarea name="review" id="" cols="30" rows="10"></textarea></p>
                            <p><input type="submit" value="Submit" /></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    product: state.products.detail,
    listBrands: state.brands.list,
    listCategories: state.categories.list,
    listColor: state.color.list,
    listOperations: state.operations.list,
    currency: state.currency,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetDetailProduct: (id) => {
      dispatch(ProductsActions.onGetDetail(id))
    },
    onGetListBrand: () => {
      dispatch(BrandActions.onGetList())
    },
    onGetListCategory: () => {
      dispatch(CategoryActions.onGetList())
    },
    onGetListColor: () => {
      dispatch(ColorActions.onGetList())
    },
    onGetListOperation: () => {
      dispatch(OperationActions.onGetList())
    },
    onUpdateProductInCart: (product, quantity) => {
      dispatch(ProductsActions.onUpdateProductInCart(product, quantity))
    },
    onAddProductToCart: (product, quantity) => {
      dispatch(ProductsActions.onAddProductToCart(product, quantity));
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (DetailPage);