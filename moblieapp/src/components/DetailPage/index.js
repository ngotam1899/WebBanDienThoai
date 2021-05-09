import React, {Component} from 'react';
import ProductsActions from '../../redux/actions/products';
import {connect} from 'react-redux';
import {CartContext} from '../../context/Cart';

import {
  StyleSheet,
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

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ''
    }
  }
  clickEventListener() {
    Alert.alert('Success', 'Product has beed added to cart');
  }
  componentDidMount() {
    const {route, onGetDetailProduct} = this.props;
    onGetDetailProduct(route.params.id);
    console.log('route.params.id: ', route.params.id);
  }
  componentDidUpdate(prevProps) {
    const {route, onGetDetailProduct} = this.props;
    if (this.props.route !== prevProps.route) {
      onGetDetailProduct(route.params.id);
    }
  }
  setColor = (item) =>{
    this.setState({
      color: item._id
    })
  }

  onAddToCart = (product, quantity) => {
    const  {onAddProductToCart} = this.props;
    const {color} = this.state;
    onAddProductToCart(product, color, quantity)
  }
  onReload(id) {
    const {navigation, route} = this.props;
    navigation.navigate('Detail', {id});
    console.log('id: ', route.params.id);
  }
  render() {
    const {product, group} = this.props;
    const {color} = this.state;
    let screenWidth = Dimensions.get('window').width;
    return (
      <View style={styles.container}>
        {product && (
          <ScrollView>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={true}
              scrollEventThrottle={10}>
              {product.image &&
                product.image.map((product, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      flex: 1,
                      marginTop: 20,
                      width: screenWidth,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={styles.productImg}
                      source={{
                        uri: product.public_url,
                      }}
                    />
                  </View>
                ))}
            </ScrollView>
            <View style={{marginHorizontal: 20, marginTop: 10}}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>{product.price_min} VND</Text>
            </View>
            <Text style={styles.titleName}>Chọn dung lượng sản phẩm</Text>
            <View style={styles.contentGroup}>
              {group &&
                group.products.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.btnGroup}
                    onPress={() => this.onReload(item._id)}>
                    <Text style={styles.textGroup}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.titleName}>Chọn màu sản phẩm</Text>
            <View style={styles.contentColors}>
              {product.colors &&
                product.colors.map((item, index) => (
                  <TouchableOpacity key={index} style={color === item._id ? [styles.btnColor, styles.colorActive] : styles.btnColor} onPress = {()=>this.setColor(item)}>
                    <Text style={styles.textColor}>{item.name_vn}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            <View style={styles.addToCarContainer}>
              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => this.onAddToCart(product, 1)}>
                <Text style={styles.shareButtonText}>Chọn Mua</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleName}>Mô tả sản phẩm</Text>
            <Text style={styles.textDescription}>{product.description}</Text>
            <Text style={styles.titleName}>Thông số kỹ thuật</Text>
            <FlatList
              data={product.specifications}
              renderItem={({item, index}) => {
                return <FlatListItem item={item} index={index}></FlatListItem>;
              }}></FlatList>
            <View style={styles.starContainer}>
              <Image
                style={styles.star}
                source={{
                  uri: 'https://img.icons8.com/color/40/000000/star.png',
                }}
              />
              <Image
                style={styles.star}
                source={{
                  uri: 'https://img.icons8.com/color/40/000000/star.png',
                }}
              />
              <Image
                style={styles.star}
                source={{
                  uri: 'https://img.icons8.com/color/40/000000/star.png',
                }}
              />
              <Image
                style={styles.star}
                source={{
                  uri: 'https://img.icons8.com/color/40/000000/star.png',
                }}
              />
              <Image
                style={styles.star}
                source={{
                  uri: 'https://img.icons8.com/color/40/000000/star.png',
                }}
              />
            </View>
            <View style={styles.separator}></View>
          </ScrollView>
        )}
      </View>
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
    onGetDetailProduct: payload => {
      dispatch(ProductsActions.onGetDetail(payload));
    },
    onAddProductToCart: (product, color, quantity) => {
      dispatch(ProductsActions.onAddProductToCart(product, color, quantity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  productImg: {
    width: 200,
    height: 300,
  },
  flatListItemName: {
    color: 'black',
    padding: 5,
    fontSize: 13,
    marginLeft: 20,
  },
  flatListItemValue: {
    color: 'black',
    padding: 5,
    marginRight: 50,
    fontSize: 12,
  },
  name: {
    fontSize: 20,
    color: '#696969',
    fontWeight: 'bold',
    marginLeft: 0,
  },
  titleName: {
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDescription: {
    marginLeft: 20,
    marginBottom: 10,
  },
  colorActive: {
    backgroundColor: 'blue'
  },
  price: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  contentColors: {
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 5,
  },
  btnColor: {
    height: 40,
    width: 60,
    borderRadius: 10,
    borderColor: '#778899',
    borderWidth: 2,
    marginHorizontal: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentGroup: {
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  btnGroup: {
    height: 30,
    width: 100,
    borderRadius: 10,
    borderColor: '#778899',
    borderWidth: 2,
    marginHorizontal: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  textGroup: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginVertical: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'red',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
});
