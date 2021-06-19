import React, {Component} from 'react';
import {AsyncStorage, ScrollView} from 'react-native';
import ProductsActions from '../../redux/actions/products';
import {connect} from 'react-redux';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import numberWithCommas from '../../utils/formatPrice';
import styles from './style'
var {width} = Dimensions.get('window');

// import icons
import Icon from 'react-native-vector-icons/Ionicons';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
      total: 0,
      totalPrice: 0,
    };
  }
  setTotalPrice(dataCart) {
    var total = 0;
    var totalPrice = 0;
    for (var i = 0; i < dataCart.length; i++) {
      total = total + dataCart[i].quantity;
      totalPrice =
        totalPrice +
        dataCart[i].quantity *
          dataCart[i].product.colors.find(
            item => item._id === dataCart[i].color,
          ).price;
    }
    this.setState({
      total,
      totalPrice,
    });
  }
  componentDidMount() {
    AsyncStorage.getItem('cart')
      .then(cart => {
        if (cart !== null) {
          const cartData = JSON.parse(cart);
          this.setState({dataCart: cartData});
          this.setTotalPrice(cartData);
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  onChangeQual(i, type) {
    AsyncStorage.getItem('cart').then(datacart => {
      const data = JSON.parse(datacart);
      let cantd = data[i].quantity;
      if (type === true) {
        cantd = cantd + 1;
        data[i].quantity = cantd;
        this.setState({dataCart: data});
        this.setTotalPrice(data);
        AsyncStorage.setItem('cart', JSON.stringify(data));
        this.props.onAddProductToCart();
      } else if (type == false && cantd >= 2) {
        cantd = cantd - 1;
        data[i].quantity = cantd;
        this.setState({dataCart: data});
        this.setTotalPrice(data);
        AsyncStorage.setItem('cart', JSON.stringify(data));
        this.props.onDeleteProductToCart();
      } else if (type == false && cantd == 1) {
        if (data.length === 1) {
          data.splice(i, 1);
          this.setState({dataCart: data});
          this.setTotalPrice(data);
          AsyncStorage.removeItem('cart');
          this.props.onDeleteProductToCart();
        } else {
          data.splice(i, 1);
          this.setState({dataCart: data});
          this.setTotalPrice(data);
          AsyncStorage.setItem('cart', JSON.stringify(data));
          this.props.onDeleteProductToCart();
        }
      }
    });
  }

  checkOut = () => {
    const {navigation, onCheckout} = this.props;
    onCheckout();
    navigation.navigate('SignIn');
  }

  render() {
    const {navigation, isLogin} = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.title}>Cart Detail</Text>
          {this.state.dataCart.map((item, index) => {
            return (
              <View style={styles.itemContainer} key={index}>
                <View
                  style={styles.boxItemContainer}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.imgItem}
                    source={{
                      uri: item.product.bigimage.public_url,
                    }}
                  />
                  <View
                    style={styles.titleContainer}>
                    <View>
                      <Text style={styles.name}>
                        {item.product.name}
                      </Text>
                      <Text style={styles.color}>
                        Màu: {
                          item.product.colors.find(i => i._id === item.color)
                            .name_vn
                        }
                      </Text>
                    </View>
                    <View
                      style={styles.boxPrice}>
                      <Text
                        style={styles.price}>
                        {numberWithCommas(item.product.colors.find(i => i._id === item.color).price * item.quantity)} VNĐ
                      </Text>
                      <View
                        style={styles.boxCountNumber}>
                        <TouchableOpacity
                          onPress={() => this.onChangeQual(index, false)}>
                          <Icon
                            name="ios-remove-circle"
                            size={35}
                            color={'#1e88e5'}
                          />
                        </TouchableOpacity>
                        <Text
                          style={styles.number}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.onChangeQual(index, true)}>
                          <Icon
                            name="ios-add-circle"
                            size={35}
                            color={'#1e88e5'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}

          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPrice}>
              Tạm tính: {numberWithCommas(this.state.totalPrice)} VNĐ
            </Text>
          </View>

          {isLogin ? (
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => navigation.navigate('Checkout')}>
              <Text
                style={styles.btn}>
                CHECKOUT
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() => this.checkOut()}>
              <Text
                style={styles.btn}>
                CHECKOUT
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.detail,
    group: state.group.detail,
    isLogin: state.auth.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteProductToCart: () => {
      dispatch(ProductsActions.onDeleteProductToCart());
    },
    onAddProductToCart: () => {
      dispatch(ProductsActions.onAddProductToCart());
    },
    onCheckout: () => {
      dispatch(ProductsActions.onCheckout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
