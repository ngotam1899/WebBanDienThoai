import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
// @Functions
import tryConvert from "../../utils/changeMoney";
import numberWithCommas from "../../utils/formatPrice";

class ProductItem extends Component {
  render() {
    const { product, currency, t } = this.props;
    return (
      <div className="col-md-3 col-6">
        <div className="single-shop-product text-center">
          <div className="product-upper">
            <Link to={`/product/${product.pathseo}/${product._id}`}>
              <img
                src={
                  product.bigimage
                    ? product.bigimage.public_url
                    : "http://www.pha.gov.pk/img/img-02.jpg"
                }
                alt={`${product.name}`}
              />
            </Link>
          </div>
          <h2>
            <Link to={`/product/${product.pathseo}/${product._id}`}>
              {product.name.substring(0, 15)}
              {product.name.length > 15 ? "..." : ""}
            </Link>
          </h2>
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
            <br />
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
          </div>
        </div>
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
