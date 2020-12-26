import React, { Component } from 'react';
import {connect} from 'react-redux';
import OrdersActions from '../../redux/actions/order'

class ActiveOrder extends Component {
  componentDidMount(){
    const {match, onConfirmOrder} = this.props;
    onConfirmOrder(match.params.token)
  }

  render() {
    return (
      <div>
        Xác nhận đơn hàng thành công
        <button className=""><a href="/">Tiếp tục mua hàng</a></button>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onConfirmOrder: (token) => {
      dispatch(OrdersActions.onConfirmOrder(token))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ActiveOrder);