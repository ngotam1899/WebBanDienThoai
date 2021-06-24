import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Components
import Paypal from './Paypal';
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
    switch(status){
      case -1:
        return 'Chưa duyệt'
      case 0:
        return 'Chưa hoàn tất'
      case 1:
        return 'Đã hoàn tất'
      case 2:
        return 'Qúa hạn'
      default:
        return 'Chưa duyệt'
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
    switch(status){
      case -1:
        return <span className="badge bg-danger">Qúa hạn</span>
      case 0:
        return <span className="badge bg-warning text-dark">Chưa tới hạn</span>
      case 1:
        return <span className="badge bg-success">Hoàn tất</span>
      default:
        return <span className="badge bg-warning text-dark">Chưa tới hạn</span>
    }
  }

  render() {
    const { installmentItem, t, onUpdate } = this.props;
    const { money } = this.state;
    return (
      <div show="true" className="modal fade" id="myModal" role="dialog" data-bs-keyboard="false" data-bs-backdrop="static">
        <div className="modal-dialog modal-lg">
          {installmentItem && <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Installment information {installmentItem._id}</h5>
              <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="row">
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-business-time text-xl "></i>
                      </div>
                      <div className="ml-3 my-1" style={{width: "75%"}}>
                        <p className="text-secondary smaller mb-0">Sản phẩm trả góp</p>
                        <div className="rounded border">
                          <div className="row">
                            <div className="col-4">
                              <img className="w-100" src={installmentItem.product._id.bigimage ? installmentItem.product._id.bigimage.public_url : INITIAL_IMAGE} alt={installmentItem.product._id.name}></img>
                            </div>
                            <div className="col-8 align-self-center">
                              <p className="font-weight-bold mb-0">{installmentItem.product._id.name}</p>
                              <p className="font-italic mb-0">Màu {installmentItem.product.color.name_vn}</p>
                              <p className="mb-0">{installmentItem.product.product_price} VND</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-business-time text-xl "></i>
                      </div>
                      <div className="form-floating w-90">
                        <input type="text" className="form-control border-0 w-100" id="startedAt" name="startedAt" 
                        value={`Từ ${new Date(installmentItem.startedAt).toLocaleDateString("vn-VN")} đến ${new Date(installmentItem.endedAt).toLocaleDateString("vn-VN")} (${installmentItem.period} tháng)`}/>
                        <label htmlFor="startedAt">Thời gian trả góp</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-gifts text-xl"></i>
                      </div>
                      <div className="form-floating">
                        <input type="text" className="form-control border-0 " id="status" name="status" 
                        value={this.setStatus(installmentItem.status)}/>
                        <label htmlFor="status">Tình trạng trả góp</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-gifts text-xl"></i>
                      </div>
                      <div className="form-floating">
                        <input type="text" className="form-control border-0 " id="status" name="status" 
                        value={installmentItem.interest_rate}/>
                        <label htmlFor="status">Lãi xuất (% / năm)</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-business-time text-xl "></i>
                      </div>
                      <div className="ml-3 my-1" style={{width: "75%"}}>
                        <p className="text-secondary smaller mb-0">Nhân viên phụ trách</p>
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
                        : <p className="mb-0">Phiếu trả góp chưa được duyệt</p>}
                      </div>
                    </div>
                    <div className="col-12 my-2">
                      <div className="mb-2 border-bottom"></div>
                      <h4>Thanh toán trả góp online</h4>
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="money" value={money} onChange={this.onChange}/>
                        <label>Số tiền muốn trả</label>
                      </div>
                      {money !==0 && <Paypal money={money} moneyUSD={parseFloat(tryConvert(money, "USD", false)).toFixed(2)} onUpdate={onUpdate} id={installmentItem._id}/>}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="row">
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-money-bill-wave text-xl"></i>
                      </div>
                      <div className="form-floating">
                        <input type="number" className="form-control border-0" id="prepay" name="prepay" value={installmentItem.prepay}/>
                        <label htmlFor="total_price">Trả trước (VND)</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-money-bill-wave text-xl"></i>
                      </div>
                      <div className="form-floating">
                        <input type="number" className="form-control border-0" id="debt" name="debt" value={installmentItem.debt}/>
                        <label htmlFor="total_price">Số tiền còn nợ (VND)</label>
                      </div>
                    </div>
                    <div className="col-12 form-inline">
                      <div className="bill-icon">
                        <i className="fa fa-shopping-basket text-xl"></i>
                      </div>
                      <div className="form-floating w-90">
                        <input type="number" className="form-control border-0" id="paid" name="paid" value={installmentItem.paid}/>
                        <label htmlFor="total_price">Số tiền đã thanh toán (VND)</label>
                      </div>
                    </div>
                    <div className="col-12 my-2">
                      <div className="mb-2 border-bottom"></div>
                      <h4>Lịch sử trả góp</h4>
                      {installmentItem.detail.length>0 ? <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th scope="col">Tháng</th>
                            <th scope="col">Ngày tới hạn</th>
                            <th scope="col">Tiền cần trả</th>
                            <th scope="col">Tình trạng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {installmentItem.detail.map((item, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{item.month}</th>
                            <td>{new Date(item.due_date).toLocaleDateString("vn-VN")}</td>
                            <td>{item.payable}</td>
                            <td>{this.setStatusItem(item.status)}</td>
                              </tr>
                            )
                          })}
                          
                        </tbody>
                      </table>: 
                      <div className="text-center">
                        <p>Phiếu trả góp chưa được xét duyệt</p>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('user.close.button')}</button>
            </div>
          </div> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    
    
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    onUpdate: (id, params) =>{
      dispatch(InstallmentActions.onUpdate({id, params}))
    }
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(InstallmentDetail);