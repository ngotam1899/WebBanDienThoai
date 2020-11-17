import React, { Component } from 'react';
import { connect } from "react-redux";
import { get } from "lodash";
import './styles.css';
import ProductItem from "../../containers/ProductItem"

import ProductsSelectors from "../../redux/selectors/products";
import ProductsActions from "../../redux/actions/products";
import ImagesActions from "../../redux/actions/cloudinary";

class ProductPage extends Component {
  componentDidMount() {
    const { onGetList, onGetListImage } = this.props;
    onGetListImage();
    onGetList();
  }
  
  setImage = (image) => {
    const {listImages} = this.props;
    const img = listImages.find(obj => obj._id === image);
    return get(img, "public_url");
  }

  render() {
    const { listProducts, onAddProductToCart, listImages } = this.props;
    return (
      <>
        <div className="product-big-title-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="product-bit-title text-center">
                  <h2>Shop</h2>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="single-product-area">
          <div className="zigzag-bottom"></div>
          <div className="container">
            <div className="row">
              {listProducts.map((product, index) => {
                return (<ProductItem product={product} key={index} 
                  onAddProductToCart={onAddProductToCart}
                  setImage={this.setImage} />)
              })}
              
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="product-pagination text-center">
                  <nav>
                    <ul className="pagination">
                      <li>
                        <a href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li><a href="#">1</a></li>
                      <li><a href="#">2</a></li>
                      <li><a href="#">3</a></li>
                      <li><a href="#">4</a></li>
                      <li><a href="#">5</a></li>
                      <li>
                        <a href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div></>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listProducts: ProductsSelectors.getList(state),
    listImages: state.cloudinary.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetList: () => {
      dispatch(ProductsActions.onGetList())
    },
    onAddProductToCart: (product) => {
      dispatch(ProductsActions.onAddProductToCart(product, 1));
    },
    onGetListImage: () => {
      dispatch(ImagesActions.onGetList())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);