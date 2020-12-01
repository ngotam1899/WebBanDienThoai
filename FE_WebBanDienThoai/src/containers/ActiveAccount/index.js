import React, { Component } from 'react';
import {connect} from 'react-redux';
import AuthorizationActions from '../../redux/actions/auth'

class ActiveAccount extends Component {
  componentDidMount(){
    const {match, onActivateAccount} = this.props;
    console.log("token", match.params.token)
    onActivateAccount(match.params.token)
  }


  render() {
    return (
      <div>
        Đăng ký tài khoản thành công
        <button className=""><a href="/user/dang-nhap">Đăng nhập</a></button>
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
    onActivateAccount: (token) => {
      dispatch(AuthorizationActions.onActivateAccount(token))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ActiveAccount);