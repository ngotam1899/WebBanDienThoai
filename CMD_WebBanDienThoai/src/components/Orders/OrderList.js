import React, { Component }  from 'react'
import { get } from "lodash";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import qs from "query-string";
// @Components
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody, Collapse } from 'reactstrap';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CRow,
} from '@coreui/react'
import OrderDetail from './OrderDetail'
import Pagination from "react-js-pagination";
// @Actions
import OrderActions from "../../redux/actions/order";
// @Function
import getFilterParams from "../../utils/getFilterParams";

const fields = ['Date of create', 'Phone','Payment Status','Bill Status','Payment Method','Total','actions']


class OrderList extends Component {
  constructor(props) {
    super(props);
    const {match, location} = props;
    const filter = getFilterParams(location.search);
    this.state = {
      large: false,
      phone: filter.phone ===null ? "" : filter.phone,
      filter: {
        limit: 5,
        page: 0,
      },
    }
  }
  UNSAFE_componentWillMount() {
    const { onClearState, onGetList, location } = this.props;
    const filters = getFilterParams(location.search);
    const { filter } = this.state;
    var params = {
      ...filter,
      ...filters
    };
    onClearState();
    onGetList(params);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const filters = getFilterParams(this.props.location.search);
      const { filter } = this.state;
      var params = {
        ...filter,
        ...filters
      };
      this.props.onGetList(params);
    }
  }

  // Chuyển router (thêm vào params)
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

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  // Button search
  searchPhone = (e) => {
    const {phone} = this.state;
    this.handleUpdateFilter({ phone });
  }



  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa brand này?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.onDelete(id)
        },
        {
          label: 'No'
        }
      ]
    });
  };
  setLarge = (large) => {
    this.setState({
      large
    })
  }

  onDelete = (_id)=>{
    const {onDelete} = this.props;
    onDelete(_id);
  }

  onUpdate = (large, item) =>{
    const { onGetDetail } = this.props;
    this.setState({
      large
    })
    if(item){onGetDetail(item)}
  }

  handleChangeFilter = (event) => {
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.handleUpdateFilter({ [name]:  value});
  }

  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
  }

  onClose = (large) =>{
    const { onClearDetail } = this.props;
    this.setState({
      large
    })
    onClearDetail();
  }

  render () {
    const {large, phone} = this.state;
    const {listOrder, orderDetail, onClearDetail, total, location,} = this.props;
    const filter = getFilterParams(location.search);
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách đơn hàng</h5>
                <form>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" value={phone} name="phone" placeholder="Nhập số điện thoại người nhận" onChange={this.onChange}/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" onClick={() => this.searchPhone()} type="submit">Tìm kiếm</button>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col">
                    <p className="float-left" style={{fontStyle: 'italic'}}>Có tất cả {total} kết quả tìm kiếm</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="card bg-danger">
                      <div className="p-2">
                        <b className="text-white">Tình trạng đơn hàng</b>
                        <select className="form-control mt-2" value={filter.confirmed} name="confirmed" onChange={this.handleChangeFilter}>
                          <option key={-1} value="0">Chọn tình trạng đơn</option>
                          <option value="1">Đã xác nhận đơn hàng</option>
                          <option value="-1">Chưa xác nhận đơn hàng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="card bg-warning">
                      <div className="p-2">
                        <b className="text-white">Tình trạng thanh toán</b>
                        <select className="form-control mt-2" value={filter.is_paid} name="is_paid" onChange={this.handleChangeFilter}>
                          <option key={-1} value="0">Chọn tình trạng thanh toán</option>
                          <option value="1">Đã thanh toán</option>
                          <option value="-1">Chưa thanh toán</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="card bg-success">
                      <div className="p-2">
                        <b className="text-white">Tình trạng hàng</b>
                        <select className="form-control mt-2" value={filter.status} name="status" onChange={this.handleChangeFilter}>
                          <option key={-1} value="0">Chọn tình trạng hàng</option>
                          <option value="1">Đã nhận hàng</option>
                          <option value="-1">Chưa nhận hàng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listOrder}
                  fields={fields}
                  hover
                  striped
                  bordered
                  scopedSlots = {{
                    'Date of create': (item) => (
                      <td>{item.createdAt}</td>
                    ),
                    'Phone': (item) => (
                      <td>{item.shipping_phonenumber}</td>
                    ),
                    'Payment Method': (item) => (
                      <td>{item.payment_method=== "local" ? '(COD) Tiền mặt' : 'Paypal'}</td>
                    ),
                    'Payment Status': (item) => (
                      <td>{item.is_paid== true ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                    ),
                    'Bill Status': (item) => (
                      <td>{item.status== true ? 'Đã giao hàng' : 'Chưa giao hàng'}</td>
                    ),
                    'Total': (item) => (
                      <td>{item.total_price}</td>
                    ),
                    'actions':
                    (item)=>(
                      <td>
                        <Button id={`UncontrolledPopover${item._id}`} type="button">
                          <i className="fa fa-chevron-circle-down"></i>
                        </Button>
                        <UncontrolledPopover trigger="focus" placement="bottom" target={`UncontrolledPopover${item._id}`}>
                          <PopoverHeader>Các tác vụ</PopoverHeader>
                          <PopoverBody>
                            <CButton
                            onClick={() => this.onUpdate(!large, item._id)}
                            className="mr-1 mb-1 mb-xl-0"
                            color="warning"
                          >
                            Sửa
                          </CButton>
                          <CButton
                            onClick={() => this.submit(item._id)}
                            className="mr-1"
                            color="danger"
                          >
                            Hủy đơn
                          </CButton>
                          </PopoverBody>
                        </UncontrolledPopover>
                      </td>
                      /* {
                        <td>
                        <CButton
                          onClick={() => this.onUpdate(!large, item._id)}
                          className="mr-1 mb-1 mb-xl-0"
                          color="warning"
                        >
                          Sửa
                        </CButton>
                        <CButton
                          onClick={() => this.submit(item._id)}
                          className="mr-1"
                          color="danger"
                        >
                          Hủy đơn
                        </CButton>
                      </td> }*/)
                  }}
                />
                {(orderDetail && large) && <OrderDetail large={large} order={orderDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}
                />}

                {(!orderDetail && large) && <OrderDetail large={large} order={orderDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}
                />}
              </CCardBody>
              <div className="row justify-content-center">
              <Pagination
                  activePage={filter.page ? parseInt(filter.page)+1 : 1}
                  itemsCountPerPage={4}
                  totalItemsCount={total}
                  pageRangeDisplayed={3}
                  linkClass="page-link"
                  itemClass="page-item"
                  prevPageText="Previous"
                  nextPageText="Next"
                  hideFirstLastPages="true"
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listOrder: state.order.list,
    orderDetail: state.order.detail,
    total: state.order.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(OrderActions.onGetList(params))
    },
    onClearState: () =>{
      dispatch(OrderActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(OrderActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(OrderActions.onGetDetail(id))
    },
    onDelete: (id) =>{
      dispatch(OrderActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
