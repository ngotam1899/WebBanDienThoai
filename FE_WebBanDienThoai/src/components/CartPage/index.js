import React, { Component } from 'react';
import { ListCountry } from '../../constants/common';
import { get } from "lodash";
import { assets } from '../../constants/assetsImage';
import {connect} from 'react-redux';
import Search from '../../containers/Search';
import CartItem from '../../containers/CartItem'
import ProductsActions from '../../redux/actions/products'
import ImagesActions from "../../redux/actions/cloudinary";
import './styles.css';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalPrice: 0
    }
  }

  componentWillMount() {
    const { onGetListImage } = this.props;
    onGetListImage();
  }

  componentWillReceiveProps(props){
    var total = 0;
    var totalPrice=0;
    var {cart} = this.props;
    for(var i=0; i< cart.length; i++){
      total = total+cart[i].quantity
      totalPrice = totalPrice+ cart[i].quantity* cart[i].product.price
    }
    this.setState({ 
      total,
      totalPrice
    })
  }

  setImage = (image) => {
    const {listImages} = this.props;
    const img = listImages.find(obj => obj._id === image);
    return get(img, "public_url");
  }

  render() {
    var {cart, onDeleteProductInCart, onUpdateProductInCart, listImages, cart} = this.props;
    var {total, totalPrice} = this.state;
    return (<>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>Shopping Cart</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="d-none d-lg-block">
            <Search />
            </div>
            <div className="col-lg-8 col-12">
              <div className="product-content-right">
                <div className="woocommerce">
                  <form method="post" action="#">
                    <table cellspacing="0" className="shop_table cart">
                      <thead>
                        <tr>
                          <th className="product-remove">&nbsp;</th>
                          <th className="product-thumbnail">&nbsp;</th>
                          <th className="product-name">Product</th>
                          <th className="product-price">Price</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-subtotal">Total</th>
                        </tr>
                      </thead>
                      {listImages && <tbody>
                        {cart.map((item, index) =>{
                          return (
                            <CartItem key={index} cart={item} onDeleteProductInCart={onDeleteProductInCart}
                            onUpdateProductInCart={onUpdateProductInCart} setImage={this.setImage} setTotal={this.setTotal}/>
                          )
                        })}
                        <tr>
                          <td className="actions" colspan="6">
                            <div className="coupon">
                              <label for="coupon_code">Coupon:</label>
                              <input type="text" placeholder="Coupon code" value="" id="coupon_code" className="input-text"
                                name="coupon_code" />
                              <input type="submit" value="Apply Coupon" name="apply_coupon" className="button" />
                            </div>
                            <input type="submit" value="Update Cart" name="update_cart" className="button" />
                            <input type="submit" value="Checkout" name="proceed"
                              className="checkout-button button alt wc-forward" />
                          </td>
                        </tr>
                      </tbody>}
                    </table>
                  </form>

                  <div className="cart-collaterals">


                    <div className="cross-sells">
                      <h2>You may be interested in...</h2>
                      <ul className="products">
                        <li className="product">
                          <a href="single-product.html">
                            <img width="325" height="325" alt="T_4_front" className="attachment-shop_catalog wp-post-image"
                              src={assets("products/product-2.jpg")} />
                            <h3>Ship Your Idea</h3>
                            <span className="price"><span className="amount">£20.00</span></span>
                          </a>

                          <a className="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="22"
                            rel="nofollow" href="single-product.html">Select options</a>
                        </li>

                        <li className="product">
                          <a href="single-product.html">
                            <img width="325" height="325" alt="T_4_front" className="attachment-shop_catalog wp-post-image"
                              src={assets("products/product-4.jpg")} />
                            <h3>Ship Your Idea</h3>
                            <span className="price"><span className="amount">£20.00</span></span>
                          </a>

                          <a className="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="22"
                            rel="nofollow" href="single-product.html">Select options</a>
                        </li>
                      </ul>
                    </div>


                    <div className="cart_totals ">
                      <h2>Cart Totals</h2>

                      <table cellspacing="0">
                        <tbody>
                          <tr className="cart-subtotal">
                            <th>Cart Subtotal</th>
                            <td><span className="amount">$ {cart && totalPrice}</span></td>
                          </tr>

                          <tr className="shipping">
                            <th>Shipping and Handling</th>
                            <td>Free Shipping</td>
                          </tr>

                          <tr className="order-total">
                            <th>Order Total</th>
                            <td><strong><span className="amount">£15.00</span></strong> </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                    <form method="post" action="#" className="shipping_calculator">
                      <h2><a className="shipping-calculator-button" data-toggle="collapse" href="#calcalute-shipping-wrap"
                        aria-expanded="false" aria-controls="calcalute-shipping-wrap">Calculate Shipping</a></h2>

                      <section id="calcalute-shipping-wrap" className="shipping-calculator-form collapse">

                        <p className="form-row form-row-wide">
                          <select rel="calc_shipping_state" className="country_to_state" id="calc_shipping_country"
                            name="calc_shipping_country">
                            <option value="">Select a country…</option>
                            {ListCountry.map((country, index) => {
                              return (
                                <option value={country.value} key={index}>{country.name}</option>
                              )
                            })}

                          </select>
                        </p>

                        <p className="form-row form-row-wide"><input type="text" id="calc_shipping_state"
                          name="calc_shipping_state" placeholder="State / county" value="" className="input-text" /> </p>

                        <p className="form-row form-row-wide"><input type="text" id="calc_shipping_postcode"
                          name="calc_shipping_postcode" placeholder="Postcode / Zip" value="" className="input-text" /></p>


                        <p><button className="button" value="1" name="calc_shipping" type="submit">Update Totals</button></p>

                      </section>
                    </form>
                  </div>
                </div>
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
    cart: state.cart,
    listImages: state.cloudinary.list,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteProductInCart: (product) => {
      dispatch(ProductsActions.onDeleteProductInCart(product))
    },
    onUpdateProductInCart: (product, quantity) => {
      dispatch(ProductsActions.onUpdateProductInCart(product, quantity))
    },
    onGetListImage: () => {
      dispatch(ImagesActions.onGetList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CartPage);