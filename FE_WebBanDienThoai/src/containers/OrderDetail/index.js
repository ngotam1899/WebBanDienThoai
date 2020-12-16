import React, { Component } from 'react';
import OrdersActions from '../../redux/actions/order'
import {connect} from 'react-redux';

class OrderDetail extends Component {
  confirmOrder(id) {
    const {onSendConfirmEmail} = this.props;
    onSendConfirmEmail(id);
  }

  render() {
    const {orderItem} = this.props;
    return (
      <div show="true" className="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
          {orderItem && <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thông tin đơn hàng {orderItem._id}</h5>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <div className="form-group">
                <label>Ngày tạo đơn:</label>
                <input type="text" className="form-control" name="createdAt" value={Date(orderItem.createdAt)} disabled/>
              </div>
              <div className="form-group">
                <label>Tổng hóa đơn: (VND)</label>
                <input type="number" className="form-control" name="total_price" value={orderItem.total_price} disabled/>
              </div>
              <div className="form-group">
                <label>Tình trạng đơn:</label>
                <input type="text" className="form-control" name="status" value={orderItem.status===true ? 'Đã giao hàng' : 'Chưa giao hàng'} disabled/>
              </div>
              <div className="form-group">
                <label>Tình trạng hàng:</label>
                <div className="row">
                  <div className={orderItem.confirmed===true ? "col-12": "col-9"}>
                    <input type="text" className="form-control" name="confirmed" value={ orderItem.confirmed===true ? 'Đã xác nhận đơn hàng' : 'Chưa xác nhận'} disabled/>
                  </div>
                  <div className={orderItem.confirmed===true ? "" : "col-3"}>
                    <button className="btn btn-success" onClick={() => {this.confirmOrder(orderItem._id)}}>Confirm</button>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Thành phần:</label>
                {orderItem.order_list.map((item, index) =>{
                  return (
                  <div className="card my-1" key={index}>
                    <div className="row no-gutters">
                        <div className="col-sm-3">
                          <img className="card-img" src={item.image} alt={item.name} />
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
              <div className="form-group">
                <label>Số điện thoại người nhận:</label>
                <input type="number" className="form-control" name="shipping_phonenumber" value={orderItem.shipping_phonenumber} disabled/>
              </div>
              <div className="form-group">
                <label>Địa chỉ nhận:</label>
                <input type="text" className="form-control" name="shipping_address" value={orderItem.shipping_address} disabled/>
              </div>
              <div className="form-group">
                <label>Email xác nhận:</label>
                <input type="email" className="form-control" name="email" value={orderItem.email} disabled/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    product: state.products.detail,
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
		onSendConfirmEmail : (id) =>{
			dispatch(OrdersActions.onSendConfirmEmail(id))
    },
	}
};


export default connect(mapStateToProps, mapDispatchToProps) (OrderDetail);