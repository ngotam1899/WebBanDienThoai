import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Rating} from 'react-native-ratings';
import {connect} from 'react-redux';
import styles from './style';
import numberWithCommas from '../../utils/formatPrice';
import ProductsActions from '../../redux/actions/products';

class ProductItem extends Component {
  render() {
    const {product, navigation} = this.props;
    return (
      <TouchableOpacity
        style={[styles.itemContainer, (flex = 0.33)]}
        onPress={() => {
          navigation.push('Detail', {id: product._id});
        }}>
        <Image
          source={{
            uri:
              product && product.bigimage ? product.bigimage.public_url : null,
          }}
          style={styles.itemImage}
        />
        <View style={{paddingLeft: 5}}>
          <Text style={styles.itemName} numberOfLines={2}>
            {product && product.name ? product.name.substring(0, 22) : ''}
          </Text>
          {product.real_price_min ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.itemPriceReal}>
                {numberWithCommas(product.real_price_min)}
              </Text>
              <Text style={styles.reducePrice}>
                {' '}
                Giảm{' '}
                {parseInt(
                  (1 - product.price_min / product.real_price_min) * 100,
                )}
                %
              </Text>
            </View>
          ) : (
            <></>
          )}
          <Text style={styles.itemPrice}>
            {product && product.price_min
              ? numberWithCommas(product.price_min)
              : null}
          </Text>
          {product.stars && product.reviewCount ? (
            <View style={styles.rating}>
              <Rating
                type="star"
                ratingCount={5}
                readonly={true}
                startingValue={product.stars}
                style={{
                  alignItems: 'flex-start',
                  marginRight: 5,
                  marginLeft: 0,
                }}
                size={11}
                imageSize={11}
              />
              <Text style={styles.countRating}>
                {product.reviewCount} đánh giá
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

class ProductPage extends Component {
  constructor(props) {
    super(props);
    const {category} = this.props;
    this.state = {
      brandName: 'Tất cả',
      paramValue: {
        category: category,
        brand: '',
        limit: '',
        sort_p: '',
      },
      sortValue: 0,
    };
  }
  componentDidMount() {
    const {category, onAddParams} = this.props;
    this.setState({
      paramValue: {category: category},
    });
    var params = {
      category: category,
      limit: '',
      brand: '',
      sort_p: 0,
    };
    onAddParams(params);
  }
  setSortValue = (itemValue, index) => {
    const {onGetList, category, onAddParams} = this.props;
    const {paramValue} = this.state;
    this.setState({
      sortValue: itemValue,
    });
    var params = {
      category: category,
      limit: 100,
      brand: paramValue.brand,
      sort_p: itemValue,
    };
    onAddParams(params);
    onGetList(params);
  };
  onSetBrand = value => {
    const {totalBrand, category, onGetList, onAddParams} = this.props;
    var brandId =
      value !== 'Tất cả'
        ? totalBrand.find(item => item._id.name === value)._id._id
        : '';
    var params = {
      category: category,
      brand: brandId,
      limit: 100,
    };
    this.setState({
      paramValue: params,
      brandName: value,
      sortValue: 0,
    });
    onGetList(params);
    onAddParams(params);
  };
  componentDidUpdate(prevProps) {
    const {category, onAddParams} = this.props;
    if (category !== prevProps.category) {
      var params = {
        category: category,
        limit: '',
        brand: '',
        sort_p: 0,
      };
      onAddParams(params);
    }
  }
  render() {
    const {listProducts, navigation, totalBrand, params, category} = this.props;
    const {brandName, sortValue} = this.state;
    return (
      <View style={{paddingHorizontal: 12, paddingBottom: 130}}>
        <View style={{marginVertical: 8}}>
          <ScrollView
            contentContainerStyle={{paddingTop: 10}}
            horizontal={true}
            scrollEnabled={true}>
            <TouchableOpacity
              style={
                brandName && brandName === 'Tất cả'
                  ? styles.btnBrandActive
                  : styles.btnBrand
              }>
              <Text
                style={
                  brandName && brandName === 'Tất cả'
                    ? styles.textBrandActive
                    : styles.textBrand
                }
                onPress={() => this.onSetBrand('Tất cả')}>
                Tất cả
              </Text>
            </TouchableOpacity>
            {totalBrand ? (
              totalBrand.map((brand, index) => {
                return (
                  <View key={brand._id._id} style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={
                        brandName && brandName === brand._id.name
                          ? styles.btnBrandActive
                          : styles.btnBrand
                      }
                      onPress={() => this.onSetBrand(brand._id.name)}>
                      <Text>{brand._id.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.spanCount}>
                      <Text style={styles.txtCount}>{brand.count}</Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <></>
            )}
          </ScrollView>
        </View>
        <View>
          <Picker
            selectedValue={sortValue}
            style={sortValue === 0 ? styles.pickerSort : styles.pickerLong}
            onValueChange={(itemValue, index) =>
              this.setSortValue(itemValue, index)
            }>
            <Picker.Item label="Product Price" value={0} />
            <Picker.Item label="Price: From hight to low" value={-1} />
            <Picker.Item label="Price: From low to hight" value={1} />
          </Picker>
        </View>
        <FlatList
          data={listProducts}
          numColumns={3}
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(item, index) => item._id}
          renderItem={({item, index}) => {
            return (
              <ProductItem
                product={item}
                index={index}
                key={item._id}
                navigation={navigation}></ProductItem>
            );
          }}></FlatList>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    listProducts: state.products.list,
    params: state.products.params,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: params => {
      dispatch(ProductsActions.onGetList(params));
    },
    onAddParams: params => {
      dispatch(ProductsActions.onAddParams(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
