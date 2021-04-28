import React, { Component } from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Components
import Rating from 'react-rating'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
// @Actions
import ReviewActions from '../../redux/actions/review'

class ReviewDetail extends Component {
  constructor(props){
    super(props);
    const {review} = props;
    this.state = {
      rating: review ? review.rating : 0,
      message: review ? review.content : ""
    }
  }

  onReview = () =>{
    const {rating, message} = this.state;
    const {onAddReview, onUpdateReview,  authInfo, product, review} = this.props;
    var data = {
      content: message,
      user: authInfo._id,
      product: product.product,
      rating,
      color: product.color._id
    }
    if(review){
      onUpdateReview(review._id, data)
    }
    else{
      onAddReview(data);
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

  onExit(){
    const {onCloseModal, modal, onClearDetail} = this.props;
    onClearDetail();
    onCloseModal("modal", !modal)
  }

  render() {
    const {modal, product} = this.props
    const {rating, message} = this.state;
    return (
      <CModal show={modal} onClose={() => this.onExit()} closeOnBackdrop={false}>
        <CModalHeader closeButton>
          <CModalTitle>
            Đánh giá sản phẩm
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="row mb-2">
            <div className="col-3 h-80 text-center">
              <img className="h-100" src={product.image}></img>
            </div>
            <div className="col-9  align-self-center">
              <p className="font-weight-bold mb-0">{product.name}</p>
              <p className="text-secondary mb-0">Màu sắc: {product.color.name_vn}</p>
            </div>
          </div>
          <div className="review_box">
            <p>Your Rating: <span className="ml-3"><Rating
              initialRating={rating}
              emptySymbol="fa fa-star text-secondary"
              fullSymbol="fa fa-star text-warning"
              onChange={(rating)=> this.setState({rating})}
              /></span></p>
            <div className="form-group">
              <textarea className="form-control different-control w-100" name="message" value={message} cols="30" rows="5"  onChange={this.onChange}></textarea>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={this.onReview}>
          Submit Now
          </CButton>
          <CButton color="secondary" onClick={() => this.onExit()}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    authInfo: state.auth.detail,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddReview: (data) => {
      dispatch(ReviewActions.onCreate(data));
    },
    onUpdateReview: (id, params) => {
      dispatch(ReviewActions.onUpdate(id, params));
    },
    onClearDetail: () =>{
      dispatch(ReviewActions.onClearDetail());
    }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(ReviewDetail);