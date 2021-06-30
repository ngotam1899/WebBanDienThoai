import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'

// @Functions
import { toastError } from '../../utils/toastHelper';

// @Actions
import UsersActions from '../../redux/actions/user'

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
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

  changePassword() {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    const {onChangePassword, t, userInfo} = this.props
    if(newPassword === confirmPassword && newPassword!== null) {
      if(userInfo.password){
        onChangePassword({
          password: oldPassword,
          new_password: newPassword,
        });
      }
      else{
        onChangePassword({
          new_password: newPassword,
        });
      }
    }
    else{
      toastError(t('user.password.error'))
    }
  }

  

  render() {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    const {t, userInfo} = this.props;
    return (  
      <div show="true" className="modal fade" id="passwdModal" role="dialog" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="text-center w-100">
                <h3 className="modal-title m-0">{t('user.change-password.card')}</h3>
              </div>
              <div className="form-check form-switch">
                <button type="button" className="btn-close rounded-circle bg-light p-2" data-bs-dismiss="modal"></button>
              </div>
            </div>
            <div className="modal-body">
              {userInfo.password && <div className="form-group">
                <label>{t('user.old.input')}:</label>
                <input type="password" className="form-control" name="oldPassword" value={oldPassword} onChange={this.onChange}/>
              </div>}
              <div className="form-group">
                <label>{t('user.new.input')}:</label>
                <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>{t('user.confirm.input')}:</label>
                <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.onChange}/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => this.changePassword()}>{t('user.save-password.button')}</button>
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