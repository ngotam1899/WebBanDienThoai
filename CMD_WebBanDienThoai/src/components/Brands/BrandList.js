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
import BrandDetail from './BrandDetail'
import Pagination from "react-js-pagination";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import {INITIAL_IMAGE} from '../../constants';
// @Actions
import BrandActions from "../../redux/actions/brands";
const fields = ['name', 'image',{ key: 'actions', _style: { width: '30%'} }]

class BrandList extends Component {
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

  handleListProduct = (id) =>{
    const { history } = this.props;
    const pathname = '/products/product-manage';
    history.push(`${pathname}?brand=${id}`);
  }

  setLarge = (large) => {
    this.setState({
      large
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
    const { listBrands, brandDetail, onClearDetail, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách thương hiệu</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={keyword} name="keyword" placeholder="Nhập tên thương hiệu"
                  onChange={this.onChange} onKeyPress={this.pressKeyWord}/>
                  <div className="input-group-append">
                    <button className="btn btn-primary" onClick={() => this.searchKeyWorld()} type="submit">Tìm kiếm</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                  <p className="float-left font-italic py-2">Có tất cả {total} kết quả tìm kiếm</p>
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
                  > Thêm thương hiệu
                  </CButton>
                  </div>
                </div>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listBrands}
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
                {(brandDetail && large) && <BrandDetail large={large} brand={brandDetail} onClose={this.onClose} onClearDetail={onClearDetail} queryParams={queryParams}/>}
                {(!brandDetail && large) && <BrandDetail large={large} onClose={this.onClose} onClearDetail={onClearDetail} queryParams={queryParams}/>}
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
    listBrands: state.brands.list,
    brandDetail: state.brands.detail,
    total: state.brands.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(BrandActions.onGetList(params))
    },
    onClearState: () =>{
      dispatch(BrandActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(BrandActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(BrandActions.onGetDetail(id))
    },
    onDelete: (id, params) =>{
      dispatch(BrandActions.onDelete(id, params))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)
