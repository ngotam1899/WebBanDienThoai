import React, { Component } from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Components
import ContentLoader from "react-content-loader"
// @Actions
import ProductsActions from '../../redux/actions/products'
import InstallmentActions from '../../redux/actions/installment'
// @Constance
import installmentRules from './installmentRules.json'
import installmentData from '../../utils/installment.json'
import installmentQuestion from './installmentQuestion.json'
// @Functions
import { toastError } from '../../utils/toastHelper';

class InstallmentPage extends Component {
  constructor(props){
    super(props);
    const { match } = props;
    this.state = {
      color: match.params.colorID,
      percent: 30,
      period: '',
      prepay: 0,
      loan: 0,
      detail: [],
      total_interest: 0,
      total: 0
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
    this.setState({
      [name]:  value
    })
  }

  onCreateInstallment = () => {
    const { onCreate, product, authInfo } = this.props;
    var { color, period, prepay } = this.state;
    if(period === '') return toastError('Bạn chưa chọn thời gian vay')
    const interest_rate = JSON.parse(period).percent;
    period = JSON.parse(period).month_sum;
    var data = {
      period,
      interest_rate,
      prepay,
      product: {
        _id: product._id,
        color,
        product_price: product.colors.find(i => i._id === color).price
      },
      user: authInfo._id
    }
    onCreate(data)
  }

  onGetInstallment = () => {
    const { product } = this.props;
    var { color, percent, period } = this.state;
    if(period === '') return toastError('Bạn chưa chọn thời gian vay')
    const interest_rate = JSON.parse(period).percent;
    period = JSON.parse(period).month_sum;
    //var debt = Math.ceil(((product.product_price-prepay )*(1 + interest_rate*0.01))/1000)* 1000
    var detail = [];
    for(let i=0; i<period; i++){
      detail[i] = {
        month: i + 1,
        origin: Math.ceil(((product.colors.find(i => i._id === color).price*(1-percent*0.01))/period)/1000)*1000,
        interest: Math.ceil(((product.colors.find(i => i._id === color).price*(1-percent*0.01)*interest_rate*0.01)/period)/1000)*1000,
        total: Math.ceil(((product.colors.find(i => i._id === color).price*(1-percent*0.01)*(1 + interest_rate*0.01))/period)/1000)*1000
      }
    }
    this.setState({
      prepay: Math.ceil((product.colors.find(i => i._id === color).price*percent*0.01)/1000)*1000,
      loan: Math.ceil((product.colors.find(i => i._id === color).price*(1-percent*0.01))/1000)*1000,
      detail,
      total_interest: Math.ceil((product.colors.find(i => i._id === color).price*(1-percent*0.01)*interest_rate*0.01)/1000)*1000,
      total: Math.ceil((product.colors.find(i => i._id === color).price*(1-percent*0.01)*(1 + interest_rate*0.01))/1000)*1000
    })
  }

  render() {
    const { t, product, authInfo } = this.props;
    const { color, percent, period, prepay, loan, detail, total_interest, total } = this.state;
    
    return (
      <div className="container mb-3">
        <div className="row">
          <div className="col-12 my-2">
            <a className="text-decoration-none" href="/#/">{t('header.home.menu')}</a>
            <i className="fa fa-chevron-right px-2 w-25-px"></i>
            <a className="text-decoration-none" href="/#/promotion">Installment Page</a>
          </div>
          <div className="col-md-6 col-12">
            <div className="rounded shadow-sm my-3">
              <div className="px-3 py-2">
                <h3 className="mb-1">Sản phẩm</h3>
                <div className="mb-2 border-bottom"></div>
                {product ? <div className="row">
                  <div className="col-3">
                    <img src={product.bigimage.public_url} alt={product.name} className="w-100"></img>
                  </div>
                  <div className="col-9 align-self-center">
    <p className="font-weight-bold mb-0">{product.name}</p>
    <p className="font-italic mb-0">Màu {product.colors.find(i => i._id === color).name_vn}</p>
    <p className="mb-0">{product.colors.find(i => i._id === color).price} VND</p>
                  </div>
                </div>
                : <ContentLoader 
                speed={0}
                width={340}
                height={133}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="7" y="0" rx="10" ry="10" width="128" height="133" /> 
                <rect x="153" y="28" rx="10" ry="10" width="188" height="20" /> 
                <rect x="153" y="58" rx="10" ry="10" width="188" height="20" /> 
                <rect x="153" y="88" rx="10" ry="10" width="188" height="20" />
              </ContentLoader>}
              </div>
            </div>
            <div className="rounded shadow-sm my-3">
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
            <div className="rounded shadow-sm my-3">
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
          <div className="col-md-6 col-12">
            <div className="rounded shadow-sm my-3">
              <div className="px-3 py-2">
                <h3 className="mb-1">Kế hoạch trả góp</h3>
                <div className="mb-2 border-bottom"></div>
                <div className="row">
                  <div className="col-4">
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
                  <div className="col-5">
                    <div className="form-floating mb-3">
                      <select className="form-select"  id="floatingSelect" name="period" value={period} onChange={this.onChange} required>
                        <option defaultValue>Chọn khoảng thời gian</option>
                        {installmentData.installments.map((item, index)=>{
                            return(
                              <option key={index} value={JSON.stringify(item)}>{item.month_sum} tháng</option>
                            )
                          })
                        }
                      </select>
                      <label htmlFor="floatingSelect">Thời gian vay</label>
                    </div>
                  </div>
                  <div className="col-3 align-self-center text-right">
                    <button className="btn btn-primary" type="button" onClick={() => this.onGetInstallment()}>
                      <i className="fa fa-funnel-dollar mr-1"></i>
                      Lọc kết quả
                    </button>
                  </div>
                </div>
                {detail.length > 0 &&<>
                  <div className="mb-2 border-bottom"></div>
                  <h4>Chi tiết</h4>
                  <div className="row">
                  <div className="col-6 form-inline">
                    <div className="bill-icon">
                      <i className="fa fa-receipt text-xl"></i>
                    </div>
                    <div className="form-floating">
                      <input type="text" className="form-control border-0" name="prepay" id="prepay" value={prepay}/>
                      <label htmlFor="text">Thanh toán trước:</label>
                    </div>
                  </div>
                  <div className="col-6 form-inline">
                    <div className="bill-icon">
                      <i className="fa fa-file-invoice-dollar text-xl"></i>
                    </div>
                    <div className="form-floating">
                      <input type="text" className="form-control border-0" name="loan" id="loan" value={loan}/>
                      <label htmlFor="text">Tổng số tiền cần vay</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <table className="table table-striped border mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Tháng</th>
                          <th scope="col">Tiền gốc</th>
                          <th scope="col">Tiền lãi</th>
                          <th scope="col">Tổng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detail.map((item, index) => {
                          return (
                          <tr key={index}>
                            <th scope="row">{item.month}</th>
                            <td>{item.origin}</td>
                          <td>{item.interest}</td>
                          <td>{item.total}</td>
                          </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-6 form-inline">
                    <div className="bill-icon">
                      <i className="fa fa-balance-scale text-xl"></i>
                    </div>
                    <div className="form-floating">
                      <input type="text" className="form-control border-0" name="total_interest" id="total_interest" value={total_interest}/>
                      <label htmlFor="text">Tổng lãi chênh lệch</label>
                    </div>
                  </div>
                  <div className="col-6 form-inline">
                    <div className="bill-icon">
                      <i className="fa fa-money-bill-alt text-xl"></i>
                    </div>
                    <div className="form-floating">
                      <input type="text" className="form-control border-0" name="total" id="total" value={total}/>
                      <label htmlFor="text">Tổng tiền phải trả</label>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button type="button" className="btn btn-primary mb-2" onClick={()=> this.onCreateInstallment()}>
                      <i className="fa fa-question-circle mr-2"></i>Đăng ký chờ xét duyệt
                    </button>
                  </div>
                </div>
                </>}
                <div className="mb-2 border-bottom"></div>
                <p className="mb-0 font-italic text-secondary">Số tiền chênh lệch thực tế từ 10.000đ -> 100.000đ một tháng, bạn vui lòng qua trực tiếp cửa hàng để được tư vấn chính xác</p>
                
              </div>
            </div>
            <div className="rounded shadow-sm my-3">
              <div className="px-3 py-2">
                <h3 className="mb-1">Câu hỏi thường gặp</h3>
                <div className="mb-2 border-bottom"></div>
                <div className="accordion pb-3" id="accordionExample">
                  {installmentQuestion.questions.map((question, index) => {
                    return (
                      <div className="accordion-item" key={index}>
                        <h2 className="accordion-header mt-0" id={index}>
                          <button className={`accordion-button ${index > 0 && "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                            <p className="mb-0 font-weight-bold">{question.title}</p>
                          </button>
                        </h2>
                        <div id={`collapse${index}`} className={`accordion-collapse collapse ${index===0 && "show"}`} aria-labelledby={index} data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <p className="mb-0">{question.content}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
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
    onCreate: (params) =>{
      dispatch(InstallmentActions.onCreate({params}))
    },
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(
  withConnect,
  withTranslation()
)(InstallmentPage);