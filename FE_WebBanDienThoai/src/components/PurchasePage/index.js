import React, { Component } from 'react'
import { connect } from "react-redux";
import { compose } from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
// Components
import OrderDetail from '../../containers/OrderDetail'
import Pagination from "react-js-pagination";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import numberWithCommas from '../../utils/formatPrice'
import { INITIAL_IMAGE } from '../../constants';
import { toastError } from '../../utils/toastHelper';
// @Actions
import OrdersActions from "../../redux/actions/order";
import ProductsActions from "../../redux/actions/products";

const statusList = [
  { 
    name: "Chờ xác nhận",
    name_en: "Pending",
    state: {confirmed:-1,active:1},
  },{
    name: "Chờ giao hàng",
    name_en: "Not delivery yet",
    state: {confirmed:1,status:-1}
  },{
    name: "Đang giao",
    name_en: "Delivering",
    state: {confirmed:1,status:0}
  },{
    name: "Đã giao",
    name_en: "Delivered",
    state: {confirmed:1,status:1}
  },{
    name: "Đã hủy",
    name_en: "Cancelled",
    state: {active:-1}
  }
];

class PurchasePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      queryParams: {},
      keyword: "",
      filter: {
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

  setStatus = (confirmed, status, active) => {
    const {t} = this.props;
    if(active===false) return t("order.status.5")
    else{
      if(confirmed===false) return t("order.status.1")
      else{
        if(status===-1) return t("order.status.2");
        else if(status===0) return t("order.status.3");
        else return t("order.status.4");
      }
    }
  }

  onList = (type, state) => {
    this.handleUpdateFilter({ type, ...state });
  }

  onUpdateOrder = (id, data) => {
    const { onUpdate } = this.props;
    const { queryParams } = this.state;
    onUpdate(id, data, queryParams);
  }

  onDeactivate = (id) => {
    const {t} = this.props;
    confirmAlert({
      title: t('order.popup.label'),
      message: t('order.delete.question'),
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.onUpdateOrder(id, {active: false})
        },
        {
          label: 'No'
        }
      ]
    });
  };

  handleUpdateFilter = (data) => {
    const {location, history} = this.props;
    const {pathname, search} = location;
    let queryParams = getFilterParams(search);
    queryParams = data;
    history.push(`${pathname}?${qs.stringify(queryParams)}`);
  };

  pressSearch = (event) => {
    const { keyword } = this.state;
    const { t } = this.props;
    if(event.key === 'Enter'){
      if(keyword === "") return toastError(t("header.toastify.search"))
      this.handleUpdateFilter({ keyword, page : 0 });
    }
  }

  // Button search
  searchKeyWorld = () => {
    const { keyword } = this.state;
    const { t } = this.props;
    if(keyword === "") return toastError(t("header.toastify.search"))
    this.handleUpdateFilter({ keyword, page : 0 });
  }

  // phân trang
  handlePageChange = (pageNumber) => {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  getInfoOrder = (id) => {
    const {onGetDetail} = this.props;
    onGetDetail(id);
  }

  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
  }

  onBuyAgain = (order_list) =>{
    const {onPurchaseAgain} = this.props;
    onPurchaseAgain(order_list)
  }

  render() {
    const { orderList, orderItem, location, history, t, total, language } = this.props;
    const { keyword } = this.state;
    const filter = getFilterParams(location.search);
    return (
      <div className="bg-user-info py-4">
        <div className="container emp-profile p-0 mt-5 mb-2">
          <div className="row mx-3">
            <div className={filter.type==="0" || filter.type===undefined ? "col-2 text-center pt-1 bg-selected font-weight-bold" : "col-2 text-center pt-1 font-weight-bold text-secondary"} 
            onClick={() => this.onList(0, null)}>
              <div className={`${filter.type!=="0" && filter.type!==undefined && "rounded directory"} py-3`}>{t('common.all')}</div>
            </div>
            {statusList.map((status, index)=>{
              return (
                <div key={index} className={filter.type===(index+1).toString() ? "col-2 text-center pt-1 bg-selected font-weight-bold" : "col-2 text-center pt-1 font-weight-bold text-secondary"} 
                onClick={() => this.onList(index+1, status.state)}>
                  <div className={`${filter.type!==(index+1).toString() && "rounded directory"} py-3`}>{language=== "vn" ? status.name : status.name_en}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="container emp-profile py-3 my-2">
          <div className="row">
            <div className="col-12">
            <div className="input-group">
              <input type="text" className="form-control" name="keyword" value={keyword} onChange={this.onChange} onKeyPress={this.pressSearch} placeholder={t('search.placeholder.input')}></input>
              <div className="input-group-append">
                <button className="btn btn-danger h-100" onClick={() => this.searchKeyWorld()}>{t('shop.search.button')}</button>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div className="container emp-profile py-3 mt-2 mb-5">
          <div className="row">
            {orderList && orderList.length > 0 ? orderList.map((order, index) =>{
              return (
                <div className="col-12 my-1" key={index}>
                  <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                      <p className="float-start mb-0">{t('order.card.header')} {order._id}</p>
                      <p className="float-end mb-0">| {this.setStatus(order.confirmed, order.status, order.active)}</p>
                    </div>
                    <div className="card-body">
                      {order.order_list.map((product, _index)=>{
                        return(
                          <div className="row h-120" key={_index}>
                          <div className="col-3 text-center h-100">
                            <img className="h-100" src={product.image ? product.image : INITIAL_IMAGE} alt={product.name}></img>
                          </div>
                          <div className="col-6 align-self-center ">
                            <p className="font-weight-bold mb-0">{product.name}</p>
                            <p className="font-italic mb-0">{t('common.color')} {product.color && product.color.name_vn}</p>
                            <p className="mb-0">{t('order.amount.label')} {product.quantity}</p>
                          </div>
                          <div className="col-3 text-right">
                            <p>{numberWithCommas(product.quantity*product.price)} VND</p>
                          </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="card-footer">
                      <div className="float-start">
                        <button type="button" className="btn btn-success mr-2" data-bs-toggle="modal" data-bs-target="#orderModal" onClick={()=> this.getInfoOrder(order._id)}>{t('common.detail.button')}</button>
                        {this.setStatus(order.confirmed, order.status, order.active)==="Chờ xác nhận" && <button type="button" className="btn btn-danger" onClick={()=> this.onDeactivate(order._id)}>{t('common.destroy.button')}</button>}
                      </div>
                      <div className="float-end font-weight-bold">
                        {numberWithCommas(order.total_price)} VND
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          : <div className="col-12 my-1">
              <div className="text-center my-5 py-5">
                <div className="h-120">
                  <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png" alt="404 not found"></img>
                </div>
                <p>{t('order.not-yet')}</p>
              </div>
            </div>}
          </div>
          
        </div>
        
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
    authInfo: state.auth.detail,
    orderList: state.order.list,
    orderItem: state.order.detail,
    total: state.order.total,
    language: state.language
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
    onGetList: (payload) => {
      dispatch(OrdersActions.onGetList(payload))
    },
    onGetDetail: (id) => {
      dispatch(OrdersActions.onGetDetail(id))
    },
    onUpdate : (id, data, params) =>{
			dispatch(OrdersActions.onUpdate(id, data, params))
    },
    onPurchaseAgain: (order_list) => {
      dispatch(ProductsActions.onPurchaseAgain(order_list))
    },
	}
};


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(PurchasePage);