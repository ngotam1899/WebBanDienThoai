import React, { Component } from 'react'
import { connect } from "react-redux";
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
// Components
import InstallmentDetail from '../../containers/InstallmentDetail'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import numberWithCommas from '../../utils/formatPrice'
import {INITIAL_IMAGE} from '../../constants';
// @Actions
import InstallmentActions from "../../redux/actions/installment";

const statusList = [
  { 
    name: "Chờ duyệt",
    state: { status:-1, active:1 },
  },{
    name: "Chưa hoàn tất",
    state: { status:0, active:1 }
  },{
    name: "Đã hoàn tất",
    state: { status:1, active:1 }
  },{
    name: "Qúa hạn",
    state: { status:2, active:1 }
  },{
    name: "Đã hủy",
    state: { active:-1 }
  }
];

class UserInstallmentPage extends Component {
  constructor(props){
    super(props);
    this.state = {
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

  setStatus = (status, active) => {
    if(active===false) return "Đã hủy"
    else{
      switch(status) {
        case -1:
          return "Chờ duyệt"
        case 0:
          return "Chưa hoàn tất"
        case 1:
          return "Đã hoàn tất"
        case 2:
          return "Qúa hạn"
        default:
          return "Chờ duyệt"
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
          onClick: () => this.onUpdateOrder(id, {active: 'false'})
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

  render() {
    const {installmentList, installmentItem, location, history, t} = this.props;
    const filter = getFilterParams(location.search);
    return (
      <div className="bg-user-info py-4">
        <div className="container emp-profile p-0 mt-5 mb-2">
          <div className="row mx-3">
            <div className={filter.type==="0" || filter.type===undefined ? "col-2 text-center py-3 bg-selected font-weight-bold" : "col-2 text-center py-3 font-weight-bold text-secondary"} 
            onClick={() => this.onList(0, null)}>
              Tất cả
            </div>
            {statusList.map((status, index)=>{
              return (
                <div key={index} className={filter.type===(index+1).toString() ? "col-2 text-center py-3 bg-selected font-weight-bold" : "col-2 text-center py-3 font-weight-bold text-secondary"} 
                onClick={() => this.onList(index+1, status.state)}>
                  {status.name}
                </div>
              )
            })}
          </div>
        </div>
        <div className="container emp-profile py-3 mt-2 mb-5">
          <div className="row">
            {installmentList && installmentList.length > 0 ? installmentList.map((installment, index) =>{
              return (
                <div className="col-12 my-1" key={index}>
                  <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                      <p className="float-start mb-0">Mã phiếu trả góp {installment._id}</p>
                      <p className="float-end mb-0">| {this.setStatus(installment.status, installment.active)}</p>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6 col-md-3 text-center  h-120">
                          <img className="h-100" src={installment.product._id.bigimage ? installment.product._id.bigimage.public_url : INITIAL_IMAGE} alt={installment.product._id.name}></img>
                        </div>
                        <div className="col-6 col-md-3 align-self-center">
                          <p className="font-weight-bold mb-0">{installment.product._id.name}</p>
                          <p className="font-italic mb-0">Màu sắc: {installment.product.color && installment.product.color.name_vn}</p>
                          <p className="mb-0">Giá {numberWithCommas(installment.product.product_price)} VND</p>
                        </div>
                        <div className="col-6 col-md-3 align-self-center">
                          <div className="rounded bg-danger py-3 px-2 form-inline">
                            <div className="w-fit-content rounded-circle bg-white" style={{padding: "3px 8px"}}>
                              <i className="fa fa-coins text-lg text-danger"></i>
                            </div>
                            <div className="ml-3">
                              <h4 className="mb-0 font-weight-bold text-white ">Dư nợ</h4>
                              <p className="text-white mb-0">{installment.debt ? numberWithCommas(installment.debt) : 0} VND</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-md-3 align-self-center">
                          <div className="rounded bg-success py-3 px-2 form-inline">
                            <div className="w-fit-content rounded-circle bg-white" style={{padding: "3px 6px"}}>
                              <i className="fa fa-hand-holding-usd text-lg text-success"></i>
                            </div>
                            <div className="ml-3">
                              <h4 className="mb-0 font-weight-bold text-white ">Đã thanh toán</h4>
                              <p className="text-white mb-0">{installment.paid ? numberWithCommas(installment.paid): 0} VND</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="float-start">
                        <button type="button" className="btn btn-success mr-2" data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=> this.getInfoOrder(installment._id)}>Xem chi tiết phiếu trả góp</button>
                        {this.setStatus(installment.status, installment.active)==="Chờ duyệt" && <button type="button" className="btn btn-danger" onClick={()=> this.onDeactivate(installment._id)}>Hủy trả góp</button>}
                      </div>
                      <div className="float-end font-weight-bold">
                        {installment.startedAt && installment.endedAt 
                        ? <p>Từ {new Date(installment.startedAt).toLocaleDateString("vn-VN")} đến {new Date(installment.endedAt).toLocaleDateString("vn-VN")}</p>
                        : <p>Chưa duyệt</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          : <div className="col-12 my-1">
              <div className="text-center my-5 py-5">
                <div className="h-120">
                  <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/0e8c07c8449d8d509f72f5576f79a983.png" alt="404 not found"></img>
                </div>
                <p>Chưa có phiếu trả góp</p>
              </div>
            </div>}
          </div>
        </div>
        <InstallmentDetail installmentItem={installmentItem} history={history}/>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    installmentList: state.installment.list,
    installmentItem: state.installment.detail
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
    onGetList: (payload) => {
      dispatch(InstallmentActions.onGetList(payload))
    },
    onGetDetail: (id) => {
      dispatch(InstallmentActions.onGetDetail(id))
    },
    onUpdate: (id, params) =>{
      dispatch(InstallmentActions.onUpdate({id, params}))
    }
	}
};


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(UserInstallmentPage);