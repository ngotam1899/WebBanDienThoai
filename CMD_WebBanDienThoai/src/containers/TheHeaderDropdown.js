import React, { Component } from 'react'
/* eslint-disable */
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderNavItem,
  CHeaderNavLink,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {connect} from 'react-redux';
import { compose } from "redux";
import { withRouter } from 'react-router-dom'
/* eslint-disable */
// @Functions
import {INITIAL_IMAGE} from '../constants';
// @Actions
import AuthorizationActions from '../redux/actions/auth'

class TheHeaderDropdown extends Component {
  componentDidMount(){
    const {onGetProfile} = this.props;
    const token = localStorage.getItem('AUTH_USER')
    onGetProfile(null,token);
  }

  onLogout = () =>{
    const {onLogout, history} = this.props;
    localStorage.removeItem('AUTH_USER')
    onLogout()
    history.push('/login');
  }

  render(){
    const { userInfo, isLogin } = this.props;
    return (<>
    {userInfo ? <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={userInfo.image ? userInfo.image.public_url : INITIAL_IMAGE}
            className="c-avatar-img"
            alt={userInfo.email}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
          <strong>{userInfo.firstname} {userInfo.lastname}</strong>
        </CDropdownItem>
        <CDropdownItem onClick={()=> this.onLogout()}>
          <CIcon name="cil-lock-locked" className="mfe-2"/>
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    : <CHeaderNavItem  className="px-3">
        <CHeaderNavLink to="/login">Login</CHeaderNavLink>
      </CHeaderNavItem>}
    </>)
  }
}
const mapStateToProps = (state) =>{
  return {
    userInfo: state.auth.detail,
    isLogin: state.auth.loggedIn,
  }
}

const mapDispatchToProps =(dispatch)=> {
	return {
		onGetProfile : (data, headers) =>{
			dispatch(AuthorizationActions.onGetProfile(data, headers))
    },
    onLogout : ()=>{
      dispatch(AuthorizationActions.onLogout())
    },
	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(
  withConnect,
  withRouter
)(TheHeaderDropdown)
