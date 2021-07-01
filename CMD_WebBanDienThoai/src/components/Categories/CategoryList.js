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
import CategoryDetail from './CategoryDetail'
import Pagination from "react-js-pagination";
// @Actions
import CategoryActions from "../../redux/actions/categories";
// @Functions
import getFilterParams from "../../utils/getFilterParams";
import {INITIAL_IMAGE} from '../../constants';
const fields = ['image', 'name','slug', 'accessories', { key: 'actions', _style: { width: '30%'} }]

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleListProduct = (id) =>{
    const { history } = this.props;
    const pathname = '/products/product-manage';
    history.push(`${pathname}?category=${id}`);
  }

  setLarge = (large) => {
    this.setState({
      large
    })
  }
  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa category này?',
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

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  // Button search
  searchKeyWorld = () => {
    const {keyword} = this.state;
    this.handleUpdateFilter({ keyword, page: 0});
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

  pressKeyWord = (event) => {
    if(event.key === 'Enter') this.searchKeyWorld();
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
    const { large, keyword } = this.state;
    const { listCategories, categoryDetail, onClearDetail, total, location } = this.props;
    const filter = getFilterParams(location.search);
    return (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách loại sản phẩm</h5>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" value={keyword} name="keyword" placeholder="Nhập tên loại sản phẩm"
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
                    > Thêm loại sản phẩm
                    </CButton>
                  </div>
                </div>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listCategories}
                  fields={fields}
                  hover
                  striped
                  bordered
                  scopedSlots = {{
                    'image':
                    (item) => (
                      <td>
                        <img src={ item.image ? item.image.public_url : INITIAL_IMAGE } style={{width:'6vh'}} alt={item.name} />
                      </td>
                    ),
                    'slug': (item) => (
                      <td>{item.pathseo}</td>
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
                {(categoryDetail && large) && <CategoryDetail large={large} category={categoryDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
                {(!categoryDetail && large) && <CategoryDetail large={large} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
              </CCardBody>
              <div className="row justify-content-center">
              {total > 10 && <Pagination
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
    listCategories: state.categories.list,
    categoryDetail: state.categories.detail,
    total: state.categories.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(CategoryActions.onGetList(params))
    },
    onClearState: () =>{
      dispatch(CategoryActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(CategoryActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(CategoryActions.onGetDetail(id))
    },
    onDelete: (id) =>{
      dispatch(CategoryActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
