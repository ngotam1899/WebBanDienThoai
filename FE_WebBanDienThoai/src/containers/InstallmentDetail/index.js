import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Components
import Paypal from './Paypal';
import { toastWarning } from '../../utils/toastHelper';
// @Functions
import numberWithCommas from '../../utils/formatPrice'
import tryConvert from '../../utils/changeMoney'
import {INITIAL_IMAGE} from '../../constants';
// @Actions
import InstallmentActions from "../../redux/actions/installment";

class InstallmentDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      money: 0,
      paypal: false
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

  setStatus = (status) => {
    const { t } = this.props;
    switch(status){
      case -1:
        return t('installment.status.2')
      case 0:
        return t('installment.status.3')
      case 1:
        return t('installment.status.4')
      case 2:
        return t('installment.status.5')
      default:
        return t('installment.status.2')
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

  setStatusItem = (status) => {
    const { t } = this.props;
    switch(status){
      case -1:
        return <span className="badge bg-danger">{t('installment.status.5')}</span>
      case 0:
        return <span className="badge bg-warning text-dark">{t('installment.status.7')}</span>
      case 1:
        return <span className="badge bg-success">{t('installment.status.8')}</span>
      default:
        return <span className="badge bg-warning text-dark">{t('installment.status.7')}</span>
    }
  }

  onClose = () => {
    const { onClearDetail } = this.props;
    onClearDetail();
  }

  render() {
    const { installmentItem, t, onUpdate, currency, queryParams } = this.props;
    const { money, paypal } = this.state;
    return (
      <div show="true" className="modal fade" id="myModal" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static">
        <div className="modal-dialog modal-lg">
          {installmentItem ? <div className="modal-content">
            <div className="modal-header">
              <div className="text-center w-100">
                <h3 className="modal-title m-0">{t('installment.info.card.header')} {installmentItem._id}</h3>
              </div>
              <div className="form-check form-switch">
                <button type="button" className="btn-close rounded-circle bg-light p-2" onClick={() => this.onClose()} data-bs-dismiss="modal"></button>
              </div>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="row">
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-luggage-cart text-xl "></i>
                      </div>
                      <div className="ml-3 my-1" style={{width: "75%"}}>
                        <p className="text-secondary smaller mb-0">{t('installment.product.label')}</p>
                        <div className="rounded border">
                          {installmentItem.product &&<div className="row">
                            <div className="col-4">
                              <img className="w-100" src={installmentItem.product._id.bigimage ? installmentItem.product._id.bigimage.public_url : INITIAL_IMAGE} alt={installmentItem.product._id.name}></img>
                            </div>
                            <div className="col-8 align-self-center">
                              <p className="font-weight-bold mb-0">{installmentItem.product._id.name}</p>
                              <p className="font-italic mb-0">{t('common.color')} {installmentItem.product.color.name_vn}</p>
                              <p className="mb-0">{currency==="VND" 
                              ? numberWithCommas(installmentItem.product.product_price) 
                              : numberWithCommas(parseFloat(tryConvert(installmentItem.product.product_price, currency, false)).toFixed(2))} {currency}</p>
                            </div>
                          </div>}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-business-time text-xl "></i>
                      </div>
                      <div className="form-floating w-90">
                        <input type="text" className="form-control border-0 w-100" id="startedAt" name="startedAt" 
                        defaultValue={`${t('shop.distance.from')} ${new Date(installmentItem.startedAt).toLocaleDateString("vn-VN")} ${t('shop.distance.to')} ${new Date(installmentItem.endedAt).toLocaleDateString("vn-VN")} (${installmentItem.period} ${t('installment.month.table')})`}/>
                        <label htmlFor="startedAt">{t('installment.time.label.1')}</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-gifts text-xl"></i>
                      </div>
                      <div className="form-floating">
                        <input type="text" className="form-control border-0 " id="status" name="status" 
                        defaultValue={this.setStatus(installmentItem.status)}/>
                        <label htmlFor="status">{t('installment.status.label')}</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-percent text-xl"></i>
                      </div>
                      <div className="form-floating">
                        <input type="text" className="form-control border-0 " id="interest_rate" name="interest_rate" 
                        defaultValue={installmentItem.interest_rate}/>
                        <label htmlFor="interest_rate">{t('installment.rate.label')}</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-address-card text-xl "></i>
                      </div>
                      <div className="ml-3 my-1" style={{width: "75%"}}>
                        <p className="text-secondary smaller mb-0">{t('installment.staff.label')}</p>
                        {installmentItem.staff 
                        ? <div className="form-inline rounded border">
                            <div className="c-avatar">
                              <img
                                src={installmentItem.staff.image ? installmentItem.staff.image.public_url : INITIAL_IMAGE}
                                className="c-avatar-img"
                                alt={installmentItem.staff._id}
                              />
                            </div>
                        <p className="mb-0 ml-3">{installmentItem.staff.firstname} {installmentItem.staff.lastname} ({installmentItem.staff.phonenumber})</p>
                          </div>
                        : <p className="mb-0">{t('installment.error')}</p>}
                      </div>
                    </div>
                    {installmentItem.debt && installmentItem.debt > 0 && <div className="col-12 my-2">
                      <div className="mb-2 border-bottom"></div>
                      <h4>{t('installment.payment.h4')}</h4>
                      <div className="row">
                        <div className="col-9">
                          <div className="form-floating mb-3">
                            <input type="number" className="form-control" name="money" value={money} onChange={this.onChange} disabled={paypal}/>
                            <label>{t('installment.payment.label')} (VND)</label>
                          </div>
                        </div>
                        <div className="col-3 my-2">
                          <button className="btn btn-primary w-100" onClick={()=> {
                            if(parseInt(money) > 50000) {
                              if(parseInt(money) > parseInt(installmentItem.debt)) toastWarning(`${t('installment.over.placeholder')}`)
                              else this.setState({paypal: !paypal})
                            }
                            else toastWarning(`${t('installment.payment.placeholder')}`)
                          }}>{paypal ? t("review.edit.button") : t("review.submit.button")}</button>
                        </div>
                      </div>
                    </div>}
                    {money !== 0 && paypal && <Paypal money={money} moneyUSD={parseFloat(tryConvert(money, "USD", false)).toFixed(2)} onUpdate={onUpdate} id={installmentItem._id} queryParams={queryParams}/>}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="row">
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-money-check-alt text-xl"></i>
                      </div>
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="prepay" name="prepay" 
                        defaultValue={currency==="VND" 
                        ? numberWithCommas(installmentItem.prepay) 
                        : numberWithCommas(parseFloat(tryConvert(installmentItem.prepay, currency, false)).toFixed(2))}/>
                        <label htmlFor="total_price">{t('installment.percent.label')} ({currency})</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-coins text-xl"></i>
                      </div>
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="debt" name="debt" 
                        defaultValue={installmentItem.debt ? (currency==="VND" 
                        ? numberWithCommas(installmentItem.debt) 
                        : numberWithCommas(parseFloat(tryConvert(installmentItem.debt, currency, false)).toFixed(2))) : 0}/>
                        <label htmlFor="total_price">{t('installment.debt.1.label')} ({currency})</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-hand-holding-usd text-xl"></i>
                      </div>
                      <div className="form-floating w-90">
                        <input type="text" className="form-control border-0" id="paid" name="paid" 
                        defaultValue={installmentItem.paid ? (currency==="VND" 
                        ? numberWithCommas(installmentItem.paid) 
                        : numberWithCommas(parseFloat(tryConvert(installmentItem.paid, currency, false)).toFixed(2))): 0}/>
                        <label htmlFor="total_price">{t('installment.paid.label')} ({currency})</label>
                      </div>
                    </div>
                    <div className="col-12 my-2">
                      <div className="mb-2 border-bottom"></div>
                      <h4>{t('installment.history.h4')}</h4>
                      {installmentItem.detail.length>0 ? <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th scope="col">{t('installment.month.table')}</th>
                            <th scope="col">{t('installment.due-date.table')}</th>
                            <th scope="col">{t('installment.money.table')}</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {installmentItem.detail.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{item.month}</th>
                            <td>{new Date(item.due_date).toLocaleDateString("vn-VN")}</td>
                            <td>{currency==="VND" 
                            ? numberWithCommas(item.payable) 
                            : numberWithCommas(parseFloat(tryConvert(item.payable, currency, false)).toFixed(2))}</td>
                            <td>{this.setStatusItem(item.status)}</td>
                              </tr>
                            )
                          })}
                          
                        </tbody>
                      </table>: 
                      <div className="text-center">
                        <p>{t('installment.error')}</p>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => this.onClose()} data-bs-dismiss="modal">{t('user.close.button')}</button>
            </div>
          </div> 
          : <div className="modal-content">
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
                  <h4>{t('installment.toastify.not-founded')}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => this.onClose()} data-bs-dismiss="modal">{t('user.close.button')}</button>
          </div>
          </div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    currency: state.currency,
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    onUpdate: (id, data, params) =>{
      dispatch(InstallmentActions.onUpdate({id, data, params}))
    },
    onClearDetail: () =>{
      dispatch(InstallmentActions.onClearDetail())
    },
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(InstallmentDetail);