import React, { Component } from 'react';
import {connect} from 'react-redux';
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
    const {onChangePassword} = this.props
    const data = {
      password: oldPassword,
      new_password: newPassword,
    }
    if(newPassword === confirmPassword && newPassword!== null) {
      onChangePassword(data);
    }
  }

  render() {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    return (  
      <div show="true" className="modal fade" id="passwdModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thay đổi mật khẩu</h5>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <div className="form-group">
                <label>Nhập mật khẩu cũ:</label>
                <input type="password" className="form-control" name="oldPassword" value={oldPassword} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>Nhập mật khẩu mới:</label>
                <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu mới:</label>
                <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.onChange}/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.changePassword()}>Đổi mật khẩu</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
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


export default connect(mapStateToProps, mapDispatchToProps) (ChangePassword);