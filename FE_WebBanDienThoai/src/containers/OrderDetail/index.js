import React, { Component } from 'react';
import OrdersActions from '../../redux/actions/order'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// Components
import ReviewDetail from '../ReviewDetail'
// Actions
import ReviewActions from '../../redux/actions/review'
// @Functions
import numberWithCommas from '../../utils/formatPrice'
import {INITIAL_IMAGE} from '../../constants';
import tryConvert from '../../utils/changeMoney'

class OrderDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      product: null,
    }
  }

  confirmOrder = (id) => {
    const {onSendConfirmEmail} = this.props;
    onSendConfirmEmail(id);
  }

  onRenderDetail = (id) =>{
    const {history} = this.props;
    history.push(`/product/undefined.${id}`);
    window.location.reload();
  }

  onCloseModal = (name, value) =>{
    this.setState({
      [name] : value
    })
  }

  onReview = (product) =>{
    const {onGetReview, authInfo} = this.props;
    this.setState({product});
    var params = {
      user: authInfo._id,
      product: product.product,
      color: product.color._id
    }
    onGetReview(params);
    this.onCloseModal("modal", true)
  }

  onClose = () => {
    const { onClearDetail } = this.props;
    onClearDetail();
  }

  render() {
    const { orderItem, t, review, currency } = this.props;
    const { modal, product } = this.state;
    return (
      <div show="true" className="modal fade" id="orderModal" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static">
        <div className="modal-dialog modal-lg">
          {orderItem ? <div className="modal-content">
            <div className="modal-header">
              <div className="text-center w-100">
                <h3 className="modal-title m-0">{t('order.info-bill.card')} {orderItem._id}</h3>
              </div>
              <div className="form-check form-switch">
                <button type="button" className="btn-close rounded-circle bg-light p-2" onClick={() => this.onClose()} data-bs-dismiss="modal"></button>
              </div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 form-inline">
                  <div className="bill-icon">
                    {/* <i className="fa fa-calendar-alt text-xl "></i> */}
                  </div>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0" id="createdAt" name="createdAt" defaultValue={orderItem.createdAt.slice(0,10)} />
                    <label htmlFor="createdAt">{t('order.date.input')}</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <div className="bill-icon">
                    <i className="fa fa-money-bill-wave text-xl"></i>
                  </div>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0" id="total_price" name="total_price" 
                    defaultValue={currency==="VND" 
                    ? numberWithCommas(orderItem.total_price) 
                    : numberWithCommas(parseFloat(tryConvert(orderItem.total_price, currency, false)).toFixed(2))}/>
                    <label htmlFor="total_price">{t('order.total.input')} ({currency})</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <div className="bill-icon">
                    <i className="fa fa-gifts text-xl"></i>
                  </div>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0 " id="status" name="status" 
                    defaultValue={orderItem.status===1 ? `${t('order.status.true')}` : `${t('order.status.false')}`}/>
                    <label htmlFor="status">{t('order.status.label')}</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <div className="bill-icon">
                    <i className="fa fa-money-check-alt text-xl"></i>
                  </div>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0" id="payment_method" name="payment_method" 
                    defaultValue={orderItem.payment_method === "local" ? `${t('checkout.cod.button')}` : 'Paypal'}/>
                    <label htmlFor="payment_method">{t('order.payment.way')}</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <div className="bill-icon">
                    <i className="fa fa-file-invoice-dollar text-xl"></i>
                  </div>
                  {orderItem.payment_method==="local" 
                  ? <>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0" name="confirmed" id="confirmed" defaultValue={ orderItem.confirmed===true ? `${t('order.confirm.true')}` : `${t('order.confirm.false')}`}/>
                    <label htmlFor="confirmed">{t('order.confirm.label')}</label>
                    <span className={orderItem.confirmed===true && "d-none"}>
                      <button className="btn btn-success" onClick={() => {this.confirmOrder(orderItem._id)}}>{t('order.confirm.button')}</button>
                    </span>
                  </div>
                  </>
                  : <>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0" id="paid" name="paid" defaultValue={ orderItem.paid===true ? `${t('order.payment.true')}` : `${t('order.payment.false')}`}/>
                    <label htmlFor="paid">{t('order.payment.label')}</label>  
                  </div>
                  </>}
                </div>
              </div>
              <div className="rounded shadow-sm">
                {orderItem.order_list.map((item, index) =>{
                  return (
                  <div className="card my-1" key={index}>
                    <div className="row no-gutters text-center">
                      <div className="col-sm-3 h-120" onClick={()=>this.onRenderDetail(item.product)}>
                        <img className="h-100" src={item.image ? item.image : INITIAL_IMAGE} alt={item.name} />
                      </div>
                      <div className="col-sm-3 align-self-center text-left">
                        <p className="text-dark m-0 font-weight-bold">{item.name}</p>
                        <p className="text-dark m-0">{t('common.color')} {item.color && item.color.name_vn}</p>
                      </div>
                      <div className="col-sm-3 align-self-center">
                        <p className="m-0">{numberWithCommas(item.price)} VND x {item.quantity}</p>
                      </div>
                      {orderItem.status===1 && <div className="col-sm-3 align-self-center">
                        <button className="btn btn-info" onClick={()=> this.onReview(item)}>{t('detail.review.tab')}</button>
                      </div>}
                    </div>
                  </div>
                  )
                })
                }
              </div>
              <div className="row">
                <div className="col-6 form-inline">
                  <div className="bill-icon">
                    <i className="fa fa-mobile-alt text-xl"></i>
                  </div>
                  <div className="form-floating" style={{width: "90%"}}>
                    <input type="number" className="form-control border-0" id="shipping_phonenumber" name="shipping_phonenumber" defaultValue={orderItem.shipping_phonenumber}/>
                    <label htmlFor="shipping_phonenumber">{t('order.phone.order')}</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <div className="bill-icon">
                    <i className="fa fa-envelope text-xl"></i>
                  </div>
                  <div className="form-floating">
                    <input type="email" className="form-control border-0" name="email" id="email" defaultValue={orderItem.email}/>
                    <label htmlFor="email">{t('order.email.order')}:</label>
                  </div>
                </div>
                <div className="col-12 form-inline">
                  <div className="bill-icon">
                    <i className="fa fa-home text-xl"></i>
                  </div>
                  <div className="form-floating" style={{width: "90%"}}>
                    <input type="text" className="form-control border-0 w-100" name="shipping_address" id="shipping_address" defaultValue={orderItem.shipping_address}/>
                    <label htmlFor="shipping_address">{t('order.address.order')}:</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => this.onClose()} data-bs-dismiss="modal">{t('user.close.button')}</button>
            </div>
          </div> : <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">404 Not founded</h5>
            <button type="button" className="close" data-bs-dismiss="modal" onClick={() => this.onClose()}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <div className="text-center my-5">
                  <div className="h-120">
                    <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-mall-live/images/ic_no_expired.png?_version=2" alt="404 not found"></img>
                  </div>
                  <h4>{t('order.toastify.not-founded')}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => this.onClose()} data-bs-dismiss="modal">{t('user.close.button')}</button>
          </div>
          </div>}
        </div>
        {modal && product && <ReviewDetail modal={modal} onCloseModal={this.onCloseModal} product={product}/>}
        {modal && product && review && <ReviewDetail modal={modal} onCloseModal={this.onCloseModal} product={product} review={review}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    review: state.review.detail,
    currency: state.currency,
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
		onSendConfirmEmail : (id) =>{
			dispatch(OrdersActions.onSendConfirmEmail(id))
    },
    onGetReview: (params) => {
      dispatch(ReviewActions.onGetDetail(params));
    },
    onClearDetail: () =>{
      dispatch(OrdersActions.onClearDetail())
    },
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(OrderDetail);