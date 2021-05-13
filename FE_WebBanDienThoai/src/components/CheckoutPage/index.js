import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { assets } from '../../constants/assetsImage';
import { withTranslation } from 'react-i18next'
// @Actions
import OrdersActions from '../../redux/actions/order'
import AddressActions from "../../redux/actions/address";
// @Components
import Search from '../../containers/Search';
import Paypal from './Paypal';
// @Functions
import tryConvert from '../../utils/changeMoney'
import numberWithCommas from "../../utils/formatPrice";
import './styles.css'

class CheckoutPage extends Component {
  constructor(props) {
    //1. Lấy cartItem từ LocalStorage
    const cartItem = JSON.parse(localStorage.getItem("CART"))
    //2. Chuyển đổi thành mảng ứng với đầu vào req
    if(cartItem){
      var items = cartItem.map((item) => {
        var dataItem = {
          product: item.product._id, 
          quantity: item.quantity,
          color: item.color
        }
        return dataItem;
      })
    }
    super(props);
    this.state = {
      order_list: cartItem ? items : [],
      shipToDifferentAddress: false,
      shipping_first_name: '',
      shipping_last_name: '',
      shipping_address: '',
      shipping_city: '',
      shipping_phone: '',
      order_comments: '',
      total: 0,
      totalPrice: 0,
      payment_method: "local",
      //address
      cityID: null,
      shipping_city: "",
      shipping_district:"",
      shipping_ward: "",
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

  componentDidMount() {
    const {onGetListCity} = this.props;
    onGetListCity();
  }

  UNSAFE_componentWillMount() {
    document.title = "[TellMe] Trang bán hàng"
    var total = 0;
    var totalPrice = 0;
    var { cart } = this.props;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].quantity
      totalPrice = totalPrice + cart[i].quantity * cart[i].product.colors.find(item=> item._id === cart[i].color).price
    }
    this.setState({
      total,
      totalPrice
    })
  }
  

  UNSAFE_componentWillReceiveProps(props) {
    var total = 0;
    var totalPrice = 0;
    var { cart } = this.props;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].quantity
      totalPrice = totalPrice + cart[i].quantity * cart[i].product.colors.find(item=> item._id === cart[i].color).price
    }
    this.setState({
      total,
      totalPrice
    })
  }

  componentWillUnmount(){
    const {onClearState} = this.props;
    onClearState();
  }

  setDistrict = (event) =>{
    const {value, options, selectedIndex} = event.target;
    const {onGetListDistrict} = this.props;
    this.setState({
      cityID: value,
      shipping_city: options[selectedIndex].text,
      shipping_district: "",
    })
    onGetListDistrict({province_id: event.target.value });
  }

  setWard = (event) => {
    const {options, selectedIndex} = event.target;
    const {onGetListWard} = this.props;
    const {cityID} = this.state;
    this.setState({
      shipping_district: options[selectedIndex].text,
    })
    onGetListWard(cityID, event.target.value);
  }

  setAddress = (event) =>{
    const {options, selectedIndex} = event.target;
    this.setState({
      shipping_ward: options[selectedIndex].text
    })
  }
  
  placeOrder(){
    const {onCreateAnOrder, authInfo} = this.props;
    const {shipToDifferentAddress, order_comments, total, totalPrice, shipping_phone, 
      shipping_address, shipping_city, shipping_district, shipping_ward, payment_method, order_list} = this.state;
    var data = {};
    //3. Truyền thông tin order vào body req
    
    if(shipToDifferentAddress === true){
      data = {
        order_list,
        total_price: totalPrice,
        total_quantity: total,
        shipping_phonenumber: shipping_phone,
        email: authInfo.email,
        shipping_address: `${shipping_address}, ${shipping_ward}, ${shipping_district}, ${shipping_city}`,
        note: order_comments,
        status: -1,
        payment_method,
        is_paid: false
      }
    }
    else {
      data = {
        order_list,
        total_price: totalPrice,
        total_quantity: total,
        shipping_phonenumber: authInfo.phonenumber,
        email: authInfo.email,
        shipping_address: authInfo.address,
        payment_method,
        note: order_comments,
        status: -1,
        is_paid: false
      }
    }
    onCreateAnOrder(data);
  }

  shipDifferentAddress (shipToDifferentAddress) {
    this.setState({ shipToDifferentAddress});
  }

  render() {
    const {shipToDifferentAddress, shipping_phone, shipping_address, shipping_first_name, shipping_last_name, order_comments, payment_method, totalPrice, total, order_list} = this.state;
    const {authInfo, currency, t, onCreateAnOrder, listCity, listDistrict, listWard} = this.props;
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
                    <form className="checkout" name="checkout">
                      <div id="customer_details" className="row">
                        <div className="col-6">
                          <div className="woocommerce-billing-fields">
                            <h3>{t('checkout.billing.label')}</h3>
                            { authInfo && <>
                            <p id="billing_first_name_field" className="form-row form-row-first validate-required">
                              <label className="" htmlFor="billing_first_name">{t('checkout.firstname.input')} <abbr title="required" className="required" >*</abbr>
                              </label>
                              <input type="text" value={authInfo.firstname} placeholder="" id="billing_first_name" name="billing_first_name" className="input-text" readOnly disabled/>
                            </p>
                            <p id="billing_last_name_field" className="form-row form-row-last validate-required">
                              <label className="" htmlFor="billing_last_name">{t('checkout.lastname.input')} <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.lastname} placeholder="" id="billing_last_name" name="billing_last_name" className="input-text " readOnly disabled/>
                            </p>
                            <div className="clear"></div>
                            <p id="billing_address_1_field" className="form-row form-row-wide address-field validate-required">
                              <label className="" htmlFor="billing_address_1">{t('checkout.address.input')} <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.address} placeholder="Street address" id="billing_address_1" name="billing_address_1" className="input-text " readOnly disabled/>
                            </p>
                            <div className="clear"></div>
                            <p id="billing_email_field" className="form-row form-row-first validate-required validate-email">
                              <label className="" htmlFor="billing_email">Email <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.email} placeholder="" id="billing_email" name="billing_email" className="input-text " readOnly disabled/>
                            </p>
                            <p id="billing_phone_field" className="form-row form-row-last validate-required validate-phone">
                              <label className="" htmlFor="billing_phone">{t('checkout.phone.input')} <abbr title="required" className="required">*</abbr>
                              </label>
                              <input type="text" value={authInfo.phonenumber} placeholder="" id="billing_phone" name="billing_phone" className="input-text " readOnly disabled/>
                            </p>
                            <div className="clear"></div> </>}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="woocommerce-shipping-fields">
                            <h3 id="ship-to-different-address">
                              <label className="checkbox" htmlFor="ship-to-different-address-checkbox">{t('checkout.shipping.label')}</label>
                              <input type="checkbox" value={shipToDifferentAddress} name="ship_to_different_address" onChange={()=>this.shipDifferentAddress(!shipToDifferentAddress)} className="input-checkbox" id="ship-to-different-address-checkbox" />
                            </h3>
                            {shipToDifferentAddress && <div className="shipping_address" style={{ display: 'block' }}>
                              <p id="shipping_first_name_field" className="form-row form-row-first validate-required">
                                <label className="" htmlFor="shipping_first_name">{t('checkout.firstname.input')} <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_first_name} placeholder="" id="shipping_first_name" name="shipping_first_name" className="input-text " onChange={this.onChange} />
                              </p>
                              <p id="shipping_last_name_field" className="form-row form-row-last validate-required">
                                <label className="" htmlFor="shipping_last_name">{t('checkout.lastname.input')} <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_last_name} placeholder="" id="shipping_last_name" name="shipping_last_name" className="input-text " onChange={this.onChange} />
                              </p>
                              <div className="clear"></div>
                              <p id="shipping_address_1_field" className="form-row form-row-wide address-field validate-required">
                                <label className="" htmlFor="shipping_address">{t('checkout.address.input')} <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_address} placeholder="Street address" id="shipping_address" name="shipping_address" className="input-text " onChange={this.onChange} />
                         
                                <select  className="form-control" type="text" placeholder="Chọn tỉnh/ thành"
                                  onChange={this.setDistrict} required>
                                    {listCity && listCity.map((item, index)=>{
                                        return(
                                          <option key={index} value={item.ProvinceID} name="shipping_city">{item.ProvinceName}</option>
                                        )
                                      })
                                    }
                                  </select>
                                  <select  className="form-control" type="text" placeholder="Chọn quận/ huyện" 
                                  onChange={this.setWard} required>
                                    {listDistrict && listDistrict.map((item, index)=>{
                                          return(
                                            <option key={index} value={item.DistrictID} name="shipping_district">{item.DistrictName}</option>
                                          )
                                        })
                                      }
                                  </select>
                                  <select  className="form-control" type="text" placeholder="Chọn phường xã" 
                                  onChange={this.setAddress} required>
                                    {listWard && listWard.map((item, index)=>{
                                          return(
                                            <option key={index} value={item.WardCode} name="shipping_ward">{item.WardName}</option>
                                          )
                                        })
                                      }
                                  </select>
                              </p>
                              <p id="shipping_phone_field" className="form-row form-row-last validate-required validate-phone">
                                <label className="" htmlFor="shipping_phone">{t('checkout.phone.input')} <abbr title="required" className="required">*</abbr>
                                </label>
                                <input type="text" value={shipping_phone} placeholder="" id="shipping_phone" name="shipping_phone" className="input-text " onChange={this.onChange} />
                              </p>
                              <div className="clear"></div>
                            </div>}
                            <p id="order_comments_field" className="form-row notes">
                              <label className="" htmlFor="order_comments">{t('checkout.note.input')}</label>
                              <textarea cols="5" rows="2" placeholder={t('checkout.node.placeholder')} id="order_comments" className="input-text " name="order_comments" value={order_comments} onChange={this.onChange}></textarea>
                            </p>
                          </div>
                        </div>
                      </div>
                      <h3 id="order_review_heading" className="float-left">Shipping types</h3>
                      <ul className="shipping_types list-unstyled">
                        <li className="mx-3 float-left font-weight-bold">
                            <input type="radio" value={1} name="shipping_type" className="input-radio mr-2" id="shipping_type_express" onChange={this.onChange} />
                            <label htmlFor="shipping_type_express ">Express</label>
                          </li>
                        <li className="mx-3 font-weight-bold">
                          <input type="radio" value={2} name="shipping_type" className="input-radio mr-2" id="shipping_type_standard" onChange={this.onChange}/>
                          <label htmlFor="shipping_type_standard">Standard</label>
                        </li>
                      </ul>
                      <h3 id="order_review_heading">{t('checkout.order.title')}</h3>
                      {authInfo && <div id="order_review" style={{ position: 'relative' }}>
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
                              <span className="amount">{currency=="VND" ? numberWithCommas(totalPrice) : numberWithCommas(parseFloat(tryConvert(totalPrice, currency, false)).toFixed(2))} {currency}</span> </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr className="shipping">
                              <th>{t('cart.ship.table')}</th>
                              <td>{t('cart.free-ship')}<input type="hidden" className="shipping_method" value="free_shipping" id="shipping_method_0" data-index="0" name="shipping_method[0]" />
                              </td>
                            </tr>
                            <tr className="order-total">
                              <th>{t('cart.order-total.table')}</th>
                              <td><strong><span className="amount">{currency=="VND" ? numberWithCommas(totalPrice) : numberWithCommas(parseFloat(tryConvert(totalPrice, currency, false)).toFixed(2))} {currency}</span></strong> </td>
                            </tr>
                          </tfoot>
                        </table>
                        {(authInfo.address || shipping_address) && (authInfo.phonenumber || shipping_phone) && <div id="payment">
                          <h3 id="order_review_heading">Shipping methods</h3>
                          <ul className="payment_methods methods">
                            <li className="font-weight-bold float-left">
                                <input type="radio" value="local" defaultChecked name="payment_method" className="input-radio mr-2" id="payment_method_cod" onChange={this.onChange} />
                                <label htmlFor="payment_method_cod">{t('checkout.cod.button')} <img alt="Thanh toán tại nhà" src={ assets('cod.svg')}  />
                                </label>
                              </li>
                            <li className="font-weight-bold">
                              <input type="radio" value="paypal" name="payment_method" className="input-radio mr-2" id="payment_method_paypal" onChange={this.onChange}/>
                              <label htmlFor="payment_method_paypal">PayPal <img alt="Thanh toán bằng Paypal" src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png" />
                              </label>
                            </li>
                          </ul>
                          { payment_method == "paypal" && <Paypal total_price={parseFloat(tryConvert(totalPrice, "USD", false)).toFixed(2)} onCreateAnOrder={onCreateAnOrder} 
                          shipToDifferentAddress={shipToDifferentAddress}
                          shipping_address={shipping_address} shipping_phone={shipping_phone} authInfo={authInfo} total={total} order_list={order_list} note={order_comments} /> }
                          { payment_method == "local" && <div className="form-row place-order">
                            <input type="button" data-value="PLACE ORDER" value={t('checkout.order.button')} id="place_order" name="woocommerce_checkout_place_order" className="button alt" onClick={() => this.placeOrder()}/>
                          </div>}
                          <div className="clear"></div>
                        </div>}
                      </div>}
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
    listCity: state.address.city,
    listDistrict: state.address.district,
    listWard: state.address.ward,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCreateAnOrder: (data) => {
      dispatch(OrdersActions.onCreate(data))
    },
    onGetListCity: () => {
      dispatch(AddressActions.onGetCity())
    },
    onGetListDistrict: (cityID) => {
      dispatch(AddressActions.onGetDistrict(cityID))
    },
    onGetListWard: (cityID, districtID) => {
      dispatch(AddressActions.onGetWard(cityID, districtID))
    },
    onClearState: () =>{
      dispatch(AddressActions.onClearState())
    }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(CheckoutPage);