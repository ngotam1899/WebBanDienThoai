import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import {connect} from 'react-redux';
import {compose} from 'redux';
// @Actions
import CategoryActions from "../../redux/actions/categories";
// @Functions
import {LOCAL} from '../../constants/index';
import accessoryData from './accessory.json'

class AccessoryPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      more: false
    }
  }

  componentWillMount(){
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

  componentDidMount(){
    const { onGetAccessory } = this.props;
    onGetAccessory({
      accessories : 1
    })
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

  redirectCategory = (category) =>{
    const {history} = this.props;
    history.push(`/products/${category.pathseo}.${category._id}`)
  }

  render() {
    const { more } = this.state;
    const { t, listAccessory } = this.props;
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
                <div className="mb-2 border-bottom"></div>
                <div className="row">
                  {listAccessory && listAccessory.map(item => {
                    return (
                    <div className="col-3 col-md-2 col-xl-1">
                      <div className="square">
                        <button className="rounded content bg-light" onClick={() => this.redirectCategory(item)}>
                        <img src={item.image.public_url} alt=""></img>
                        </button>
                      </div>
                      <p className="text-center font-weight-bold x-small">{item.name}</p>
                    </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={ more ? "row" : "row description"}>
          <div className="col-12">
          {accessoryData.accessoryAd.map(item => {
            return (
              <>
                <h3>{item.title}</h3>
                {item.content.map(line => {
                  return (
                    <p>{line}</p>
                  )
                })}
                {item.image && 
                <div className="text-center">
                  <img src={item.image} alt=""></img>
                </div> }
              </>
            )
          })}
          </div>
          {!more && <div className="view-more" onClick={() => this.setState({ more: true })}>
            <p>Đọc thêm giới thiệu<span><i className="fa fa-angle-down ml-2"></i></span></p>
          </div>}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="fb-comments" data-href={`${LOCAL}/#/products/accessories`} data-width="100%" data-numposts="5"></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    listAccessory: state.categories.accessories,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAccessory: (payload) => {
      dispatch(CategoryActions.onGetAccessory(payload))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(AccessoryPage);