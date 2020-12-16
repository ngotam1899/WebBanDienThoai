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
import CategoryDetail from './CategoryDetail'
import ImagesActions from "../../redux/actions/cloudinary";
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
    const { onClearState,onGetListImage, onGetListBrand, onGetListCategory } = this.props;
    onClearState();
    onGetListImage();
    onGetListBrand();
    onGetListCategory();
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
    if(_id === ''){
      onCreate(data);
    }
    else {
      onUpdate(_id, data);
    }
  }

  setImage = (image) => {
    const {listImages} = this.props;
    const img = listImages.find(obj => obj._id === image);
    return get(img, "public_url");
  }

  setBrand = (brand) =>{
    const {listBrands} = this.props;
    const brandName = listBrands.find(obj => obj._id === brand);
    return get(brandName, "name");
  }

  render () {
    const {large} = this.state;
    const {listProducts, productDetail, listCategories, listBrands, listImages, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách category</h5>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                > Thêm sản phẩm
                </CButton>
              </CCardHeader>

              {listImages && listBrands && listCategories && <CCardBody>
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
                        <img src={ this.setImage(item.bigimage) } style={{width:'10vw'}} alt=""/>
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
                          onClick={() => this.setLarge(!large)}
                          className="mr-1"
                          color="danger"
                        >
                          Xóa
                        </CButton>
                      </td>)
                  }}
                />
                {(productDetail && large) && <CategoryDetail large={large} product={productDetail} onClose={this.onClose}
                setImage={this.setImage} listCategories={listCategories} listBrands={listBrands} onClearDetail={onClearDetail}
                onSubmit={this.onSubmit}/>}

                {(!productDetail && large) && <CategoryDetail large={large} product={productDetail} onClose={this.onClose}
                setImage={this.setImage} listCategories={listCategories} listBrands={listBrands} onClearDetail={onClearDetail}
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
    listImages: state.cloudinary.list,
    listBrands: state.brands.list,
    listCategories: state.categories.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetListImage: () => {
      dispatch(ImagesActions.onGetList())
    },
    onGetListBrand: () => {
      dispatch(BrandActions.onGetList())
    },
    onGetListCategory: () => {
      dispatch(CategoryActions.onGetList())
    },
    onClearState: () =>{
      dispatch(CategoryActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(CategoryActions.onClearDetail())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
