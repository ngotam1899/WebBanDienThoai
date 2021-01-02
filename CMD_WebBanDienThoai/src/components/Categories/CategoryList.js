import React, { Component }  from 'react'
import { get } from "lodash";
import { connect } from "react-redux";
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
import CategoryDetail from './CategoryDetail'
// @Actions
import CategoryActions from "../../redux/actions/categories";

const fields = ['name','slug', { key: 'actions', _style: { width: '30%'} }]

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

  render () {
    const {large} = this.state;
    const {listCategories, categoryDetail, onClearDetail} = this.props;
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
                {(!categoryDetail && large) && <CategoryDetail large={large} category={categoryDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
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
    categoryDetail: state.categories.detail,
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
    onGetDetail: (id) => {
      dispatch(CategoryActions.onGetDetail(id))
    },
    onDelete: (id) =>{
      dispatch(CategoryActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
