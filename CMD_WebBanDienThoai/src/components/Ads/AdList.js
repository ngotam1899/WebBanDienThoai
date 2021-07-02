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
import AdDetail from './AdDetail'
import Pagination from "react-js-pagination";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import {INITIAL_IMAGE} from '../../constants';
// @Actions
import AdActions from "../../redux/actions/ad";

const fields = ['image', 'name', 'start', 'end', { key: 'actions', _style: { width: '25%'} }]

class AdList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryParams: {},
      large: false,
      filter: {
        limit: 10,
        page: 0,
        active: 1,
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

  onSubmit = (id, request, active) => {
    confirmAlert({
      title: 'Thông báo',
      message: `Bạn có thực sự muốn ${request} quảng cáo này?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {request === "xóa" ? this.onDelete(id) : this.onActivate(id, active)}
        },
        {
          label: 'No'
        }
      ]
    });
  };
  handleListProduct = (id) =>{
    const { history } = this.props;
    const pathname = '/products/product-manage';
    history.push(`${pathname}?color=${id}`);
  }

  onDelete = (_id)=>{
    const {queryParams} = this.state;
    const {onDelete} = this.props;
    onDelete(_id, queryParams);
  }

  onActivate = (id, active)=>{
    const { queryParams } = this.state;
    const { onUpdate } = this.props;
    if(active){
      onUpdate(id, {active: false}, queryParams);
    }
    else{
      onUpdate(id, {active: true}, queryParams)
    }
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

  destroyFilter = () => {
    const {location, history} = this.props;
    const {pathname} = location;
    var queryParams = {
      page: 0,
      status: '',
      active: 1
    }
    history.push(`${pathname}?${qs.stringify(queryParams)}`)
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

  handleChangeFilter = (event) => {
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.handleUpdateFilter({ [name]:  value});
  }

  render () {
    const { large, queryParams } = this.state;
    const { listAd, adDetail, onClearDetail, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <div className="row">
                  <div className="col-6">
                    <h5 className="my-2">Danh sách quảng cáo</h5>
                    <p className="float-left my-2 mr-3 font-italic">Có tất cả {total} kết quả tìm kiếm</p>
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
                    > Thêm quảng cáo
                    </CButton>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card bg-danger">
                      <div className="p-2">
                        <b className="text-white">Tình trạng quảng cáo</b>
                        <select className="form-control mt-2" value={filter.status} name="status" onChange={this.handleChangeFilter}>
                          <option key={-1} value="">Chọn tình trạng phiếu</option>
                          <option value="-1">Chưa diễn ra</option>
                          <option value="0">Đang diễn ra</option>
                          <option value="1">Đã diễn ra</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card bg-primary">
                      <div className="p-2">
                        <b className="text-white">Duyệt trạng thái kích hoạt</b>
                        <select className="form-control mt-2" value={filter.active ? filter.active : this.state.filter.active} name="active" onChange={this.handleChangeFilter}>
                          <option key={-1} value="0">Chọn kiểu trạng thái</option>
                          <option value="1">Hiển thị trên trang bán hàng</option>
                          <option value="-1">Ẩn trên trang bán hàng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listAd}
                  fields={fields}
                  hover
                  striped
                  bordered
                  scopedSlots = {{
                    'image': (item)=>(
                      <td>
                        <img src={ item.image ? item.image.public_url : INITIAL_IMAGE } style={{width:'10vw'}} alt={item.name} />
                      </td>
                    ),
                    'start': (item)=>(
                      <td>
                        <p>{new Date(item.startedAt).toLocaleDateString("vi-VN")}</p>
                      </td>
                    ),
                    'end': (item)=>(
                      <td>
                        <p>{new Date(item.endedAt).toLocaleDateString("vi-VN")}</p>
                      </td>
                    ),
                    'actions':
                    (item)=>(
                      <td>
                        <CButton
                          onClick={() => this.onSubmit(item._id, "đổi trạng thái", item.active)}
                          className={item.active ? "mr-1 mb-1 mb-xl-0 bg-purple" : "mr-1 mb-1 mb-xl-0 bg-orange"}
                        >
                          {item.active===true ? "Deactivate" : "Activate"}
                        </CButton>
                        <CButton
                          onClick={() => this.onUpdate(!large, item._id)}
                          className="mr-1 mb-1 mb-xl-0"
                          color="warning"
                        >
                          Sửa
                        </CButton>
                        <CButton
                          onClick={() => this.onSubmit(item._id, "xóa", null)}
                          className="mr-1"
                          color="danger"
                        >
                          Xóa
                        </CButton>
                      </td>)
                  }}
                />
                {(adDetail && large) && <AdDetail large={large} ad={adDetail} onClose={this.onClose} onClearDetail={onClearDetail} queryParams={queryParams}/>}
                {(!adDetail && large) && <AdDetail large={large} onClose={this.onClose} onClearDetail={onClearDetail} queryParams={queryParams}/>}
              </CCardBody>
              <div className="row justify-content-center">
              {total && total > 12 && <Pagination
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
    listAd: state.ad.list,
    adDetail: state.ad.detail,
    total: state.ad.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(AdActions.onGetList(params))
    },
    onClearState: () =>{
      dispatch(AdActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(AdActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(AdActions.onGetDetail(id))
    },
    onDelete: (id, params) =>{
      dispatch(AdActions.onDelete(id, params))
    },
    onUpdate: (id, data, params) =>{
      dispatch(AdActions.onUpdate(id, data, params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdList)
