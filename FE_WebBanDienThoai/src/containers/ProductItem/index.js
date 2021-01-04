import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {compose} from 'redux';
import { withTranslation } from 'react-i18next'
// @Functions
import tryConvert from '../../utils/changeMoney'

class ProductItem extends Component {
	onAddToCart = (product) =>{
		var {onAddProductToCart} = this.props;
		onAddProductToCart(product);
	}

	render() {
    const {product, currency, t} = this.props;
		return (
			<div className="col-md-3 col-6">
				<div className="single-shop-product text-center">
					<div className="product-upper">
						<Link to={`/product/${product.pathseo}/${product._id}`}><img src={product.bigimage ? product.bigimage.public_url : "http://www.pha.gov.pk/img/img-02.jpg"} alt={`${product.name}`} /></Link>
					</div>
					<h2>
						<Link to={`/product/${product.pathseo}/${product._id}`}>
							{product.name.substring(0, 15)}{product.name.length > 15 ? '...' : ''}
						</Link>
					</h2>
					<div className="product-carousel-price">
            <ins>{currency=="VND" ? product.price : parseFloat(tryConvert(product.price, currency, false)).toFixed(2)} {currency}</ins> <br/>
						<del>{currency=="VND" ? product.price*1.2 : parseFloat(tryConvert(product.price, currency, false)*1.2).toFixed(2)} {currency}</del>
					</div>
					<div className="product-option-shop">
						<button
							className="add_to_cart_button"
							onClick ={ () => this.onAddToCart(product)}
						>
							{t('shop.add-to-cart.button')}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) =>{
  return {
    currency: state.currency,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(ProductItem);
