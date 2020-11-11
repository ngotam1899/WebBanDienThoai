import React, { Component } from 'react';
import { assets } from '../../constants/assetsImage';

class CartItem extends Component {
  onUpdateQuantity = (product, quantity) => {
    var {onUpdateProductInCart} = this.props;
    if(quantity > 0){
      onUpdateProductInCart(product, quantity);
    }
  }

  onDeleteProductInCart = (product) => {
    var {onDeleteProductInCart} = this.props;
    onDeleteProductInCart(product);
  }

  render() {
    var {cart} = this.props;
    var {product} = cart;
    var {quantity} = cart;
    return (
    <>
      <tr className="cart_item">
        <td className="product-remove">
          <input value="x" className="btn btn-danger" type="button" onClick={()=> this.onDeleteProductInCart(product)}></input>
        </td>

        <td className="product-thumbnail">
          <a href="single-product.html"><img width="145" height="145" alt="poster_1_up"
            className="shop_thumbnail" src="" /></a>
        </td>

        <td className="product-name">
          <a href="single-product.html">{product.generalinfo.name}</a>
        </td>

        <td className="product-price">
          <span className="amount">{product.generalinfo.price}</span>
        </td>

        <td className="product-quantity">
          <div className="quantity buttons_added">
            <input type="button" className="minus" value="-" onClick={() => this.onUpdateQuantity(product,quantity - 1)}/>
            <input type="number" size="4" className="input-text qty text" title="Qty" value={quantity} min="0"
              step="1" />
            <input type="button" className="plus" value="+" onClick={() => this.onUpdateQuantity(product, quantity + 1)}/>
          </div>
        </td>

        <td className="product-subtotal">
          <span className="amount">{quantity*product.generalinfo.price}</span>
        </td>
      </tr>
      <tr>
        <td className="actions" colspan="6">
          <div className="coupon">
            <label for="coupon_code">Coupon:</label>
            <input type="text" placeholder="Coupon code" value="" id="coupon_code" className="input-text"
              name="coupon_code" />
            <input type="submit" value="Apply Coupon" name="apply_coupon" className="button" />
          </div>
          <input type="submit" value="Update Cart" name="update_cart" className="button" />
          <input type="submit" value="Checkout" name="proceed"
            className="checkout-button button alt wc-forward" />
        </td>
      </tr>
    </>
    );
  }
}

export default CartItem;