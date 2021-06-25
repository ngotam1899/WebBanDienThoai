import React, { Component }  from 'react'
import { connect } from "react-redux";
import qs from "query-string";
// @Components
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
// @Actions
import NotificationActions from "../../redux/actions/notification";
// @Function
import getFilterParams from "../../utils/getFilterParams";

const fields = ['date', 'user', 'content',{ key: 'actions', _style: { width: '10%'} }]

class NotificationList extends Component {
  constructor(props) {
    super(props);
    const {authInfo} = props;
    this.state = {
      queryParams: {},
      filter: {
        limit: 10,
        page: 0,
        admin: authInfo && authInfo._id
      },
    }
  }

  componentDidMount() {
    const {filter} = this.state;
    const { onGetList, location } = this.props;
    const filters = getFilterParams(location.search);
    var params = {
      ...filter,
      ...filters
    };
    this.setState({queryParams: params})
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
    this.setState({queryParams})
    history.push(`${pathname}?${qs.stringify(queryParams)}`);
  };

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

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

  onDeleteNoti = (id) =>{
    const {onDelete} = this.props;
    const {queryParams} = this.state;
    onDelete(id, queryParams)
  }

  render () {
    const {listNotification, total, location} = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Thông báo</h5>
                <CButton
                  onClick={() => this.onDeleteAllNoti()}
                  className="mb-1 float-right"
                  color="danger"
                > Xóa tất cả
                </CButton>
                <CButton
                  onClick={() => this.onReadAllNoti()}
                  className="mb-1 mr-2 float-right"
                  color="info"
                > Đọc tất cả
                </CButton>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listNotification}
                  fields={fields}
                  hover
                  striped
                  bordered
                  scopedSlots = {{
                    'date': (item) => (
                      <td>{new Date(item.createdAt).toLocaleDateString("vi-VN")}</td>
                    ),
                    'user': (item) => (
                      <td><img src={item.image.public_url} style={{width:'8vw'}} className="rounded-circle" alt={item.image._id}></img></td>
                    ),
                    'content': (item) => (
                      <td>
                        <p className="font-weight-bold">{item.name}</p>
                        <p>{item.content}</p>
                      </td>
                    ),
                    'actions':
                    (item)=>(
                      <td>
                        <CButton
                          onClick={() => this.onDeleteNoti(item._id)}
                          className="mr-1"
                          color="warning"
                        >
                          Xóa
                        </CButton>
                      </td>)
                  }}
                />
              </CCardBody>
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
            </CCard>
          </CCol>
        </CRow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listNotification: state.notification.list,
    total : state.notification.total,
    authInfo: state.auth.detail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (payload) => {
      dispatch(NotificationActions.onGetList(payload))
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
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList)
