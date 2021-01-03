import React, { Component } from 'react';
import { connect } from "react-redux";
// @Components
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
// @Actions
import OrderActions from "../../redux/actions/order";

class OrderDetail extends Component {
  constructor(props){
    super(props);
    const {order} = props;
    this.state = {
      id: order ? order._id : '',
      total_price: order ? order.total_price: '',
      createdAt: order ? order.createdAt: '',
      payment_method: order ? order.payment_method: '',
      status: order ? order.status: '',
      confirmed: order ? order.confirmed: '',
      is_paid: order ? order.is_paid: '',
      order_list: order ? order.order_list : [],
      shipping_address: order ? order.shipping_address: '',
      shipping_phonenumber: order ? order.shipping_phonenumber: '',
      email: order ? order.email: '',
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

  onSubmit = (e) =>{
    const {id, is_paid, confirmed, status} = this.state;
    const {onUpdate} = this.props;
    /* Xử lý ảnh */
    // e.preventDefault();
    var data={is_paid, confirmed, status};
    onUpdate(id, data);
  }

	render() {
    const {total_price, order_list, createdAt, status, payment_method, confirmed, is_paid, shipping_phonenumber, shipping_address, email} = this.state;
    const { large, onClose, order} = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{order ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<div className="row">
						<div className="col-12 col-lg-6">
							<form>
                <div className="form-group">
                  <label>Ngày tạo:</label>
                  <input type="text" className="form-control" name="createdAt" value={Date(createdAt)} disabled/>
                </div>
                <div className="form-group">
                  <label>Tổng hóa đơn: (VND)</label>
                  <input type="number" className="form-control" name="total_price" value={total_price} disabled/>
                </div>
                <div className="form-group">
                  <label>Tình trạng hàng:</label>
                  <div className="row">
                    <div className="col-9">
                      <input type="text" className="form-control" name="status" value={status===true ? 'Đã giao hàng' : 'Chưa giao hàng'} disabled/>
                    </div>
                    {status===false
                    ? <div className="col-3">
                      <button className="btn btn-success" onClick={() => this.setState({status: true})}>Confirm</button>
                    </div>
                    : <div className="col-3">
                      <button className="btn btn-warning" onClick={() => this.setState({status: false})}>Undo</button>
                    </div>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Phương thức thanh toán:</label>
                  <div className="row">
                    <div className="col-12">
                      <input type="text" className="form-control" name="payment_method" value={ payment_method === "local" ? `COD (Tiền mặt)` : 'Paypal'} disabled/>
                    </div>
                  </div>
                </div>
                {payment_method==="local"
                ? <>
                <div className="form-group">
                  <label>Tình trạng đơn:</label>
                  <div className="row">
                    <div className="col-9">
                      <input type="text" className="form-control" name="confirmed" value={ confirmed===true ? `Đã xác nhận` : `Chưa xác nhận`} disabled/>
                    </div>
                    {confirmed===false
                    ? <div className="col-3">
                      <button className="btn btn-success" onClick={() => this.setState({confirmed: true})}>Confirm</button>
                    </div>
                    : <div className="col-3">
                      <button className="btn btn-warning" onClick={() => this.setState({confirmed: false})}>Undo</button>
                    </div>}
                  </div>
                </div>
                </>
                : <>
                <div className="form-group">
                  <label>Tình trạng thanh toán:</label>
                  <div className="row">
                    <div className="col-12">
                      <input type="text" className="form-control" name="is_paid" value={ is_paid===true ? 'Đã thanh toán' : 'Chưa thanh toán'} disabled/>
                    </div>
                  </div>
                </div>
                </>}
							</form>
						</div>
            <div className="col-12 col-lg-6">
							<form>
                <div className="form-group">
                  <label>Số điện thoại người nhận:</label>
                  <input type="number" className="form-control" name="shipping_phonenumber" value={shipping_phonenumber} disabled/>
                </div>
                <div className="form-group">
                  <label>Địa chỉ người nhận:</label>
                  <input type="text" className="form-control" name="shipping_address" value={shipping_address} disabled/>
                </div>
                <div className="form-group">
                  <label>Email người nhận:</label>
                  <input type="email" className="form-control" name="email" value={email} disabled/>
                </div>
								<div className="form-group">
									<label>Chi tiết đơn hàng</label>
                  <div className="form-group">
                  {order_list.map((item, index) =>{
                  return (
                  <div className="card my-1" key={index}>
                    <div className="row no-gutters">
                        <div className="col-sm-3">
                          <img className="card-img" src={item.image ? item.image : "http://www.pha.gov.pk/img/img-02.jpg"} alt={item.name} />
                        </div>
                        <div className="col-sm-5 align-self-center">
                          <p className="text-dark m-0">{item.name}</p>
                        </div>
                        <div className="col-sm-4 align-self-center">
                          <p className="m-0">{item.price} VND x {item.quantity}</p>
                        </div>
                    </div>
                  </div>
                  )
                })
                }
              </div>
								</div>

							</form>
						</div>
					</div>
				</CModalBody>
				<CModalFooter>
					<CButton color="primary" onClick={() => this.onSubmit(!large)}>
						Save
					</CButton>{' '}
					<CButton color="secondary" onClick={() => onClose(!large)}>
						Cancel
					</CButton>
				</CModalFooter>
			</CModal>
		);
	}
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (id, params) =>{
      dispatch(OrderActions.onUpdate({id, params}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
