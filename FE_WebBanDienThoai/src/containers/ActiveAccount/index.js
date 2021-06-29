import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next'
import AuthorizationActions from '../../redux/actions/auth'
import './styles.css';

class ActiveAccount extends Component {
  componentDidMount(){
    const {match, onActivateAccount} = this.props;
    onActivateAccount(match.params.token)
  }

  render() {
    const { t } = this.props;
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>Wellcome!</h1>
          </div>
          <h2>{t('active.account.h2')}</h2>
          <p>{t('active.account.p')}</p>
          <a href="/user/dang-nhap">{t('header.login.button')}</a>
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

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(ActiveAccount);