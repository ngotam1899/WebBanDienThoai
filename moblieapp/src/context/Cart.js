import React, {Component} from 'react';

export const CartContext = React.createContext();

export class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
    };

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(product) {
    this.setState({
      cartItems: this.state.cartItems.concat(product),
    });
  }
  render() {
    return (
      <CartContext.Provider
        value={{cartItems: this.state.cartItems, addToCart: this.addToCart}}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
