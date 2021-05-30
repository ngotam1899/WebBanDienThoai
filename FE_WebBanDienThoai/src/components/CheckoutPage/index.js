import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Actions
import OrdersActions from '../../redux/actions/order'
import AddressActions from "../../redux/actions/address";
import Paypal from './Paypal';
// @Functions
import tryConvert from '../../utils/changeMoney'
import numberWithCommas from "../../utils/formatPrice";
import { SHIPPING_EXPRESS, SHIPPING_STANDARD } from '../../constants'
import './styles.css'
// @Components
import ChangeExpress from './ChangeExpress';

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
      totalWeight: 0,
      totalHeight: 0,
      totalWidth: 0,
      totalLength: 0,
      payment_method: "local",
      // address
      cityID: null,
      districtID: null,
      shipping_district:"",
      shipping_ward: "",
      // shipping
      service_type_id: "1",
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

  componentWillReceiveProps(props){
    const{service_type_id, totalHeight, totalLength, totalWeight, totalWidth} = this.state;
    const {authInfo, onGetListDistrict, listCity, listDistrict, onGetListCity} = this.props;
    if(authInfo !== props.authInfo && authInfo===null){
      onGetListCity();
    }
    if(authInfo && authInfo.address){
      if(listCity !== props.listCity && props.listCity){
        onGetListDistrict({province_id:props.listCity.find(obj => obj.ProvinceName === authInfo.address.split(', ')[3]).ProvinceID})
      }
      if(listDistrict !== props.listDistrict && listDistrict===null){
        var districtID = props.listDistrict.find(obj => obj.DistrictName === authInfo.address.split(', ')[2]).DistrictID
        this.setState({
          districtID
        })
        this.calculateShipping(service_type_id, districtID, totalHeight, totalLength, totalWeight, totalWidth)
      }
    }
  }

  componentDidMount() {
    document.title = "[TellMe] Trang bán hàng"
    const {onGetListCity} = this.props;
    var total = 0;
    var totalPrice = 0;
    var totalWeight = 0;
    var totalHeight = 0;
    var totalWidth = 0;
    var totalLength = 0;
    var { cart } = this.props;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].quantity;
      totalPrice = totalPrice + cart[i].quantity * cart[i].product.colors.find(item=> item._id === cart[i].color).price;
      totalWeight = totalWeight + cart[i].quantity * cart[i].product.weight;
      totalHeight = totalHeight + cart[i].quantity * cart[i].product.height;
      totalWidth = totalWidth < cart[i].product.width ? cart[i].product.width : totalWidth;
      totalLength = totalLength < cart[i].product.width ? cart[i].product.width : totalLength
    }
    this.setState({
      total,
      totalPrice,
      totalWeight,
      totalHeight,
      totalWidth,
      totalLength
    })
    onGetListCity()
  }
  
  calculateShipping (service_type_id, to, height, length, weight, width){
    const {onCalculateShipping} = this.props;
    var data = {
      service_type_id : parseInt(service_type_id),
      insurance_value : 0,
      coupon: null,
      from_district_id : 1450,
      to_district_id : Math.round(to),
      height: Math.round(height),
      length: Math.round(length),
      weight: Math.round(weight),
      width: Math.round(width)
    }
    onCalculateShipping(data)
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
    const {options, selectedIndex, value} = event.target;
    const {onGetListWard} = this.props;
    const {cityID, service_type_id, totalHeight, totalLength, totalWeight, totalWidth} = this.state;
    this.setState({
      shipping_district: options[selectedIndex].text,
    })
    onGetListWard(cityID, event.target.value);
    this.calculateShipping(service_type_id, value, totalHeight, totalLength, totalWeight, totalWidth)
  }

  setAddress = (event) =>{
    const {options, selectedIndex} = event.target;
    this.setState({
      shipping_ward: options[selectedIndex].text
    })
  }

  setService = (service_type_id) => {
    this.setState({
      service_type_id
    })
    const {totalHeight, districtID, totalLength, totalWeight, totalWidth} = this.state
    this.calculateShipping(service_type_id, districtID, totalHeight, totalLength, totalWeight, totalWidth)
  }
  
  placeOrder(){
    const {onCreateAnOrder, authInfo, ship} = this.props;
    const {shipToDifferentAddress, order_comments, total, totalPrice, shipping_phone, 
      shipping_address, shipping_city, shipping_district, shipping_ward, payment_method, order_list} = this.state;
    var data = {};
    //3. Truyền thông tin order vào body req
    
    if(shipToDifferentAddress === true){
      data = {
        order_list,
        total_price: totalPrice+ship.total,
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
        total_price: totalPrice+ship.total,
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
    const {service_type_id, districtID, totalHeight, totalLength, totalWeight, totalWidth} = this.state;
    this.setState({ 
      shipToDifferentAddress
    });
    if(shipToDifferentAddress === false){
      this.calculateShipping(service_type_id, districtID, totalHeight, totalLength, totalWeight, totalWidth)
    }
  }

  render() {
    const {
      shipToDifferentAddress, 
      shipping_phone, 
      shipping_address, 
      shipping_first_name, 
      shipping_last_name, 
      order_comments, 
      payment_method, 
      totalPrice, 
      total, 
      order_list,
      service_type_id
    } = this.state;
    const {
      authInfo, 
      currency, t, 
      onCreateAnOrder, 
      listCity, 
      listDistrict, 
      listWard, 
      cart,
      ship
    } = this.props;
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


        <div className="my-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <form>
                  <div className="row">
                    <div className="col-12">
                      <div className="rounded shadow-sm my-2">
                        <div className="px-3 py-2">
                          <h3 className="mb-1">Sản phẩm</h3>
                          <div className="mb-2 border-bottom"></div>
                          {cart && cart.map((item, index) => {
                            return (
                              <div className="row" key={index}>
                                <div className="col-6">
                                  <div className="row">
                                    <div className="col-6 col-sm-4 col-md-3 col-lg-2 text-center">
                                      <img className="float-start" alt={item.product.name} src={item.product.bigimage ? item.product.bigimage.public_url : "http://www.pha.gov.pk/img/img-02.jpg"}></img>
                                    </div>
                                    <div className="col-6 col-sm-8 col-md-9 col-lg-10 align-self-center">
                                    <p className="font-weight-bold mb-0">{item.product.name}</p>
                                    <p className="mb-0 text-secondary">Màu {item.product.colors.find(i => i._id === item.color).name_en}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-2 align-self-center text-center">
                                {currency==="VND" 
                                ? numberWithCommas(item.product.colors.find(i => i._id === item.color).price) 
                                : numberWithCommas(parseFloat(tryConvert(item.product.colors.find(i => i._id === item.color).price, currency, false)).toFixed(2))} {currency}
                                 </div>
                                <div className="col-2 align-self-center text-center">x {item.quantity}</div>
                                <div className="col-2 align-self-center text-right font-weight-bold">
                                {currency==="VND" 
                                ? numberWithCommas(item.quantity * item.product.colors.find(i => i._id === item.color).price) 
                                : numberWithCommas(parseFloat(tryConvert(item.quantity * item.product.colors.find(i => i._id === item.color).price)).toFixed(2))} {currency}
                                </div>
                              </div>
                            )
                          })}
                          <div className="my-2 border-bottom"></div>
                          <div className="row mb-3">
                            <div className="col-12 col-md-6">
                              <div className="form-floating">
                                <textarea type="text" className="form-control h-100" name="order_comments" value={order_comments} onChange={this.onChange}/>
                                <label>{t('checkout.note.input')}</label>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <h4>Đơn vị vận chuyển</h4>
                              <div className="row">
                                <div className="col-5">
                                  <div className="express float-start">
                                    <img className="w-100 rounded border py-2" src="https://static.ybox.vn/2020/6/1/1592759417126-ghn.png" alt=""></img>
                                  </div>
                                  <div className="float-start ml-2">
                                    <p className="mb-0">Giao hàng nhanh</p>
                                    <p className="mb-0 text-secondary smaller">{service_type_id === "2" ? SHIPPING_EXPRESS : SHIPPING_STANDARD}</p>
                                  </div>
                                </div>
                                <div className="col-3 text-center">
                                  <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#expressModal">Thay đổi</button>
                                </div>
                                {ship && <div className="col-4 text-right font-weight-bold">
                                {currency==="VND" 
                                ? numberWithCommas(ship.total) 
                                : numberWithCommas(parseFloat(tryConvert(ship.total)).toFixed(2))} {currency}
                                </div>}
                              </div>
                            </div>
                            <ChangeExpress service_type_id={service_type_id} setService={this.setService}/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="rounded shadow-sm mt-2 mb-3">
                        <div className="px-3 py-2">
                          <h3>{t('checkout.billing.label')}</h3>
                          { authInfo && <>
                            <div className="row">
                              <div className="col">
                                <div className="form-floating validate-required mb-3">
                                  <input type="text" className="form-control"  value={authInfo.firstname} readOnly disabled/>
                                  <label >{t('checkout.firstname.input')}*</label>
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-floating validate-required mb-3">
                                  <input type="text" className="form-control"  value={authInfo.lastname} readOnly disabled/>
                                  <label >{t('checkout.lastname.input')}*</label>
                                </div>
                              </div>
                            </div>
                            <div className="form-floating mb-3 validate-required">
                              <input type="text" className="form-control"  value={authInfo.address} readOnly disabled/>
                              <label >{t('checkout.address.input')}*</label>
                            </div>
                            <div className="form-floating mb-3 validate-required">
                              <input type="email" className="form-control"  value={authInfo.email} readOnly disabled/>
                              <label >Email*</label>
                            </div>
                            <div className="form-floating mb-3 validate-required">
                              <input type="text" className="form-control"  value={authInfo.phonenumber} readOnly disabled/>
                              <label >{t('checkout.phone.input')}*</label>
                            </div>
                          </>}
                        </div>
                      </div>
                      <div className="rounded shadow-sm my-2">
                      <div className="px-3 py-2">
                        <div className="form-inline">
                          <h3 className="w-100">{t('checkout.shipping.label')}</h3>
                          <div className="form-check form-switch float-end">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value={shipToDifferentAddress} onChange={()=>this.shipDifferentAddress(!shipToDifferentAddress)}></input>
                          </div>
                        </div>
                        {shipToDifferentAddress && <div className="" style={{ display: 'block' }}>
                          <div className="row">
                            <div className="col">
                              <div className="form-floating mb-3">
                                <input type="text" className="form-control"  name="shipping_first_name" placeholder="Nhập họ" value={shipping_first_name} onChange={this.onChange}/>
                                <label >{t('checkout.firstname.input')}</label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-floating mb-3">
                                <input type="text" className="form-control"  name="shipping_last_name" placeholder="Nhập tên" value={shipping_last_name} onChange={this.onChange}/>
                                <label >{t('checkout.lastname.input')}</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-6 col-12">
                              <div className="form-floating mb-3">
                              <input type="text" className="form-control"  name="shipping_address" placeholder="Nhập địa chỉ" value={shipping_address} onChange={this.onChange}/>
                              <label >{t('checkout.address.input')}</label>
                            </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                              <div className="form-floating mb-3">
                                <select className="form-select"  id="floatingSelect" onChange={this.setDistrict} required>
                                  <option selected>Chọn tỉnh/ thành</option>
                                  {listCity && listCity.map((item, index)=>{
                                      return(
                                        <option key={index} value={item.ProvinceID} name="shipping_city">{item.ProvinceName}</option>
                                      )
                                    })
                                  }
                                </select>
                                <label htmlFor="floatingSelect">Tỉnh thành</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                              <div className="form-floating mb-3">
                                <select className="form-select"  id="floatingSelect" onChange={this.setWard} required>
                                  <option selected>Chọn quận huyện</option>
                                  {listDistrict && listDistrict.map((item, index)=>{
                                      return(
                                        <option key={index} value={item.DistrictID} name="shipping_district">{item.DistrictName}</option>
                                      )
                                    })
                                  }
                                </select>
                                <label htmlFor="floatingSelect">Quận huyện</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                              <div className="form-floating mb-3">
                                <select className="form-select"  id="floatingSelect" onChange={this.setAddress} required>
                                  <option selected>Chọn phường xã</option>
                                  {listWard && listWard.map((item, index)=>{
                                    return(
                                      <option key={index} value={item.WardCode} name="shipping_ward">{item.WardName}</option>
                                    )
                                    })
                                  }
                                </select>
                                <label htmlFor="floatingSelect">Phường xã</label>
                              </div>
                            </div>
                          </div>
                          <div className="form-floating mb-3">
                            <input type="tel" className="form-control"  name="shipping_phone" placeholder="Nhập số điện thoại" value={shipping_phone} onChange={this.onChange}/>
                            <label >{t('checkout.phone.input')}</label>
                          </div>
                        </div>}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    {ship && <div className="rounded shadow-sm mt-2 mb-3">
                      <div className="px-3 py-2">
                        <h3>{t('checkout.order.title')}</h3>
                        <div id="order_review" style={{ position: 'relative' }}>
                          <table className="shop_table mb-2">
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
                                <span className="amount">{currency==="VND" ? numberWithCommas(totalPrice) : numberWithCommas(parseFloat(tryConvert(totalPrice, currency, false)).toFixed(2))} {currency}</span> </td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr className="shipping">
                                <th>{t('cart.ship.table')}</th>
                                <td>{currency==="VND" ? numberWithCommas(ship.total) : numberWithCommas(parseFloat(tryConvert(ship.total, currency, false)).toFixed(2))} {currency}</td>
                              </tr>
                              <tr className="order-total">
                                <th>{t('cart.order-total.table')}</th>
                                <td><strong><span className="amount">{currency==="VND" ? numberWithCommas(totalPrice + ship.total) : numberWithCommas(parseFloat(tryConvert(totalPrice + ship.total, currency, false)).toFixed(2))} {currency}</span></strong> </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>}
                    <div className="rounded shadow-sm my-2">
                      <div className="px-3 py-2">
                      {authInfo && ship && (authInfo.address || shipping_address) && (authInfo.phonenumber || shipping_phone) && <div id="payment">
                        <h3>Shipping methods</h3>
                        <div className="row">
                          <div className="col">
                            <ul className="payment_methods methods">
                              <li className="form-check">
                                  <input type="radio" value="local" id="local" defaultChecked name="payment_method" className="form-check-input" onChange={this.onChange} />
                                  <label htmlFor="local" className="form-check-label">{t('checkout.cod.button')}</label>
                                </li>
                              <li className="form-check">
                                <input type="radio" value="paypal" id="paypal" name="payment_method" className="form-check-input" onChange={this.onChange}/>
                                <label htmlFor="paypal" className="form-check-label"><img alt="" className="w-50 rounded border p-2" src="https://www.thoushallfind.com/design/public/Img/accepted-payment-methods.png"></img></label>
                              </li>
                            </ul>
                          </div>
                          <div className="col align-self-end">
                            { payment_method === "paypal" && <Paypal total_price={parseFloat(tryConvert(totalPrice + ship.total, "USD", false)).toFixed(2)} onCreateAnOrder={onCreateAnOrder} 
                            shipToDifferentAddress={shipToDifferentAddress}
                            shipping_address={shipping_address} shipping_phone={shipping_phone} authInfo={authInfo} total={total} order_list={order_list} note={order_comments} /> }
                            { payment_method === "local" && <div className="my-4">
                              <button type="button" className="btn btn-primary w-100" onClick={() => this.placeOrder()}>{t('checkout.order.button')}</button>
                            </div>}
                          </div>
                        </div>
                      </div>}
                    </div>
                    </div>
                  </div>
                </div>
                </form>
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
    ship: state.address.ship,
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
    onCalculateShipping: (payload) => {
      dispatch(AddressActions.onCalculateShipping(payload))
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