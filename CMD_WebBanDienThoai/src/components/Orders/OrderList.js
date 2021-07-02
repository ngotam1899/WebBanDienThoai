import React, { Component }  from 'react'
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import qs from "query-string";
// @Components
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CRow,
  CImg,
  CBadge
} from '@coreui/react'
import OrderDetail from './OrderDetail'
import Pagination from "react-js-pagination";
// @Actions
import OrderActions from "../../redux/actions/order";
// @Function
import getFilterParams from "../../utils/getFilterParams";
import {INITIAL_IMAGE} from '../../constants';
const fields = ['Date of create', 'user','Payment Status','Bill Status','Payment Method','Total','actions']


class OrderList extends Component {
  constructor(props) {
    super(props);
    const {location} = props;
    const filter = getFilterParams(location.search);
    this.state = {
      queryParams: {},
      large: false,
      phone: filter.phone ===null ? "" : filter.phone,
      filter: {
        limit: 10,
        page: 0,
        active: 1
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
    this.setState({queryParams: params})
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
      this.setState({queryParams: params})
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
  searchPhone = () => {
    const {phone} = this.state;
    this.handleUpdateFilter({ phone });
  }

  pressKeyWord = (event) => {
    if(event.key === 'Enter') this.searchPhone();
  }

  destroyFilter = () => {
    const {location, history} = this.props;
    const {pathname} = location;
    var queryParams = {
      active: '',
      phone: '',
      page: 0,
      confirmed: '',
      paid: '',
      status: '',
      payment_method: ''
    }
    history.push(`${pathname}?${qs.stringify(queryParams)}`)
    this.setState({
      phone: "",
    })
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

  setStatus = (status) => {
    switch(status){
      case -1:
        return <CBadge color="danger" className="float-right">Chưa giao</CBadge>
      case 0:
        return <CBadge color="warning" className="float-right">Đang giao</CBadge>
      case 1:
        return <CBadge color="success" className="float-right">Đã giao</CBadge>
      default:
        return <CBadge color="warning" className="float-right">Đang giao</CBadge>
    }
  }

  render () {
    const {large, phone, queryParams} = this.state;
    const {listOrder, orderDetail, total, location,} = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách đơn hàng</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={phone} name="phone" placeholder="Nhập số điện thoại người nhận"
                  onChange={this.onChange} onKeyPress={this.pressKeyWord}/>
                  <div className="input-group-append">
                    <button type="button" className="btn btn-primary" onClick={() => this.searchPhone()} type="submit">Tìm kiếm</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 col-md-3">
                    <div className="card bg-danger">
                      <div className="p-2">
                        <b className="text-white">Tình trạng đơn hàng</b>
                        <select className="form-control mt-2" value={filter.confirmed} name="confirmed" onChange={this.handleChangeFilter}>
                          <option key={-1} value="">Chọn tình trạng đơn</option>
                          <option value="1">Đã xác nhận đơn hàng</option>
                          <option value="-1">Chưa xác nhận đơn hàng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card bg-warning">
                      <div className="p-2">
                        <b className="text-white">Tình trạng thanh toán</b>
                        <select className="form-control mt-2" value={filter.paid} name="paid" onChange={this.handleChangeFilter}>
                          <option key={-1} value="">Chọn tình trạng thanh toán</option>
                          <option value="1">Đã thanh toán</option>
                          <option value="-1">Chưa thanh toán</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card bg-success">
                      <div className="p-2">
                        <b className="text-white">Tình trạng hàng</b>
                        <select className="form-control mt-2" value={filter.status} name="status" onChange={this.handleChangeFilter}>
                          <option key={-1} value="">Chọn tình trạng hàng</option>
                          <option value="1">Đã giao hàng</option>
                          <option value="0">Đang giao hàng</option>
                          <option value="-1">Chưa giao hàng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card bg-primary">
                      <div className="p-2">
                        <b className="text-white">Phương thức thanh toán</b>
                        <select className="form-control mt-2" value={filter.payment_method} name="payment_method" onChange={this.handleChangeFilter}>
                          <option key={-1} value="">Chọn phương thức thanh toán</option>
                          <option value="local">Thanh toán sau nhận hàng</option>
                          <option value="paypal">Thanh toán qua Paypal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="float-left font-italic my-2">Có tất cả {total} kết quả tìm kiếm</p>
                    <CButton
                      className="ml-2 float-left"
                      onClick={()=> this.destroyFilter()}
                      color="info"
                    > <i className="fa fa-eraser mr-1"></i>
                      Xóa tất cả bộ lọc
                    </CButton>
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
                      <td>{new Date(item.createdAt).toLocaleDateString("vn-VN")}</td>
                    ),
                    'user': (item) => (
                      <td className="text-center">
                        {item.user && <><div className="c-avatar">
                          <CImg
                            src={item.user.image ? item.user.image.public_url : INITIAL_IMAGE}
                            className="c-avatar-img"
                            alt={item.user._id}
                          />
                        </div>
                        <p className="mb-0">{item.user.firstname} {item.user.lastname}</p>
                        <p className="mb-0">({item.shipping_phonenumber})</p></>}
                      </td>
                    ),
                    'Payment Method': (item) => (
                      <td>{item.payment_method=== "local" ? '(COD) Tiền mặt' : 'Paypal'}</td>
                    ),
                    'Payment Status': (item) => (
                      <td className="text-center">{item.paid=== true
                        ? <CBadge color="success" className="float-right">Đã thanh toán</CBadge>
                        : <CBadge color="warning" className="float-right">Chưa thanh toán</CBadge>}</td>
                    ),
                    'Bill Status': (item) => (
                      <td className="text-center">{this.setStatus(item.status)}</td>
                    ),
                    'Total': (item) => (
                      <td>{item.total_price} VND</td>
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
                      </td>)
                  }}
                />
                {(orderDetail && large) && <OrderDetail large={large} order={orderDetail} onClose={this.onClose} queryParams={queryParams}/>}
                {(!orderDetail && large) && <OrderDetail large={large} onClose={this.onClose} queryParams={queryParams}/>}
              </CCardBody>
              <div className="row justify-content-center">
              {total && <Pagination
                  activePage={filter.page ? parseInt(filter.page)+1 : 1}
                  itemsCountPerPage={this.state.filter.limit}
                  totalItemsCount={total}
                  pageRangeDisplayed={2}
                  linkClass="page-link"
                  itemClass="page-item"
                  prevPageText="Previous"
                  nextPageText="Next"
                  hideFirstLastPages={true}
                  onChange={this.handlePageChange.bind(this)}
                />}
              </div>
            </CCard>
          </CCol>
        </CRow>
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
    onDelete: (id, params) =>{
      dispatch(OrderActions.onDelete(id, params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
