import React, { Component } from 'react';
import {connect} from 'react-redux';

// @Functions
import { toastError } from '../../utils/toastHelper';

// @Actions
import AuthorizationActions from '../../redux/actions/auth'

class ActivePassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: ""
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

  onResetPassword = () =>{
    const { match, onActivatePassword, t } = this.props;
    const { newPassword, confirmPassword } = this.state;
    if(newPassword === confirmPassword && newPassword!== null) {
      onActivatePassword({
        token : match.params.token,
        data: { password : newPassword }
      })
    }
    else{
      toastError(`${t('active.toastify.error')}`)
    }
  }

  render() {
    const { t } = this.props;
    const { newPassword, confirmPassword } = this.state;
    return (
      <div  id="activate">
        <div className="activate shadow p-3 mb-5 bg-white rounded">
          <div className="">
            <h3>{t('active.password.h2')}</h3>
          </div>
          <input className="form-control my-4" type="password" name="newPassword" value={newPassword} onChange={this.onChange} placeholder={t('user.new.input')}></input>
          <input className="form-control my-4" type="password" name="confirmPassword" value={confirmPassword} onChange={this.onChange} placeholder={t('user.confirm.input')}></input>
          <button className="btn btn-primary" onClick={()=> this.onResetPassword()}>{t('user.save-password.button')}</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onActivatePassword : (payload) =>{
			dispatch(AuthorizationActions.onActivatePassword(payload))
		},
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ActivePassword);