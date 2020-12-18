import React, { Component }  from 'react'
import { get } from "lodash";
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
import ProductDetail from './ProductDetail'
import ProductsActions from "../../redux/actions/products";
import BrandActions from "../../redux/actions/brands";
import CategoryActions from "../../redux/actions/categories";

const fields = ['name','image', 'price', 'brand', { key: 'actions', _style: { width: '15%'} }]

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
    }
  }
  componentDidMount() {
    const { onGetList, onClearState, onGetListBrand, onGetListCategory} = this.props;
    onClearState();
    onGetListBrand();
    onGetListCategory();
    onGetList();
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

  onSubmit = (data, _id) =>{
    const { onCreate, onUpdate } = this.props;
    if(!_id){
      onCreate(data);
    }
    else {
      onUpdate(_id, data);
    }
  }

  onDelete = (_id)=>{
    const {onDelete} = this.props;
    onDelete(_id);
  }

  setBrand = (brand) =>{
    const {listBrands} = this.props;
    const brandName = listBrands.find(obj => obj._id === brand);
    return get(brandName, "name");
  }

  render () {
    const {large} = this.state;
    const {listProducts, productDetail, listCategories, listBrands, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách sản phẩm</h5>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                > Thêm sản phẩm
                </CButton>
              </CCardHeader>

              {listBrands && listCategories && <CCardBody>
                <CDataTable
                  items={listProducts}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'image':
                    (item) => (
                      <td>
                        <img src={ item.bigimage ? item.bigimage.public_url : "http://www.pha.gov.pk/img/img-02.jpg" } style={{width:'10vw'}} alt={item.name} />
                      </td>
                    ),
                    'brand': (item) => (
                      <td>{this.setBrand(item.brand)}</td>
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
                          onClick={() => this.onDelete(item._id)}
                          className="mr-1"
                          color="danger"
                        >
                          Xóa
                        </CButton>
                      </td>)
                  }}
                />
                {(productDetail && large) && <ProductDetail large={large} product={productDetail} onClose={this.onClose}
                listCategories={listCategories} listBrands={listBrands} onClearDetail={onClearDetail}
                onSubmit={this.onSubmit}/>}

                {(!productDetail && large) && <ProductDetail large={large} product={productDetail} onClose={this.onClose}
                listCategories={listCategories} listBrands={listBrands} onClearDetail={onClearDetail}
                onSubmit={this.onSubmit}/>}
              </CCardBody>}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(ProductsActions.onGetList())
    },
    onGetDetail: (id) => {
      dispatch(ProductsActions.onGetDetail(id))
    },
    onGetListBrand: () => {
      dispatch(BrandActions.onGetList())
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
    onCreate: (data) =>{
      dispatch(ProductsActions.onCreate(data))
    },
    onUpdate: (id, params) =>{
      dispatch(ProductsActions.onUpdate({id, params}))
    },
    onDelete: (id) =>{
      dispatch(ProductsActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
