import React, {Component} from 'react';
import {AsyncStorage, ScrollView} from 'react-native';
import ProductsActions from '../../redux/actions/products';
import {connect} from 'react-redux';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
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
          // We have data!!
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
        if(data.length === 1){
          data.splice(i, 1);
          this.setState({dataCart: data});
          this.setTotalPrice(data);
          AsyncStorage.removeItem('cart');
          this.props.onDeleteProductToCart();
        }else{
          data.splice(i, 1);
          this.setState({dataCart: data});
          this.setTotalPrice(data);
          AsyncStorage.setItem('cart', JSON.stringify(data));
          this.props.onDeleteProductToCart();
        }
      }

    });
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{height: 20}} />
          <Text style={{fontSize: 28, color: '#277cdb'}}>Cart Detail</Text>
          <View style={{height: 10}} />
          {this.state.dataCart.map((item, index) => {
            return (
              <View style={{flex: 1}} key={index}>
                <View
                  style={{
                    width: width - 20,
                    margin: 10,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    borderBottomWidth: 2,
                    borderColor: '#cccccc',
                    paddingBottom: 10,
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: width / 3, height: width / 3}}
                    source={{
                      uri: item.product.bigimage.public_url,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      padding: 10,
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {item.product.name}
                      </Text>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {
                          item.product.colors.find(i => i._id === item.color)
                            .name_en
                        }
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#9fd236',
                          fontSize: 20,
                        }}>
                        {item.product.colors.find(i => i._id === item.color)
                          .price * item.quantity}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => this.onChangeQual(index, false)}>
                          <Icon
                            name="ios-remove-circle"
                            size={35}
                            color={'#1e88e5'}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            paddingHorizontal: 8,
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
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

          <View style={{height: 20}} />
          <View style={{width:width , marginLeft:20}}>
            <Text style={{fontWeight: 'bold'}}>
              Tạm tính: {this.state.totalPrice}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Phí ship: Free</Text>
            <Text style={{fontWeight: 'bold'}}>Thành tiền: {this.state.totalPrice}</Text>
          </View>
          <View style={{height: 20}} />
          <TouchableOpacity
            style={{
              backgroundColor: '#1e88e5',
              width: width - 40,
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
              }}>
              CHECKOUT
            </Text>
          </TouchableOpacity>

          <View style={{height: 20}} />
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    product: state.products.detail,
    group: state.group.detail,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
