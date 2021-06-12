import React, { Component } from 'react'
import { connect } from "react-redux";
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import {INITIAL_IMAGE} from '../../constants';
// @Actions
import NotificationActions from "../../redux/actions/notification";

const statusList = [
  { 
    name: "Đơn hàng",
  },{
    name: "Khuyến mãi",
  }
];

class NotificationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: "",
      filter: {
        limit: 8,
        page: 0,
      },
      queryParams: {
        limit: 8,
        page: 0,
      },
    }
  }

  componentDidMount(){
    const {onGetList, authInfo, location} = this.props;
    const { filter } = this.state;
    if(authInfo){
      const filters = getFilterParams(location.search);
      var params = {
        ...filter,
        ...filters,
        user: authInfo && authInfo._id
      };
      this.setState({queryParams: params})
      onGetList(params);
    }
  }

  componentDidUpdate(prevProps){
    const {location, onGetList, authInfo} = this.props;
    const { filter } = this.state;
    const filters = getFilterParams(location.search);
    if(prevProps.location !== location){
      var params = {
        ...filter,
        ...filters,
        user: authInfo && authInfo._id
      };
      this.setState({queryParams: params})
      onGetList(params);
    }
  }

  componentWillReceiveProps(props){
    const {authInfo} = this.props;
    document.title = "[TellMe] Trang bán hàng"
    if(props.authInfo !== authInfo){
      const { onGetList, location } = this.props;
      const { filter } = this.state;
      const filters = getFilterParams(location.search);
      var params = {
        ...filter,
        ...filters,
        user: props.authInfo && props.authInfo._id
      };
      this.setState({queryParams: params})
      if(props.authInfo)onGetList(params);
    }
  }

  handleUpdateFilter = (data) => {
    const {location, history} = this.props;
    const {pathname, search} = location;
    let queryParams = getFilterParams(search);
    queryParams = data;
    this.setState({queryParams})
    history.push(`${pathname}?${qs.stringify(queryParams)}`)
  };

  onReadAllNoti = () =>{
    const {authInfo, onUpdateAll} = this.props;
    const {queryParams} = this.state;
    const data = {user : authInfo._id}
    onUpdateAll(data, queryParams)
  }

  onDeleteAllNoti = () =>{
    const {authInfo, onDeleteAll} = this.props;
    const {queryParams} = this.state;
    const id = authInfo._id
    onDeleteAll(id, queryParams)
  }

  onReadNoti = (id) =>{
    const {onUpdate} = this.props;
    const {queryParams} = this.state;
    const data = {
      active : false
    }
    onUpdate(id, data, queryParams)
  }

  onDeleteNoti = (id) =>{
    const {onDelete} = this.props;
    const {queryParams} = this.state;
    onDelete(id, queryParams)
  }

  render() {
    const {listNotification, location, t} = this.props;
    const filter = getFilterParams(location.search);
    return (
      <div className="bg-user-info py-4">
        <div className="container emp-profile p-0 mt-5 mb-2">
          <div className="row mx-3">
            <div className={filter.type===undefined ? "col-2 text-center py-3 bg-selected font-weight-bold" : "col-2 text-center py-3 font-weight-bold text-secondary"}
            onClick={() => this.handleUpdateFilter()}>
              Tất cả
            </div>
            {statusList.map((status, index)=>{
              return (
                <div key={index} className={filter.type===(index).toString() ? "col-2 text-center py-3 bg-selected font-weight-bold" : "col-2 text-center py-3 font-weight-bold text-secondary"} 
                onClick={() => this.handleUpdateFilter({type : index})}>
                  {status.name}
                </div>
              )
            })}
            <div className="col-6 text-right align-self-center">
              <button className="btn btn-primary mr-2" onClick={()=> this.onReadAllNoti()}>Đọc tất cả</button>
              <button className="btn btn-danger" onClick={()=> this.onDeleteAllNoti()}>Xóa tất cả</button>
            </div>
          </div>
        </div>
        <div className="container emp-profile py-3 my-2">
          {listNotification && listNotification.length>0 ? listNotification.map((notification, index) =>{
            return(
              <div className={notification.active === true ? "row h-120 rounded shadow-sm py-2 my-4 bg-active" : "row h-120 rounded shadow-sm py-2 my-4"} key={index}>
                <div className="col-1 text-center align-self-center">
                  <p className="mb-0 text-secondary">{new Date(notification.createdAt).toLocaleDateString("vi-VN")}</p>
                </div>
                <div className="col-2 text-center h-100">
                  <img className="h-100" src={notification.image ? notification.image.public_url : INITIAL_IMAGE} alt=""></img>
                </div>
                <div className="col-7 align-self-center">
            <p className="font-weight-bold">{notification.name}</p>
            <p className="mb-0 text-secondary">{notification.content}</p>
                </div>
                <div className="col-2 text-right align-self-center">
                  <button type="button" className="btn btn-success mr-2" onClick={()=> this.onReadNoti(notification._id)}>
                    <i className="fa fa-book-reader"></i>
                  </button>
                  <button type="button" className="btn btn-info" onClick={()=> this.onDeleteNoti(notification._id)}>
                    <i className="fa fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            )
          })
        : <div className="row my-1">
          <div className="col-12">
              <div className="text-center my-5 py-5">
                <div className="h-120">
                  <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/d3eb7b91baeb280516583f958b10f601.png" alt="404 not found"></img>
                </div>
                <p>Chưa có thông báo</p>
              </div>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    listNotification: state.notification.list,
    total : state.notification.total,
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
    onGetList: (payload) => {
      dispatch(NotificationActions.onGetList(payload))
    },
    onUpdate: (id, data, params) => {
      dispatch(NotificationActions.onUpdate(id, data, params))
    },
    onUpdateAll: (data, params) => {
      dispatch(NotificationActions.onUpdateAll(data, params))
    },
    onDelete: (id, params) => {
      dispatch(NotificationActions.onDelete(id, params))
    },
    onDeleteAll: (id, params) => {
      dispatch(NotificationActions.onDeleteAll(id, params))
    },
	}
};


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(NotificationPage);