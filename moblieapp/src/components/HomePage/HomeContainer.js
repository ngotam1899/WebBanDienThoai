import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Image, View, Text, ScrollView, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';

// @Components
import ProductItem from '../ProductItem';
// @Actions
import ProductsActions from '../../redux/actions/products';
import AuthorizationActions from '../../redux/actions/auth';
import {AsyncStorage} from 'react-native';
import numberWithCommas from '../../utils/formatPrice';

const section_banner = require('../../assets/section_banner.png');

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {movieName: '', releaseYear: ''};
  }
  componentDidMount = async () => {
    this.props.onGetList();
    this.props.onGetBestSeller();
    this.props.onGetFavorite();
    this.props.onGetNewest();
    const token = await AsyncStorage.getItem('AUTH_USER').then(data => {});
    const {onGetProfile} = this.props;
    onGetProfile(null, token);
  };
  render() {
    const {bestSeller, newest, favorite, navigation} = this.props;

    return (
      <View style={styles.screenContainer}>
        <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
        <View style={styles.bodyContainer}>
          <ScrollView>
            <View style={styles.sectionContainer}>
              <Image source={section_banner} style={styles.sectionImage} />
              <Text style={styles.sectionTitle}>Sản phẩm bán chạy nhất</Text>
              <View style={styles.listItemContainer}>
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
              </View>
              <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
              <View style={styles.listItemContainer}>
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
              </View>
              <Text style={styles.sectionTitle}>
                Sản phẩm được đánh giá cao
              </Text>
              <View style={styles.listItemContainer}>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
