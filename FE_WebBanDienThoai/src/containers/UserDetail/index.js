import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Actions
import UsersActions from '../../redux/actions/user'

class UserDetail extends Component {
  constructor(props) {
    super(props);
    const {userInfo} = props;
    this.state = {
      firstname: userInfo ? userInfo.firstname :"",
      lastname: userInfo ? userInfo.lastname :"",
      phonenumber: userInfo ? userInfo.phonenumber :"",
      address: userInfo ? userInfo.address :"",
      email: userInfo ? userInfo.email :"",
    }
  }

  updateProfile =()=>{
    const {userInfo, onUpdate} = this.props;
    const {firstname, lastname, phonenumber, address, email, password} = this.state;
    var data = {firstname, lastname, phonenumber, address, email, password}
    onUpdate(userInfo._id, data);
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
    const {firstname, lastname, phonenumber, address, email} = this.state;
    const {t} = this.props;
    return (  
      <div show="true" className="modal fade" id="infoModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{t('user.info.card')}</h5>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <div className="form-group">
                <label>{t('checkout.firstname.input')}:</label>
                <input type="text" className="form-control" name="firstname" value={firstname} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>{t('checkout.lastname.input')}: </label>
                <input type="text" className="form-control" name="lastname" value={lastname} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>{t('checkout.phone.input')}: </label>
                <input type="number" className="form-control" name="phonenumber" value={phonenumber} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>{t('checkout.address.input')}: </label>
                <input type="text" className="form-control" name="address" value={address} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>Email: </label>
                <input type="email" className="form-control" name="email" value={email} onChange={this.onChange}/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.updateProfile()}>{t('user.save-change.button')}</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">{t('user.close.button')}</button>
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
    onUpdate : (id, params) =>{
			dispatch(UsersActions.onUpdate({id, params}))
    },
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(UserDetail);