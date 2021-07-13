import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next'
// @Actions
import AdActions from "../../redux/actions/ad";
import { Link } from 'react-router-dom';
// @Functions
import { LOCAL } from '../../constants/index';

class PromotionPage extends Component {

  componentDidMount(){
    document.title = "Quảng cáo | Promotion";
    const { onGetList } = this.props;
    onGetList({active: 1});
    /* FB comment plugin */
    window.fbAsyncInit = () => {
      /* eslint-disable */
      window.FB.init({
        appId: '308035613517523',
        xfbml: true,
        version: 'v2.6'
      });
      FB.XFBML.parse();
      /* eslint-disable */
    };

    (function(d, s, id){
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /* FB comment plugin */
  }

  componentDidUpdate(prevProps) {
    try{
      /*global FB*/
      if (FB) {
        FB.XFBML.parse();
      }
    }
    catch(err){
    }
  }
  
  setStatus = (startedAt, endedAt) => {
    const { t } = this.props;
    var today = new Date();
    if(new Date(startedAt) > today) return t('promotion.not-yet')
    else {
      if(new Date(endedAt) > today) return t('promotion.now')
      else return t('promotion.done')
    }
  }

  render() {
    var { t, listAd, history } = this.props;
    
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-12 my-2">
            <a className="text-decoration-none directory rounded p-2" href="/#/">{t('header.home.menu')}</a>
            <i className="fa fa-chevron-right px-2 w-25-px"></i>
          </div>
          <div className="col-12">
            <h1 className="font-weight-bold">{t('promotion.page.title')}</h1>
          </div>
          {listAd && listAd.map((ad, index) => {
            return(
              <div className="col-12 col-md-6 col-xl-4 my-2" key={index}>
                <Link to={this.setStatus(ad.startedAt, ad.endedAt) !== t('promotion.done') && ad.link.replace("https://localhost:5000/#", "")}>
                <div className="rounded shadow-sm my-2">
                  <img className="rounded" src={ad.image.public_url}></img>
                  <div className="row px-3 py-2">
                    <div className="col-12">
                      <h4 className="font-weight-bold float-start">{ad.name}</h4>
                      <p className="font-weight-bold float-end mb-0 text-danger">{this.setStatus(ad.startedAt, ad.endedAt)}</p>
                    </div>
                    <div className="col-12 mb-2">
                      <p className="float-start mb-0">{ad.content}</p>
                      <p className="float-end mb-0 font-italic text-danger">({new Date(ad.startedAt).toLocaleDateString("vn-VN")} - {new Date(ad.endedAt).toLocaleDateString("vn-VN")})</p>
                    </div>
                    <div className="col-12 text-right">
                      {this.setStatus(ad.startedAt, ad.endedAt) !== t('promotion.done') && <button type="button" className="btn btn-primary" onClick={()=> history.push(ad.link.replace("https://localhost:5000/#", ""))}>{t('common.detail.button')}</button>}
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            )
          })}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="fb-comments" data-href={`${LOCAL}/#/promotion`} data-width="100%" data-numposts="5"></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    listAd: state.ad.list
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetList: (params) => {
      dispatch(AdActions.onGetList(params))
    },
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(
  withConnect,
  withTranslation()
)(PromotionPage)