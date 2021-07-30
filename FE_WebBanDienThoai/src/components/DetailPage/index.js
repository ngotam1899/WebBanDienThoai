import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import {LOCAL} from '../../constants/index';
import { Helmet } from 'react-helmet'
import draftToHtml from 'draftjs-to-html';
import qs from "query-string";
// @Actions
import ProductsActions from '../../redux/actions/products'
import ReviewActions from '../../redux/actions/review'
import UsersActions from '../../redux/actions/user';
// @Components
import Rating from 'react-rating'
import ImageGalleries from './ImageGalleries';
import Pagination from "react-js-pagination";
import ProductItem from "../../containers/ProductItem"
import ImageLoader from './ImageLoader';
import ProductInfoLoader from './ProductInfoLoader';
import Loader from '../../containers/ProductItem/ItemLoader';
import './styles.css';
// @Functions
import tryConvert from '../../utils/changeMoney'
import numberWithCommas from "../../utils/formatPrice";
import { toastError } from '../../utils/toastHelper';
import {INITIAL_IMAGE} from '../../constants';
import getFilterParams from "../../utils/getFilterParams";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    const {match} = props;
    this.state = {
      quantity: 1,
      imageColor: "",
      check: 0,
      queryParams: {
        limit: 3,
        product: match.params.productID,
        page: 0,
      },
      _check: match.params.productID,
      filter: {
        limit: 3,
        product: match.params.productID,
        page: 0,
      }
    }
  }
  componentWillReceiveProps(nextProps){
    const {authInfo, onHistoryProduct} = this.props;
    if (nextProps.authInfo !== authInfo && nextProps.authInfo) {
      var history = [];
      nextProps.authInfo.history.map(item => history.push(item._id));
      const index = history.findIndex(product => product === nextProps.match.params.productID)
      if(index === -1){
        history.push(nextProps.match.params.productID)
        if(history.length > 4){
          history.shift();
        }
        onHistoryProduct(nextProps.authInfo._id, {history})
      }
    }
  }

  componentDidUpdate(prevProps) {
    try{
      /*global FB*/
      if (FB) {
        FB.XFBML.parse();
      }
      if (prevProps.location.search !== this.props.location.search) {
        const filters = getFilterParams(this.props.location.search);
        const { filter } = this.state;
        var params = {
          ...filter,
          ...filters
        };
        this.setState({queryParams: params})
        this.props.onGetReviews(params);
      }
    }
    catch(err){
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
    const {filter} = this.state;
    const { match, onGetDetailProduct, onGetReviews, onGetLike, onGetRelate } = this.props;
    onGetDetailProduct(match.params.productID);
    onGetLike(match.params.productID);
    onGetRelate(match.params.productID);
    onGetReviews(filter)
  }

  setColor = (item) =>{
    this.setState({
      imageColor: item.image_link,
      check: item._id
    })
  }

  onAddToCart = (product, quantity) =>{
    var { onAddProductToCart, t } = this.props;
    const { check } = this.state;
    product = {
      _id: product._id,
      colors: product.colors,
      bigimage: product.bigimage,
      name: product.name,
      height: product.height,
      length: product.length,
      width: product.width,
      weight: product.weight
    }
    if(check === 0){
      toastError(`${t('detail.toastify.error')}`)
    }
    else{
      onAddProductToCart(product, check, quantity);
    }
  }

  onInstallment = (product) => {
    const { history, t } = this.props;
    const { check } = this.state;
    if(check === 0){
      toastError(`${t('detail.toastify.error')}`)
    }
    else{
      history.push(`/installment/${product.pathseo}.${product._id}.${check}`)
    }
  }

  onCompare = (product) => {
    const { history } = this.props;
    console.log(product.category._id)
    history.push(`/compare/${product.category._id}?compare=${product._id}`)
  }
  
  setPrice = (currency, min, max) =>{
    if(currency==="VND"){
      if(min===max){
        return numberWithCommas(min)
      }
      else return `${numberWithCommas(min)}-${numberWithCommas(max)}`
    }
    else{
      if(min===max){
        return numberWithCommas(parseFloat(tryConvert(min, currency, false)).toFixed(0))
      }
      else return `${numberWithCommas(parseFloat(tryConvert(min, currency, false)).toFixed(0))}-${numberWithCommas(parseFloat(tryConvert(max, currency, false)).toFixed(0))}`
    }
  }

  setPage = (value) =>{
    this.handleUpdateFilter({ page: value });
  }

  // Chuyển router (thêm vào params) 
  handleUpdateFilter = (data) => {
    const {location, history} = this.props;
    const {pathname, search} = location;
    let queryParams = getFilterParams(search);
    queryParams = {
      ...queryParams,
      ...data,
    };
    this.setState({queryParams})
    history.push(`${pathname}?${qs.stringify(queryParams)}`);
  };

  // phân trang
  handlePageChange(pageNumber) {
    this.handleUpdateFilter({ page: pageNumber-1 });
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    })
  }

  onReload = (path) => {
    const {history} = this.props;
    history.push(path);
    window.location.reload();
  }

  onLiked = (id, like) => {
    const { onUpdateReview, authInfo, t } = this.props;
    const { queryParams } = this.state;
    if(authInfo){
      if(like.indexOf(authInfo._id) === -1){
        like.push(authInfo._id)
      }
      else{
        like.splice(like.indexOf(authInfo._id), 1);
      }
      onUpdateReview(id, {like}, queryParams)
    }
    else{
      toastError(`${t('common.toastify.not-login')}`)
    }
  }

  setSelector = (selection) => {
    var selectorArray = []
    selection.map(item => {
      selectorArray.push(item.name)
    })
    return selectorArray.join(", ")
  }

  render() {
    const {
      product, currency, t, review, group, total, count, location, relate, like, authInfo,
    } = this.props;
    const {quantity, imageColor, check, _check } = this.state;
    const filter = getFilterParams(location.search);
    
    return (<>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{product && product.name}</title>
          <link rel="" href={product && `${LOCAL}/#/product/${product.pathseo}.${product._id}`} />
        </Helmet>
      </div>
      {product ? <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-12">
            {product.image && <ImageGalleries imageDetail={product.image} imageColor={imageColor}/> }
          </div>
          <div className="col-lg-5 col-md-6 col-12">
            <div className="row">
              <div className="col-12 my-2">
                <a className="text-decoration-none directory rounded p-2" href="/#/">{t('header.home.menu')}</a>
                <i className="fa fa-chevron-right px-2 w-25-px "></i>
                <a className="text-decoration-none directory rounded p-2" href={`/#/products/${product.category.pathseo}.${product.category._id}`}>{product.category.name}</a>
                <i className="fa fa-chevron-right px-2 w-25-px "></i>
              </div>
              <div className="col-12">
                <h1 className="my-0 font-weight-bold">{product.name}</h1>
                <div className="product-inner-price form-inline">
                  <ins>{product.price_min && this.setPrice(currency, product.price_min, product.price_max)} {currency}</ins>
                  {product.real_price_min && <del>{this.setPrice(currency, product.real_price_min, product.real_price_max)} {currency}</del>}
                  {product.real_price_min && product.real_price_min > product.price_min && 
                  <div className="discount ml-2">
                    <div className="d-flex h-discount text-orange">
                      <svg className="_2DRZW" viewBox="-0.5 -0.5 4 16">
                        <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" strokeWidth="1" transform="" stroke="currentColor" fill="#f69113"></path>
                      </svg>
                  <div className="discount-content">{t('common.discount')} {parseInt((1 - product.price_min/product.real_price_min)*100)}%</div>
                      <svg className="h-discount" viewBox="-0.5 -0.5 4 16">
                        <path d="M4 0h-3q-1 0 -1 1a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3v0.333a1.2 1.5 0 0 1 0 3q0 1 1 1h3" strokeWidth="1" transform="rotate(180) translate(-3 -15)" stroke="currentColor" fill="#f69113">
                        </path>
                      </svg>
                    </div>
                  </div>}
                </div>
              </div>
              <div className="col-12">
                <Rating
                  initialRating={product.stars}
                  emptySymbol="fa fa-star text-secondary"
                  fullSymbol="fa fa-star text-warning"
                  readonly
                /><span className="ml-2">{total} {t('common.review')}</span>
              </div>
              {group && <div className="col-12 form-inline">
                {group.products.map(item =>{
                  return(<button type="button" key={item._id} 
                    className="card text-dark py-2 px-3 my-2 mr-3 w-auto"
                    onClick={()=> this.onReload(`/product/${item.product.pathseo}.${item.product._id}`)}>
                    <p className="mb-0 h6">{item.name} <span className={_check===item.product._id ? "d-inline-block" : "d-none"}>
                      <i className="fa fa-check"></i></span></p>
                    <p className="mb-0 h7">{item.product.price_min ? this.setPrice(currency, item.product.price_min, item.product.price_min) : 'NaN'} {currency}</p>
                  </button>)
                })}
              </div>}
              <div className="my-2 border-bottom"></div>
              <h4 className="mb-0">{t('detail.color.label')}</h4>
              <div className="col-12 form-inline">
                {product.colors.map((item, index)=>{
                  return(
                  <button type="button" key={item._id} 
                    className={item.amount===0 ? "card text-dark py-2 px-3 my-2 mr-3 bg-active" :"card text-dark py-2 px-3 my-2 mr-3"} 
                    onClick={() => this.setColor(item)} 
                    disabled={item.amount===0 ? true : false}>
                    <p className="mb-0 h6">{item.name_vn} <span className={check===item._id ? "d-inline-block" : "d-none"}>
                      <i className="fa fa-check"></i></span></p>
                    <p className="mb-0 h7">{this.setPrice(currency, item.price, item.price)} {currency}</p>
                  </button>)
                })}
              </div>
              <div className="mb-2 border-bottom"></div>
              <div className="col-12 form-inline">
                <div className="bill-icon">
                  <i className="fa fa-fan text-xl "></i>
                </div>
                <div className="ml-3 my-1" style={{width: "85%"}}>
                  <p className="text-secondary smaller mb-0">{t("detail.status.label")}</p>
                  <p className="mb-1">{product.circumstance || t("common.update.label")}</p>
                </div>
              </div>
              {product.included && product.included.length > 0 && <div className="col-12 form-inline">
                <div className="bill-icon">
                  <i className="fa fa-eye text-xl "></i>
                </div>
                <div className="ml-3 my-1" style={{width: "85%"}}>
                  <p className="text-secondary smaller mb-0">{t("detail.included.label")}</p>
                  <p className="mb-1">{product.included}</p>
                </div>
              </div>}
              <div className="col-12 form-inline">
                <div className="bill-icon">
                  <i className="fa fa-shield-alt text-xl "></i>
                </div>
                <div className="ml-3 my-1" style={{width: "85%"}}>
                  <p className="text-secondary smaller mb-0">{t("detail.warranty.label")}</p>
                  <p className="mb-1">{product.warrently || t("common.update.label")}</p>
                </div>
              </div>
              <div className="mb-2 border-bottom"></div>
              <div className="col-12 text-center">
                <button className="btn btn-lighter" type="button" onClick={() => this.onCompare(product)}><i className="fa fa-balance-scale text-warning"></i> {t("compare.page.title")}</button>
                <button className="btn btn-lighter bg-aqua" type="button" onClick={() => this.onAddToCart(product, quantity)}><i className="fa fa-cart-plus text-danger"></i> {t('shop.add-to-cart.button')}</button>
                <button className="btn btn-lighter" type="button" onClick={() => this.onInstallment(product)}><i className="fa fa-money-check-alt text-success"></i> {t('detail.installment.button')}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <section className="product_description_area pb-0">
                <div className="container">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link" id="recent-tab" data-bs-toggle="tab" href="#recent" role="tab" aria-controls="recent"
                      aria-selected="false">{t('detail.recent.tab')}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="like-tab" data-bs-toggle="tab" href="#like" role="tab" aria-controls="like"
                      aria-selected="false">{t('detail.like.tab')}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" id="relate-tab" data-bs-toggle="tab" href="#relate" role="tab" aria-controls="relate"
                      >{t('detail.relate.tab')}</a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade" id="recent" role="tab" aria-labelledby="recent-tab">
                      <div className="row">
                        {authInfo ? authInfo.history.map((product, index) => {
                          return (
                              <ProductItem product={product} key={index} />
                            )
                        })
                      : <div className="col-12 my-1">
                          <div className="text-center my-5">
                            <div className="h-120">
                              <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/99e561e3944805a023e87a81d4869600.png" alt="404 not found"></img>
                            </div>
                            <h4>{t('common.login-continue')}</h4>
                              <a className="btn btn-success" href="/user/dang-nhap">{t('header.login.button')}</a>
                          </div>
                        </div>}
                      </div>
                    </div>
                    <div className="tab-pane fade" id="like" role="tab" aria-labelledby="like-tab">
                      <div className="row">
                        {review && review.length > 0 ? (like ? (like.length > 0 ? like.map((product, index) => {
                          return (
                              <ProductItem product={product} key={index} />
                            )
                        }) : <div className="col-12 my-4">
                        <div className="text-center my-5">
                          <div className="h-120">
                          <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a60759ad1dabe909c46a817ecbf71878.png" alt="404 not found"></img>
                          </div>
                          <h4>{t("detail.like.not-founded")}</h4>
                        </div>
                      </div>) : <Loader/>)
                        : <div className="col-12 my-4">
                        <div className="text-center my-5">
                          <div className="h-120">
                          <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a60759ad1dabe909c46a817ecbf71878.png" alt="404 not found"></img>
                          </div>
                          <h4>{t("detail.like.not-founded")}</h4>
                        </div>
                      </div>}
                      </div>
                    </div>
                    <div className="tab-pane fade show active" id="relate" role="tab" aria-labelledby="relate-tab">
                      <div className="row">
                        {product.description && product.description.length > 15 ? (relate ? relate.map((product, index) => {
                          return (
                              <ProductItem product={product} key={index}/>
                            )
                        }) : <Loader/>)
                        : <div className="col-12 my-4">
                        <div className="text-center my-5">
                          <div className="h-120">
                          <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a60759ad1dabe909c46a817ecbf71878.png" alt="404 not found"></img>
                          </div>
                          <h4>{t("detail.like.not-founded")}</h4>
                        </div>
                      </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            <section className="product_description_area mt-1">
              <div className="container">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link" id="home-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="home" aria-selected="true">{t('detail.description.tab')}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#specification" role="tab" aria-controls="profile"
                    aria-selected="false">{t('detail.specification.tab')}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-bs-toggle="tab" href="#comment" role="tab" aria-controls="contact"
                    aria-selected="false">{t('detail.comment.tab')}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" id="review-tab" data-bs-toggle="tab" href="#review" role="tab" aria-controls="review"
                    aria-selected="false">{t('detail.review.tab')}</a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade" id="description" role="tabpanel" aria-labelledby="home-tab">
                    {product.description ? <div className="text-center" dangerouslySetInnerHTML={{__html: draftToHtml(JSON.parse(product.description))}}></div> : ""}
                  </div>
                  <div className="tab-pane fade" id="specification" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          {product && product.specifications.map((item,index)=>{
                            /* eslint-disable */
                              return (
                              <tr key={index}>
                                <td colSpan="1" style={{width: "30%"}} className="font-weight-bold" scope="row">{item.name}</td>
                                <td colSpan="1" style={{width: "70%"}}>{item.selection.length > 0 ? this.setSelector(item.selection) : item.value}</td>
                              </tr>
                              )
                            /* eslint-disable */
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="comment" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="row">
                      <div className="col-12">
                        <div className="fb-comments" data-href={`${LOCAL}/#/product/${product.pathseo}/${product._id}`} data-width="100%" data-numposts="5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade show active" id="review" role="tabpanel" aria-labelledby="review-tab">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="row total_rate">
                          <div className="col-6">
              
                            <div className="box_total">
                              <h5>Overall</h5>
                              <h1>{product.stars ? product.stars : ""}</h1>
                              <h6>({total} {t('common.review')})</h6>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="rating_list">
                              <h3>{t('detail.base.on')} {total} {t('common.review')}</h3>
                              {count && <ul className="list-unstyled">
                                <li>5 Star <span className="mx-2"><Rating
                                  initialRating={5}
                                  emptySymbol="fa fa-star text-secondary"
                                  fullSymbol="fa fa-star text-warning"
                                  readonly
                                  /></span>{count.find(i => i._id===5) ? count.find(i => i._id===5).count  : 0}</li>
                                <li>4 Star <span className="mx-2"><Rating
                                  initialRating={4}
                                  emptySymbol="fa fa-star text-secondary"
                                  fullSymbol="fa fa-star text-warning"
                                  readonly
                                  /></span>{count.find(i => i._id===4) ? count.find(i => i._id===4).count  : 0}</li>
                                <li>3 Star <span className="mx-2"><Rating
                                  initialRating={3}
                                  emptySymbol="fa fa-star text-secondary"
                                  fullSymbol="fa fa-star text-warning"
                                  readonly
                                  /></span>{count.find(i => i._id===3) ? count.find(i => i._id===3).count  : 0}</li>
                                <li>2 Star <span className="mx-2"><Rating
                                  initialRating={2}
                                  emptySymbol="fa fa-star text-secondary"
                                  fullSymbol="fa fa-star text-warning"
                                  readonly
                                /></span>{count.find(i => i._id===2) ? count.find(i => i._id===2).count  : 0}</li>
                                <li>1 Star <span className="mx-2"><Rating
                                  initialRating={1}
                                  emptySymbol="fa fa-star text-secondary"
                                  fullSymbol="fa fa-star text-warning"
                                  readonly
                                /></span>{count.find(i => i._id===1) ? count.find(i => i._id===1).count  : 0}</li>
                              </ul>}
                            </div>
                          </div>
                        </div>
                        
                      </div>
                      <div className="col-lg-6">
                        <div className="review_list">
                          {review && review.length > 0 ? review.map((item, index)=>{
                            return (
                              <div className="row" key={index}>
                                <div className="col-12">
                                <div className="float-start mr-3">
                                  <img className="rounded-circle square-60" src={item.user && item.user.image ? item.user.image.public_url : INITIAL_IMAGE} alt=""/>
                                </div>
                                <div className="">
                                  <p className="font-weight-bold mb-0">{item.user && item.user.firstname} {item.user && item.user.lastname}</p>
                                  <p className="mb-0"><Rating
                                    initialRating={item.rating}
                                    emptySymbol="fa fa-star text-secondary"
                                    fullSymbol="fa fa-star text-warning"
                                    readonly
                                  /> | <span className="font-italic">{item.updatedAt.slice(0,10)}</span></p>
                                  <p className="text-secondary mb-0">Màu sắc: {item.color.name_vn}</p>
                                  <p className="mb-0">{item.content}</p>
                                  <p className="directory rounded p-2 w-fit-content" onClick={()=> this.onLiked(item._id, item.like)}><i className="fa fa-thumbs-up text-secondary"></i><span className="ml-2 text-secondary">{item.like.length > 0 ? item.like.length :  `${t('detail.review.useful')}?`}</span></p>
                                </div>
                                </div>
                              </div>
                            )
                          }) : <div className="row my-1">
                          <div className="col-12">
                              <div className="text-center my-5">
                                <div className="h-120">
                                  <img className="h-100" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/d3eb7b91baeb280516583f958b10f601.png" alt="404 not found"></img>
                                </div>
                                <h4>{t('detail.review.not-yet')}</h4>
                              </div>
                            </div>
                          </div>}
                        </div>
                        {review && review.length > 0 && <div className="product-pagination text-center">
                          <nav className="float-end">
                            <Pagination
                              activePage={filter.page ? parseInt(filter.page)+1 : 1}
                              itemsCountPerPage={3}
                              totalItemsCount={total ? total : 10}
                              pageRangeDisplayed={3}
                              linkClass="page-link"
                              itemClass="page-item"
                              prevPageText={t('shop.pagination.prev')}
                              nextPageText={t('shop.pagination.next')}
                              hideFirstLastPages={true}
                              onChange={this.handlePageChange.bind(this)}
                            />
                            </nav>
                          </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      : 
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-12">
            <ImageLoader/>
          </div>
          <div className="col-lg-5 col-md-6 col-12">
            <div className="row">
              <div className="col-12 my-2">
                <a className="text-decoration-none directory rounded p-2" href="/#/">{t('header.home.menu')}</a>
                <i className="fa fa-chevron-right px-2 w-25-px "></i>
              </div>
              <div className="col-12">
                <ProductInfoLoader/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <section className="product_description_area pb-0">
              <div className="container">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link" id="recent-tab" data-bs-toggle="tab" href="#recent" role="tab" aria-controls="recent"
                    aria-selected="false">{t('detail.recent.tab')}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="like-tab" data-bs-toggle="tab" href="#like" role="tab" aria-controls="like"
                    aria-selected="false">{t('detail.like.tab')}</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" id="relate-tab" data-bs-toggle="tab" href="#relate" role="tab" aria-controls="relate"
                    >{t('detail.relate.tab')}</a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade" id="recent" role="tab" aria-labelledby="recent-tab">
                    <div className="row">
                      <Loader/>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="like" role="tab" aria-labelledby="like-tab">
                    <div className="row">
                      <Loader/>
                    </div>
                  </div>
                  <div className="tab-pane fade show active" id="relate" role="tab" aria-labelledby="relate-tab">
                    <div className="row">
                      <Loader/>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>}
    </>)
  }
}

const mapStateToProps = (state) =>{
  return {
    product: state.products.detail,
    currency: state.currency,
    review: state.review.list,
    group: state.group.detail,
    total: state.review.total,
    authInfo: state.auth.detail,
    count: state.review.count,
    like: state.products.like,
    relate: state.products.relate,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetDetailProduct: (payload) => {
      dispatch(ProductsActions.onGetDetail(payload))
    },
    onGetLike: (payload) => {
      dispatch(ProductsActions.onGetLike(payload))
    },
    onGetRelate: (payload) => {
      dispatch(ProductsActions.onGetRelate(payload))
    },
    onAddProductToCart: (product, color, quantity) => {
      dispatch(ProductsActions.onAddProductToCart(product, color, quantity));
    },
    onGetReviews: (params) => {
      dispatch(ReviewActions.onGetList(params));
    },
    onClearStateReview: () => {
      dispatch(ReviewActions.onClearState());
    },
    onUpdateReview: (id, data, params) => {
      dispatch(ReviewActions.onUpdate(id, data, params));
    },
    onHistoryProduct : (id, params) =>{
			dispatch(UsersActions.onUpdate({id, params}))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(DetailPage);