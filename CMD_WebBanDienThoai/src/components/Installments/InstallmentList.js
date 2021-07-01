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
  CImg,
  CBadge
} from '@coreui/react'
import InstallmentDetail from './InstallmentDetail'
import Pagination from "react-js-pagination";
// @Actions
import InstallmentActions from "../../redux/actions/installment";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import {INITIAL_IMAGE} from '../../constants';
const fields = ['period', 'user', { key: 'product', _style: { width: '20%'} }, 'debt', 'prepay', 'status', { key: 'actions', _style: { width: '15%'} }]

class InstallmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  setLarge = (large) => {
    this.setState({
      large
    })
  }

  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa color này?',
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
        return <CBadge color="warning" className="float-right">Chưa duyệt</CBadge>
      case 0:
        return <CBadge color="info" className="float-right">Chưa hoàn tất</CBadge>
      case 1:
        return <CBadge color="success" className="float-right">Đã hoàn tất</CBadge>
      case 2:
        return <CBadge color="danger" className="float-right">Qúa hạn</CBadge>
      default:
        return <CBadge color="warning" className="float-right">Chưa duyệt</CBadge>
    }
  }

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  destroyFilter = () => {
    const {location, history} = this.props;
    const {pathname} = location;
    var queryParams = {
      active: '',
      page: 0,
      period: '',
      status: ''
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
    const { large } = this.state;
    const { listInstallment, installmentDetail, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <div className="row">
                  <div className="col-6">
                    <h5 className="my-2">Danh sách trả góp</h5>
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
                      className="float-right mb-1"
                      color="success"
                    > Tạo phiếu trả góp
                    </CButton>

                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card bg-danger">
                      <div className="p-2">
                        <b className="text-white">Tình trạng phiếu trả góp</b>
                        <select className="form-control mt-2" value={filter.status} name="status" onChange={this.handleChangeFilter}>
                          <option key={-1} value="">Chọn tình trạng phiếu</option>
                          <option value="-1">Chưa duyệt</option>
                          <option value="0">Chưa hoàn tất</option>
                          <option value="1">Đã hoàn tất</option>
                          <option value="2">Qúa hạn</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="card bg-warning">
                      <div className="p-2">
                        <b className="text-white">Thời lượng trả góp</b>
                        <select className="form-control mt-2" value={filter.period} name="period" onChange={this.handleChangeFilter}>
                          <option key={-1} value="">Chọn thời lượng</option>
                          <option value="3">3 tháng</option>
                          <option value="6">6 tháng</option>
                          <option value="9">9 tháng</option>
                          <option value="12">12 tháng</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listInstallment}
                  fields={fields}
                  hover
                  striped
                  bordered
                  scopedSlots = {{
                    'period': (item) => (
                      <td>
                        {item.startedAt && item.endedAt ? <>
                          <p>Từ {new Date(item.startedAt).toLocaleDateString("vn-VN")}</p>
                          <p>đến {new Date(item.endedAt).toLocaleDateString("vn-VN")}</p>
                        </> : <p>Chưa duyệt</p>}
                      </td>
                    ),
                    'user': (item) => (
                      <td className="text-center">
                        <div className="c-avatar">
                          <CImg
                            src={item.user.image ? item.user.image.public_url : INITIAL_IMAGE}
                            className="c-avatar-img"
                            alt={item.user._id}
                          />
                        </div>
                        <p className="mb-0">{item.user.firstname} {item.user.lastname}</p>
                    <p className="mb-0">({item.user.phonenumber})</p>
                      </td>
                    ),
                    'product': (item) => (
                      <td className="row">
                        <div className="col-4">
                          <img className="w-100" src={item.product._id.bigimage ? item.product._id.bigimage.public_url : INITIAL_IMAGE} alt={item.product._id.name}></img>
                        </div>
                        <div className="col-8 align-self-center">
                    <p className="font-weight-bold mb-0">{item.product._id.name}</p>
                    <p className="mb-0">{item.product.color.name_vn}</p>
                        </div>
                      </td>
                    ),
                    'debt': (item) => (
                      <td>{item.debt ? item.debt : 0} VND</td>
                    ),
                    'prepay': (item) => (
                    <td>{item.prepay ? item.prepay : 0} VND</td>
                    ),
                    'status': (item) => (
                    <td className="text-center">{this.setStatus(item.status)}</td>
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
                {(installmentDetail && large) && <InstallmentDetail large={large} installment={installmentDetail} onClose={this.onClose}/>}
                {(!installmentDetail && large) && <InstallmentDetail large={large} onClose={this.onClose}/>}
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
    listInstallment: state.installment.list,
    installmentDetail: state.installment.detail,
    total: state.installment.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(InstallmentActions.onGetList(params))
    },
    onClearState: () =>{
      dispatch(InstallmentActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(InstallmentActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(InstallmentActions.onGetDetail(id))
    },
    onDelete: (id) =>{
      dispatch(InstallmentActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallmentList)
