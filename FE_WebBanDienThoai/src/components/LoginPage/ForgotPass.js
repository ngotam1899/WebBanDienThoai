import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import { toastError } from '../../utils/toastHelper';
// @Actions
import AuthorizationActions from '../../redux/actions/auth'

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
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

  sendEmail() {
    const {email} = this.state;
    const {onForgotPassword} = this.props
    if(email) {
      onForgotPassword({email});
    }
    else{
      toastError('Vui lòng nhập email để đặt lại mật khẩu')
    }
  }

  render() {
    const {email} = this.state;
    return (  
      <div show="true" className="modal fade" id="forgotPassword" role="dialog" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Quên mật khẩu</h5>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nhập email để xác thực</label>
                <input type="email" className="form-control" name="email" value={email} onChange={this.onChange}/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.sendEmail()}>Send email</button>
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
    onForgotPassword : (data) =>{
			dispatch(AuthorizationActions.onForgotPassword(data))
		},
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(ForgotPassword);