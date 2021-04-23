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

  onList = (type) => {
    switch (type) {
      case 0:
        this.handleUpdateFilter({  });
        break;
      case 1:
        this.handleUpdateFilter({ confirmed:-1 });
        break;
      case 2:
        this.handleUpdateFilter({ confirmed:1,status:-1 });
        break;
      case 3:
        this.handleUpdateFilter({ confirmed:1,status:0 });
        break;
      case 4:
        this.handleUpdateFilter({ confirmed:1,status:1 });
        break;
      case 5:
        this.handleUpdateFilter({ active:-1 });
        break;
      default:
        this.handleUpdateFilter({  });
        break;
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
    const {orderList} = this.props;
    return (
      <div className="bg-user-info py-4">
        <div className="container emp-profile p-0 mt-5 mb-2">
          <div className="row">
            <div className="col-2 text-center py-3" onClick={() => this.onList(0)}>
              Tất cả
            </div>
            <div className="col-2 text-center py-3" onClick={() => this.onList(1)}>
              Chờ xác nhận
            </div>
            <div className="col-2 text-center py-3" onClick={() => this.onList(2)}>
              Chờ giao hàng
            </div>
            <div className="col-2 text-center py-3" onClick={() => this.onList(3)}>
              Đang giao
            </div>
            <div className="col-2 text-center py-3" onClick={() => this.onList(4)}>
              Đã giao
            </div>
            <div className="col-2 text-center py-3" onClick={() => this.onList(5)}>
              Đã hủy
            </div>
          </div>
        </div>
        <div className="container emp-profile py-3 mt-2 mb-5">
          <div className="row">
            {orderList && orderList.map((order, index) =>{
              return (
                <div className="col-12 my-1" key={index}>
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <p className="float-left mb-0">Mã đơn hàng {order._id}</p>
                      <p className="float-right mb-0">| Đã giao</p>
                    </div>
                    <div className="card-body">
                      {order.order_list.map((product, _index)=>{
                        return(
                          <div className="row h-120" key={_index}>
                          <div className="col-3 text-center h-100">
                            <img className="h-100" src={product.image}></img>
                          </div>
                          <div className="col-6">
                            <p className="font-weight-bold">{product.name}</p>
                            <p className="font-italic">{product.color}</p>
                            <p >Số lượng {product.quantity}</p>
                          </div>
                          <div className="col-3 text-right">
                            <p>{product.quantity*product.price} VND</p>
                          </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="card-footer">
                      <div className="float-left">
                        <button className="btn btn-success">Xem chi tiết đơn hàng</button>
                      </div>
                      <div className="float-right font-weight-bold">
                        {order.total_price} VND
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    orderList: state.order.list,
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