import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next'
import OrdersActions from '../../redux/actions/order'

class ActiveOrder extends Component {
  componentDidMount(){
    const {match, onConfirmOrder} = this.props;
    onConfirmOrder(match.params.token)
  }

  render() {
    const { t } = this.props;
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1 style={{fontSize: '10vw'}}>Congratulations!</h1>
          </div>
          <h2>{t('active.order.h2')}</h2>
          <p>{t('active.order.p')}</p>
          <a href="/">{t('active.account.button')}</a>
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
    onConfirmOrder: (token) => {
      dispatch(OrdersActions.onConfirmOrder(token))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(ActiveOrder);