import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';

import numberWithCommas from '../../utils/formatPrice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductsActions from '../../redux/actions/products';
import CategoryActions from '../../redux/actions/categories';

import Header from '../HeaderComponent';
import styles from './style';

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

class SearchPage extends Component {
  constructor(props) {
    super(props);
    const {category} = this.props;
    this.state = {
      categoryName: 'Tất cả',
    };
  }
  onSearchProduct = () => {
    const {navigation} = this.props;
    const {key} = this.state;
    navigation.replace('Search', {keyword: key});
  };
  componentDidMount() {
    const {onGetList, onGetListCategory, route} = this.props;
    const params = {keyword: route.params.keyword, limit: 100};
    onGetList(params);
    onGetListCategory(params);
  }

  onSetCategory = value => {
    const {listCategory, onGetList, route} = this.props;
    var categoryId =
      value !== 'Tất cả'
        ? listCategory.find(item => item._id.name === value)._id._id
        : '';
    var params = {
      category: categoryId,
      limit: 100,
      keyword: route.params.keyword,
    };
    this.setState({
      categoryName: value,
    });
    onGetList(params);
  };
  componentDidUpdate(prevProps) {}
  render() {
    const {listProducts, listCategory, navigation, route} = this.props;
    const {categoryName} = this.state;
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={styles.headerContainer}>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => this.onSearchProduct()}>
              <FontAwesome name="search" size={24} color="#969696" />
            </TouchableOpacity>
            <TextInput
              placeholder="Bạn tìm gì hôm nay?"
              style={styles.inputText}
              onChangeText={val => {
                this.setState({
                  key: val,
                });
              }}></TextInput>
          </View>
          <Header value="2" navigation={navigation}></Header>
        </View>
        <View style={{paddingHorizontal: 12}}>
          <View style={{marginVertical: 8}}>
            <ScrollView
              contentContainerStyle={{paddingTop: 10}}
              horizontal={true}
              scrollEnabled={true}>
              <TouchableOpacity
                style={
                  categoryName && categoryName === 'Tất cả'
                    ? styles.btnBrandActive
                    : styles.btnBrand
                }>
                <Text
                  style={
                    categoryName && categoryName === 'Tất cả'
                      ? styles.textBrandActive
                      : styles.textBrand
                  }
                  onPress={() => this.onSetCategory('Tất cả')}>
                  Tất cả
                </Text>
              </TouchableOpacity>
              {listCategory ? (
                listCategory.map((category, index) => {
                  return (
                    <View key={category._id} style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={
                          categoryName && categoryName === category._id.name
                            ? styles.btnBrandActive
                            : styles.btnBrand
                        }
                        key={category._id._id}
                        onPress={() => this.onSetCategory(category._id.name)}>
                        <Text>{category._id.name}</Text>
                      </TouchableOpacity>
                      <View style={styles.spanCount}>
                        <Text style={styles.txtCount}>{category.count}</Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <></>
              )}
            </ScrollView>
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    listCategory: state.categories.search,
    listProducts: state.products.list,
    total: state.products.total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: params => {
      dispatch(ProductsActions.onGetList(params));
    },
    onGetListCategory: params => {
      dispatch(CategoryActions.onGetListKeyword(params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
