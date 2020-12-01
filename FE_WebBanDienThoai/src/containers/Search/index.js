import React, { Component } from 'react';
import { assets } from '../../constants/assetsImage';
import './styles.css';

class Search extends Component {
	render() {
		return (
			<div className="col">
				<div className="single-sidebar">
					<h2 className="sidebar-title">Search Products</h2>
					<form action="#">
						<input type="text" placeholder="Search products..." />
						<input type="submit" value="Search" />
					</form>
				</div>

				<div className="single-sidebar">
					<h2 className="sidebar-title">Products</h2>
					<div className="thubmnail-recent">
						<img src={assets('products/product-thumb-1.jpg')} className="recent-thumb" alt="" />
						<h2>
							<a href="single-product.html">Sony Smart TV - 2015</a>
						</h2>
						<div className="product-sidebar-price">
							<ins>$700.00</ins> <del>$800.00</del>
						</div>
					</div>
					<div className="thubmnail-recent">
						<img src={assets('products/product-thumb-1.jpg')} className="recent-thumb" alt="" />
						<h2>
							<a href="single-product.html">Sony Smart TV - 2015</a>
						</h2>
						<div className="product-sidebar-price">
							<ins>$700.00</ins> <del>$800.00</del>
						</div>
					</div>
					<div className="thubmnail-recent">
						<img src={assets('products/product-thumb-1.jpg')} className="recent-thumb" alt="" />
						<h2>
							<a href="single-product.html">Sony Smart TV - 2015</a>
						</h2>
						<div className="product-sidebar-price">
							<ins>$700.00</ins> <del>$800.00</del>
						</div>
					</div>
					<div className="thubmnail-recent">
						<img src={assets('products/product-thumb-1.jpg')} className="recent-thumb" alt="" />
						<h2>
							<a href="single-product.html">Sony Smart TV - 2015</a>
						</h2>
						<div className="product-sidebar-price">
							<ins>$700.00</ins> <del>$800.00</del>
						</div>
					</div>
				</div>

				<div className="single-sidebar">
					<h2 className="sidebar-title">Recent Posts</h2>
					<ul>
						<li>
							<a href="#">Sony Smart TV - 2015</a>
						</li>
						<li>
							<a href="#">Sony Smart TV - 2015</a>
						</li>
						<li>
							<a href="#">Sony Smart TV - 2015</a>
						</li>
						<li>
							<a href="#">Sony Smart TV - 2015</a>
						</li>
						<li>
							<a href="#">Sony Smart TV - 2015</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Search;
