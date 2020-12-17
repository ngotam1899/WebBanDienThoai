import React, { Component } from 'react';
import {connect} from 'react-redux';
import { get } from "lodash";
import ProductsActions from '../../redux/actions/products'
import BrandActions from "../../redux/actions/brands";
import CategoryActions from "../../redux/actions/categories";
import Search from '../../containers/Search';
import './styles.css';

class DetailPage extends Component {
  componentDidMount(){
    const {match, onGetDetailProduct, onGetListBrand, onGetListCategory} = this.props;
    onGetListBrand();
    onGetListCategory();
    onGetDetailProduct(match.params.productID);
  }

  setBrand = (brand) =>{
    const {listBrands} = this.props;
    const brandName = listBrands.find(obj => obj._id === brand);
    return get(brandName, "name");
  }

  setCategory = (category) =>{
    const {listCategories} = this.props;
    const categoryName = listCategories.find(obj => obj._id === category);
    return get(categoryName, "name");
  }

  render() {
    const {product} = this.props;
    return (<>
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
            <Search />
            <div className="col-md-8">
              <div className="product-content-right">
                <div className="product-breadcroumb">
                  <a href="/#/">Home</a>
                  <a href="#">{product && this.setCategory(product.category)}</a>
                  <a href="#">{product && product.name}</a>
                </div>

                {product && <div className="row">
                  <div className="col-sm-6">
                    <div className="product-images">
                      <div className="product-main-img">
                        <img src={product.bigimage ? product.bigimage.public_url : "http://www.pha.gov.pk/img/img-02.jpg"} alt="" />
                      </div>
                      <div className="row">
                        {product.image && product.image.map((img, index) =>{
                        return (
                          <div className="col-4" key={index}>
                            <div className="product-gallery">
                              <img key={index} src={img.public_url ? img.public_url : "http://www.pha.gov.pk/img/img-02.jpg"} alt="" />
                            </div>
                          </div>
                        )})}
                      </div>
                      
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="product-inner">
                      <h2 className="product-name">{product.name}</h2>
                      <div className="product-inner-price">
                        <ins>${product.price}</ins> <del>$100.00</del>
                      </div>

                      <form action="" className="cart">
                        <div className="quantity">
                          <input type="number" size="4" className="input-text qty text" title="Qty" value="1" name="quantity" min="1" step="1" />
                        </div>
                        <button className="add_to_cart_button" type="submit">Add to cart</button>
                      </form>

                      <div className="product-inner-category">
                        <p className="m-0">Category: <a href="">{this.setCategory(product.category)}</a></p>
                        <p className="m-0">Brand: <a href="">{this.setBrand(product.brand)}</a></p>
                        <p>Color: <a href="">{product.detail_info.mobile.color}</a></p>
                      </div>

                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a className="nav-link active" data-toggle="tab" href="#description">Description</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-toggle="tab" href="#review">Reviews</a>
                        </li>
                      </ul>

                      <div className="tab-content">
                        <div className="tab-pane container active" id="description">
                          <br />
                          <table  class="table table-inverse table-responsive">
                            <thead class="thead-inverse">
                              <tbody>
                                <tr>
                                  <td scope="row">Display</td>
                                  <td>{product.detail_info.mobile.display}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Revolution</td>
                                  <td>{product.detail_info.mobile.revolution}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Widescreen</td>
                                  <td>{product.detail_info.mobile.widescreen}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Operation</td>
                                  <td>{product.detail_info.mobile.operation}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Camera 1</td>
                                  <td>{product.detail_info.mobile.camera1}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Camera 2</td>
                                  <td>{product.detail_info.mobile.camera2}</td>
                                </tr>
                                <tr>
                                  <td scope="row">CPU</td>
                                  <td>{product.detail_info.mobile.cpu}</td>
                                </tr>
                                <tr>
                                  <td scope="row">RAM</td>
                                  <td>{product.detail_info.mobile.ram} GB</td>
                                </tr>
                                <tr>
                                  <td scope="row">Memory</td>
                                  <td>{product.detail_info.mobile.memory} GB</td>
                                </tr>
                                <tr>
                                  <td scope="row">Microcard</td>
                                  <td>{product.detail_info.mobile.microcard}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Sim</td>
                                  <td>{product.detail_info.mobile.sim}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Network</td>
                                  <td>{product.detail_info.mobile.network}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Pin</td>
                                  <td>{product.detail_info.mobile.pin}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Quick Charging</td>
                                  <td>{product.detail_info.mobile.quickcharging}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Weight</td>
                                  <td>{product.detail_info.mobile.weight}</td>
                                </tr>
                                <tr>
                                  <td scope="row">Thick</td>
                                  <td>{product.detail_info.mobile.thick}</td>
                                </tr>
                              </tbody>
                            </thead>
                          </table>
                        </div>
                        <div className="tab-pane container fade" id="review">
                          <br />
                          <div className="submit-review">
                            <p><label>Name</label> <input name="name" type="text" /></p>
                            <p><label>Email</label> <input name="email" type="email" /></p>
                            <div className="rating-chooser">
                              <p className="m-0">Your rating</p>

                              <div className="rating-wrap-post">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                              </div>
                            </div>
                            <p><label>Your review</label> <textarea name="review" id="" cols="30" rows="10"></textarea></p>
                            <p><input type="submit" value="Submit" /></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    product: state.products.detail,
    listBrands: state.brands.list,
    listCategories: state.categories.list,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetDetailProduct: (id) => {
      dispatch(ProductsActions.onGetDetail(id))
    },
    onGetListBrand: () => {
      dispatch(BrandActions.onGetList())
    },
    onGetListCategory: () => {
      dispatch(CategoryActions.onGetList())
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (DetailPage);