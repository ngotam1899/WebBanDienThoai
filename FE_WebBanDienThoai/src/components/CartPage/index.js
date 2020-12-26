import React, { Component } from 'react';
import { ListCountry } from '../../constants/common';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import Search from '../../containers/Search';
import CartItem from '../../containers/CartItem'
import ProductsActions from '../../redux/actions/products'
import './styles.css';
// @Functions
import tryConvert from '../../utils/changeMoney'

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalPrice: 0
    }
  }

  UNSAFE_componentWillMount() {
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

  UNSAFE_componentWillReceiveProps(props){
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

  checkoutOrder = () =>{
    console.log("checked")
    const {history} = this.props;
    history.push('/carts/checkout')
  }

  render() {
    var {cart, onDeleteProductInCart, onUpdateProductInCart, currency, userInfo, t} = this.props;
    var {totalPrice} = this.state;
    return (<>
      <div className="product-big-title-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-bit-title text-center">
                <h2>{t('cart.page.title')}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single-product-area">
        <div className="zigzag-bottom"></div>
        <div className="container">
          <div className="row">
            <div className="d-none d-lg-block col-md-4">
            <Search />
            </div>
            <div className="col-lg-8 col-12">
              <div className="product-content-right">
                <div className="woocommerce">
                  <form>
                    <table cellSpacing="0" className="shop_table cart">
                      <thead>
                        <tr>
                          <th className="product-remove">&nbsp;</th>
                          <th className="product-thumbnail">&nbsp;</th>
                          <th className="product-name">{t('cart.product.table')}</th>
                          <th className="product-price">{t('cart.price.table')}</th>
                          <th className="product-quantity">{t('cart.quantity.table')}</th>
                          <th className="product-subtotal">{t('cart.total.table')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item, index) =>{
                          return (
                            <CartItem key={index} cart={item} onDeleteProductInCart={onDeleteProductInCart} currency={currency}
                            onUpdateProductInCart={onUpdateProductInCart} setTotal={this.setTotal}/>
                          )
                        })}
                        <tr>
                          <td className="actions" colSpan="6">
                            <div className="coupon">
                              <label for="coupon_code">Coupon:</label>
                              <input type="text" placeholder={t('cart.coupon-code.input')} value="" id="coupon_code" className="input-text"
                                name="coupon_code" />
                              <input type="submit" value={t('cart.apply.button')} name="apply_coupon" className="button" />
                            </div>
                            <input type="submit" value={t('cart.update.button')} name="update_cart" className="button" />
                            {userInfo && cart[0] && <button className="checkout-button button alt wc-forward" onClick={() => this.checkoutOrder()}>{t('cart.checkout.button')}</button>}
                          </td>
                          
                        </tr>
                      </tbody>
                    </table>
                  </form>

                  <div className="cart-collaterals">
                    <div className="row">
                    <div className="col-6">
                      <div className="cart_totals ">
                        <h2>{t('cart.cart-total.label')}</h2>

                        <table cellSpacing="0">
                          <tbody>
                            <tr className="cart-subtotal">
                              <th>{t('cart.cart-sub.table')}</th>
                              <td><span className="amount">{cart ? currency ==="VND" ? totalPrice : tryConvert(totalPrice, currency, false) : 0} {currency}</span></td>
                            </tr>

                            <tr className="shipping">
                              <th>{t('cart.ship.table')}</th>
                              <td>{t('cart.free-ship')}</td>
                            </tr>

                            <tr className="order-total">
                              <th>{t('cart.order-total.table')}</th>
                              <td><strong><span className="amount">{cart ? currency ==="VND" ? totalPrice : tryConvert(totalPrice, currency, false) : 0} {currency}</span></strong> </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="col-6">
                    <form method="post" action="#" className="shipping_calculator">
                      <h2><a className="shipping-calculator-button" data-toggle="collapse" href="#calcalute-shipping-wrap"
                        aria-expanded="false" aria-controls="calcalute-shipping-wrap">{t('cart.cal-ship.label')}</a></h2>

                      <section id="calcalute-shipping-wrap" className="shipping-calculator-form collapse">

                        <p className="form-row form-row-wide m-0">
                          <select rel="calc_shipping_state" className="country_to_state" id="calc_shipping_country"
                            name="calc_shipping_country">
                            <option value="">{t('cart.country.select')}</option>
                            {ListCountry.map((country, index) => {
                              return (
                                <option value={country.value} key={index}>{country.name}</option>
                              )
                            })}

                          </select>
                        </p>

                        <p className="form-row form-row-wide m-0"><input type="text" id="calc_shipping_state"
                          name="calc_shipping_state" placeholder="State / county" value="" className="input-text" /> </p>

                        <p className="form-row form-row-wide m-0"><input type="text" id="calc_shipping_postcode"
                          name="calc_shipping_postcode" placeholder="Postcode / Zip" value="" className="input-text" /></p>


                        <p><button className="button" value="1" name="calc_shipping" type="submit">{t('cart.total.button')}</button></p>

                      </section>
                    </form>
                    </div>
                    </div>
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
    currency: state.currency,
    userInfo: state.auth.detail,
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
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(
  withConnect,
  withTranslation()
)(CartPage);