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
import CategoryActions from "../../redux/actions/categories";

const fields = ['name','slug', { key: 'actions', _style: { width: '15%'} }]

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
    }
  }
  componentDidMount() {
    const { onClearState, onGetList } = this.props;
    onClearState();
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
    if(_id === ''){
      onCreate(data);
    }
    else {
      onUpdate(_id, data);
    }
  }

  render () {
    const {large} = this.state;
    const {listCategories} = this.props;
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
                > Thêm loại sản phẩm
                </CButton>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listCategories}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'slug': (item) => (
                      <td>{item.pathseo}</td>
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
                {/* {(productDetail && large) && <CategoryDetail large={large} product={productDetail} onClose={this.onClose}
                setImage={this.setImage} listCategories={listCategories} listBrands={listBrands} onClearDetail={onClearDetail}
                onSubmit={this.onSubmit}/>}

                {(!productDetail && large) && <CategoryDetail large={large} product={productDetail} onClose={this.onClose}
                setImage={this.setImage} listCategories={listCategories} listBrands={listBrands} onClearDetail={onClearDetail}
                onSubmit={this.onSubmit}/>} */}
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
    listCategories: state.categories.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
