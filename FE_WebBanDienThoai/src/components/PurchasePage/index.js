import React, { Component } from 'react'
import { connect } from "react-redux";
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import qs from "query-string";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
// @Actions
import OrderActions from "../../redux/actions/order";


class PurchasePage extends Component {
  constructor(props){
    const {/* match, location, */ authInfo} = props;
    /*const filter = getFilterParams(location.search); */
    super(props);
    this.state = {
      /* keyword: filter.keyword ===null ? "" : filter.keyword,
      min_p: filter.min_p ===null ? "" : filter.min_p,
      max_p: filter.max_p ===null ? "" : filter.max_p, */
      filter: {
        limit: 12,
        page: 0,
        /* active: 1, */
        user: authInfo && authInfo._id
      },

    }
  }

  componentDidMount(){
    document.title = "[TellMe] Trang bán hàng"
    const { onGetList, location } = this.props;
    const { filter } = this.state;
    const filters = getFilterParams(location.search);
    var params = {
      ...filter,
      ...filters
    };
    onGetList(params);
  }

  handleUpdateFilter = (data) => {
    const {location, history} = this.props;
    const {pathname, search} = location;
    let queryParams = getFilterParams(search);
    queryParams = {
      ...queryParams,
      ...data,
    };
    history.push(`${pathname}?${qs.stringify(queryParams)}`);
  };

  render() {
    return (
      <div className="bg-user-info py-4">
        <div className="container emp-profile p-0 mt-5 mb-2">
          <div className="row">
            <div className="col-2 text-center py-3">
              Tất cả
            </div>
            <div className="col-2 text-center py-3">
              Chờ xác nhận
            </div>
            <div className="col-2 text-center py-3">
              Chờ giao hàng
            </div>
            <div className="col-2 text-center py-3">
              Đang giao
            </div>
            <div className="col-2 text-center py-3">
              Đã giao
            </div>
            <div className="col-2 text-center py-3">
              Đã hủy
            </div>
          </div>
        </div>
        <div className="container emp-profile py-3 mt-2 mb-5">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <p className="float-left mb-0">Mã đơn hàng</p>
                  <p className="float-right mb-0">| Đã giao</p>
                </div>
                <div className="card-body">
                  <div className="row h-120">
                    <div className="col-3 text-center h-100">
                      <img className="h-100" src="https://css3menu.com/images/slider-img.png"></img>
                    </div>
                    <div className="col-6">
                      <p className="font-weight-bold">Iphone X 256GB</p>
                      <p className="font-italic">Màu xanh</p>
                      <p >Số lượng 1</p>
                    </div>
                    <div className="col-3 text-right">
                      <p>50000000 VND</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="float-left">
                    <button className="btn btn-success">Xem chi tiết đơn hàng</button>
                  </div>
                  <div className="float-right font-weight-bold">
                    1000000000 VND
                  </div>
                </div>
              </div>
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
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
    onGetList: (payload) => {
      dispatch(OrderActions.onGetList(payload))
    },
	}
};


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(PurchasePage);