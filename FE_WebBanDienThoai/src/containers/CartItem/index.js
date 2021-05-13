import React, { Component } from 'react';
// @Functions
import tryConvert from '../../utils/changeMoney'
import numberWithCommas from "../../utils/formatPrice";

class CartItem extends Component {
  onUpdateQuantity = (product, color, quantity) => {
    var {onUpdateProductInCart} = this.props;
    if(quantity > 0){
      onUpdateProductInCart(product,color, quantity);
    }
  }

  onDeleteProductInCart = (product, color) => {
    var {onDeleteProductInCart} = this.props;
    onDeleteProductInCart(product, color);
  }

  render() {
    var {cart, currency} = this.props;
    var {product, quantity, color} = cart;
    return (
    <>
      <tr className="cart_item">
        <td className="product-remove">
          <input value="x" className="btn btn-danger" type="button" onClick={()=> this.onDeleteProductInCart(product, color)}></input>
        </td>

        <td className="product-thumbnail">
          <a href="single-product.html"><img width="145" height="145" alt=""
            className="shop_thumbnail" src={product.bigimage ? product.bigimage.public_url : "http://www.pha.gov.pk/img/img-02.jpg"} /></a>
        </td>

        <td className="product-name">
          <a href="single-product.html">{product.name}-{product.colors.find(i => i._id === color).name_en}</a>
        </td>

        <td className="product-price">
          <span className="amount">{currency ==="VND" ? numberWithCommas(product.colors.find(i => i._id === color).price) : numberWithCommas(parseFloat(tryConvert(product.colors.find(i => i._id === color).price, currency, false)).toFixed(2))}</span>
          
        </td>

        <td className="product-quantity">
          <div className="quantity buttons_added">
            <input type="button" className="minus h-100" value="-" onClick={() => this.onUpdateQuantity(product, color, quantity - 1)}/>
            <input type="number" size="4" className="input-text qty text" value={quantity} min="0" step="1" />
            <input type="button" className="plus h-100" value="+" onClick={() => this.onUpdateQuantity(product, color, quantity + 1)}/>
          </div>
        </td>

        <td className="product-subtotal">
          <span className="amount">{currency ==="VND" ? numberWithCommas(quantity*product.colors.find(i => i._id === color).price) : numberWithCommas(parseFloat(quantity*tryConvert(product.colors.find(i => i._id === color).price, currency, false)).toFixed(2))}</span>
          
        </td>
      </tr>
    </>
    );
  }
}

export default CartItem;