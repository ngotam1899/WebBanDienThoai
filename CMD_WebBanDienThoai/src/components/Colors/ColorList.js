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
import ColorDetail from './ColorDetail'
// @Actions
import ColorActions from "../../redux/actions/color";

const fields = ['name', 'color',{ key: 'actions', _style: { width: '30%'} }]

class ColorList extends Component {
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

  submit = (id) => {
    confirmAlert({
      title: 'Thông báo',
      message: 'Bạn có thực sự muốn xóa color này?',
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
  handleListProduct = (id) =>{
    const { history } = this.props;
    const pathname = '/products/product-manage';
    history.push(`${pathname}?color=${id}`);
  }

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
    const {listColor, colorDetail, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách màu</h5>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                > Thêm màu
                </CButton>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listColor}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'name': (item) => (
                      <td>{item.color}</td>
                    ),
                    'color': (item) => (
                      <td><CCol xl="2" md="4" sm="6" xs="12" className="mb-4">
                      <div style={{paddingTop: '75%', backgroundColor: item.code_color}}></div>
                    </CCol></td>
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
                {(colorDetail && large) && <ColorDetail large={large} color={colorDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
                {(!colorDetail && large) && <ColorDetail large={large} color={colorDetail} onClose={this.onClose}
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
    listColor: state.color.list,
    colorDetail: state.color.detail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(ColorActions.onGetList())
    },
    onClearState: () =>{
      dispatch(ColorActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(ColorActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(ColorActions.onGetDetail(id))
    },
    onDelete: (id) =>{
      dispatch(ColorActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorList)
