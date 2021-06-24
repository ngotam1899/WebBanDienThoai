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

const fields = ['month', 'due_date', 'payable', 'status']

class InstallmentDetail extends Component {
  constructor(props){
    super(props);
    const { installment, userInfo } = props;
    this.state = {
      id: installment ? installment._id : '',
      startedAt: installment ? (installment.startedAt ? installment.startedAt.slice(0,10) : '') : new Date().toISOString().slice(0, 10),
      endedAt: installment && installment.endedAt ? installment.endedAt.slice(0,10) : '',
      period: installment ? installment.period : '',
      interest_rate: installment ? installment.interest_rate : '',
      prepay: installment ? installment.prepay : 0,
      product: installment ? installment.product : '',
      status: installment ? installment.status : -1,
      staff: installment && installment.staff ? installment.staff : {
        _id: userInfo._id,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        image: userInfo.image
      },
      user: installment ? installment.user : '',
      detail: installment && installment.detail ? installment.detail : [],
      debt: installment ? installment.debt : 0,
      // Search
      keywordUser: '',
      keywordProduct: '',
      selectedColor: 0,
      // Payment
      money: 0,
    }
  }
  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    const { product, startedAt, period } = this.state;
    if(name === "period"){
      var interest_rate = 0;
      var _startedAt = new Date(startedAt);
      installmentData.installments.map(item => {
        if(value === item.month_sum.toString()) interest_rate = item.percent;
      })
      this.setState({
        interest_rate,
        endedAt: new Date(_startedAt.setMonth(_startedAt.getMonth() + parseInt(value))).toISOString().slice(0, 10)
      })
    }
    if(name === "startedAt"){
      var _startedAt = new Date(value);
      this.setState({
        endedAt: new Date(_startedAt.setMonth(_startedAt.getMonth() + parseInt(period))).toISOString().slice(0, 10)
      })
    }
    if(name === "selectedColor"){
      value = JSON.parse(value);
      this.setState({ product: {
        _id: product._id,
        color: {
          _id: value._id,
          name_vn: value.name_vn
        },
        product_price: value.price
      } })
    }
    else {
      this.setState({
        [name]: value
      })
    }
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
    const { id, startedAt, period, interest_rate, prepay, product, status, staff, user, money } = this.state;
    const {onUpdate, onCreate} = this.props;
    var data = {
      startedAt,
      period,
      interest_rate,
      prepay,
      product: {
        _id: product._id._id,
        color: product.color._id,
        product_price: product.product_price
      },
      status,
      staff: staff._id,
      user: user._id,
      money
    }
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
      id, startedAt, endedAt, period, interest_rate, prepay, product, status, staff, user, detail, debt,
      keywordUser, keywordProduct, selectedColor, money
    } = this.state;
    const { large, onClose, installment, listSearchUser, listSearchProduct } = this.props;
    return (
			<CModal show={large} onClose={() => onClose(!large)} size="lg" closeOnBackdrop={false}>
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
                  <input className="form-control" name="keywordUser" value={keywordUser} onChange={this.handleFilter}
                  placeholder="Tìm khách hàng (nhập số điện thoại)"></input>
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
                  {!id && <div className="ml-auto mr-2">
                    <button type="button" className="close rounded-circle bg-light px-1" onClick={()=>this.setState({user: ""})}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>}
                </div>}
              </div>
              <div className="form-group">
                <label>Sản phẩm trả góp:</label>
                {product ? <div className="rounded border">
                  <div className="row">
                    <div className="col-3">
                      <img className="w-100" src={product._id.bigimage ? product._id.bigimage.public_url : INITIAL_IMAGE} alt={product._id.name}></img>
                    </div>
                    <div className="col-8 align-self-center">
                      <p className="font-weight-bold mb-0">{product._id.name}</p>
                      {product.color.name_vn
                      ? <><p className="font-italic mb-0">Màu {product.color.name_vn}</p>
                      <p className="mb-0">{product.product_price} VND</p></>
                      : <select className="form-control" value={selectedColor} name="selectedColor"
                      onChange={this.onChange}>
                        <option value={0}>Chọn màu</option>
                        {product.color.map((item, index) => {
                        return (
                        <option key={index} value={JSON.stringify(item)}>{item.name_vn}</option>
                        )
                      })}</select>}
                    </div>
                    {!id && <div className="col-1 align-self-center">
                      <button type="button" className="close rounded-circle bg-light px-1" onClick={()=>this.setState({product: ""})}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>}
                  </div>
                </div>
                : <div className="position-relative">
                <input className="form-control" name="keywordProduct" value={keywordProduct} onChange={this.handleFilter} placeholder="Tìm sản phẩm"></input>
                <div className="card mb-0 w-100 position-absolute" style={{ zIndex: 1 }}>
                  {listSearchProduct && keywordProduct && listSearchProduct.map((product, index) =>{
                    return (
                      <div key={index}>
                        <div className="row" onClick={()=>this.setState(
                          {
                            product: {
                              _id: {
                                _id: product._id,
                                name: product.name,
                                bigimage: product.bigimage
                              },
                              color: product.colors
                            },
                            keywordProduct: ""
                          })
                          }>
                          <div className="col-3">
                            <img className="w-100" src={product.bigimage ? product.bigimage.public_url : INITIAL_IMAGE} alt={product.name}></img>
                          </div>
                          <div className="col-9 align-self-center">
                            <p className="font-weight-bold mb-0">{product.name}</p>
                          </div>
                        </div>
                        <div className="border-bottom"></div>
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
                  disabled={id ? true : false}
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
                <input type="text" className="form-control" name="prepay" value={prepay} onChange={this.onChange} disabled={id ? true : false}/>
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
                <input type="date" className="form-control" name="endedAt" value={endedAt} disabled readOnly></input>
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
                  'due_date': (item) => (
                  <td>{new Date(item.due_date).toLocaleDateString("vn-VN")}</td>
                  ),
                  'status': (item) => (
                    <td>{this.setStatus(item.status)}</td>
                  )
                }}
              />}
              </div>
              <div className="form-group">
                <label>Số tiền còn nợ: (VND)</label>
                <input type="text" className="form-control" name="debt" value={debt} disabled readOnly/>
              </div>
              {id && <div className="form-group">
                <label>Nhập số tiền khách trả: (VND)</label>
                <input type="text" className="form-control" name="money" value={money} onChange={this.onChange} disabled={status === -1 ? true : false}/>
              </div>}
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
    listSearchProduct: state.products.listSearch,
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
