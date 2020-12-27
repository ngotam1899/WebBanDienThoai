import React, { Component } from 'react';
// @Functions
import tryConvert from '../../utils/changeMoney'

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
    var {cart, currency} = this.props;
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
            className="shop_thumbnail" src={product.bigimage ? product.bigimage.public_url : "http://www.pha.gov.pk/img/img-02.jpg"} /></a>
        </td>

        <td className="product-name">
          <a href="single-product.html">{product.name}</a>
        </td>

        <td className="product-price">
          <span className="amount">{currency ==="VND" ? product.price : parseFloat(tryConvert(product.price, currency, false)).toFixed(2)}</span>
          
        </td>

        <td className="product-quantity">
          <div className="quantity buttons_added">
            <input type="button" className="minus h-100" value="-" onClick={() => this.onUpdateQuantity(product,quantity - 1)}/>
            <input type="number" size="4" className="input-text qty text" title="Qty" value={quantity} min="0"
              step="1" />
            <input type="button" className="plus h-100" value="+" onClick={() => this.onUpdateQuantity(product, quantity + 1)}/>
          </div>
        </td>

        <td className="product-subtotal">
          <span className="amount">{currency ==="VND" ? quantity*product.price : parseFloat(quantity*tryConvert(product.price, currency, false)).toFixed(2)}</span>
          
        </td>
      </tr>
    </>
    );
  }
}

export default CartItem;