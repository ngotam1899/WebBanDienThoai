import React, { Component } from 'react';
import {connect} from 'react-redux';
import AuthorizationActions from '../../redux/actions/auth'
import './styles.css';

class ActiveAccount extends Component {
  componentDidMount(){
    const {match, onActivateAccount} = this.props;
    console.log("token", match.params.token)
    onActivateAccount(match.params.token)
  }


  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>Wellcome!</h1>
          </div>
          <h2>Đăng ký tài khoản thành công</h2>
          <p>Chào mừng bạn đã đến với TellMe - Trang web bán điện thoại uy tín, chính hãng.</p>
          <a href="/user/dang-nhap">Đăng nhập</a>
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
    onActivateAccount: (token) => {
      dispatch(AuthorizationActions.onActivateAccount(token))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ActiveAccount);