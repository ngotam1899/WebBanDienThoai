import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { assets } from '../../constants/assetsImage';
import { withTranslation } from 'react-i18next'
// @Actions
import OrdersActions from '../../redux/actions/order'
// @Components
import Search from '../../containers/Search';
import Paypal from './Paypal';
// @Functions
import tryConvert from '../../utils/changeMoney'

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
      totalPrice: 0,
      payment_method: 0,
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

  componentWillMount() {
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
  

  componentWillReceiveProps(props) {
    var total = 0;
    var totalPrice = 0;
    var { cart } = props;
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
    const {onCreateAnOrder, authInfo} = this.props;
    const {shipToDifferentAddress, order_comments, total, totalPrice, shipping_phone, shipping_address} = this.state;
    //1. Lấy cartItem từ LocalStorage
    const cartItem = JSON.parse(localStorage.getItem("CART"))
    //2. Chuyển đổi thành mảng ứng với đầu vào req
    var items = cartItem.map((item) => {
      var dataItem = {
        product: item.product._id, 
        quantity: item.quantity
      }
      return dataItem;
    })
    //3. Truyền thông tin order vào body req
    var data = {
      order_list: items,
      total_price: totalPrice,
      total_quantity: total,
      shipping_phonenumber: authInfo.phonenumber,
      email: authInfo.email,
      shipping_address: authInfo.address,
      note: order_comments
    }
    if(shipToDifferentAddress){
      data = {
        order_list: items,
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
    const {shipToDifferentAddress, shipping_phone, shipping_address, shipping_city, shipping_first_name, shipping_last_name, order_comments, payment_method, totalPrice, total} = this.state;
    const {authInfo, currency, t} = this.props;
    return (
      <>
        <div className="product-big-title-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                  <h2>{t('checkout.page.title')}</h2>
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
                    <form enctype="multipart/form-data" action="#" className="checkout" method="post" name="checkout">
                      <div id="customer_details" className="row">
                        <div className="col-6">
                          <div className="woocommerce-billing-fields">
                            <h3>{t('checkout.billing.label')}</h3>
                            { authInfo && <>
                            <p id="billing_first_name_field" className="form-row form-row-first validate-required">
                              <label className="" for="billing_first_name">{t('checkout.firstname.input')} <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.firstname} placeholder="" id="billing_first_name" name="billing_first_name" className="input-text " />
                            </p>
                            <p id="billing_last_name_field" className="form-row form-row-last validate-required">
                              <label className="" for="billing_last_name">{t('checkout.lastname.input')} <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.lastname} placeholder="" id="billing_last_name" name="billing_last_name" className="input-text " />
                            </p>
                            <div className="clear"></div>
                            <p id="billing_address_1_field" className="form-row form-row-wide address-field validate-required">
                              <label className="" for="billing_address_1">{t('checkout.address.input')} <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.address} placeholder="Street address" id="billing_address_1" name="billing_address_1" className="input-text " />
                            </p>
                            <div className="clear"></div>
                            <p id="billing_email_field" className="form-row form-row-first validate-required validate-email">
                              <label className="" for="billing_email">Email <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.email} placeholder="" id="billing_email" name="billing_email" className="input-text " />
                            </p>
                            <p id="billing_phone_field" className="form-row form-row-last validate-required validate-phone">
                              <label className="" for="billing_phone">{t('checkout.phone.input')} <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.phonenumber} placeholder="" id="billing_phone" name="billing_phone" className="input-text " />
                            </p>
                            <div className="clear"></div> </>}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="woocommerce-shipping-fields">
                            <h3 id="ship-to-different-address">
                              <label className="checkbox" for="ship-to-different-address-checkbox">{t('checkout.shipping.label')}</label>
                              <input type="checkbox" value={shipToDifferentAddress} name="ship_to_different_address" onChange={()=>this.shipDifferentAddress(!shipToDifferentAddress)} className="input-checkbox" id="ship-to-different-address-checkbox" />
                            </h3>
                            {shipToDifferentAddress && <div className="shipping_address" style={{ display: 'block' }}>
                              <p id="shipping_first_name_field" className="form-row form-row-first validate-required">
                                <label className="" for="shipping_first_name">{t('checkout.firstname.input')} <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_first_name} placeholder="" id="shipping_first_name" name="shipping_first_name" className="input-text " onChange={this.onChange}/>
                              </p>
                              <p id="shipping_last_name_field" className="form-row form-row-last validate-required">
                                <label className="" for="shipping_last_name">{t('checkout.lastname.input')} <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_last_name} placeholder="" id="shipping_last_name" name="shipping_last_name" className="input-text " onChange={this.onChange}/>
                              </p>
                              <div className="clear"></div>
                              <p id="shipping_address_1_field" className="form-row form-row-wide address-field validate-required">
                                <label className="" for="shipping_address">{t('checkout.address.input')} <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_address} placeholder="Street address" id="shipping_address" name="shipping_address" className="input-text " onChange={this.onChange}/>
                              </p>
                              <p id="shipping_phone_field" className="form-row form-row-last validate-required validate-phone">
                                <label className="" for="shipping_phone">{t('checkout.phone.input')} <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_phone} placeholder="" id="shipping_phone" name="shipping_phone" className="input-text " onChange={this.onChange}/>
                              </p>
                              <div className="clear"></div>
                            </div>}
                            <p id="order_comments_field" className="form-row notes">
                              <label className="" for="order_comments">{t('checkout.note.input')}</label>
                              <textarea cols="5" rows="2" placeholder={t('checkout.node.placeholder')} id="order_comments" className="input-text " name="order_comments" value={order_comments} onChange={this.onChange}></textarea>
                            </p>
                          </div>
                        </div>
                      </div>
                      <h3 id="order_review_heading">{t('checkout.order.title')}</h3>
                      <div id="order_review" style={{ position: 'relative' }}>
                        <table className="shop_table">
                          <thead>
                            <tr>
                              <th className="product-name">{t('cart.product.table')}</th>
                              <th className="product-total">{t('cart.total.table')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="cart_item">
                              <td className="product-name">
                              {t('checkout.total.label')} <strong className="product-quantity">× {total}</strong> </td>
                              <td className="product-total">
                              <span className="amount">{currency=="VND" ? totalPrice : parseFloat(tryConvert(totalPrice, currency, false)).toFixed(2)} {currency}</span> </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr className="cart-subtotal">
                              <th>{t('cart.cart-sub.table')}</th>
                              <td><span className="amount">{currency=="VND" ? totalPrice : parseFloat(tryConvert(totalPrice, currency, false)).toFixed(2)} {currency}</span>
                              </td>
                            </tr>
                            <tr className="shipping">
                              <th>{t('cart.ship.table')}</th>
                              <td>{t('cart.free-ship')}<input type="hidden" className="shipping_method" value="free_shipping" id="shipping_method_0" data-index="0" name="shipping_method[0]" />
                              </td>
                            </tr>
                            <tr className="order-total">
                              <th>{t('cart.order-total.table')}</th>
                              <td><strong><span className="amount">{currency=="VND" ? totalPrice : parseFloat(tryConvert(totalPrice, currency, false)).toFixed(2)} {currency}</span></strong> </td>
                            </tr>
                          </tfoot>
                        </table>
                        <div id="payment">
                          <ul className="payment_methods methods">
                            <li className="payment_method_paypal">
                                <input type="radio" value={0} name="payment_method" className="input-radio" id="payment_method_cod" onChange={this.onChange}/>
                                <label for="payment_method_cod">{t('checkout.cod.button')} <img alt="Thanh toán tại nhà" src={ assets('cod.svg')}  />
                                </label>
                              </li>
                            <li className="payment_method_paypal">
                              <input type="radio" value={1} name="payment_method" className="input-radio" id="payment_method_paypal" onChange={this.onChange}/>
                              <label for="payment_method_paypal">PayPal <img alt="Thanh toán bằng Paypal" src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png" />
                              </label>
                            </li>
                          </ul>
                          { payment_method == 1 && <Paypal totalPrice={parseFloat(tryConvert(totalPrice, "USD", false)).toFixed(2)}/> }
                          <div className="form-row place-order">
                            <input type="button" data-value="PLACE ORDER" value={t('checkout.order.button')} id="place_order" name="woocommerce_checkout_place_order" className="button alt" onClick={() => this.placeOrder()}/>
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
    currency: state.currency,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCreateAnOrder: (data) => {
      dispatch(OrdersActions.onCreateAnOrder(data))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(CheckoutPage);