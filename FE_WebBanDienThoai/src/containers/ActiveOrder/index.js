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
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1 style={{fontSize: '10vw'}}>Congratulations!</h1>
          </div>
          <h2>Xác nhận đơn hàng thành công</h2>
          <p>Bạn đã xác nhận đơn hàng thành công, hãy đợi bộ phận vận đơn liên lạc nhé.</p>
          <a href="/">Tiếp tục mua hàng</a>
        </div>
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