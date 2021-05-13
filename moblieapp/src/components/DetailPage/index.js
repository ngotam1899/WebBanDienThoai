import React, {Component} from 'react';
import ProductsActions from '../../redux/actions/products';
import {connect} from 'react-redux';
import {CartContext} from '../../context/Cart';
import styles from './style';
import {AsyncStorage} from 'react-native';
import {Rating} from 'react-native-ratings';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';

const {width} = Dimensions.get('window');

class FlatListItem extends Component {
  render() {
    return (
      <View
        key={this.props.item._key}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width,
          backgroundColor: this.props.index % 2 == 0 ? '#F9F9F9' : 'white',
        }}>
        <Text style={styles.flatListItemName}>{this.props.item.name}</Text>
        <Text style={styles.flatListItemValue}>{this.props.item.value}</Text>
      </View>
    );
  }
}
class FlatListImage extends Component {
  render() {
    return (
      <View
        key={this.props.item._key}
        style={{
          backgroundColor: 'white',
          flex: 1,
          marginTop: 20,
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={styles.productImg}
          source={{
            uri: this.props.item.public_url,
          }}
        />
      </View>
    );
  }
}
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
  }

  componentDidMount() {
    const {route, onGetDetailProduct} = this.props;
    onGetDetailProduct(route.params.id);
  }

  setColor = item => {
    this.setState({
      color: item._id,
    });
  };
  findProductInCart = (datacart, product, productColor) => {
    //Trường hợp không tìm thấy
    var index = -1;
    if (datacart !== null && datacart.length > 0) {
      for (var i = 0; i < datacart.length; i++) {
        // xem coi các product trong mảng cart có tồn tại product mới chọn ko?
        if (
          datacart[i].product._id === product._id &&
          datacart[i].color === productColor
        ) {
          index = i; //trả về vị trí
          break;
        }
      }
    }
    return index;
  };
  onClickAddCart = (data, color, quantity) => {
    const itemCart = {
      product: data,
      quantity: quantity,
      color: color,
    };
    if (color !== '') {
      AsyncStorage.getItem('cart')
        .then(datacart => {
          index = this.findProductInCart(JSON.parse(datacart), data, color);
          if (index !== -1 && datacart !== null) {
            const cart = JSON.parse(datacart);
            cart[index].quantity += quantity;
            AsyncStorage.setItem('cart', JSON.stringify(cart));
            this.props.onAddProductToCart();
          } else if (index === -1 && datacart !== null) {
            const cart = JSON.parse(datacart);
            cart.push(itemCart);
            AsyncStorage.setItem('cart', JSON.stringify(cart));
            this.props.onAddProductToCart();
          } else {
            const cart = [];
            cart.push(itemCart);
            AsyncStorage.setItem('cart', JSON.stringify(cart));
            this.props.onAddProductToCart();
          }
          alert('Add Cart');
        })
        .catch(err => {
          alert(err);
        });
    } else {
      alert('Vui lòng chọn màu bạn muốn mua');
    }
  };
  render() {
    const {product, group, navigation, route, currency, review, total} = this.props;
    const {color} = this.state;

    return (
      <>
        {product && (
          <ScrollView style={styles.container}>
            <FlatList
              data={product.image}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={true}
              scrollEventThrottle={10}
              keyExtractor={(item, index) => item._id}
              horizontal={true}
              renderItem={({item, index}) => {
                return (
                  <FlatListImage item={item} index={index}></FlatListImage>
                );
              }}></FlatList>
            <View style={{marginHorizontal: 20, marginTop: 10}}>
              <Text style={styles.name}>{product.name}</Text>
              <Rating
              type = "star"
                ratingCount={5}
                readonly= {true}
                startingValue = {product.stars}
                style = {{alignItems:'flex-start'}}
                size = {15}
                imageSize ={18}
              />
              <Text style={styles.price}>
                {product.price_min === product.price_max
                  ? product.price_min
                  : `${product.price_min}-${product.price_max}`}{' '}
                VND
              </Text>
            </View>
            {group ? (
              <>
                <Text style={styles.titleName}>Chọn dung lượng sản phẩm</Text>
                <View style={styles.contentGroup}>
                  {group.products.map((item, index) => (
                    <TouchableOpacity
                      key={item._id}
                      style={
                        route.params.id === item.product._id
                          ? [styles.btnGroup, styles.btnGroupActive]
                          : styles.btnGroup
                      }
                      onPress={() => {
                        navigation.replace('Detail', {id: item.product._id});
                      }}>
                      <Text style={styles.textGroup}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <></>
            )}

            <Text style={styles.titleName}>Chọn màu sản phẩm</Text>
            <View style={styles.contentColors}>
              {product.colors &&
                product.colors.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={
                      color === item._id
                        ? [styles.btnColor, styles.colorActive]
                        : styles.btnColor
                    }
                    onPress={() => this.setColor(item)}>
                    <Text style={styles.textColor}>{item.name_vn}</Text>
                    <Text style={styles.textColor}>{item.price}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            <View style={styles.addToCarContainer}>
              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => this.onClickAddCart(product, color, 1)}>
                <Text style={styles.shareButtonText}>Chọn Mua</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleName}>Mô tả sản phẩm</Text>
            <Text style={styles.textDescription}>{product.description}</Text>
            <Text style={styles.titleName}>Thông số kỹ thuật</Text>
            <FlatList
              data={product.specifications}
              keyExtractor={(item, index) => item._id}
              renderItem={({item, index}) => {
                return <FlatListItem item={item} index={index}></FlatListItem>;
              }}></FlatList>

            <View style={styles.separator}></View>
          </ScrollView>
        )}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    product: state.products.detail,
    group: state.group.detail,
    currency: state.currency,
    review: state.review.list,
    total: state.review.total,
    authInfo: state.auth.detail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetDetailProduct: payload => {
      dispatch(ProductsActions.onGetDetail(payload));
    },
    onAddProductToCart: () => {
      dispatch(ProductsActions.onAddProductToCart());
    },
    onGetReviews: (params) => {
      dispatch(ReviewActions.onGetList(params));
    },
    onClearStateReview: () => {
      dispatch(ReviewActions.onClearState());
    },
    onUpdateReview: (id, params) => {
      dispatch(ReviewActions.onUpdate(id, params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
