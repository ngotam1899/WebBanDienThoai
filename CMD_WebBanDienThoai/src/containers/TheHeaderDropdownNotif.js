import React, {Component} from 'react'

import { connect } from 'react-redux';
import { compose } from "redux";
// @Components
import CIcon from '@coreui/icons-react'
import { toastInfo, toastError } from '../utils/toastHelper';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import InstallmentDetail from '../components/Installments/InstallmentDetail'
import OrderDetail from '../components/Orders/OrderDetail'
// @Actions
import NotificationActions from '../redux/actions/notification'
import InstallmentActions from "../redux/actions/installment";
import OrderActions from "../redux/actions/order";
// @Functions
import {INITIAL_IMAGE} from '../constants';
import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:3000';
let socket = io(ENDPOINT);

class TheHeaderDropdownNotif extends Component {
  constructor(props){
    super(props);
    this.state = {
      large: false,
      itemsCount : 0,
      email: "",
      type: -1,  // type: 0 (order), type: 2 (installment)
      queryParams: {},
    }
  }

  componentDidUpdate(prevProps, prevState){
    const { itemsCount, email, type } = this.state;
    const { onGetNewestNotifications, totalNotification, userInfo } = this.props
    var admin = "";
    if (userInfo !== prevProps.userInfo && userInfo) {
      admin = userInfo._id;
      this.setState({queryParams: {admin, limit: 5, page: 0}})
      onGetNewestNotifications({admin, limit: 5, page: 0})
    }
    if (totalNotification !== prevProps.totalNotification && totalNotification) {
      this.setState({itemsCount: totalNotification})
    }
    socket.on('newOrder', res => {
      this.setState({itemsCount: itemsCount + res.newOrders, email: res.email, type: 0});
    });
    socket.on('newInstallment', res => {
      this.setState({itemsCount: itemsCount + res.newInstallments, email: res.email, type: 2});
    });
    if (itemsCount !== prevState.itemsCount && itemsCount > totalNotification && type !== -1) {
      if(type === 0) toastInfo(`${email} vừa xác thực đơn hàng`)
      else toastInfo(`${email} vừa gửi yêu cầu trả góp`)
      admin = userInfo._id;
      this.setState({queryParams: {admin, limit: 5, page: 0}})
      onGetNewestNotifications({admin, limit: 5, page: 0})
    }
  }

  onReadAllNotification = () =>{
    const { onUpdateAllNotifications, userInfo } = this.props;
    const { itemsCount, queryParams } = this.state;
    const data = {admin : userInfo._id}
    if(itemsCount > 0){
      onUpdateAllNotifications(data, queryParams)
      this.setState({ itemsCount: 0 })
    }
  }

  showModal = (item) => {
    const { onGetDetailInstallment, onGetDetailOrder } = this.props;
    this.setState({ large: true })
    switch(item.type){
      case 0:
        if(item) onGetDetailOrder(item.link)
        break;
      case 2:
        if(item) onGetDetailInstallment(item.link)
        break;
      default:
        break;
    }
  }

  onClose = (large) =>{
    const { onClearDetailInstallment, onClearDetailOrder } = this.props;
    this.setState({large})
    onClearDetailInstallment();
    onClearDetailOrder();
  }

  render(){
    const { itemsCount, large } = this.state;
    const { listNotification, installmentDetail, orderDetail } = this.props;
    return (
      <CDropdown
        inNav
        className="c-header-nav-item mx-2"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false} onClick={()=>this.onReadAllNotification()}>
          <CIcon name="cil-bell"/>
          {itemsCount > 0 && <CBadge shape="pill" color="danger">{itemsCount}</CBadge>}
        </CDropdownToggle>
        <CDropdownMenu  placement="bottom-end" className="pt-0">
          {listNotification
          ? listNotification.map((notification, index)=>{
            return(
            <CDropdownItem key={index} className="d-block dropdown-normal">
              <div className="row" onClick={()=> this.showModal(notification)}>
                <div className="col-3">
                  <img className="w-100 rounded-circle" src={notification.image ? notification.image.public_url : INITIAL_IMAGE} alt={index}></img>
                </div>
                <div className="col-9">
                  <CIcon name="cil-basket" className="mr-2 text-success" />
                  <span className="font-weight-bold mb-0 text-dark">{notification.name}</span>
                  <p className="mb-0 text-dark">{notification.content}</p>
                  <p className="mb-0 text-secondary">{new Date(notification.createdAt).toLocaleDateString("vi-VN")}</p>
                </div>
              </div>
            </CDropdownItem>
            )
          })
          : <CDropdownItem className="d-block dropdown-normal">
          <div className="row">
            <div className="col-12 text-center">
              <p>Chưa có thông báo nào</p>
            </div>
          </div>
        </CDropdownItem>}
        </CDropdownMenu>
        {installmentDetail && large && <InstallmentDetail large={large} installment={installmentDetail} onClose={this.onClose}/>}
        {orderDetail && large && <OrderDetail large={large} order={orderDetail} onClose={this.onClose}/>}
      </CDropdown>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    listNotification: state.notification.detail,
    totalNotification: state.notification._total,
    userInfo: state.auth.detail,
    isLogin: state.auth.loggedIn,
    installmentDetail: state.installment.detail,
    orderDetail: state.order.detail,
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
    onGetDetailInstallment: (id) => {
      dispatch(InstallmentActions.onGetDetail(id))
    },
    onClearDetailInstallment: () =>{
      dispatch(InstallmentActions.onClearDetail())
    },
    onGetDetailOrder: (id) => {
      dispatch(OrderActions.onGetDetail(id))
    },
    onClearDetailOrder: () =>{
      dispatch(OrderActions.onClearDetail())
    },
		onGetNewestNotifications : (params) =>{
			dispatch(NotificationActions.onGetNewest(params))
    },
    onUpdateAllNotifications : (data, params) =>{
			dispatch(NotificationActions.onUpdateAll(data, params))
    },
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(
  withConnect
)(TheHeaderDropdownNotif)
