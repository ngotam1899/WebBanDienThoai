import React, { Component } from 'react';
import { ListCountry } from '../../constants/common';
import Search from '../../containers/Search';
import {connect} from 'react-redux';
import OrdersActions from '../../redux/actions/order'

import './styles.css'

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipToDifferentAddress: false,
      shipping_first_name: '',
      shipping_last_name: '',
      shipping_address: '',
      shipping_city: '',
      shipping_phone: '',
      order_comments: '',
      total: 0,
      totalPrice: 0
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

  componentWillReceiveProps(props) {
    var total = 0;
    var totalPrice = 0;
    var { cart } = this.props;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].quantity
      totalPrice = totalPrice + cart[i].quantity * cart[i].product.price
    }
    this.setState({
      total,
      totalPrice
    })
  }
  
  placeOrder(){
    const {onCreateAnOrder, authInfo, shipping_phone, shipping_address} = this.props;
    const {shipToDifferentAddress, order_comments, total, totalPrice} = this.state;
    const cartItem = JSON.parse(localStorage.getItem("CART"))

    var data = {
      order_list: cartItem,
      total_price: totalPrice,
      total_quantity: total,
      shipping_phonenumber: authInfo.phonenumber,
      email: authInfo.email,
      shipping_address: authInfo.address,
      note: order_comments
    }
    if(shipToDifferentAddress){
      data = {
        order_list: cartItem,
        total_price: totalPrice,
        total_quantity: total,
        shipping_phonenumber: shipping_phone,
        email: authInfo.email,
        shipping_address: shipping_address,
        note: order_comments
      }
    }
    onCreateAnOrder(data);
  }

  shipDifferentAddress (shipToDifferentAddress) {
    this.setState({ shipToDifferentAddress});
  }

  render() {
    const {shipToDifferentAddress, shipping_phone, shipping_address, shipping_city, shipping_first_name, shipping_last_name, order_comments} = this.state;
    const {authInfo} = this.props;
    return (
      <>
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
              <Search />

              <div className="col-md-8">
                <div className="product-content-right">
                  <div className="woocommerce">
                    <div className="woocommerce-info">Returning customer? <a className="showlogin" data-toggle="collapse" href="#login-form-wrap" aria-expanded="false" aria-controls="login-form-wrap">Click here to login</a>
                    </div>

                    <form id="login-form-wrap" className="login collapse" method="post">


                      <p>If you have shopped with us before, please enter your details in the boxes below. If you are a new customer please proceed to the Billing &amp; Shipping section.</p>

                      <p className="form-row form-row-first">
                        <label for="username">Username or email <span className="required">*</span>
                        </label>
                        <input type="text" id="username" name="username" className="input-text" />
                      </p>
                      <p className="form-row form-row-last">
                        <label for="password">Password <span className="required">*</span>
                        </label>
                        <input type="password" id="password" name="password" className="input-text" />
                      </p>
                      <div className="clear"></div>


                      <p className="form-row">
                        <input type="submit" value="Login" name="login" className="button" />
                        <label className="inline" for="rememberme"><input type="checkbox" value="forever" id="rememberme" name="rememberme" /> Remember me </label>
                      </p>
                      <p className="lost_password">
                        <a href="#">Lost your password?</a>
                      </p>

                      <div className="clear"></div>
                    </form>

                    <div className="woocommerce-info">Have a coupon? <a className="showcoupon" data-toggle="collapse" href="#coupon-collapse-wrap" aria-expanded="false" aria-controls="coupon-collapse-wrap">Click here to enter your code</a>
                    </div>

                    <form id="coupon-collapse-wrap" method="post" className="checkout_coupon collapse">

                      <p className="form-row form-row-first">
                        <input type="text" value="" id="coupon_code" placeholder="Coupon code" className="input-text" name="coupon_code" />
                      </p>

                      <p className="form-row form-row-last">
                        <input type="submit" value="Apply Coupon" name="apply_coupon" className="button" />
                      </p>

                      <div className="clear"></div>
                    </form>

                    <form enctype="multipart/form-data" action="#" className="checkout" method="post" name="checkout">

                      <div id="customer_details" className="row">
                        <div className="col-6">
                          <div className="woocommerce-billing-fields">
                            <h3>Billing Details</h3>
                            {/* <p id="billing_country_field" className="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated">
                              <label className="" for="billing_country">Country <abbr title="required" className="required">*</abbr>
                              </label>
                              <select className="country_to_state country_select" id="billing_country" name="billing_country">
                                <option value="">Select a country…</option>
                                {ListCountry.map((country, index) => {
                                  return (
                                    <option value={country.value} key={index}>{country.name}</option>
                                  )
                                })}
                              </select>
                            </p> */}

                            { authInfo && <>
                            <p id="billing_first_name_field" className="form-row form-row-first validate-required">
                              <label className="" for="billing_first_name">First Name <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.firstname} placeholder="" id="billing_first_name" name="billing_first_name" className="input-text " />
                            </p>

                            <p id="billing_last_name_field" className="form-row form-row-last validate-required">
                              <label className="" for="billing_last_name">Last Name <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.lastname} placeholder="" id="billing_last_name" name="billing_last_name" className="input-text " />
                            </p>
                            <div className="clear"></div>

                            <p id="billing_address_1_field" className="form-row form-row-wide address-field validate-required">
                              <label className="" for="billing_address_1">Address <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.address} placeholder="Street address" id="billing_address_1" name="billing_address_1" className="input-text " />
                            </p>

                            <p id="billing_city_field" className="form-row form-row-wide address-field validate-required" data-o_className="form-row form-row-wide address-field validate-required">
                              <label className="" for="billing_city">Town / City <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value="" placeholder="Town / City" id="billing_city" name="billing_city" className="input-text " />
                            </p>

                            <div className="clear"></div>

                            <p id="billing_email_field" className="form-row form-row-first validate-required validate-email">
                              <label className="" for="billing_email">Email Address <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.email} placeholder="" id="billing_email" name="billing_email" className="input-text " />
                            </p>

                            <p id="billing_phone_field" className="form-row form-row-last validate-required validate-phone">
                              <label className="" for="billing_phone">Phone <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.phonenumber} placeholder="" id="billing_phone" name="billing_phone" className="input-text " />
                            </p>
                            <div className="clear"></div> </>}


                            {/* <div className="create-account">
                              <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                              <p id="account_password_field" className="form-row validate-required">
                                <label className="" for="account_password">Account password <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="password" value="" placeholder="Password" id="account_password" name="account_password" className="input-text" />
                              </p>
                              <div className="clear"></div>
                            </div> */}

                          </div>
                        </div>

                        <div className="col-6">
                          <div className="woocommerce-shipping-fields">
                            <h3 id="ship-to-different-address">
                              <label className="checkbox" for="ship-to-different-address-checkbox">Ship to a different address?</label>
                              <input type="checkbox" value={shipToDifferentAddress} name="ship_to_different_address" onChange={()=>this.shipDifferentAddress(!shipToDifferentAddress)} className="input-checkbox" id="ship-to-different-address-checkbox" />
                            </h3>
                            {shipToDifferentAddress && <div className="shipping_address" style={{ display: 'block' }}>
                              {/* <p id="shipping_country_field" className="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated">
                                <label className="" for="shipping_country">Country <abbr title="required" className="required">*</abbr>
                                </label>
                                <select className="country_to_state country_select" id="shipping_country" name="shipping_country">
                                  <option value="">Select a country…</option>
                                  {ListCountry.map((country, index) => {
                                    return (
                                      <option value={country.value} key={index}>{country.name}</option>
                                    )
                                  })}
                                </select>
                              </p> */}

                              <p id="shipping_first_name_field" className="form-row form-row-first validate-required">
                                <label className="" for="shipping_first_name">First Name <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_first_name} placeholder="" id="shipping_first_name" name="shipping_first_name" className="input-text " onChange={this.onChange}/>
                              </p>

                              <p id="shipping_last_name_field" className="form-row form-row-last validate-required">
                                <label className="" for="shipping_last_name">Last Name <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_last_name} placeholder="" id="shipping_last_name" name="shipping_last_name" className="input-text " onChange={this.onChange}/>
                              </p>
                              <div className="clear"></div>

                              <p id="shipping_address_1_field" className="form-row form-row-wide address-field validate-required">
                                <label className="" for="shipping_address">Address <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_address} placeholder="Street address" id="shipping_address" name="shipping_address" className="input-text " onChange={this.onChange}/>
                              </p>

                              <p id="shipping_city_field" className="form-row form-row-wide address-field validate-required" data-o_className="form-row form-row-wide address-field validate-required">
                                <label className="" for="shipping_city">Town / City <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_city} placeholder="Town / City" id="shipping_city" name="shipping_city" className="input-text " onChange={this.onChange}/>
                              </p>
                              <p id="shipping_phone_field" className="form-row form-row-last validate-required validate-phone">
                              <label className="" for="shipping_phone">Phone <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={shipping_phone} placeholder="" id="shipping_phone" name="shipping_phone" className="input-text " onChange={this.onChange}/>
                            </p>

                              <div className="clear"></div>
                            </div>}
                            <p id="order_comments_field" className="form-row notes">
                              <label className="" for="order_comments">Order Notes</label>
                              <textarea cols="5" rows="2" placeholder="Notes about your order, e.g. special notes for delivery." id="order_comments" className="input-text " name="order_comments" value={order_comments} onChange={this.onChange}></textarea>
                            </p>
                          </div>
                        </div>
                      </div>
                      <h3 id="order_review_heading">Your order</h3>

                      <div id="order_review" style={{ position: 'relative' }}>
                        <table className="shop_table">
                          <thead>
                            <tr>
                              <th className="product-name">Product</th>
                              <th className="product-total">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="cart_item">
                              <td className="product-name">
                                Ship Your Idea <strong className="product-quantity">× 1</strong> </td>
                              <td className="product-total">
                                <span className="amount">£15.00</span> </td>
                            </tr>
                          </tbody>
                          <tfoot>

                            <tr className="cart-subtotal">
                              <th>Cart Subtotal</th>
                              <td><span className="amount">£15.00</span>
                              </td>
                            </tr>

                            <tr className="shipping">
                              <th>Shipping and Handling</th>
                              <td>

                                Free Shipping
                                                    <input type="hidden" className="shipping_method" value="free_shipping" id="shipping_method_0" data-index="0" name="shipping_method[0]" />
                              </td>
                            </tr>


                            <tr className="order-total">
                              <th>Order Total</th>
                              <td><strong><span className="amount">£15.00</span></strong> </td>
                            </tr>

                          </tfoot>
                        </table>


                        <div id="payment">
                          <ul className="payment_methods methods">
                            <li className="payment_method_paypal">
                              <input type="radio" data-order_button_text="Proceed to PayPal" value="paypal" name="payment_method" className="input-radio" id="payment_method_paypal" />
                              <label for="payment_method_paypal">PayPal <img alt="PayPal Acceptance Mark" src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png" />
                              </label>
                            </li>
                          </ul>

                          <div className="form-row place-order">
                            <input type="button" data-value="PLACE ORDER" value="Place order" id="place_order" name="woocommerce_checkout_place_order" className="button alt" onClick={() => this.placeOrder()}/>
                          </div>
                          <div className="clear"></div>
                        </div>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCreateAnOrder: (data) => {
      dispatch(OrdersActions.onCreateAnOrder(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CheckoutPage);