import React, { Component } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CImg, CDataTable, CBadge } from '@coreui/react';
import { connect } from "react-redux";
// @Actions
import InstallmentActions from "../../redux/actions/installment";
import UserActions from "../../redux/actions/user";
import ProductsActions from "../../redux/actions/products";
// @Functions
import {INITIAL_IMAGE} from '../../constants';
import installmentData from '../../utils/installment.json'

const fields = ['m', 'due_date', 'payable', 'status', { key: 'actions', _style: { width: '15%'} }]

class InstallmentDetail extends Component {
  constructor(props){
    super(props);
    const { installment, userInfo } = props;
    this.state = {
      id: installment ? installment._id : '',
      startedAt: installment ? installment.startedAt.slice(0,10) : new Date().toISOString().slice(0, 10),
      endedAt: installment ? installment.endedAt.slice(0,10) : '',
      period: installment ? installment.period : '',
      interest_rate: installment ? installment.interest_rate : '',
      paid: installment ? installment.paid : 0,
      product: installment ? installment.product : '',
      status: installment ? installment.status : -1,
      staff: installment ? installment.staff : {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        image: userInfo.image
      },
      user: installment ? installment.user : '',
      detail: installment ? installment.detail : [],
      debt: installment ? installment.debt : 0,
      // Search
      keywordUser: '',
      keywordProduct: ''
    }
  }
  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    if(name === "period"){
      var interest_rate = 0
      installmentData.installments.map(item => {
        if(value === item.month_sum.toString()) interest_rate = item.percent;
      })
      this.setState({ interest_rate })
    }
    this.setState({
      [name]: value
    })
  }

  handleFilter = (event) => {
    const { onFilterUser, onFilterProduct } = this.props;
		var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
    if(name === "keywordUser") onFilterUser(value);
    else onFilterProduct(value);
	}

  onSubmit = () =>{
    const {id, name_vn, name_en, code} = this.state;
    const {onUpdate, onCreate} = this.props;
    var data = {name_vn, name_en, code}
    if (id) {
      onUpdate(id, data);
    }
    else {
      // 4. Create data
      onCreate(data);
    }
  }

  handleChangeComplete = (color) => {
    this.setState({ code: color.hex });
  };

  setStatus = (status) => {
    switch(status){
      case -1:
        return <CBadge color="danger" className="float-right">Qúa hạn</CBadge>
      case 0:
        return <CBadge color="warning" className="float-right">Chưa tới hạn</CBadge>
      case 1:
        return <CBadge color="success" className="float-right">Hoàn tất</CBadge>
      default:
        return <CBadge color="warning" className="float-right">Chưa tới hạn</CBadge>
    }
  }

	render() {
    const {
      id, startedAt, endedAt, period, interest_rate, paid, product, status, staff, user, detail, debt,
      keywordUser, keywordProduct
    } = this.state;
    const { large, onClose, installment, listSearchUser, listSearchProduct } = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg">
				<CModalHeader closeButton>
        <CModalTitle>{installment ? "Sửa thông tin phiếu trả góp" : "Thêm phiếu trả góp"}</CModalTitle>
				</CModalHeader>
				<CModalBody>
        <div className="row">
						<div className="col-12 col-lg-6">
              {id && <div className="form-group">
                <label>Mã phiếu:</label>
                <input type="text" className="form-control" name="id" value={id} disabled readOnly/>
              </div>}
              <div className="form-group">
                <label>Tình trạng trả góp:</label>
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={this.onChange}
                >
                  <option value={-2}>Chọn tình trạng</option>
                  <option value={-1}>Chưa duyệt</option>
                  <option value={0}>Chưa hoàn tất</option>
                  <option value={1}>Đã hoàn tất</option>
                </select>
              </div>
              <div className="form-group">
                <label>Khách hàng:</label>
                {user === "" ? <div className="position-relative">
                  <input className="form-control" name="keywordUser" value={keywordUser} onChange={this.handleFilter} placeholder="Tìm khách hàng"></input>
                  <div className="card mb-0 w-100 position-absolute" style={{ zIndex: 1 }}>
                    {listSearchUser && keywordUser && listSearchUser.map((user, index) =>{
                      return (
                        <div key={index}>
                          <div className="row">
                            <div className="col-12 form-inline" onClick={()=>this.setState({user, keywordUser: ""})}>
                              <div className="c-avatar">
                                <CImg
                                  src={user.image ? user.image.public_url : INITIAL_IMAGE}
                                  className="c-avatar-img"
                                  alt={user._id}
                                />
                              </div>
                              <p className="mb-0 ml-3">{user.firstname} {user.lastname}</p>
                            </div>
                          </div>
                          <div className="border-bottom"></div>
                        </div>
                      )
                    })}
                  </div>
                </div> :
                <div className="form-inline rounded border">
                  <div className="c-avatar">
                    <CImg
                      src={user.image ? user.image.public_url : INITIAL_IMAGE}
                      className="c-avatar-img"
                      alt={user._id}
                    />
                  </div>
                  <p className="mb-0 ml-3">{user.firstname} {user.lastname}</p>
                </div>}
              </div>
              <div className="form-group">
                <label>Sản phẩm trả góp:</label>
                {product ? <div className="form-inline rounded border">
                  <div className="row">
                    <div className="col-3">
                      <img className="w-100" src={product._id.bigimage ? product._id.bigimage.public_url : INITIAL_IMAGE} alt={product._id.name}></img>
                    </div>
                    <div className="col-9 align-self-center">
                      <p className="font-weight-bold mb-0">{product._id.name}</p>
                      <p className="font-italic mb-0">Màu {product.color.name_vn}</p>
                      <p className="mb-0">{product.product_price} VND</p>
                    </div>
                  </div>
                </div>
                : <div className="position-relative">
                <input className="form-control" name="keywordProduct" value={keywordProduct} onChange={this.handleFilter} placeholder="Tìm sản phẩm"></input>
                <div className="card mb-0 w-100 position-absolute" style={{ zIndex: 1 }}>
                  {listSearchProduct && keywordProduct && listSearchProduct.map((product, index) =>{
                    return (
                      <div key={index}>
                        {/* <div className="row">
                          <div className="col-12 form-inline" onClick={()=>this.setState({user, keywordUser: ""})}>
                            <div className="c-avatar">
                              <CImg
                                src={user.image ? user.image.public_url : INITIAL_IMAGE}
                                className="c-avatar-img"
                                alt={user._id}
                              />
                            </div>
                            <p className="mb-0 ml-3">{user.firstname} {user.lastname}</p>
                          </div>
                        </div>
                        <div className="border-bottom"></div> */}
                      </div>
                    )
                  })}
                </div>
              </div>}
              </div>
              <div className="form-group">
                <label>Kỳ hạn: (tháng)</label>
                <select
                  className="form-control"
                  name="period"
                  value={period}
                  onChange={this.onChange}
                >
                  <option value={0}>Chọn kỳ hạn</option>
                  {installmentData && installmentData.installments.map((item, index) => {
                    return (
                      <option key={index} value={item.month_sum}>{item.month_sum} tháng</option>
                    )
                  })}
                </select>
              </div>
              <div className="form-group">
                <label>Lãi xuất: (% / năm)</label>
                <input type="text" className="form-control" name="interest_rate" value={interest_rate} disabled readOnly/>
              </div>
              <div className="form-group">
                <label>Trả trước: (VND)</label>
                <input type="text" className="form-control" name="paid" value={paid} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>Nhân viên:</label>
                <div className="form-inline rounded border">
                  <div className="c-avatar">
                    <CImg
                      src={staff.image ? staff.image.public_url : INITIAL_IMAGE}
                      className="c-avatar-img"
                      alt={staff._id}
                    />
                  </div>
                  <p className="mb-0 ml-3">{staff.firstname} {staff.lastname}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group">
                <label>Ngày lập phiếu:</label>
                <input type="date" className="form-control" name="startedAt" value={startedAt} onChange={this.onChange}></input>
              </div>
              <div className="form-group">
                <label>Ngày đáo hạn:</label>
                <input type="date" className="form-control" name="endedAt" value={endedAt} onChange={this.onChange}></input>
              </div>
              <div className="form-group">
                <label>Lịch sử trả góp:</label>
                {detail && <CDataTable
                items={detail}
                fields={fields}
                striped
                itemsPerPage={5}
                pagination
                scopedSlots = {{
                  'm': (item) => (
                  <td>{item.month}</td>
                  ),
                  'due_date': (item) => (
                  <td>{new Date(item.due_date).toLocaleDateString("vn-VN")}</td>
                  ),
                  'status': (item) => (
                    <td>{this.setStatus(item.status)}</td>
                    ),
                  'actions': (item) => (
                    <td>
                      <CButton
                      onClick={() => this.onDeleteSpecification(item)}
                      className="mr-1 mb-1 mb-xl-0"
                      color="danger"
                      >
                        Sửa
                      </CButton>
                    </td>

                  )
                }}
              />}
              </div>
              <div className="form-group">
                <label>Số tiền còn nợ: (VND)</label>
                <input type="text" className="form-control" name="debt" value={debt} disabled readOnly/>
              </div>
            </div>
					</div>
				</CModalBody>
				<CModalFooter>
					<CButton color="primary" onClick={() => this.onSubmit(!large)}>
						Save
					</CButton>{' '}
					<CButton color="secondary" onClick={() => onClose(!large)}>
						Cancel
					</CButton>
				</CModalFooter>
			</CModal>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.detail,
    listSearchUser: state.user.listSearch,
    listSearchProduct: state.user.listSearch,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFilterUser : (keyword) =>{
      dispatch(UserActions.onFilter(keyword))
    },
    onFilterProduct : (keyword) =>{
      dispatch(ProductsActions.onFilter(keyword))
    },
    onCreate: (params) =>{
      dispatch(InstallmentActions.onCreate({params}))
    },
    onUpdate: (id, params) =>{
      dispatch(InstallmentActions.onUpdate({id, params}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstallmentDetail);
