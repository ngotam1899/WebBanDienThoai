import React, { Component } from 'react'
import { connect } from "react-redux";
import { compose } from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
// @Components
import Pagination from "react-js-pagination";
import OrderDetail from '../../containers/OrderDetail'
import InstallmentDetail from '../../containers/InstallmentDetail'
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import {INITIAL_IMAGE} from '../../constants';
// @Actions
import NotificationActions from "../../redux/actions/notification";
import InstallmentActions from "../../redux/actions/installment";
import OrdersActions from "../../redux/actions/order";

const statusList = [
  { 
    name: "Đơn hàng",
    name_en: "Purchase"
  },
  {
    name: "Khuyến mãi",
    name_en: "Promotion"
  },
  {
    name: "Trả góp",
    name_en: "Installment"
  }
];

class NotificationPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: "",
      filter: {
        limit: 10,
        page: 0,
      },
      queryParams: {
        limit: 10,
        page: 0,
      },
      type: 2,
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

  onReadNoti = (id, type, link) =>{
    const { onUpdate, history, onGetDetailInstallment, onGetDetailOrder } = this.props;
    const { queryParams } = this.state;
    const data = {
      active : false
    }
    switch(type){
      case 0:
        this.setState({type})
        onGetDetailOrder(link);
        break;
      case 1:
        history.push(link.replace("https://localhost:5000/#", ""))
        break;
      case 2:
        this.setState({type})
        onGetDetailInstallment(link);
        break;
      default:
        return null
    }
    onUpdate(id, data, queryParams)
  }
  
  // phân trang
  handlePageChange = (pageNumber) => {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  onDeleteNoti = (id) =>{
    const {onDelete} = this.props;
    const {queryParams} = this.state;
    onDelete(id, queryParams)
  }

  setModal = (type) => {
    switch(type){
      case 0:
        return "#orderModal"
      case 1:
        return ""
      case 2:
        return "#myModal"
      default:
        return ""
    }
  }

  render() {
    const { listNotification, location, t, installmentItem, orderItem, history, total, language } = this.props;
    const filter = getFilterParams(location.search);
    return (
      <div className="bg-user-info py-4">
        <div className="container emp-profile p-0 mt-5 mb-2">
          <div className="row mx-3">
            <div className={filter.type===undefined ? "col-2 text-center pt-1 bg-selected font-weight-bold " : "col-2 text-center pt-1 font-weight-bold text-secondary"}
            onClick={() => this.handleUpdateFilter()}>
              <div className={`${filter.type!==undefined && "rounded directory"} py-3`}>{t('common.all')}</div>
            </div>
            {statusList.map((status, index)=>{
              return (
                <div key={index} className={filter.type===(index).toString() ? "col-2 text-center pt-1 bg-selected font-weight-bold" : "col-2 text-center pt-1 font-weight-bold text-secondary"} 
                onClick={() => this.handleUpdateFilter({type : index})}>
                  <div className={`${filter.type!==(index).toString() && "rounded directory"} py-3`}>{language==="vn" ? status.name : status.name_en}</div>
                </div>
              )
            })}
            <div className="col-4 text-right align-self-center">
              <button className="btn btn-primary mr-2" onClick={()=> this.onReadAllNoti()}>{t('notification.read-all.button')}</button>
              <button className="btn btn-danger" onClick={()=> this.onDeleteAllNoti()}>{t('notification.delete-all.button')}</button>
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
                  <button type="button" className="btn btn-success mr-2" 
                  data-bs-toggle={notification.type === 1 ? "" : "modal"} data-bs-target={this.setModal(notification.type)} 
                  onClick={()=> this.onReadNoti(notification._id, notification.type, notification.link)}>
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
                  <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/fa4e2b534c2928596a6deded9c730a21.png" alt="404 not found"></img>
                </div>
                <p>{t('header.notification.empty')}</p>
              </div>
            </div>
          </div>}
        </div>
        <InstallmentDetail installmentItem={installmentItem} history={history}/>
        <OrderDetail orderItem={orderItem} history={history}/>
        <div className="content-center">
          {total && total > 8 && <Pagination
            activePage={filter.page ? parseInt(filter.page)+1 : 1}
            itemsCountPerPage={8}
            totalItemsCount={total ? total : 8}
            pageRangeDisplayed={3}
            linkClass="page-link"
            itemClass="page-item"
            prevPageText={t('shop.pagination.prev')}
            nextPageText={t('shop.pagination.next')}
            hideFirstLastPages={true}
            onChange={this.handlePageChange.bind(this)}
          />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    language: state.language,
    authInfo: state.auth.detail,
    listNotification: state.notification.list,
    total : state.notification.total,
    installmentItem: state.installment.detail,
    orderItem: state.order.detail
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
    onGetList: (payload) => {
      dispatch(NotificationActions.onGetList(payload))
    },
    onGetDetailInstallment: (id) => {
      dispatch(InstallmentActions.onGetDetail(id))
    },
    onGetDetailOrder: (id) => {
      dispatch(OrdersActions.onGetDetail(id))
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