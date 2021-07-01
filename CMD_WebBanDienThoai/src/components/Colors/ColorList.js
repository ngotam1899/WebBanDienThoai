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
import ColorDetail from './ColorDetail'
import Pagination from "react-js-pagination";
// @Actions
import ColorActions from "../../redux/actions/color";
// @Functions
import getFilterParams from "../../utils/getFilterParams";

const fields = ['name_vn', 'name_en', 'color',{ key: 'actions', _style: { width: '30%'} }]

class ColorList extends Component {
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
    const { listColor, colorDetail, onClearDetail, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h5 className="float-left my-2">Danh sách màu</h5>
            <CButton
              onClick={() => this.setLarge(!large)}
              className="mb-1 float-right"
              color="success"
            > Thêm màu
            </CButton>
            <p className="float-right font-italic my-2 mr-2">Có tất cả {total} kết quả tìm kiếm</p>
          </CCardHeader>

          <CCardBody>
            <CDataTable
              items={listColor}
              fields={fields}
              hover
              striped
              bordered
              scopedSlots = {{
                'name_vn': (item) => (
                  <td>{item.name_vn}</td>
                ),
                'name_en': (item) => (
                  <td>{item.name_en}</td>
                ),
                'color': (item) => (
                  <td><CRow><CCol xl="2" md="4" sm="6" xs="12" className="mb-4" style={{paddingTop: '0',height:'25px', backgroundColor: item.code}}>
                </CCol></CRow></td>
                ),
                'actions':
                (item)=>(
                  <td>
                    <CButton
                      onClick={() => this.handleListProduct(item._id)}
                      className="mr-1 mb-1 mb-xl-0"
                      color="success"
                    >
                      Danh sách
                    </CButton>
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
            {(colorDetail && large) && <ColorDetail large={large} color={colorDetail} onClose={this.onClose}
            onClearDetail={onClearDetail}/>}
            {(!colorDetail && large) && <ColorDetail large={large} onClose={this.onClose}
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
    listColor: state.color.list,
    colorDetail: state.color.detail,
    total: state.color.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(ColorActions.onGetList(params))
    },
    onClearState: () =>{
      dispatch(ColorActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(ColorActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(ColorActions.onGetDetail(id))
    },
    onDelete: (id) =>{
      dispatch(ColorActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorList)
