import React, { Component }  from 'react'
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
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
import GroupDetail from './GroupDetail'
import Pagination from "react-js-pagination";
// @Actions
import GroupActions from "../../redux/actions/group";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
const fields = ['name', { key: 'actions', _style: { width: '15%'} }]

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: {},
      keyword: '',
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
  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa operation này?',
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
  onDelete = (_id)=>{
    const {queryParams} = this.state;
    const {onDelete} = this.props;
    onDelete(_id, queryParams);
  }

  onUpdate = (large, item) =>{
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
  searchKeyWorld = () => {
    const {keyword} = this.state;
    this.handleUpdateFilter({ keyword, page: 0});
  }

  pressKeyWord = (event) => {
    if(event.key === 'Enter') this.searchKeyWorld();
  }

  destroyFilter = () => {
    const {location, history} = this.props;
    const {pathname} = location;
    var queryParams = {
      keyword: "",
      page: 0,
    }
    history.push(`${pathname}?${qs.stringify(queryParams)}`)
    this.setState({
      keyword: "",
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
    const { large, keyword, queryParams } = this.state;
    const { listGroup, groupDetail, onClearDetail, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách nhóm sản phẩm</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={keyword} name="keyword" placeholder="Nhập nhóm sản phẩm"
                  onChange={this.onChange} onKeyPress={this.pressKeyWord}/>
                  <div className="input-group-append">
                    <button className="btn btn-primary" onClick={() => this.searchKeyWorld()} type="submit">Tìm kiếm</button>
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
                    <CButton
                      onClick={() => this.setLarge(!large)}
                      className="mb-1 float-right"
                      color="success"
                    > Thêm nhóm sản phẩm
                    </CButton>
                  </div>
                </div>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listGroup}
                  fields={fields}
                  hover
                  striped
                  bordered
                  scopedSlots = {{
                    'name': (item) => (
                      <td>{item.name}</td>
                    ),
                    'actions':
                    (item)=>(
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
                          Xóa
                        </CButton>
                      </td>)
                  }}
                />
                {(groupDetail && large) && <GroupDetail large={large} group={groupDetail} onClose={this.onClose}
                onClearDetail={onClearDetail} queryParams={queryParams}/>}
                {(!groupDetail && large) && <GroupDetail large={large} onClose={this.onClose}
                onClearDetail={onClearDetail} queryParams={queryParams}/>}
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
    listGroup: state.group.list,
    groupDetail: state.group.detail,
    total: state.group.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(GroupActions.onGetList(params))
    },
    onClearState: () =>{
      dispatch(GroupActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(GroupActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(GroupActions.onGetDetail(id))
    },
    onDelete: (id, params) =>{
      dispatch(GroupActions.onDelete(id, params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)
