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
    history.push(`/product/a/${id}`);
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

  render() {
    const {orderItem, t, review} = this.props;
    const {modal, product} = this.state;
    return (
      <div show="true" className="modal fade" id="myModal" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static">
        <div className="modal-dialog modal-lg">
          {orderItem && <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{t('user.info-bill.card')} {orderItem._id}</h5>
              <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 form-inline">
                  <i className="fa fa-calendar-day text-xl bill-icon"></i>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0" id="createdAt" name="createdAt" value={Date(orderItem.createdAt)}/>
                    <label for="createdAt">{t('user.date.input')}</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <i className="fa fa-money-bill-wave text-xl bill-icon"></i>
                  <div className="form-floating">
                    <input type="number" className="form-control border-0" id="total_price" name="total_price" value={orderItem.total_price}/>
                    <label for="total_price">{t('user.total.input')} (VND)</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <i className="fa fa-gifts text-xl bill-icon"></i>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0 " id="status" name="status" 
                    value={orderItem.status===true ? `${t('user.status.true')}` : `${t('user.status.false')}`}/>
                    <label for="status">{t('user.status.label')}</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <i className="fa fa-money-check-alt text-xl bill-icon"></i>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0" id="payment_method" name="payment_method" 
                    value={orderItem.payment_method === "local" ? `${t('checkout.cod.button')}` : 'Paypal'}/>
                    <label for="payment_method">{t('user.payment.way')}</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <i className="fa fa-shopping-basket text-xl bill-icon"></i>
                  <div className="form-floating">
                    <input type="number" className="form-control border-0" id="total_price" name="total_price" value={orderItem.total_price}/>
                    <label for="total_price">{t('user.total.input')} (VND)</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <i className="fa fa-file-invoice-dollar text-xl bill-icon"></i>
                  {orderItem.payment_method==="local" 
                  ? <>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0" name="confirmed" id="confirmed" value={ orderItem.confirmed===true ? `${t('user.confirm.true')}` : `${t('user.confirm.false')}`}/>
                    <label for="confirmed">{t('user.confirm.label')}</label>
                    <span className={orderItem.confirmed===true && "d-none"}>
                      <button className="btn btn-success" onClick={() => {this.confirmOrder(orderItem._id)}}>{t('user.confirm.button')}</button>
                    </span>
                  </div>
                  </>
                  : <>
                  <div className="form-floating">
                    <input type="text" className="form-control border-0" id="paid" name="paid" value={ orderItem.paid===true ? `${t('user.payment.true')}` : `${t('user.payment.false')}`}/>
                    <label for="paid">{t('user.payment.label')}</label>  
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
                        <img className="h-100" src={item.image ? item.image : "http://www.pha.gov.pk/img/img-02.jpg"} alt={item.name} />
                      </div>
                      <div className="col-sm-3 align-self-center text-left">
                        <p className="text-dark m-0 font-weight-bold">{item.name}</p>
                        <p className="text-dark m-0">Màu sắc: {item.color && item.color.name_vn}</p>
                      </div>
                      <div className="col-sm-3 align-self-center">
                        <p className="m-0">{numberWithCommas(item.price)} VND x {item.quantity}</p>
                      </div>
                      {orderItem.status===1 && <div className="col-sm-3 align-self-center">
                        <button className="btn btn-info" onClick={()=> this.onReview(item)}>Đánh giá</button>
                      </div>}
                    </div>
                  </div>
                  )
                })
                }
              </div>
              <div className="row">
                <div className="col-6 form-inline">
                  <i className="fa fa-mobile-alt text-xl bill-icon"></i>
                  <div className="form-floating" style={{width: "90%"}}>
                    <input type="number" className="form-control border-0" id="shipping_phonenumber" name="shipping_phonenumber" value={orderItem.shipping_phonenumber}/>
                    <label for="shipping_phonenumber">{t('user.phone.order')}</label>
                  </div>
                </div>
                <div className="col-6 form-inline">
                  <i className="fa fa-envelope text-xl bill-icon"></i>
                  <div className="form-floating">
                    <input type="email" className="form-control border-0" name="email" id="email" value={orderItem.email}/>
                    <label for="email">{t('user.email.order')}:</label>
                  </div>
                </div>
                <div className="col-12 form-inline">
                  <i className="fa fa-home text-xl bill-icon"></i>
                  <div className="form-floating" style={{width: "90%"}}>
                    <input type="text" className="form-control border-0 w-100" name="shipping_address" id="shipping_address" value={orderItem.shipping_address}/>
                    <label for="shipping_address">{t('user.address.order')}:</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('user.close.button')}</button>
            </div>
          </div> }
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
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(OrderDetail);