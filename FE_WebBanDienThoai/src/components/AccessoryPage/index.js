import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import {connect} from 'react-redux';
import {compose} from 'redux';

class AccessoryPage extends Component {
  
  render() {
    const { t } = this.props;
    return (
      <div className="container mb-3">
        <div className="row">
          <div className="col-12 my-2">
            <a className="text-decoration-none" href="/#/">{t('header.home.menu')}</a>
            <i className="fa fa-chevron-right px-2 w-25-px"></i>
            <a className="text-decoration-none" href="/#/carts">Accessory Page</a>
          </div>
          <div className="col-12 my-2">
            <div className="rounded shadow-sm my-2">
              <div className="px-3 py-2">
                <h3 className="mb-1">Danh mục phụ kiện</h3>
                <div className="mb-2 border-bottom">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    //product: state.products.detail,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    /* onGetDetailProduct: (payload) => {
      dispatch(ProductsActions.onGetDetail(payload))
    }, */
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(AccessoryPage);