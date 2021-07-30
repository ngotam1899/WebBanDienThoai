import React, { Component } from 'react';
import './styles.css';
import { assets } from '../../constants/assetsImage';
import { withTranslation } from 'react-i18next'

class Footer extends Component {
  componentDidUpdate() {
    /*global FB*/
    if (FB) {
      FB.XFBML.parse();
    }
  }
  componentDidMount(){
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

  render() {
    const {t} = this.props;
    return (
      <>
        <div className="footer-top-area py-2">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <img src={assets('brand-footer.png')} className="w-100" alt="TellMe" />
                <div className="row">
                  <div className="col-12 form-inline">
                    <div className="bill-icon" style={{width: "12%"}}>
                      <i className="fa fa-map-marker-alt text-xl"></i>
                    </div>
                    <div className="ml-3 my-1" style={{width: "80%"}}>
                      <p className="mb-0">{t("common.address")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <h3 className="mt-4 text-light">{t("order.payment.way")}</h3>
                <img className="rounded bg-light" src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404__480.png" style={{ width: '30%' }} alt=""></img>
              </div>

              <div className="col-md-3 col-sm-5">
                <h3 className="mt-4 text-light">{t("checkout.express-unit.input")}</h3>
                <img className="rounded bg-light" style={{ width: '30%' }} src="https://donhang.ghn.vn/static/media/Giao_Hang_Nhanh_Toan_Quoc_color.b7d18fe5.png"></img>
              </div>

              <div className="col-md-3 col-sm-7">
                <h3 className="mt-4 text-light">Fanpage</h3>
                <div className="w-100">
                  <div className="fb-page" data-href="https://www.facebook.com/tellme.tieuluanchuyennganh"
                    data-width="320" data-height="" data-small-header="false" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="false">
                    <blockquote cite="https://www.facebook.com/tellme.tieuluanchuyennganh" class="fb-xfbml-parse-ignore">
                      <a href="https://www.facebook.com/tellme.tieuluanchuyennganh">TellMe - Hệ thống điện thoại</a></blockquote></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-area">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className="copyright">
                  <p className="my-1">&copy; 2021 {t("common")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation()(Footer);