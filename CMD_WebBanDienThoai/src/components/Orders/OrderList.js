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
    }
  }
  UNSAFE_componentWillMount() {
    const { onClearState, onGetList, location } = this.props;
    const filters = getFilterParams(location.search);
    var params = {
      //...filter,
      ...filters
    };
    onClearState();
    onGetList(params);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const filters = getFilterParams(this.props.location.search);
      //const { filter } = this.state;
      var params = {
        //...filter,
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
    const {listOrder, orderDetail, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách đơn hàng</h5>
                <form>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" value={phone} name="phone" placeholder="Search" onChange={this.onChange}/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" onClick={() => this.searchPhone()} type="submit">Search</button>
                    </div>
                  </div>
                </form>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listOrder}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
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
