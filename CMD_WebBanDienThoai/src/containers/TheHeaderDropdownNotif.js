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
// @Functions
import {INITIAL_IMAGE} from '../constants';

const ENDPOINT = 'http://localhost:3000';
let socket = io(ENDPOINT);

class TheHeaderDropdownNotif extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemsCount : 0,
      email: "",
      type: -1  // type: 0 (order), type: 2 (installment)
    }
  }

  componentDidUpdate(prevProps, prevState){
    const { itemsCount, email, type } = this.state;
    const { onGetAllNotifications, totalNotification, userInfo } = this.props
    if (userInfo !== prevProps.userInfo && userInfo) {
      var admin = userInfo._id;
      onGetAllNotifications({admin, limit: 5, page: 0, active: 1})
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
      var admin = userInfo._id;
      onGetAllNotifications({admin, limit: 5, page: 0, active: 1})
    }
  }

  onReadAllNotification = () =>{
    const { onUpdateAllNotifications, userInfo } = this.props;
    const {itemsCount} = this.state;
    if(itemsCount > 0){
      onUpdateAllNotifications({admin: userInfo._id})
      this.setState({itemsCount : 0})
    }
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
          ? listNotification.map((notification, index)=>{
            return(
            <CDropdownItem key={index} className="d-block dropdown-normal">
              <div className="row">
                <div className="col-3">
                  <img className="w-100 rounded-circle" src={notification.image ? notification.image.public_url : INITIAL_IMAGE} alt={index}></img>
                </div>
                <div className="col-9">
                  <CIcon name="cil-basket" className="mr-2 text-success" />
                  <span className="font-weight-bold mb-0">{notification.name}</span>
                  <p className="mb-0">{notification.content}</p>
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
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
		onGetAllNotifications : (data) =>{
			dispatch(NotificationActions.onGetNewest(data))
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
