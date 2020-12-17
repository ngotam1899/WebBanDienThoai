import React, { Component } from 'react';
import {connect} from 'react-redux';
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

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })
  }

  updateProfile() {
    const {onUpdate, userInfo} = this.props;
    const {firstname, lastname, phonenumber, address, email} = this.state;
    const data = {firstname, lastname, phonenumber, address, email}
    onUpdate(userInfo._id, data);
  }

  render() {
    const {userInfo} = this.props;
    const {firstname, lastname, phonenumber, address, email} = this.state;
    return (  
      <div show="true" className="modal fade" id="infoModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Thông tin khách hàng</h5>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <div className="form-group">
                <label>First name:</label>
                <input type="text" className="form-control" name="firstname" value={firstname} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>Last name: </label>
                <input type="text" className="form-control" name="lastname" value={lastname} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>Số điện thoại: </label>
                <input type="number" className="form-control" name="phonenumber" value={phonenumber} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>Địa chỉ: </label>
                <input type="text" className="form-control" name="address" value={address} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label>Email: </label>
                <input type="email" className="form-control" name="email" value={email} onChange={this.onChange}/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.updateProfile()}>Lưu thay đổi</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div> }
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


export default connect(mapStateToProps, mapDispatchToProps) (UserDetail);