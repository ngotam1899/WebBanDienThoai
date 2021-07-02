import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Functions
import { SHIPPING_EXPRESS, SHIPPING_STANDARD } from '../../constants'
// @Actions
import UsersActions from '../../redux/actions/user'

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    const {service_type_id} = props;
    this.state = {
      service_type_id
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })
  }
  

  render() {
    const {service_type_id} = this.state;
    const {t, setService} = this.props;
    return (  
      <div show="true" className="modal fade" id="expressModal" role="dialog" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="text-center w-100">
                <h3 className="modal-title m-0">{t('checkout.modal.choose.express')}</h3>
              </div>
              <div className="form-check form-switch">
                <button type="button" className="btn-close rounded-circle bg-light p-2" data-bs-dismiss="modal"></button>
              </div>
            </div>
            <div className="modal-body">
              <div className="form-check">
                <input type="radio" value="giao-hang-nhanh" id="giao-hang-nhanh" name="shipping" className="form-check-input" defaultChecked/>
                <label htmlFor="giao-hang-nhanh" className="form-check-label">
                  <img className="express rounded border py-2 float-start" src="https://static.ybox.vn/2020/6/1/1592759417126-ghn.png" alt=""></img>
                  <div className="float-start ml-2">
                    <p className="mb-0">Giao hàng nhanh</p>
                    <p className="mb-0 text-secondary smaller">{t('checkout.modal.express.label')}</p>
                  </div>
                </label>
              </div>
              <div className="rounded border ml-4 px-3 py-2">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="service_type_id" id="2" value="2" onChange={this.onChange}/>
                  <label className="form-check-label" htmlFor="2">
                    <p className="mb-0">{SHIPPING_EXPRESS}</p>
                    <p className="mb-0 text-secondary smaller">{t('checkout.modal.select.1')}</p>
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="service_type_id" id="1" value="1" defaultChecked onChange={this.onChange}/>
                  <label className="form-check-label" htmlFor="1">
                    <p className="mb-0">{SHIPPING_STANDARD}</p>
                    <p className="mb-0 text-secondary smaller">{t('checkout.modal.select.2')}</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={()=>{setService(service_type_id)}}>{t('user.save-password.button')}</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('user.close.button')}</button>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {

  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    onChangePassword : (data) =>{
			dispatch(UsersActions.onChangePassword(data))
    },
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(ChangePassword);