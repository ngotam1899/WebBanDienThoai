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
import SpecificationDetail from '../Specification/SpecificationDetail'
// @Actions
import SpecificationActions from "../../redux/actions/specification";
const fields = ['name', { key: 'actions', _style: { width: '15%'} }]

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
    }
  }
  componentDidMount() {
    const { onGetListSpecification } = this.props;
    onGetListSpecification();
  }

  setLarge = (large) => {
    this.setState({
      large
    })
  }

  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa Specification này?',
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

  setSpecification = (specification) =>{
    const {listSpecification} = this.props;
    const specificationName = listSpecification.find(obj => obj._id === specification);
    return get(specificationName, "name");
  }

  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa thuộc tính này?',
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

  render () {
    const {large} = this.state;
    const {listSpecification, specificationDetail, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách hệ thuộc tính</h5>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                > Thêm hệ điều hành
                </CButton>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listSpecification}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'name': (item) => (
                      <td>{item.name}</td>
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
                {(specificationDetail && large) && <SpecificationDetail large={large} specification={specificationDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
                {(!specificationDetail && large) && <SpecificationDetail large={large} onClose={this.onClose}
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
    listSpecification: state.specification.list,
    specificationDetail: state.specification.detail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetListSpecification : (params) => {
      dispatch(SpecificationActions.onGetList(params))
    },
    onGetDetail: (id) => {
      dispatch(SpecificationActions.onGetDetail(id))
    },
    onClearState: () =>{
      dispatch(SpecificationActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(SpecificationActions.onClearDetail())
    },
    onUpdate: (id, params) =>{
      dispatch(SpecificationActions.onUpdate({id, params}))
    },
    onDelete: (id) =>{
      dispatch(SpecificationActions.onDelete({id}))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
