import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import { get } from "lodash";
import {LOCAL} from '../../constants/index';
import { Helmet } from 'react-helmet'
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
  componentDidUpdate() {
    FB.XFBML.parse();
  }
  componentDidMount(){
    const {match, onGetDetailProduct, onGetListBrand, onGetListCategory, onGetListColor, onGetListOperation, product} = this.props;
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
  
  componentWillUnmount(){
    const {onClearDetail} =this.props;
    onClearDetail()
  }

  render() {
    const {product, currency, t, listColor, listOperations} = this.props;
    const {quantity} = this.state;
    return (<>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{product && product.name}</title>
          <link rel="" href={product && `${LOCAL}/#/product/${product.pathseo}/${product._id}`} />
        </Helmet>
      </div>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>{t('detail.shop.title')}</h2>
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
                  <a href="/#/">{t('header.home.menu')}</a>
                  <a href="/#/">{product && listColor && this.setCategory(product.category)}</a>
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
                            <input type="button" className="minus h-100" value="-" onClick={() => this.onUpdateQuantity(product,quantity - 1)}/>
                            <input type="number" size="4" className="input-text qty text" title="Qty" value={quantity} min="0"
                              step="1" />
                            <input type="button" className="plus h-100" value="+" onClick={() => this.onUpdateQuantity(product, quantity + 1)}/>
                          </div>
                        </div>
                        <button className="add_to_cart_button" type="button" onClick={() => {this.onAddToCart(product, quantity)}}>{t('shop.add-to-cart.button')}</button>
                      </form>

                      <div className="product-inner-category">
                        <p className="mt-1 mb-0">{t('detail.category.label')}: <a href="">{this.setCategory(product.category)}</a></p>
                        <p className="mt-1 mb-0">{t('detail.brand.label')}: <a href="">{this.setBrand(product.brand)}</a></p>
                      </div>

                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab" href="#description">{t('detail.description.select')}</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-toggle="tab" href="#review">{t('detail.review.select')}</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-toggle="tab" href="#fbComment">{t('detail.comment.select')}</a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div className="tab-pane container active" id="description">
                          <br />
                          <table className="table table-inverse table-responsive">
                            <thead className="thead-inverse">
                              <tbody>
                              {product && product.specifications.map((item,index)=>{
                                return (
                                <tr key="index">
                                  <td scope="row">{item.name}</td>
                                  <td>{item.value}</td>
                                </tr>
                                )
                              })}
                              </tbody>
                            </thead>
                          </table>
                        </div>
                        <div className="tab-pane container fade" id="review">
                          <br />
                          <div className="submit-review">
                            <p><label>{t('detail.name.label')}</label> <input name="name" type="text" /></p>
                            <p><label>Email</label> <input name="email" type="email" /></p>
                            <div className="rating-chooser">
                              <p className="m-0">{t('detail.rating.label')}</p>
                              <div className="rating-wrap-post">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                              </div>
                            </div>
                            <p><label>{t('detail.review.label')}</label> <textarea name="review" id="" cols="30" rows="10"></textarea></p>
                            <p><input type="submit" value={t('detail.submit.button')} /></p>
                          </div>
                        </div>
                        <div className="tab-pane container fade" id="fbComment">
                          <div className="fb-comments" data-href={`${LOCAL}/#/product/${product.pathseo}/${product._id}`} data-width="600" data-numposts="5"></div>
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
    onClearDetail: () =>{
      dispatch(ProductsActions.onClearDetail())
    },
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

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(DetailPage);