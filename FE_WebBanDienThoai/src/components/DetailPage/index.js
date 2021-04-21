import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
import {LOCAL} from '../../constants/index';
import { Helmet } from 'react-helmet'
import draftToHtml from 'draftjs-to-html';
// @Actions
import ProductsActions from '../../redux/actions/products'
import ReviewActions from '../../redux/actions/review'
// @Components
import Rating from 'react-rating'
import ImageGalleries from './ImageGalleries';
import './styles.css';
// @Functions
import tryConvert from '../../utils/changeMoney'
import numberWithCommas from "../../utils/formatPrice";
import { toastError } from '../../utils/toastHelper';
import {INITIAL_IMAGE} from '../../constants';

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      imageColor: "",
      check: 0,
      rating: 0,
      message: ""
    }
  }
  componentDidUpdate() {
    try{
      FB.XFBML.parse();
    }
    catch(err){
      console.log(err)
    }
  }

  componentDidMount(){
    const {match, onGetDetailProduct, onGetReviews} = this.props;
    onGetDetailProduct(match.params.productID);
    onGetReviews(match.params.productID)
    
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
  
  componentWillUnmount(){
/*     const {onClearDetail} =this.props;
    onClearDetail() */
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

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    })
  }

  onReview = () =>{
    const {rating, message} = this.state;
    console.log( rating, message)
  }

  setAmountRating = (review, star) => {
    var amount = 0;
    review.map(item => {
      if(item.rating === star) amount++;
    })
    return amount;
  }

  render() {
    const {product, currency, t, review} = this.props;
    const {quantity, imageColor, check, rating, message} = this.state;
    
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
                        /><span className="ml-2">2 đánh giá</span>
                        </div>
                      
                      </div>
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
                      <div className="product-inner-category">
                        <p className="mt-1 mb-0">{t('detail.category.label')}: <a href="">{product.category.name}</a></p>
                        <p className="mt-1 mb-0">{t('detail.brand.label')}: <a href="">{product.brand.name}</a></p>
                      </div>
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
                                <h6>(2 Reviews)</h6>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="rating_list">
                                <h3>Based on 2 Reviews</h3>
                                <ul className="list-unstyled">
                                  <li>5 Star <span className="mx-2"><Rating
                                    initialRating={5}
                                    emptySymbol="fa fa-star text-secondary"
                                    fullSymbol="fa fa-star text-warning"
                                    readonly
                                    /></span>{review ? this.setAmountRating(review, 5) : 0}</li>
                                  <li>4 Star <span className="mx-2"><Rating
                                    initialRating={4}
                                    emptySymbol="fa fa-star text-secondary"
                                    fullSymbol="fa fa-star text-warning"
                                    readonly
                                    /></span>{review ? this.setAmountRating(review, 4) : 0}</li>
                                  <li>3 Star <span className="mx-2"><Rating
                                    initialRating={3}
                                    emptySymbol="fa fa-star text-secondary"
                                    fullSymbol="fa fa-star text-warning"
                                    readonly
                                    /></span>{review ? this.setAmountRating(review,3) : 0}</li>
                                  <li>2 Star <span className="mx-2"><Rating
                                    initialRating={2}
                                    emptySymbol="fa fa-star text-secondary"
                                    fullSymbol="fa fa-star text-warning"
                                    readonly
                                  /></span>{review ? this.setAmountRating(review,2) : 0}</li>
                                  <li>1 Star <span className="mx-2"><Rating
                                    initialRating={1}
                                    emptySymbol="fa fa-star text-secondary"
                                    fullSymbol="fa fa-star text-warning"
                                    readonly
                                  /></span>{review ? this.setAmountRating(review,1) : 0}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
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
                                    <p>{item.content}</p>
                                  </div>
                                  
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="review_box">
                            <h5>Add a Review</h5>
                            <p>Your Rating: <span className="ml-3"><Rating
                              initialRating={rating}
                              emptySymbol="fa fa-star text-secondary"
                              fullSymbol="fa fa-star text-warning"
                              onChange={(rating)=> this.setState({rating})}
                              /></span></p>
                            <div className="form-group">
                              <textarea className="form-control different-control w-100" name="message" value={message} cols="30" rows="5"  onChange={this.onChange}></textarea>
                            </div>
                            <div className="form-group text-center text-md-right mt-3">
                              <button type="button" className="add_to_cart_button" onClick={this.onReview}>Submit Now</button>
                            </div>
                          </div>
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
    review: state.review.list
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClearDetail: () =>{
      dispatch(ProductsActions.onClearDetail())
    },
    onGetDetailProduct: (id) => {
      dispatch(ProductsActions.onGetDetail(id))
    },
    onAddProductToCart: (product, color, quantity) => {
      dispatch(ProductsActions.onAddProductToCart(product, color, quantity));
    },
    onGetReviews: (id) => {
      dispatch(ReviewActions.onGetList(id));
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(DetailPage);