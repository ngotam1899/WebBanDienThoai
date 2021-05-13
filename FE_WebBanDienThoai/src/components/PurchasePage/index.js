import React, { Component } from 'react'
import { connect } from "react-redux";
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
// Components
import OrderDetail from '../../containers/OrderDetail'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import numberWithCommas from '../../utils/formatPrice'
// @Actions
import OrdersActions from "../../redux/actions/order";
import ProductsActions from "../../redux/actions/products";

const statusList = [
  { 
    name: "Chờ xác nhận",
    state: {confirmed:-1,active:1},
  },{
    name: "Chờ giao hàng",
    state: {confirmed:1,status:-1}
  },{
    name: "Đang giao",
    state: {confirmed:1,status:0}
  },{
    name: "Đã giao",
    state: {confirmed:1,status:1}
  },{
    name: "Đã hủy",
    state: {active:-1}
  }
];

class PurchasePage extends Component {
  constructor(props){
    const {/* match, location, */ authInfo} = props;
    /*const filter = getFilterParams(location.search); */
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

  setStatus = (confirmed, status, active) => {
    if(active==false) return "Đã hủy"
    else{
      if(confirmed==false) return "Chờ xác nhận"
      else{
        if(status==-1) return "Chờ giao hàng";
        else if(status==0) return "Đang giao";
        else return "Đã giao";
      }
    }
  }

  onList = (type, state) => {
    this.handleUpdateFilter({ type, ...state });
  }

  onUpdateOrder = (id, params) => {
    const {onUpdate} = this.props;
    onUpdate(id, params);
  }
  onDeactivate = (id) => {
    const {t} = this.props;
    confirmAlert({
      title: t('user.popup.label'),
      message: t('user.delete.question'),
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
    window.location.reload();
  };

  // Button search
  searchKeyWorld = (e) => {
    const {keyword} = this.state;
    this.handleUpdateFilter({ keyword, page : 0});
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
    const {orderList, orderItem, location, history, t} = this.props;
    const {keyword} = this.state;
    const filter = getFilterParams(location.search);
    return (
      <div className="bg-user-info py-4">
        <div className="container emp-profile p-0 mt-5 mb-2">
          <div className="row mx-3">
            <div className={filter.type==0 || filter.type==undefined ? "col-2 text-center py-3 bg-selected" : "col-2 text-center py-3"} onClick={() => this.onList(0, null)}>
              Tất cả
            </div>
            {statusList.map((status, index)=>{
              return (
                <div key={index} className={filter.type==index+1 ? "col-2 text-center py-3 bg-selected" : "col-2 text-center py-3"} onClick={() => this.onList(index+1, status.state)}>
                  {status.name}
                </div>
              )
            })}
          </div>
        </div>
        <div className="container emp-profile py-3 my-2">
          <div className="row">
            <div className="col-12">
            <div className="input-group">
              <input type="text" className="form-control" name="keyword" value={keyword} onChange={this.onChange} placeholder={t('search.placeholder.input')}></input>
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
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <p className="float-left mb-0">Mã đơn hàng {order._id}</p>
                      <p className="float-right mb-0">| {this.setStatus(order.confirmed, order.status, order.active)}</p>
                    </div>
                    <div className="card-body">
                      {order.order_list.map((product, _index)=>{
                        return(
                          <div className="row h-120" key={_index}>
                          <div className="col-3 text-center h-100">
                            <img className="h-100" src={product.image}></img>
                          </div>
                          <div className="col-6 align-self-center ">
                            <p className="font-weight-bold mb-0">{product.name}</p>
                            <p className="font-italic mb-0">Màu sắc: {product.color && product.color.name_vn}</p>
                            <p className="mb-0">Số lượng {product.quantity}</p>
                          </div>
                          <div className="col-3 text-right">
                            <p>{numberWithCommas(product.quantity*product.price)} VND</p>
                          </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="card-footer">
                      <div className="float-left">
                        <button type="button" className="btn btn-success mr-2" data-toggle="modal" data-target="#myModal" onClick={()=> this.getInfoOrder(order._id)}>Xem chi tiết đơn hàng</button>
                        {this.setStatus(order.confirmed, order.status, order.active)==="Chờ xác nhận" && <button type="button" className="btn btn-danger" onClick={()=> this.onDeactivate(order._id)}>Hủy đơn hàng</button>}
                        {(this.setStatus(order.confirmed, order.status, order.active)==="Đã hủy" || this.setStatus(order.confirmed, order.status, order.active)==="Đã giao") && 
                        <button type="button" className="btn btn-warning" onClick={()=>this.onBuyAgain(order.order_list)}>Mua lần nữa</button>}
                      </div>
                      <div className="float-right font-weight-bold">
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
                  <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png"></img>
                </div>
                
                <p>Chưa có đơn hàng</p>
              </div>
            </div>}
          </div>
          
        </div>
        <OrderDetail orderItem={orderItem} history={history}/>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    orderList: state.order.list,
    orderItem: state.order.detail
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
    onUpdate : (id, params) =>{
			dispatch(OrdersActions.onUpdate(id, params))
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