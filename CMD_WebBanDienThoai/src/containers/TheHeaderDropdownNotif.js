import React, {Component} from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import { connect } from 'react-redux';
import { compose } from "redux";
import CIcon from '@coreui/icons-react'
import io from 'socket.io-client';
import { toastInfo } from '../utils/toastHelper';
// @Actions
import NotificationActions from '../redux/actions/notification'

const ENDPOINT = 'http://localhost:3000';
let socket = io(ENDPOINT);

class TheHeaderDropdownNotif extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemsCount : 0,
      email: ""
    }
  }

  componentDidUpdate(prevProps, prevState){
    const {itemsCount, email} = this.state;
    const {onGetAllNotifications, totalNotification, userInfo} = this.props
    if (userInfo !== prevProps.userInfo && userInfo) {
      var admin = userInfo._id;
      onGetAllNotifications({admin, limit: 5, page: 0})
    }
    if (totalNotification !== prevProps.totalNotification && totalNotification) {
      this.setState({itemsCount: totalNotification})
    }
    socket.on('newOrder', res => {
      this.setState({itemsCount: itemsCount + res.newOrders, email: res.email});
    });
    if (itemsCount !== prevState.itemsCount && itemsCount > totalNotification) {
      toastInfo(`${email} vừa xác thực đơn hàng`)
      var admin = userInfo._id;
      onGetAllNotifications({admin, limit: 5, page: 0})
    }
  }

  onReadAllNotification = () =>{
    const {onUpdateAllNotifications} = this.props;
    onUpdateAllNotifications({user: null})
    this.setState({itemsCount : 0})
  }

  render(){
    const {itemsCount} = this.state;
    const {listNotification} = this.props;
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
          && listNotification.map((notification, index)=>{
            return(
            <CDropdownItem key={index} className="d-block">
              <CIcon name="cil-basket" className="mr-2 text-success" />
              <span className="font-weight-bold mb-0">{notification.name}</span>
              <p className="mb-0">{notification.content}</p>
              <p className="mb-0 text-secondary">{new Date(notification.createdAt).toLocaleDateString("vi-VN")}</p>
            </CDropdownItem>
            )
          })}
        </CDropdownMenu>
      </CDropdown>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    listNotification: state.notification.list,
    totalNotification: state.notification.total,
    userInfo: state.auth.detail,
    isLogin: state.auth.loggedIn,
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
		onGetAllNotifications : (data) =>{
			dispatch(NotificationActions.onGetList(data))
    },
    onUpdateAllNotifications : (data) =>{
			dispatch(NotificationActions.onUpdateAll(data))
    },
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(
  withConnect
)(TheHeaderDropdownNotif)
