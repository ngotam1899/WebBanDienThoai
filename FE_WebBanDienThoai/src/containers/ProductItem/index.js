import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
// @Components
import Rating from 'react-rating'
// @Functions
import tryConvert from "../../utils/changeMoney";
import numberWithCommas from "../../utils/formatPrice";

class ProductItem extends Component {
  render() {
    const { product, currency, t } = this.props;
    return (
      <div className="col-md-3 col-6 my-2">
        <Link to={`/product/${product.pathseo}/${product._id}`} style={{textDecoration: 'none'}}>
        <div className="single-shop-product">
          <div className="product-upper text-center">
              <img
                src={
                  product.bigimage
                    ? product.bigimage.public_url
                    : "http://www.pha.gov.pk/img/img-02.jpg"
                }
                className="h-100 w-auto"
                alt={`${product.name}`}
              />
          </div>
          <p className="text-dark mb-0 mt-2">
              {product.name.substring(0, 22)}
              {product.name.length > 22 ? "..." : ""}
          </p>
          <div className="product-carousel-price">
            <ins>
              {currency === "VND" && product.price_min 
                ? numberWithCommas(product.price_min)
                : numberWithCommas(
                    parseFloat(
                      tryConvert(product.price_min, currency, false)
                    ).toFixed(2)
                  )}{" "}
              {currency}
            </ins>{" "}
            {/* <del>
              {currency == "VND"
                ? numberWithCommas(product.price * 1.2)
                : numberWithCommas(
                    parseFloat(
                      tryConvert(product.price, currency, false) * 1.2
                    ).toFixed(2)
                  )}{" "}
              {currency}
            </del> */}
            <br/>
            {product.stars && <><Rating
              initialRating={product.stars}
              emptySymbol="fa fa-star text-secondary"
              fullSymbol="fa fa-star text-warning"
              readonly
            /><span className="ml-2 text-secondary font-size-12">{product.reviewCount} đánh giá</span></>}
          </div>
        </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withTranslation())(ProductItem);
