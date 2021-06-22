import React, { Component }  from 'react'
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
  CImg
} from '@coreui/react'
import InstallmentDetail from './InstallmentDetail'
// @Actions
import InstallmentActions from "../../redux/actions/installment";
// @Functions
import {INITIAL_IMAGE} from '../../constants';
const fields = ['period', 'user', { key: 'product', _style: { width: '20%'} }, 'total_payable', 'paid', 'status', { key: 'actions', _style: { width: '15%'} }]

class InstallmentList extends Component {
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

  setStatus = (status) => {
    switch(status){
      case -1:
        return 'Chưa duyệt'
      case 0:
        return 'Chưa hoàn tất'
      case 1:
        return 'Đã hoàn tất'
      default:
        return 'Chưa duyệt'
    }
  }

  render () {
    const {large} = this.state;
    const {listInstallment, installmentDetail, onClearDetail} = this.props;
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h5 className="float-left my-2">Danh sách trả góp</h5>
                <CButton
                  onClick={() => this.setLarge(!large)}
                  className="mb-1 float-right"
                  color="success"
                > Tạo phiếu trả góp
                </CButton>
              </CCardHeader>

              <CCardBody>
                <CDataTable
                  items={listInstallment}
                  fields={fields}
                  hover
                  striped
                  bordered
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'period': (item) => (
                      <td>
                        {item.startedAt && item.endedAt ? <>
                          <p>Từ {new Date(item.startedAt).toLocaleDateString("vn-VN")}</p>
                          <p>đến {new Date(item.endedAt).toLocaleDateString("vn-VN")}</p>
                        </> : <p>Chưa duyệt</p>}
                      </td>
                    ),
                    'user': (item) => (
                      <td className="text-center">
                        <div className="c-avatar">
                          <CImg
                            src={item.user.image ? item.user.image.public_url : INITIAL_IMAGE}
                            className="c-avatar-img"
                            alt={item.user._id}
                          />
                        </div>
                        <p className="mb-0">{item.user.firstname} {item.user.lastname}</p>
                      </td>
                    ),
                    'product': (item) => (
                      <td className="row">
                        <div className="col-4">
                          <img className="w-100" src={item.product._id.bigimage ? item.product._id.bigimage.public_url : INITIAL_IMAGE} alt={item.product._id.name}></img>
                        </div>
                        <div className="col-8 align-self-center">
                    <p className="font-weight-bold mb-0">{item.product._id.name}</p>
                    <p className="mb-0">{item.product.color.name_vn}</p>
                        </div>
                      </td>
                    ),
                    'total_payable': (item) => (
                      <td>{Math.ceil(((item.product.product_price-item.paid)*(1 + item.interest_rate*0.01))/10000)* 10000} VND</td>
                    ),
                    'paid': (item) => (
                    <td>{item.paid ? item.paid : 0} VND</td>
                    ),
                    'status': (item) => (
                    <td>{this.setStatus(item.status)}</td>
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
                {(installmentDetail && large) && <InstallmentDetail large={large} installment={installmentDetail} onClose={this.onClose}
                onClearDetail={onClearDetail}/>}
                {(!installmentDetail && large) && <InstallmentDetail large={large} onClose={this.onClose}
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
    listInstallment: state.installment.list,
    installmentDetail: state.installment.detail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(InstallmentActions.onGetList())
    },
    onClearState: () =>{
      dispatch(InstallmentActions.onClearState())
    },
    onClearDetail: () =>{
      dispatch(InstallmentActions.onClearDetail())
    },
    onGetDetail: (id) => {
      dispatch(InstallmentActions.onGetDetail(id))
    },
    onDelete: (id) =>{
      dispatch(InstallmentActions.onDelete({id}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallmentList)
