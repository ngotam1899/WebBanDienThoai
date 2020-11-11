import React, { Component } from 'react';
import { assets } from '../../constants/assetsImage';

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
						<img src={assets('products/product-2.jpg')} alt="" />
					</div>
					<h2>
						<a href="">{product.generalinfo.name}</a>
					</h2>
					<div className="product-carousel-price">
            <ins>$ {product.generalinfo.price}</ins> <del>${product.generalinfo.price + 100}</del>
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
