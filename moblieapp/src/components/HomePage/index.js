import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {
  Image,
  View,
  Text,
  ScrollView,
} from 'react-native';
import styles from './style'
import {connect} from 'react-redux';
// @Components
import ProductItem from '../ProductItem'
// @Actions
import ProductsSelectors from '../../redux/selectors/products';
import ProductsActions from '../../redux/actions/products';

const section_banner = require('../../assets/section_banner.png');

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {movieName: '', releaseYear: ''};
  }
  componentDidMount() {
    this.props.onGetList();
    this.props.onGetBestSeller();
    this.props.onGetFavorite();
    this.props.onGetNewest();
  }
  render() {
    const {listProducts, bestSeller, newest, favorite, navigation} = this.props;
    return (
      <ScrollView>
        <View style={styles.sectionContainer}>
        {/*  */}
        <Text style={styles.sectionTitle}>Điện thoại - Máy tính bảng</Text>
        {/*  */}
        <Image source={section_banner} style={styles.sectionImage} />
        {/*  */}
        <ScrollView horizontal={true}>
          <View style={styles.filterContainer}>
            {[
              'Tất cả',
              'Điện thoại SmartPhone',
              'Máy tính bảng',
              'Điện thoại',
            ].map((e, index) => (
              <View
                key={index.toString()}
                style={
                  index === 0
                    ? styles.filterActiveButtonContainer
                    : styles.filterInactiveButtonContainer
                }>
                <Text
                  style={
                    index === 0
                      ? styles.filterActiveText
                      : styles.filterInactiveText
                  }>
                  {e}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <ScrollView horizontal={true}>
          <View style={styles.listItemContainer}>
            {listProducts &&
              listProducts.map((product, index) => (
                <View key={index.toString()}>
                  <ProductItem
                    name={product.name}
                    image={product.bigimage ? product.bigimage.public_url : "https://cdn.tgdd.vn/Products/Images/42/204088/asus-rog-phone-2-1-600x600.jpg"}
                    price={product.price_min}
                    navigation={navigation}
                    id_pd = {product._id}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
        {/*  */}
        <View style={styles.seeMoreContainer}>
          <Text style={styles.seeMoreText}>XEM THÊM 636 SẢN PHẨM</Text>
        </View>
        <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
        <ScrollView horizontal={true}>
          <View style={styles.listItemContainer}>
            {newest &&
              newest.map((product, index) => (
                <View key={index.toString()}>
                  <ProductItem
                    name={product.name}
                    image={product.bigimage ? product.bigimage.public_url : "https://cdn.tgdd.vn/Products/Images/42/204088/asus-rog-phone-2-1-600x600.jpg"}
                    price={product.price_min}
                    navigation={navigation}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
        <Text style={styles.sectionTitle}>Sản phẩm được đánh giá cao</Text>
        <ScrollView horizontal={true}>
          <View style={styles.listItemContainer}>
            {favorite &&
              favorite.map((product, index) => (
                <View key={index.toString()}>
                  <ProductItem
                    name={product.name}
                    image={product.bigimage ? product.bigimage.public_url : "https://cdn.tgdd.vn/Products/Images/42/204088/asus-rog-phone-2-1-600x600.jpg"}
                    price={product.price_min}
                    navigation={navigation}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
        <Text style={styles.sectionTitle}>Sản phẩm bán chạy nhất</Text>
        <ScrollView horizontal={true}>
          <View style={styles.listItemContainer}>
            {bestSeller &&
              bestSeller.map((product, index) => (
                <View key={index.toString()}>
                  <ProductItem
                    name={product.name}
                    image={product.bigimage ? product.bigimage.public_url : "https://cdn.tgdd.vn/Products/Images/42/204088/asus-rog-phone-2-1-600x600.jpg"}
                    price={product.price_min}
                    navigation={navigation}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
      </ScrollView>
    );
  }
}


const mapStateToProps = state => {
  return {
    listProducts: ProductsSelectors.getList(state),
    bestSeller: state.products.best,
    favorite: state.products.favorite,
    newest: state.products.new,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: params => {
      dispatch(ProductsActions.onGetList(params));
    },
    onGetBestSeller: () => {
      dispatch(ProductsActions.onGetBestSeller());
    },
    onGetFavorite: () => {
      dispatch(ProductsActions.onGetFavorite());
    },
    onGetNewest: () => {
      dispatch(ProductsActions.onGetNewest());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
