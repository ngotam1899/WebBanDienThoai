import React, { Component } from 'react';
import { ListCountry } from '../../constants/common';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import Search from '../../containers/Search';
import CartItem from '../../containers/CartItem'
import ProductsActions from '../../redux/actions/products'
import './styles.css';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalPrice: 0
    }
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

  componentDidUpdate(prevProps) {
    var total = 0;
    var totalPrice=0;
    var {cart} = this.props;
    if (cart !== prevProps.cart) {
      for(var i=0; i< cart.length; i++){
        total = total+cart[i].quantity
        totalPrice = totalPrice+ cart[i].quantity* cart[i].product.colors.find(item=> item._id === cart[i].color).price
      }
      this.setState({ 
        total,
        totalPrice
      })
    }
  }

  checkoutOrder = () =>{
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
    onDeleteProductInCart: (product, color) => {
      dispatch(ProductsActions.onDeleteProductInCart(product, color))
    },
    onUpdateProductInCart: (product, color, quantity) => {
      dispatch(ProductsActions.onUpdateProductInCart(product,color, quantity))
    },
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(
  withConnect,
  withTranslation()
)(CartPage);