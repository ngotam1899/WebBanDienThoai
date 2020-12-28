import React, { Component } from 'react';
import './styles.css';
import { withTranslation } from 'react-i18next'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link} from 'react-router-dom'
// @Actions
import ProductsActions from "../../redux/actions/products";
// @Function
import tryConvert from '../../utils/changeMoney'

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ""
		}
	}

	handleFilter = (event) => {
		var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
    const { keyword } = this.state;
    const { onFilter } = this.props;
    onFilter(keyword);
	}
	
	onAddToCart = (product) =>{
		const { onAddProductToCart } = this.props;
		onAddProductToCart(product);
	}

	render() {
		const {keyword} = this.state;
		const {t, listProducts, currency} = this.props;
		return (
			<div className="col">
				<div className="single-sidebar mb-0">
					<h2 className="sidebar-title">{t('search.label')}</h2>
					<form>
						<input className="mb-0" type="text" value={keyword} name="keyword" onChange={this.handleFilter} placeholder={t('search.placeholder.input')} />
					</form>
				</div>
				<div className="card">
				{listProducts && keyword && listProducts.map((product, index) =>{
					return (
						<>
						<div className="row" key={index}>
							<div className="col-3 my-auto">
								<Link to={`/product/${product.pathseo}/${product._id}`}><img className="w-100" src={product.bigimage.public_url}></img></Link>
							</div>
							<div className="col-6">
								<p className="mb-0">{product.name}</p>
								<p className="mb-0">{currency=="VND" ? product.price : parseFloat(tryConvert(product.price, currency, false)).toFixed(2)} {currency}</p>
							</div>
							<div className="col-3 my-auto">
								<button className="btn btn-success" onClick ={ () => this.onAddToCart(product)}><i className="fa fa-cart-plus"></i></button>
							</div>
						</div>
						<div class="border-bottom"></div>
						</>
					)
				})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		listProducts: state.products.list,
		currency: state.currency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		onFilter: (keyword) => {
      dispatch(ProductsActions.onFilter(keyword))
		},
		onAddProductToCart: (product) => {
      dispatch(ProductsActions.onAddProductToCart(product, 1));
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(Search);
