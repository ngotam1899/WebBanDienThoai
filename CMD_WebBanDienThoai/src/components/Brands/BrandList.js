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
import BrandDetail from './BrandDetail'
// @Actions
import BrandActions from "../../redux/actions/brands";

const fields = ['name', 'image',{ key: 'actions', _style: { width: '30%'} }]

class BrandList extends Component {
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
    const {listBrands, brandDetail, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách thương hiệu</h5>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                > Thêm thương hiệu
                </CButton>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listBrands}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'image': (item)=>(
                      <td>
                        <img src={ item.image ? item.image.public_url : "http://www.pha.gov.pk/img/img-02.jpg" } style={{width:'10vw'}} alt={item.name} />
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
                {(brandDetail && large) && <BrandDetail large={large} brand={brandDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
                {(!brandDetail && large) && <BrandDetail large={large} brand={brandDetail} onClose={this.onClose}
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
    listBrands: state.brands.list,
    brandDetail: state.brands.detail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(BrandActions.onGetList())
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
    onDelete: (id) =>{
      dispatch(BrandActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)
