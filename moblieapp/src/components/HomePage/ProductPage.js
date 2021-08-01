import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import styles from './style';

import ProductPageLoader from '../ContentLoader/ProductPageLoader';
import numberWithCommas from '../../utils/formatPrice';
import ProductsActions from '../../redux/actions/products';

class ProductItem extends Component {
  render() {
    const { product, navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.push('Detail', { id: product._id });
        }}>
        <Image
          source={{
            uri:
              product && product.bigimage ? product.bigimage.public_url : null,
          }}
          style={styles.itemImage}
        />
        <View style={{ paddingLeft: 5 }}>
          <Text style={styles.itemName} numberOfLines={2}>
            {product && product.name ? product.name.substring(0, 22) : ''}
          </Text>
          {product.real_price_min ? (
            <View style={{ flexDirection: 'row' }}>
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
    const { category, listProducts } = this.props;
    this.state = {
      brandName: 'Tất cả',
      params: {
        category: category,
        brand: '',
        limit: 12,
        page: 0,
        sort_p: '',
      },
      number: 1,
      productList: [],
      sortValue: 0,
      isMounted: false,
    };
  }
  componentDidMount() {
    const { onAddParams, onGetList, listProducts } = this.props;
    const { params } = this.state;
    this.setState({
      productList: listProducts ? listProducts : [],
    })
    onAddParams(params);
  }
  setSortValue = (itemValue, index) => {
    const { onGetList, onAddParams } = this.props;
    const { params } = this.state;
    onAddParams({ ...params, sort_p: itemValue });
    onGetList({ ...params, sort_p: itemValue });
    this.setState({
      sortValue: itemValue,
      params: {
        ...params,
        sort_p: itemValue,
      },
    });
  };
  onSetBrand = value => {
    const { listBrand, onGetList, onAddParams } = this.props;
    const { params } = this.state;
    var brandId =
      value !== 'Tất cả'
        ? listBrand.find(item => item._id.name === value)._id._id
        : '';
    onGetList({ ...params, brand: brandId });
    onAddParams({ ...params, brand: brandId });
    this.setState({
      params: {
        ...params,
        brand: brandId,
      },
      brandName: value,
    });
  };
  ReadMore() {
    const { onAddParams, onGetList, category, listProducts } = this.props;
    const { number, params } = this.state;
    if (listProducts?.length >= 12) {
      onAddParams({ ...params, page: number, category: category });
      onGetList({ ...params, page: number, category: category });
      this.setState({
        params: {
          ...params,
          page: number,
        },
        number: number + 1,
      });
    }
  }

  onCompare = () => {
    const { navigation, category } = this.props;
    navigation.navigate('Compare', {
      category: category,
      id: '',
    });
  };
  componentDidUpdate(prevProps) {
    const { category, onAddParams, onGetList, listProducts } = this.props;
    const { params, isMounted, productList } = this.state;
    if (isMounted) {
      if (category !== prevProps.category) {
        onAddParams({ ...params, category: category });
        onGetList({ ...params, category: category });
        this.setState({
          params: {
            ...params,
            category: category,
          },
        });
      }
    }
  }
  componentWillUnmount() {
    console.log('111');
    this.setState({
      isMounted: false,
      productList: []
    });
  }
  render() {
    const { listProducts, navigation, listBrand } = this.props;
    const { brandName, sortValue, productList } = this.state;
    return (
      <View style={{ paddingHorizontal: 12, paddingBottom: 130 }}>
        <View style={{ marginVertical: 8 }}>
          <ScrollView
            contentContainerStyle={{ paddingTop: 10 }}
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
            {listBrand ? (
              listBrand.map((brand, index) => {
                return (
                  <View key={brand._id._id} style={{ flexDirection: 'row' }}>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          <TouchableOpacity
            onPress={() => this.onCompare()}
            style={styles.btnCompare}>
            <Text style={styles.txtCompare}>So sánh</Text>
          </TouchableOpacity>
        </View>
        {listProducts ? (
          <FlatList
            data={listProducts}
            numColumns={3}
            contentContainerStyle={{ flexGrow: 1 }}
            onEndReached={() => this.ReadMore()}
            onEndReachedThreshold={0.0}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item, index }) => {
              return (
                <ProductItem
                  product={item}
                  index={index}
                  key={item._id}
                  navigation={navigation}></ProductItem>
              );
            }}></FlatList>
        ) : (
          <ProductPageLoader></ProductPageLoader>
        )}
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
    onClear: () => {
      dispatch(ProductsActions.onClearState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
