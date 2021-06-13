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
        <Text style={styles.itemName} numberOfLines={2}>
          {product && product.name ? product.name.substring(0, 22) : ''}
          {product && product.name.length > 22 ? '...' : ''}
        </Text>
        <Text style={styles.itemPrice}>
          {product && product.price_min
            ? numberWithCommas(product.price_min)
            : null}
        </Text>
      </TouchableOpacity>
    );
  }
}

class ProductPage extends Component {
  constructor(props) {
    super(props);
    const {category} = this.props;
    this.state = {
      brandName: 'Độc Quyền',
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
    const {category} = this.props;
    this.setState({
      paramValue: {category: category},
    });
  }
  setSortValue = (itemValue, index) => {
    const {onGetList,category} = this.props;
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
    console.log('param: ', params)
    onGetList(params);
  };
  onSetBrand = value => {
    const {totalBrand, category, onGetList} = this.props;
    var brandId =
      value !== 'Độc Quyền'
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
      sortValue: 0
    });
    onGetList(params);
  };
  render() {
    const {listProducts, navigation, category, totalBrand} = this.props;
    const {brandName, sortValue} = this.state;
    return (
      <View style={{paddingHorizontal: 12}}>
        <View style={{marginVertical: 8}}>
          <ScrollView
            contentContainerStyle={{paddingTop: 10}}
            horizontal={true}
            scrollEnabled={true}>
            <TouchableOpacity
              style={
                brandName && brandName === 'Độc Quyền'
                  ? styles.btnBrandActive
                  : styles.btnBrand
              }>
              <Text
                style={
                  brandName && brandName === 'Độc Quyền'
                    ? styles.textBrandActive
                    : styles.textBrand
                }
                onPress={() => this.onSetBrand('Độc Quyền')}>
                Độc Quyền
              </Text>
            </TouchableOpacity>
            {totalBrand ? (
              totalBrand.map((brand, index) => {
                return (
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={
                        brandName && brandName === brand._id.name
                          ? styles.btnBrandActive
                          : styles.btnBrand
                      }
                      key={brand._id._id}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: params => {
      dispatch(ProductsActions.onGetList(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
