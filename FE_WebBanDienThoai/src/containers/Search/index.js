import React, { Component } from 'react';
import './styles.css';
import { withTranslation } from 'react-i18next'
import {connect} from 'react-redux';
import {compose} from 'redux';
// @Actions
import ProductsActions from "../../redux/actions/products";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ""
		}
	}

	UNSAFE_componentWillMount() {
		const { onGetList } = this.props;
		onGetList();
	}

	handleFilter = e => {
    const { value } = e.target;
    const { taskActionCreators } = this.props;
    const { filterTask } = taskActionCreators;
    filterTask(value);
  };

	render() {
		const {keyword} = this.state;
		const {t, listProducts} = this.props;
		return (
			<div className="col">
				<div className="single-sidebar mb-0">
					<h2 className="sidebar-title">{t('search.label')}</h2>
					<form>
						<input className="mb-0" type="text" value={keyword} onChange={this.handleChange} placeholder={t('search.placeholder.input')} />
					</form>
				</div>
				{listProducts && listProducts.map((product, index) =>{
					return (
					<div className="card" key={index}>
						<div className="row">
							<div className="col-3 my-auto">
								<img className="w-100" src={product.bigimage.public_url}></img>
							</div>
							<div className="col-6">
								<p className="mb-0">{product.name}</p>
								<p className="mb-0">{product.price} VND</p>
							</div>
							<div className="col-3 my-auto">
								<button className="btn btn-success"><i className="fa fa-cart-plus"></i></button>
							</div>
						</div>
						<div class="border-bottom"></div>
					</div>
					)
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		listProducts: state.products.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: (params) => {
      dispatch(ProductsActions.onGetList(params))
    },
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
  withTranslation()
)(Search);
