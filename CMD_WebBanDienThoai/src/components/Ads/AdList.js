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

const fields = ['image', 'name', 'start', 'end', { key: 'actions', _style: { width: '15%'} }]

class AdList extends Component {
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
      message: 'Bạn có thực sự muốn xóa quảng cáo này?',
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
  handleListProduct = (id) =>{
    const { history } = this.props;
    const pathname = '/products/product-manage';
    history.push(`${pathname}?color=${id}`);
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

  render () {
    const { large } = this.state;
    const { listAd, adDetail, onClearDetail, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách quảng cáo</h5>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                > Thêm quảng cáo
                </CButton>
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
                {(adDetail && large) && <AdDetail large={large} ad={adDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
                {(!adDetail && large) && <AdDetail large={large} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
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
    onDelete: (id) =>{
      dispatch(AdActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdList)
