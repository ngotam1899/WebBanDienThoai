import React, { Component }  from 'react'
import { connect } from "react-redux";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CRow,
} from '@coreui/react'
import ProductDetail from './ProductDetail'
import usersData from '../../views/users/UsersData'
import ProductsActions from "../../redux/actions/products";
import ImageCloudinary from '../../views/ImageCloudinary';

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['name','image', 'price', 'brand', { key: 'actions', _style: { width: '15%'} }]

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false
    }
  }

  componentDidMount() {
    const { onGetList } = this.props;
    onGetList();
  }

  setLarge = (large) =>{
    this.setState({
      large
    })
  }

  render () {
    const {large} = this.state;
    const {listProducts} = this.props;
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
              <CCardBody>
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
                      <ImageCloudinary item={item.bigimage}/>
                    ),
                    'actions':
                    (item)=>(
                      <td>
                        <CButton
                          onClick={() => this.setLarge(!large)}
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
                <ProductDetail large={large} setLarge={this.setLarge}/>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listProducts: state.products.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(ProductsActions.onGetList())
    },
    onAddProductToCart: (product) => {
      dispatch(ProductsActions.onAddProductToCart(product, 1));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
