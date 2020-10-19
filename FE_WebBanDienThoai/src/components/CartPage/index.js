import React, { Component } from 'react';
import { ListCountry } from '../../constants/common';

class CartPage extends Component {
  

	render() {
        return ( <>
  <div className="product-big-title-area">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="product-bit-title text-center">
            <h2>Shopping Cart</h2>
          </div>
        </div>
      </div>
    </div>
  </div> 
  <div className="single-product-area">
    <div className="zigzag-bottom"></div>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="single-sidebar">
            <h2 className="sidebar-title">Search Products</h2>
            <form action="#">
              <input type="text" placeholder="Search products..."/>
              <input type="submit" value="Search"/>
            </form>
          </div>

          <div className="single-sidebar">
            <h2 className="sidebar-title">Products</h2>
            <div className="thubmnail-recent">
              <img src="img/product-thumb-1.jpg" className="recent-thumb" alt=""/>
              <h2><a href="single-product.html">Sony Smart TV - 2015</a></h2>
              <div className="product-sidebar-price">
                <ins>$700.00</ins> <del>$800.00</del>
              </div>
            </div>
            <div className="thubmnail-recent">
              <img src="img/product-thumb-1.jpg" className="recent-thumb" alt=""/>
              <h2><a href="single-product.html">Sony Smart TV - 2015</a></h2>
              <div className="product-sidebar-price">
                <ins>$700.00</ins> <del>$800.00</del>
              </div>
            </div>
            <div className="thubmnail-recent">
              <img src="img/product-thumb-1.jpg" className="recent-thumb" alt=""/>
              <h2><a href="single-product.html">Sony Smart TV - 2015</a></h2>
              <div className="product-sidebar-price">
                <ins>$700.00</ins> <del>$800.00</del>
              </div>
            </div>
            <div className="thubmnail-recent">
              <img src="img/product-thumb-1.jpg" className="recent-thumb" alt=""/>
              <h2><a href="single-product.html">Sony Smart TV - 2015</a></h2>
              <div className="product-sidebar-price">
                <ins>$700.00</ins> <del>$800.00</del>
              </div>
            </div>
          </div>

          <div className="single-sidebar">
            <h2 className="sidebar-title">Recent Posts</h2>
            <ul>
              <li><a href="#">Sony Smart TV - 2015</a></li>
              <li><a href="#">Sony Smart TV - 2015</a></li>
              <li><a href="#">Sony Smart TV - 2015</a></li>
              <li><a href="#">Sony Smart TV - 2015</a></li>
              <li><a href="#">Sony Smart TV - 2015</a></li>
            </ul>
          </div>
        </div>

        <div className="col-md-8">
          <div className="product-content-right">
            <div className="woocommerce">
              <form method="post" action="#">
                <table cellspacing="0" className="shop_table cart">
                  <thead>
                    <tr>
                      <th className="product-remove">&nbsp;</th>
                      <th className="product-thumbnail">&nbsp;</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="cart_item">
                      <td className="product-remove">
                        <a title="Remove this item" className="remove" href="#">×</a>
                      </td>

                      <td className="product-thumbnail">
                        <a href="single-product.html"><img width="145" height="145" alt="poster_1_up"
                            className="shop_thumbnail" src="img/product-thumb-2.jpg"/></a>
                      </td>

                      <td className="product-name">
                        <a href="single-product.html">Ship Your Idea</a>
                      </td>

                      <td className="product-price">
                        <span className="amount">£15.00</span>
                      </td>

                      <td className="product-quantity">
                        <div className="quantity buttons_added">
                          <input type="button" className="minus" value="-"/>
                          <input type="number" size="4" className="input-text qty text" title="Qty" value="1" min="0"
                            step="1"/>
                          <input type="button" className="plus" value="+"/>
                        </div>
                      </td>

                      <td className="product-subtotal">
                        <span className="amount">£15.00</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="actions" colspan="6">
                        <div className="coupon">
                          <label for="coupon_code">Coupon:</label>
                          <input type="text" placeholder="Coupon code" value="" id="coupon_code" className="input-text"
                            name="coupon_code"/>
                          <input type="submit" value="Apply Coupon" name="apply_coupon" className="button"/>
                        </div>
                        <input type="submit" value="Update Cart" name="update_cart" className="button"/>
                        <input type="submit" value="Checkout" name="proceed"
                          className="checkout-button button alt wc-forward"/>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>

              <div className="cart-collaterals">


                <div className="cross-sells">
                  <h2>You may be interested in...</h2>
                  <ul className="products">
                    <li className="product">
                      <a href="single-product.html">
                        <img width="325" height="325" alt="T_4_front" className="attachment-shop_catalog wp-post-image"
                          src="img/product-2.jpg"/>
                        <h3>Ship Your Idea</h3>
                        <span className="price"><span className="amount">£20.00</span></span>
                      </a>

                      <a className="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="22"
                        rel="nofollow" href="single-product.html">Select options</a>
                    </li>

                    <li className="product">
                      <a href="single-product.html">
                        <img width="325" height="325" alt="T_4_front" className="attachment-shop_catalog wp-post-image"
                          src="img/product-4.jpg"/>
                        <h3>Ship Your Idea</h3>
                        <span className="price"><span className="amount">£20.00</span></span>
                      </a>

                      <a className="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="22"
                        rel="nofollow" href="single-product.html">Select options</a>
                    </li>
                  </ul>
                </div>


                <div className="cart_totals ">
                  <h2>Cart Totals</h2>

                  <table cellspacing="0">
                    <tbody>
                      <tr className="cart-subtotal">
                        <th>Cart Subtotal</th>
                        <td><span className="amount">£15.00</span></td>
                      </tr>

                      <tr className="shipping">
                        <th>Shipping and Handling</th>
                        <td>Free Shipping</td>
                      </tr>

                      <tr className="order-total">
                        <th>Order Total</th>
                        <td><strong><span className="amount">£15.00</span></strong> </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <form method="post" action="#" className="shipping_calculator">
                  <h2><a className="shipping-calculator-button" data-toggle="collapse" href="#calcalute-shipping-wrap"
                      aria-expanded="false" aria-controls="calcalute-shipping-wrap">Calculate Shipping</a></h2>

                  <section id="calcalute-shipping-wrap" className="shipping-calculator-form collapse">

                    <p className="form-row form-row-wide">
                      <select rel="calc_shipping_state" className="country_to_state" id="calc_shipping_country"
                        name="calc_shipping_country">
                        <option value="">Select a country…</option>
                        <option value="AX">Åland Islands</option>
                      </select>
                    </p>

                    <p className="form-row form-row-wide"><input type="text" id="calc_shipping_state"
                        name="calc_shipping_state" placeholder="State / county" value="" className="input-text"/> </p>

                    <p className="form-row form-row-wide"><input type="text" id="calc_shipping_postcode"
                        name="calc_shipping_postcode" placeholder="Postcode / Zip" value="" className="input-text"/></p>


                    <p><button className="button" value="1" name="calc_shipping" type="submit">Update Totals</button></p>

                  </section>
                </form>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
        )
    }
}
export default CartPage;