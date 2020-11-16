import React, { Component } from 'react';
import { assets } from '../../constants/assetsImage';
import {Link} from 'react-router-dom'
import {CLOUDINARY_IMAGE} from '../../constants'

class ProductItem extends Component {
	onAddToCart = (product) =>{
		var {onAddProductToCart} = this.props;
		onAddProductToCart(product);
	}

	render() {
    const {product} = this.props;
		return (
			<div className="col-md-3 col-sm-6">
				<div className="single-shop-product">
					<div className="product-upper">
						<Link to={`/products/dien-thoai/${product._id}`}><img src={`${CLOUDINARY_IMAGE}${product.bigimage}.png`} alt="" /></Link>
					</div>
					<h2>
						<Link to={`/products/dien-thoai/${product._id}`}>{product.name}</Link>
					</h2>
					<div className="product-carousel-price">
            <ins>$ {product.price}</ins> <del>${product.price + 100}</del>
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

export default ProductItem;
