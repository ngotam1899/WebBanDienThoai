import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
// @Functions
import tryConvert from '../../utils/changeMoney'

class ProductItem extends Component {
	onAddToCart = (product) =>{
		var {onAddProductToCart} = this.props;
		onAddProductToCart(product);
	}

	render() {
    const {product, currency} = this.props;
		return (
			<div className="col-md-3 col-sm-6">
				<div className="single-shop-product text-center">
					<div className="product-upper">
						<Link to={`/products/dien-thoai/${product.pathseo}/${product._id}`}><img src={product.bigimage ? product.bigimage.public_url : "http://www.pha.gov.pk/img/img-02.jpg"} alt="" /></Link>
					</div>
					<h2>
						<Link to={`/products/dien-thoai/${product.pathseo}/${product._id}`}>{product.name}</Link>
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
							Add to cart
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


export default connect(mapStateToProps, mapDispatchToProps) (ProductItem);
