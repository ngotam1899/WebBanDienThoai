import React, { Component } from 'react';

class ActiveOrder extends Component {
  render() {
    return (
      <div>
        Xác nhận đơn hàng thành công
        <button className=""><a href="/">Tiếp tục mua hàng</a></button>
      </div>
    );
  }
}

export default ActiveOrder;