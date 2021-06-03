import React, { Component } from 'react'
import { connect } from "react-redux";
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
// Components
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// @Functions
import getFilterParams from "../../utils/getFilterParams";
// @Actions
import NotificationActions from "../../redux/actions/notification";

const statusList = [
  { 
    name: "Khuyến mãi",
  },{
    name: "Đơn hàng",
  }
];

class NotificationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: "",
      filter: {
        limit: 12,
        page: 0,
      },
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
      if(props.authInfo)onGetList(params);
    }
  }

  handleUpdateFilter = (data) => {
    const {location, history} = this.props;
    const {pathname, search} = location;
    let queryParams = getFilterParams(search);
    queryParams = data;
    history.push(`${pathname}?${qs.stringify(queryParams)}`);
    window.location.reload();
  };

  render() {
    const {orderList, orderItem, location, history, t} = this.props;
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
              <button className="btn btn-primary mr-2">Đọc tất cả</button>
              <button className="btn btn-danger">Xóa tất cả</button>
            </div>
          </div>
        </div>
        <div className="container emp-profile py-3 my-2">
          <div className="row">
            <div className="col-12">
            
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    listNotification: state.notification.list,
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
    onGetList: (payload) => {
      dispatch(NotificationActions.onGetList(payload))
    },
    onUpdate: (id, data) => {
      dispatch(NotificationActions.onUpdate(id, data))
    },
    onUpdateAll: (data) => {
      dispatch(NotificationActions.onUpdateAll(data))
    },
    onDelete: (id) => {
      dispatch(NotificationActions.onUpdate(id))
    },
    onDeleteAll: (id) => {
      dispatch(NotificationActions.onDeleteAll(id))
    },
	}
};


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(NotificationPage);