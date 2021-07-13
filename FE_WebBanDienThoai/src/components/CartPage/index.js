import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next';
import ProductsActions from '../../redux/actions/products';
import './styles.css';
// Functions
import tryConvert from '../../utils/changeMoney';
import numberWithCommas from "../../utils/formatPrice";
import { toastError } from '../../utils/toastHelper';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalPrice: 0,
      checkedAll: false
    }
  }

  UNSAFE_componentWillMount() {
    document.title = "[TellMe] Trang bán hàng"
  }

  componentDidUpdate(prevProps) {
    var total = 0;
    var totalPrice=0;
    var {checkout} = this.props;
    if (checkout !== prevProps.checkout) {
      for(let i=0; i< checkout.length; i++){
        total = total + checkout[i].quantity
        totalPrice = totalPrice+ checkout[i].quantity* checkout[i].product.colors.find(item=> item._id === checkout[i].color).price
      }
      this.setState({ 
        total,
        totalPrice
      })
    }
  }

  checkoutOrder = () =>{
    const {history, checkout} = this.props;
    if(checkout.length === 0) toastError("Bạn chưa chọn sản phẩm checkout");
    else history.push('/carts/checkout')
  }

  onUpdateQuantity = (product, color, quantity) => {
    var {onUpdateProductInCart} = this.props;
    if(quantity > 0){
      onUpdateProductInCart(product,color, quantity);
    }
  }

  onDeleteProductInCart = (product, color) => {
    var {onDeleteProductInCart} = this.props;
    onDeleteProductInCart(product, color);
  }

  setCheckout = (e) => {
    const { checked, value } = e.target;
    const { onAddCheckout, onDeleteCheckout } = this.props;
    if(checked === true) {
      onAddCheckout(JSON.parse(value));
    } else {
      onDeleteCheckout(JSON.parse(value));
    }
  }

  setCheckoutAll = (e) => {
    const { checked } = e.target;
    const { cart, onCheckoutAll, onClearAllCheckout } = this.props;
    if(checked === true) {
      onCheckoutAll(cart);
      this.setState({checkedAll: true})
    } else {
      onClearAllCheckout();
      this.setState({checkedAll: false})
    }
  }

  render() {
    var { totalPrice, checkedAll } = this.state;
    var { cart, currency, userInfo, t } = this.props;
    return (
    <div className="container my-3">
      <div className="row">
        <div className="col-12 my-2">
          <a className="text-decoration-none directory rounded p-2" href="/#/">{t('header.home.menu')}</a>
          <i className="fa fa-chevron-right px-2 w-25-px"></i>
        </div>
        <div className="col-12">
          <h1 className="font-weight-bold">{t('cart.page.title')}</h1>
        </div>
        <div className="col-12 my-2">
          <div className="rounded shadow-sm my-2">
            <div className="px-3 py-2">
              <h3 className="mb-1">{t('common.product')}</h3>
              <div className="mb-2 border-bottom"></div>
              {cart.length > 0 ? cart.map((item, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-md-1 col-2 text-center align-self-center">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={checkedAll || undefined} disabled={checkedAll} value={JSON.stringify(item)} onChange={(e)=>this.setCheckout(e)}/>
                      </div>
                    </div>
                    <div className="col-md-4 col-7">
                      <div className="row">
                        <div className="col-6 col-sm-4 col-md-3 text-center">
                          <img className="float-start" alt={item.product.name} src={item.product.bigimage ? item.product.bigimage.public_url : "http://www.pha.gov.pk/img/img-02.jpg"}></img>
                        </div>
                        <div className="col-6 col-sm-8 col-md-9 align-self-center">
                        <p className="font-weight-bold mb-0">{item.product.name}</p>
                        <p className="mb-0 text-secondary">{t('common.color')} {item.product.colors.find(i => i._id === item.color).name_en}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-3 align-self-center text-center">
                    {currency==="VND" 
                    ? numberWithCommas(item.product.colors.find(i => i._id === item.color).price) 
                    : numberWithCommas(parseFloat(tryConvert(item.product.colors.find(i => i._id === item.color).price, currency, false)).toFixed(2))} {currency}
                      </div>
                    <div className="col-md-2 col-6 align-self-center text-center">
                      <div className="quantity form-inline">
                        <button type="button" className="rounded-circle outline-none" onClick={() => this.onUpdateQuantity(item.product, item.color, item.quantity - 1) }>
                          <i className="fa fa-minus"></i>
                        </button>
                        <input type="number" size="4" className="form-control" value={item.quantity} min="0" step="1" readOnly/>
                        <button type="button" className="rounded-circle outline-none" onClick={() => this.onUpdateQuantity(item.product, item.color, item.quantity + 1) }>
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 col-4 align-self-center text-right font-weight-bold">
                    {currency==="VND" 
                    ? numberWithCommas(item.quantity * item.product.colors.find(i => i._id === item.color).price) 
                    : numberWithCommas(parseFloat(tryConvert(item.quantity * item.product.colors.find(i => i._id === item.color).price, currency, false)).toFixed(2))} {currency}
                    </div>
                    <div className="col-md-1 col-2 text-center align-self-center">
                      <div className="form-check form-switch">
                        <button type="button" className="btn-close rounded-circle bg-light p-2" onClick={()=> this.onDeleteProductInCart(item.product, item.color)}></button>
                      </div>
                    </div>
                  </div>
                )
              }) : <div className="row my-1">
              <div className="col-12">
                  <div className="text-center my-5 py-5">
                    <div className="h-120">
                      <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png" alt="404 not found"></img>
                    </div>
                    <h4>{t('header.cart.empty')}</h4>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>
        <div className="col-12 my-2">
          <div className="rounded shadow-sm my-2">
            <div className="px-3 py-2">
              <h3 className="mb-1">{t('cart.total.table')}</h3>
              <div className="mb-2 border-bottom"></div>
              <div className="row">
                <div className="col-md-2 col-5 align-self-center">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e)=>this.setCheckoutAll(e)}/>
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{t('cart.all.choose')}</label>
                </div>
                </div>
                <div className="col-md-7 col-1">
                </div>
                <div className="col-md-3 col-6 align-self-center form-inline justify-content-end">
                  <p className="my-0 font-weight-bold">
                  {currency==="VND" ? numberWithCommas(totalPrice) : numberWithCommas(parseFloat(tryConvert(totalPrice, currency, false)).toFixed(2))} {currency}
                  </p>
                  {userInfo ? (cart[0] && <button className="btn btn-primary ml-2" onClick={() => this.checkoutOrder()}><i className="fa fa-credit-card mr-2"></i>{t('cart.checkout.button')}</button>) :  <a className="btn btn-success ml-2" href="/user/dang-nhap">{t('header.login.button')}</a>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


const mapStateToProps = (state) =>{
  return {
    cart: state.cart,
    checkout: state.checkout,
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
    onAddCheckout: (payload) => {
      dispatch(ProductsActions.onAddCheckout(payload))
    },
    onDeleteCheckout: (payload) => {
      dispatch(ProductsActions.onDeleteCheckout(payload))
    },
    onClearAllCheckout: () => {
      dispatch(ProductsActions.onClearCheckout());
    },
    onCheckoutAll: (payload) => {
      dispatch(ProductsActions.onCheckoutAll(payload))
    }
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(
  withConnect,
  withTranslation()
)(CartPage);