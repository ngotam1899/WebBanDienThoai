import React, { Component } from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Actions
import ProductsActions from '../../redux/actions/products'
// @Constance
import installmentRules from './installmentRules.json'
import installmentData from '../../utils/installment.json'

class InstallmentPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      percent: '',
      period: ''
    }
  }

  componentDidMount(){
    const { match, onGetDetailProduct } = this.props;
    onGetDetailProduct(match.params.productID);
  }

  onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    console.log(name, value)
    this.setState({
      [name]:  value
    })
  }

  

  render() {
    const { t, product, match, authInfo } = this.props;
    const { percent, period } = this.state;
    const color = match.params.colorID;
    return (
      <div className="container mb-3">
        <div className="row">
          <div className="col-12 my-2">
            <a className="text-decoration-none" href="/#/">{t('header.home.menu')}</a>
            <i className="fa fa-chevron-right px-2 w-25-px"></i>
            <a className="text-decoration-none" href="/#/promotion">Installment Page</a>
          </div>
          <div className="col-6 my-2">
            <div className="rounded shadow-sm my-2">
              <div className="px-3 py-2">
                <h3 className="mb-1">Sản phẩm</h3>
                <div className="mb-2 border-bottom"></div>
                {product && <div className="row">
                  <div className="col-3">
                    <img src={product.bigimage.public_url} alt={product.name} className="w-100"></img>
                  </div>
                  <div className="col-9 align-self-center">
    <p className="font-weight-bold mb-0">{product.name}</p>
    <p className="font-italic mb-0">Màu {product.colors.find(i => i._id === color).name_vn}</p>
    <p className="mb-0">{product.colors.find(i => i._id === color).price} VND</p>
                  </div>
                </div>}
              </div>
            </div>
            <div className="rounded shadow-sm my-2">
              <div className="px-3 py-2">
                <h3 className="mb-1">Installment details</h3>
                <div className="mb-2 border-bottom"></div>
                { authInfo && <>
                  <div className="row">
                    <div className="col">
                      <div className="form-floating validate-required mb-3">
                        <input type="text" className="form-control"  value={authInfo.firstname} readOnly disabled/>
                        <label >{t('checkout.firstname.input')}*</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating validate-required mb-3">
                        <input type="text" className="form-control"  value={authInfo.lastname} readOnly disabled/>
                        <label >{t('checkout.lastname.input')}*</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-floating mb-3 validate-required">
                    <input type="text" className="form-control"  value={authInfo.address} readOnly disabled/>
                    <label >{t('checkout.address.input')}*</label>
                  </div>
                  <div className="form-floating mb-3 validate-required">
                    <input type="email" className="form-control"  value={authInfo.email} readOnly disabled/>
                    <label >Email*</label>
                  </div>
                  <div className="form-floating mb-3 validate-required">
                    <input type="text" className="form-control"  value={authInfo.phonenumber} readOnly disabled/>
                    <label >{t('checkout.phone.input')}*</label>
                  </div>
                </>}
              </div>
            </div>
            <div className="rounded shadow-sm my-2">
              <div className="px-3 py-2">
                <h3 className="mb-1">Thông tin đăng ký trả góp</h3>
                <div className="mb-2 border-bottom"></div>
                <table className="table table-striped border">
                  <tbody>
                    {installmentRules && installmentRules.rules.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{item.title}</th>
                          <td>{item.content}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="rounded shadow-sm my-2">
              <div className="px-3 py-2">
                <h3 className="mb-1">Kế hoạch trả góp</h3>
                <div className="mb-2 border-bottom"></div>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <select className="form-select" id="floatingSelect" name="percent" value={percent} onChange={this.onChange} required>
                        <option defaultValue>Chọn phần trăm</option>
                        <option value={30}>30 %</option>
                        <option value={40}>40 %</option>
                        <option value={50}>50 %</option>
                        <option value={60}>60 %</option>
                        <option value={70}>70 %</option>
                      </select>
                      <label htmlFor="floatingSelect">Trả trước</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <select className="form-select"  id="floatingSelect" name="period" value={period} onChange={this.onChange} required>
                        <option defaultValue>Chọn khoảng thời gian</option>
                        {installmentData.installments.map((item, index)=>{
                            return(
                              <option key={index} value={item.month_sum}>{item.month_sum} tháng</option>
                            )
                          })
                        }
                      </select>
                      <label htmlFor="floatingSelect">Thời gian vay</label>
                    </div>
                  </div>
                </div>
                {period && percent && <>
                  <div className="mb-2 border-bottom"></div>
                  <h4>Chi tiết</h4>
                </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
    product: state.products.detail,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetDetailProduct: (payload) => {
      dispatch(ProductsActions.onGetDetail(payload))
    },
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(
  withConnect,
  withTranslation()
)(InstallmentPage);