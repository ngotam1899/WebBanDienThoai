import React, { Component } from 'react'
/* eslint-disable */
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {connect} from 'react-redux';
import { compose } from "redux";
import { withRouter } from 'react-router-dom'
/* eslint-disable */

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
    return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem divider />*/}
        <CDropdownItem onClick={()=> this.onLogout()}>
          <CIcon name="cil-lock-locked" className="mfe-2"/>
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    )
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
