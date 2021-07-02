import React, { Component }  from 'react'
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CRow,
} from '@coreui/react'
import Pagination from "react-js-pagination";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import qs from "query-string";
// @Actions
import UsersActions from "../../redux/actions/user";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
const fields = ['first name', 'last name', 'email', 'role',{ key: 'actions', _style: { width: '40%'} }]

class UserList extends Component {
  constructor(props) {
    const {location} = props;
    const filter = getFilterParams(location.search);
    super(props);
    this.state = {
      queryParams: {},
      phone: filter.phone ===null ? "" : filter.phone,
      large: false,
      filter: {
        limit: 10,
        page: 0,
      },
    }
  }
  componentDidMount() {
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

  setLarge = (large) => {
    this.setState({
      large
    })
  }

  onSubmit = (id, role) => {
    confirmAlert({
      title: 'Thông báo',
      message: `Bạn có thực sự muốn thay đổi vai trò người dùng này?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.onChangeRole(id, role)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  onChangeRole = (id, role)=>{
    const {onUpdate} = this.props;
    if(role === "1"){
      onUpdate(id, { role : 0 });
    }
    else{
      onUpdate(id, { role : 1 });
    }
  }

  handleRedirect = (id, pathname) =>{
    const { history } = this.props;
    history.push(`${pathname}?user=${id}`);
  }

  onDetail = (large, item) =>{
    const { onGetDetail } = this.props;
    this.setState({
      large
    })
    if(item){onGetDetail(item)}
  }

  onClose = (large) =>{
    const { onClearDetail } = this.props;
    this.setState({
      large
    })
    onClearDetail();
  }

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
      phone: "",
      page: 0,
    }
    history.push(`${pathname}?${qs.stringify(queryParams)}`)
    this.setState({
      phone: "",
    })
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

  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
  }

  render () {
    const { phone } = this.state;
    const { listUser, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách người dùng</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={phone} name="phone" placeholder="Nhập số điện thoại người nhận"
                  onChange={this.onChange} onKeyPress={this.pressKeyWord}/>
                  <div className="input-group-append">
                    <button type="button" className="btn btn-primary" onClick={() => this.searchPhone()} type="submit">Tìm kiếm</button>
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
                  items={listUser}
                  fields={fields}
                  hover
                  striped
                  bordered
                  scopedSlots = {{
                    'first name': (item) => (
                      <td>{item.firstname}</td>
                    ),
                    'last name': (item) => (
                      <td>{item.lastname}</td>
                    ),
                    'email': (item) => (
                      <td>{item.email}</td>
                    ),
                    'role': (item) => (
                      <td>{item.role ==="0" ? "User, Admin" : "User"}</td>
                    ),
                    'actions':
                    (item)=>(
                      <td>
                        <CButton
                          onClick={() => this.handleRedirect(item._id, '/users/order-manage')}
                          className="mr-1 mb-1 mb-xl-0"
                          color="success"
                        >
                          Đơn mua
                        </CButton>
                        <CButton
                          onClick={() => this.handleRedirect(item._id, '/users/review-manage')}
                          className="mr-1 mb-1 mb-xl-0"
                          color="primary"
                        >
                          Bình luận
                        </CButton>
                        <CButton
                          onClick={() => this.handleRedirect(item._id, '/users/installment-manage')}
                          className="mr-1 mb-1 mb-xl-0"
                          color="warning"
                        >
                          Trả góp
                        </CButton>
                        <CButton
                          onClick={() => this.onSubmit(item._id, item.role)}
                          className={item.role === "1" ? "mr-1 mb-1 mb-xl-0 bg-orange" : "mr-1 mb-1 mb-xl-0 bg-purple"}
                        >
                          {item.role === "1" ? "Nâng cấp" : "Hạ cấp"}
                        </CButton>
                      </td>)
                  }}
                />
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
    listUser: state.user.list,
    total: state.user.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(UsersActions.onGetList(params))
    },
    onUpdate: (id, data, params) => {
      dispatch(UsersActions.onUpdate(id, data, params))
    },
    onClearState: () =>{
      dispatch(UsersActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(UsersActions.onClearDetail())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
