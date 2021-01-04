import React, { Component }  from 'react'
import { get } from "lodash";
import { connect } from "react-redux";
import qs from "query-string";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
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
import ProductDetail from './ProductDetail'
import Pagination from "react-js-pagination";
// @Actions
import ProductsActions from "../../redux/actions/products";
import BrandActions from "../../redux/actions/brands";
import ColorActions from "../../redux/actions/color";
import CategoryActions from "../../redux/actions/categories";
// @Function
import getFilterParams from "../../utils/getFilterParams";

const fields = ['name','image', 'price', 'brand', { key: 'actions', _style: { width: '15%'} }]

class ProductList extends Component {
  constructor(props) {
    super(props);
    const {match, location} = props;
    const filter = getFilterParams(location.search);
    this.state = {
      large: false,
      keyword: filter.keyword ===null ? "" : filter.keyword,
      min_p: filter.min_p ===null ? "" : filter.min_p,
      max_p: filter.max_p ===null ? "" : filter.max_p,
      filter: {
        limit: 4,
        page: 0,
      },
    }
  }
  UNSAFE_componentWillMount() {
    const { onGetList, onGetListColor, onGetListBrand, location, onClearState, onGetListCategory } = this.props;
    onClearState();
    onGetListCategory();
    const { filter } = this.state;
    onGetListColor();
    onGetListBrand();
    const filters = getFilterParams(location.search);
    var params = {
      ...filter,
      ...filters
    };
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

  handleChangeFilter = (event) => {
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.handleUpdateFilter({ [name]:  value});
  }

  // Change distance price
  distancePrice = (e) => {
    const {min_p, max_p} = this.state;
    this.handleUpdateFilter({ min_p, max_p});
  }

  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
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

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  // Button search
  searchKeyWorld = (e) => {
    const {keyword} = this.state;
    this.handleUpdateFilter({ keyword});
  }

  setLarge = (large) => {
    this.setState({
      large
    })
  }

  onUpdate = (large, item) =>{
    const { onGetDetail } = this.props;
    this.setState({
      large
    })
    if(item){onGetDetail(item)}
    //onGetDetail(item)
  }

  onClose = (large) =>{
    const { onClearDetail } = this.props;
    this.setState({
      large
    })
    onClearDetail();
  }
  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa product này?',
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

  setBrand = (brand) =>{
    const {listBrands} = this.props;
    const brandName = listBrands.find(obj => obj._id === brand);
    return get(brandName, "image.public_url");
  }

  render () {
    const {large, keyword, min_p, max_p} = this.state;
    const {listProducts, productDetail, listCategories, listBrands, onClearDetail, total, location,} = this.props;
    const filter = getFilterParams(location.search);
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách sản phẩm</h5>
                <form>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" value={keyword} name="keyword" placeholder="Nhập tên sản phẩm" onChange={this.onChange}/>
                    <div className="input-group-append">
                      <button className="btn btn-primary" onClick={() => this.searchKeyWorld()} type="submit">Tìm kiếm</button>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="card bg-danger">
                      <div className="p-2">
                        <b className="text-white">Sắp xếp theo tên</b>
                        <select className="form-control mt-2" value={filter.sort_n} name="sort_n" onChange={this.handleChangeFilter}>
                          <option key={-1} value="0">Chọn kiểu sắp xếp</option>
                          <option value="1">Tên sản phẩm từ A - Z</option>
                          <option value="-1">Tên sản phẩm từ Z - A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="card bg-warning">
                      <div className="p-2">
                        <b className="text-white">Sắp xếp theo giá</b>
                        <select className="form-control mt-2" value={filter.sort_p} name="sort_p" onChange={this.handleChangeFilter}>
                          <option key={-1} value="0">Chọn kiểu sắp xếp</option>
                          <option value="1">Gía từ thấp tới cao</option>
                          <option value="-1">Gía từ cao xuống thấp</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="card bg-success">
                      <div className="p-2">
                        <b className="text-white">Duyệt theo khoảng giá</b>
                        <div className="row input-group mx-auto mt-2">
                          <input type="number" value={min_p} name="min_p" step={100000} min={0} onChange={this.onChange} placeholder="Từ" className="form-control w-40"></input>
                          <input type="number" value={max_p} name="max_p" step={100000} min={100000} onChange={this.onChange} placeholder="đến" className="form-control w-40"></input>
                          <div class="input-group-append">
                            <button onClick={() => this.distancePrice()} className="btn btn-primary"><i className="fa fa-search-dollar"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                  <p className="float-left" style={{fontStyle: 'italic'}}>Có tất cả {total} kết quả tìm kiếm</p>
                  <CButton
                    onClick={() => this.setLarge(!large)}
                    className="mb-1 float-right"
                    color="success"
                  > Thêm sản phẩm
                  </CButton>
                  </div>
                </div>

              </CCardHeader>

              {listBrands && listCategories && <CCardBody>
                <CDataTable
                  items={listProducts}
                  fields={fields}
                  hover
                  striped
                  bordered
                  scopedSlots = {{
                    'image':
                    (item) => (
                      <td>
                        <img src={ item.bigimage ? item.bigimage.public_url : "http://www.pha.gov.pk/img/img-02.jpg" } style={{width:'10vw'}} alt={item.name} />
                      </td>
                    ),
                    'brand': (item) => (
                      <td><img src={this.setBrand(item.brand)} style={{width:'8vw'}}></img></td>
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
                {(productDetail && large) && <ProductDetail large={large} product={productDetail} onClose={this.onClose}
                listCategories={listCategories} listBrands={listBrands} onClearDetail={onClearDetail}/>}

                {(!productDetail && large) && <ProductDetail large={large} product={productDetail} onClose={this.onClose}
                listCategories={listCategories} listBrands={listBrands} onClearDetail={onClearDetail}/>}
              </CCardBody>}
              <div className="row justify-content-center">
              <Pagination
                  activePage={filter.page ? parseInt(filter.page)+1 : 1}
                  itemsCountPerPage={4}
                  totalItemsCount={total}
                  pageRangeDisplayed={3}
                  linkClass="page-link"
                  itemClass="page-item"
                  prevPageText="Previous"
                  nextPageText="Next"
                  hideFirstLastPages="true"
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listProducts: state.products.list,
    productDetail: state.products.detail,
    listBrands: state.brands.list,
    listCategories: state.categories.list,
    total: state.products.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(ProductsActions.onGetList(params))
    },
    onGetDetail: (id) => {
      dispatch(ProductsActions.onGetDetail(id))
    },
    onGetListBrand: () => {
      dispatch(BrandActions.onGetList())
    },
    onGetListColor: () => {
      dispatch(ColorActions.onGetList())
    },
    onGetListCategory: () => {
      dispatch(CategoryActions.onGetList())
    },
    onClearState: () =>{
      dispatch(ProductsActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(ProductsActions.onClearDetail())
    },
    onDelete: (id) =>{
      dispatch(ProductsActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
