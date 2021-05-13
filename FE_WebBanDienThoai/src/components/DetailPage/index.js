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
// @Components
import Rating from 'react-rating'
import ImageGalleries from './ImageGalleries';
import Pagination from "react-js-pagination";
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
    const {match, location} = props;
    this.state = {
      quantity: 1,
      imageColor: "",
      check: 0,
      _check: match.params.productID,
      filter: {
        limit: 3,
        product: match.params.productID,
        page: 0,
      }
    }
  }
  componentDidUpdate(prevProps) {
    try{
      FB.XFBML.parse();
      if (prevProps.location.search !== this.props.location.search) {
        const filters = getFilterParams(this.props.location.search);
        const { filter } = this.state;
        var params = {
          ...filter,
          ...filters
        };
        this.props.onGetReviews(params);
      }
    }
    catch(err){
    }
  }

  componentDidMount(){
    const {match, onGetDetailProduct, onGetReviews} = this.props;
    onGetDetailProduct(match.params.productID);
    onGetReviews({product: match.params.productID})
  }

  setColor = (item) =>{
    this.setState({
      imageColor: item.image_link,
      check: item._id
    })
  }

  onAddToCart = (product, quantity) =>{
    var {onAddProductToCart} = this.props;
    const {check} = this.state;
    if(check===0){
      toastError("Chưa chọn màu sản phẩm")
    }
    else{
      onAddProductToCart(product, check, quantity);
    }
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
    const {onUpdateReview, authInfo} = this.props;
    if(authInfo){
      if(like.indexOf(authInfo._id) === -1){
        like.push(authInfo._id)
      }
      else{
        like.splice(like.indexOf(authInfo._id), 1);
      }
      onUpdateReview(id, {like})
    }
    else{
      toastError("Bạn chưa đăng nhập")
    }
  }

  render() {
    const {product, currency, t, review, group, total, count, location } = this.props;
    const {quantity, imageColor, check, _check } = this.state;
    const filter = getFilterParams(location.search);
    
    return (<>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{product && product.name}</title>
          <link rel="" href={product && `${LOCAL}/#/product/${product.pathseo}/${product._id}`} />
        </Helmet>
      </div>
      
      <div className="">
        <div className="zigzag-bottom"></div>
        {product && <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-content-right">
                <div className="product-breadcroumb">
                  <a href="/#/">{t('header.home.menu')}</a>
                  <a href={`/#/products/${product.category.pathseo}/${product.category._id}`}>{product.category.name}</a>
                  <a href={`/#/product/${product.pathseo}/${product._id}`}>{product.name}</a>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    {product.image && <ImageGalleries imageDetail={product.image} imageColor={imageColor}/> }
                  </div>

                  <div className="col-sm-7">
                    <div className="">
                      <h2 className="">{product.name}</h2>
                      <div className="product-inner-price">
                        <ins>{product.price_min && this.setPrice(currency, product.price_min, product.price_max)} {currency}</ins>
                        {/* <del>{currency=="VND" ? product.price*1.2 : parseFloat(tryConvert(product.price, currency, false)*1.2).toFixed(2)} {currency}</del> */}
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <Rating
                            initialRating={product.stars}
                            emptySymbol="fa fa-star text-secondary"
                            fullSymbol="fa fa-star text-warning"
                            readonly
                        /><span className="ml-2">{total} đánh giá</span>
                        </div>
                      
                      </div>
                      <div className="row">
                        {group && group.products.map((item, index)=>{
                          return(
                            <div key={index}>
                              <button type="button" key={item._id} 
                                className="card text-dark py-2 px-3 m-2"
                                onClick={()=> this.onReload(`/product/${item.product.pathseo}/${item.product._id}`)}>
                                <p className="mb-0 h6">{item.name} <span className="fa fa-check" style={{"display": _check===item.product._id ? "inline-block" : "none"}}></span></p>
                                <p className="mb-0 h7">{item.product.price_min ? this.setPrice(currency, item.product.price_min, item.product.price_min) : 'NaN'} {currency}</p>
                              </button>
                            </div>
                          )
                        })}
                      </div>
                      <p className="mb-0 font-weight-bold">Vui lòng chọn màu</p>
                      <div className="row">
                        {product.colors.map((item, index)=>{
                          return(
                            <div className="" key={index}>
                              <button type="button" key={item._id} 
                                className={item.amount===0 ? "card text-dark py-2 px-3 m-2 bg-active" :"card text-dark py-2 px-3 m-2"} 
                                onClick={() => this.setColor(item)} 
                                disabled={item.amount===0 ? true : false}>
                                <p className="mb-0 h6">{item.name_vn} <span className="fa fa-check" style={{"display": check===item._id ? "inline-block" : "none"}}></span></p>
                                <p className="mb-0 h7">{this.setPrice(currency, item.price, item.price)} {currency}</p>
                              </button>
                            </div>
                          )
                        })}
                      </div>
                      <button className="add_to_cart_button" type="button" onClick={() => {this.onAddToCart(product, quantity)}}>{t('shop.add-to-cart.button')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <section className="product_description_area">
                <div className="container">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link" id="home-tab" data-toggle="tab" href="#description" role="tab" aria-controls="home" aria-selected="true">Description</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="profile-tab" data-toggle="tab" href="#specification" role="tab" aria-controls="profile"
                      aria-selected="false">Specification</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="contact-tab" data-toggle="tab" href="#comment" role="tab" aria-controls="contact"
                      aria-selected="false">Comments</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review"
                      aria-selected="false">Reviews</a>
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
                                return (
                                <tr key={index}>
                                  <td className="font-weight-bold" scope="row">{item.name}</td>
                                  <td>{item.value}</td>
                                </tr>
                                )
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
                                <h4>{product.stars ? product.stars : ""}</h4>
                                <h6>({total} Reviews)</h6>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="rating_list">
                                <h3>Based on {total} Reviews</h3>
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
                            {review && review.map((item, index)=>{
                              return (
                                <div className="row" key={index}>
                                  <div className="col-12">
                                  <div className="float-left mr-3">
                                    <img className="rounded-circle square-60" src={item.user.image ? item.user.image.public_url : INITIAL_IMAGE} alt=""/>
                                  </div>
                                  <div className="">
                                    <p className="font-weight-bold mb-0">{item.user.firstname} {item.user.lastname}</p>
                                    <p className="mb-0"><Rating
                                      initialRating={item.rating}
                                      emptySymbol="fa fa-star text-secondary"
                                      fullSymbol="fa fa-star text-warning"
                                      readonly
                                    /> | <span className="font-italic">{item.createdAt}</span></p>
                                    <p className="text-secondary mb-0">Màu sắc: {item.color.name_vn}</p>
                                    <p className="mb-0">{item.content}</p>
                                    <p><i onClick={()=>{this.onLiked(item._id, item.like)}} className="fa fa-thumbs-up text-secondary"></i><span className="ml-2 text-secondary">{item.like.length > 0 ? item.like.length : "Hữu ích?"}</span></p>
                                  </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          {review && review.length>0 && <div className="product-pagination text-center">
                            <nav className="float-right">
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
      }</div>
    </>
    )
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
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetDetailProduct: (payload) => {
      dispatch(ProductsActions.onGetDetail(payload))
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
    onUpdateReview: (id, params) => {
      dispatch(ReviewActions.onUpdate(id, params));
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(DetailPage);