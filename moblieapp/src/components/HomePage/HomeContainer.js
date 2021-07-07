import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {
  Image,
  View,
  Text,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {SliderBox} from 'react-native-image-slider-box';
import {AsyncStorage} from 'react-native';

// @Components
import ProductItem from '../ProductItem';
import ItemProduct from '../ContentLoader/ItemProduct';
import BannerLoader from '../ContentLoader/BannerLoader';
// @Actions
import ProductsActions from '../../redux/actions/products';
import AuthorizationActions from '../../redux/actions/auth';
import AdActions from '../../redux/actions/ad';
const section_banner = require('../../assets/section_banner.png');
import styles from './style';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    const {
      onGetFavorite,
      onGetBestSeller,
      onGetNewest,
      onGetList,
      onGetListAd,
      onGetProfile,
    } = this.props;
    const token = await AsyncStorage.getItem('AUTH_USER').then(data => {});
    onGetProfile(null, token);
    onGetList();
    onGetBestSeller();
    onGetFavorite();
    onGetNewest();
    onGetListAd({active: 1});
  };
  render() {
    const {bestSeller, newest, favorite, navigation, listAd} = this.props;
    const images =
      listAd &&
      listAd.map(item => {
        return item.image.public_url;
      });
    return (
      <View style={styles.screenContainer}>
        <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
        <View style={styles.bodyContainer}>
          <ScrollView>
            <View style={styles.sectionContainer}>
              {listAd ? (
                <SliderBox
                  style={styles.sectionImage}
                  images={images}
                  keyExtractor={(item, index) => index}
                />
              ) : (
                <BannerLoader></BannerLoader>
              )}
              <Text style={styles.sectionTitle}>Sản phẩm bán chạy nhất</Text>
              <View style={styles.listItemContainer}>
                {bestSeller ? (
                  <FlatList
                    data={bestSeller}
                    pagingEnabled={false}
                    showsHorizontalScrollIndicator={true}
                    scrollEventThrottle={10}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    renderItem={({item, index}) => {
                      return (
                        <ProductItem
                          name={item._id.name}
                          image={
                            item && item._id.bigimage
                              ? item._id.bigimage.public_url
                              : 'https://cdn.tgdd.vn/Products/Images/42/204088/asus-rog-phone-2-1-600x600.jpg'
                          }
                          price={item._id.price_min}
                          price_real={item._id.real_price_min}
                          stars={item._id.stars}
                          reviewCount={item._id.reviewCount}
                          navigation={navigation}
                          id={item._id._id}
                          index={index}
                          key={item._id._id}
                        />
                      );
                    }}></FlatList>
                ) : (
                  <ItemProduct></ItemProduct>
                )}
              </View>
              <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
              <View style={styles.listItemContainer}>
                {newest ? (
                  <FlatList
                    data={newest}
                    pagingEnabled={false}
                    showsHorizontalScrollIndicator={true}
                    scrollEventThrottle={10}
                    keyExtractor={(item, index) => item._id}
                    horizontal={true}
                    renderItem={({item, index}) => {
                      return (
                        <ProductItem
                          name={item.name}
                          image={
                            item.bigimage
                              ? item.bigimage.public_url
                              : 'https://cdn.tgdd.vn/Products/Images/42/204088/asus-rog-phone-2-1-600x600.jpg'
                          }
                          price={item.price_min}
                          price_real={item.real_price_min}
                          stars={item.stars}
                          reviewCount={item.reviewCount}
                          navigation={navigation}
                          id={item._id}
                          index={index}
                          key={item._id._id}
                        />
                      );
                    }}></FlatList>
                ) : (
                  <ItemProduct></ItemProduct>
                )}
              </View>
              <Text style={styles.sectionTitle}>
                Sản phẩm được đánh giá cao
              </Text>
              <View style={styles.listItemContainer}>
                {favorite ? (
                  <FlatList
                    data={favorite}
                    pagingEnabled={false}
                    showsHorizontalScrollIndicator={true}
                    scrollEventThrottle={10}
                    keyExtractor={(item, index) => item._id}
                    horizontal={true}
                    renderItem={({item, index}) => {
                      return (
                        <ProductItem
                          name={item.name}
                          image={
                            item.bigimage
                              ? item.bigimage.public_url
                              : 'https://cdn.tgdd.vn/Products/Images/42/204088/asus-rog-phone-2-1-600x600.jpg'
                          }
                          price={item.price_min}
                          price_real={item.real_price_min}
                          reviewCount={item.reviewCount}
                          stars={item.stars}
                          navigation={navigation}
                          id={item._id}
                          key={item._id._id}
                        />
                      );
                    }}></FlatList>
                ) : (
                  <ItemProduct></ItemProduct>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    bestSeller: state.products.best,
    favorite: state.products.favorite,
    newest: state.products.new,
    listAd: state.ad.list,
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
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
    onGetListAd: params => {
      dispatch(AdActions.onGetList(params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
