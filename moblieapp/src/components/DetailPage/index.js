import React, {Component} from 'react';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import {AsyncStorage} from 'react-native';
import {Rating} from 'react-native-ratings';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ProductsActions from '../../redux/actions/products';
import AuthorizationActions from '../../redux/actions/auth';
import ReviewActions from '../../redux/actions/review';
import UsersActions from '../../redux/actions/user';

import styles from './style';

import Header from '../HeaderComponent';
import {INITIAL_IMAGE} from '../../constants';
import numberWithCommas from '../../utils/formatPrice';
import tryConvert from '../../utils/changeMoney';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  ToastAndroid,
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
          flex: 1,
          marginTop: 10,

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

class ListReview extends Component {
  render() {
    const {item,onLiked} = this.props;
    return (
      <View style={styles.containerBoxReview}>
        <View style={styles.containerItemReview}>
          <View style={styles.boxImage}>
            <Image
              style={styles.imgUser}
              source={{
                uri:
                  item.user && item.user.image
                    ? item.user.image.public_url
                    : INITIAL_IMAGE,
              }}></Image>
          </View>
          <View style={styles.boxContentReview}>
            <Text style={styles.nameUser}>
              {item.user && item.user.firstname}{' '}
              {item.user && item.user.lastname}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <Rating
                type="star"
                ratingCount={5}
                readonly={true}
                startingValue={item.rating}
                style={{
                  alignItems: 'flex-start',
                  marginRight: 20,
                }}
                size={15}
                imageSize={15}
              />
              <Text>| {item.createdAt}</Text>
            </View>
            <Text style={styles.colorReview}>
              Màu sắc: {item.color.name_vn}
            </Text>
            <Text style={styles.contentReview}>{item.content}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={()=>onLiked(item._id, item.like)}
          style={styles.likeBox}>
          <FontAwesome name="thumbs-up" color="#6c757d" size={24} />
          <Text style={styles.likeItem}>
            {item.like.length > 0 ? item.like.length : 'Hữu ích?'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
class ProductItem extends Component {
  render() {
    const {product, navigation} = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.replace('Detail', {id: product._id});
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

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      viewMore: true,
      viewMoreReview: true,
      quantity: 'page: 0',
      recommend: -1,
    };
    const token = AsyncStorage.getItem('AUTH_USER').then(data => {});
    console.log('token: ', token);
    this.props.onGetProfile(null, token);
  }

  componentDidMount = async () => {
    const {
      route,
      onGetDetailProduct,
      onGetReviews,
      onGetRelate,
      onGetLike,
    } = this.props;
    onGetReviews({product: route.params.id});
    onGetDetailProduct(route.params.id);
    onGetRelate(route.params.id);
    onGetLike(route.params.id);
    AsyncStorage.getItem('AUTH_USER').then(data => {
      this.props.onGetProfile(null, data);
    });
  };

  componentWillReceiveProps(nextProps) {
    const {authInfo, onHistoryProduct} = this.props;
    if (nextProps.authInfo !== authInfo && nextProps.authInfo) {
      var history = [];
      nextProps.authInfo.history.map(item => history.push(item._id));
      const index = history.findIndex(
        product => product === nextProps.route.params.id,
      );
      if (index === -1) {
        history.push(nextProps.route.params.id);
        if (history.length > 4) {
          history.shift();
        }
        console.log(history);
        onHistoryProduct(nextProps.authInfo._id, {history});
      }
    }
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
          var index = this.findProductInCart(JSON.parse(datacart), data, color);
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
          ToastAndroid.showWithGravity(
            'Thêm vào giỏ hàng thành công',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
        })
        .catch(err => {
          alert(err);
        });
    } else {
      alert('Vui lòng chọn màu bạn muốn mua');
    }
  };
  onChangeViewMore = value => {
    this.setState({
      viewMore: !value,
    });
  };
  onLiked = (id, like) => {
    const {onUpdateReview, authInfo} = this.props;
    const {queryParams} = this.state;
    if (authInfo) {
      if (like.indexOf(authInfo._id) === -1) {
        like.push(authInfo._id);
      } else {
        like.splice(like.indexOf(authInfo._id), 1);
      }
      onUpdateReview(id, {like}, queryParams);
    } else {
      ToastAndroid.showWithGravity(
        'Bạn chưa đăng nhập',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };
  render() {
    const {
      product,
      group,
      navigation,
      route,
      review,
      total,
      count,
      relate,
      like,
      authInfo,
    } = this.props;
    const {color, viewMore, viewMoreReview, recommend} = this.state;
    const atomicHandler = (
      item: Object,
      entityMap: Object,
    ): ?React$Element<*> => {
      switch (item.data.type) {
        case 'image':
          return (
            <View key={item.key} style={{flex: 1}}>
              <Image
                style={{
                  width: 240,
                  height: 300,
                  borderColor: '#ccc',
                  borderWidth: 1,
                }}
                source={{uri: item.data.url}}
              />
            </View>
          );
        default:
          return null;
      }
    };
    return (
      <>
        <Header value="1" title="Trang Sản Phẩm" navigation={navigation} />
        {product && (
          <ScrollView style={styles.container}>
            <FlatList
              data={product.image}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={true}
              scrollEventThrottle={0}
              keyExtractor={(item, index) => item._id}
              horizontal={true}
              renderItem={({item, index}) => {
                return (
                  <FlatListImage item={item} index={index}></FlatListImage>
                );
              }}></FlatList>
            <View style={{marginTop: 10}}>
              <Text style={styles.name}>{product.name}</Text>
              <View style={{flexDirection: 'row', marginVertical: 3}}>
                <Rating
                  type="star"
                  ratingCount={5}
                  readonly={true}
                  startingValue={product.stars}
                  style={{alignItems: 'flex-start'}}
                  size={15}
                  imageSize={18}
                />
                <Text style={{fontSize: 16}}> | {total} đánh giá</Text>
              </View>

              <Text style={styles.price}>
                {product.price_min === product.price_max
                  ? product.price_min
                  : `${numberWithCommas(product.price_min)}-${numberWithCommas(
                      product.price_max,
                    )}`}{' '}
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
                    key={item._id}
                    style={
                      color === item._id
                        ? [styles.btnColor, styles.colorActive]
                        : styles.btnColor
                    }
                    onPress={() => this.setColor(item)}>
                    <Text style={styles.textColor}>{item.name_vn}</Text>
                    <Text style={styles.textColor}>
                      {numberWithCommas(item.price)}
                    </Text>
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
            <View style={styles.containerGroupNameButton}>
              <TouchableOpacity
                style={
                  recommend === -1
                    ? [styles.groupButton, styles.groupButtonActive]
                    : styles.groupButton
                }
                onPress={() => this.setState({recommend: -1})}>
                <Text style={styles.textGroupButton}>SP đã xem</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  recommend === 0
                    ? [styles.groupButton, styles.groupButtonActive]
                    : styles.groupButton
                }
                onPress={() => this.setState({recommend: 0})}>
                <Text style={styles.textGroupButton}>Có thể bạn thích</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  recommend === 1
                    ? [styles.groupButton, styles.groupButtonActive]
                    : styles.groupButton
                }
                onPress={() => this.setState({recommend: 1})}>
                <Text style={styles.textGroupButton}>SP tương tự</Text>
              </TouchableOpacity>
            </View>
            {recommend === -1 && authInfo && authInfo.history ? (
              <FlatList
                data={authInfo.history}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                scrollEventThrottle={10}
                keyExtractor={(item, index) => item._id}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <ProductItem
                      product={item}
                      index={index}
                      navigation={navigation}></ProductItem>
                  );
                }}></FlatList>
            ) : (
              <></>
            )}
            {recommend === 0 && like ? (
              <FlatList
                data={like}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                scrollEventThrottle={10}
                keyExtractor={(item, index) => item._id}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <ProductItem
                      product={item}
                      index={index}
                      navigation={navigation}></ProductItem>
                  );
                }}></FlatList>
            ) : (
              <></>
            )}
            {recommend === 1 && relate ? (
              <FlatList
                data={relate}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                scrollEventThrottle={10}
                keyExtractor={(product, index) => product._id}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <ProductItem
                      product={item}
                      index={index}
                      navigation={navigation}></ProductItem>
                  );
                }}></FlatList>
            ) : (
              <></>
            )}

            <Text style={styles.titleDescription}>MÔ TẢ VỀ SẢN PHẨM</Text>
            <ScrollView
              style={
                viewMore && viewMore === true
                  ? styles.viewMore
                  : styles.lessMore
              }>
              {getRNDraftJSBlocks({
                contentState: JSON.parse(product.description),
                atomicHandler,
              })}
            </ScrollView>
            <View>
              <TouchableOpacity
                style={styles.btnViewMore}
                onPress={() =>
                  this.setState({
                    viewMore: !viewMore,
                  })
                }>
                <Text style={styles.textViewMore}>
                  {viewMore && viewMore === true ? 'View More' : 'Less More'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleName}>Thông số kỹ thuật</Text>

            <FlatList
              data={product.specifications}
              keyExtractor={(item, index) => item._id}
              style={{marginBottom: 40}}
              renderItem={({item, index}) => {
                return <FlatListItem item={item} index={index}></FlatListItem>;
              }}></FlatList>
            <View style={styles.containerReviews}>
              <View style={styles.containerOverallReview}>
                <View style={styles.overallReview}>
                  <Text style={styles.titleOverall}>Overall</Text>
                  <Text style={styles.numberOverall}>{product.stars}</Text>
                  <Text style={styles.textOverall}>( {total} reviews)</Text>
                </View>
                <View style={styles.baseOnReview}>
                  <Text style={styles.titleBaseOn}>
                    Base on {total} Reviews
                  </Text>
                  <View style={styles.lineBaseReview}>
                    <Text>5 Star </Text>
                    <Rating
                      type="star"
                      ratingCount={5}
                      readonly={true}
                      startingValue={5}
                      style={{alignItems: 'flex-start'}}
                      size={15}
                      imageSize={15}
                    />
                    <Text>
                      {' '}
                      {count && count.find(i => i._id === 5)
                        ? count.find(i => i._id === 5).count
                        : 0}
                    </Text>
                  </View>
                  <View style={styles.lineBaseReview}>
                    <Text>4 Star </Text>
                    <Rating
                      type="star"
                      ratingCount={5}
                      readonly={true}
                      startingValue={4}
                      style={{alignItems: 'flex-start'}}
                      size={15}
                      imageSize={15}
                    />
                    <Text>
                      {' '}
                      {count && count.find(i => i._id === 4)
                        ? count.find(i => i._id === 4).count
                        : 0}
                    </Text>
                  </View>
                  <View style={styles.lineBaseReview}>
                    <Text>3 Star </Text>
                    <Rating
                      type="star"
                      ratingCount={5}
                      readonly={true}
                      startingValue={3}
                      style={{alignItems: 'flex-start'}}
                      size={15}
                      imageSize={15}
                    />
                    <Text>
                      {' '}
                      {count && count.find(i => i._id === 3)
                        ? count.find(i => i._id === 3).count
                        : 0}
                    </Text>
                  </View>
                  <View style={styles.lineBaseReview}>
                    <Text>2 Star </Text>
                    <Rating
                      type="star"
                      ratingCount={5}
                      readonly={true}
                      startingValue={2}
                      style={{alignItems: 'flex-start'}}
                      size={15}
                      imageSize={15}
                    />
                    <Text>
                      {' '}
                      {count && count.find(i => i._id === 2)
                        ? count.find(i => i._id === 2).count
                        : 0}
                    </Text>
                  </View>
                  <View style={styles.lineBaseReview}>
                    <Text>1 Star </Text>
                    <Rating
                      type="star"
                      ratingCount={5}
                      readonly={true}
                      startingValue={1}
                      style={{alignItems: 'flex-start'}}
                      size={15}
                      imageSize={15}
                    />
                    <Text>
                      {' '}
                      {count && count.find(i => i._id === 1)
                        ? count.find(i => i._id === 1).count
                        : 0}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={
                  viewMoreReview && review && review.length >= 3
                    ? styles.containerDetailReview
                    : styles.containerDetailReviewMore
                }>
                <FlatList
                  data={review}
                  keyExtractor={(item, index) => item._id}
                  style={{marginBottom: 0}}
                  renderItem={({item, index}) => {
                    return <ListReview item={item} index={index} onLiked={this.onLiked}></ListReview>;
                  }}></FlatList>
              </View>
              {review && review.length >= 3 ? (
                <View>
                  <TouchableOpacity
                    style={styles.btnViewMoreReview}
                    onPress={() =>
                      this.setState({
                        viewMoreReview: !viewMoreReview,
                      })
                    }>
                    <Text style={styles.textViewMore}>
                      {viewMoreReview && viewMoreReview === true
                        ? 'View More'
                        : 'Less More'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
            </View>
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
    authInfo: state.auth.detail,
    count: state.review.count,
    like: state.products.like,
    relate: state.products.relate,
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
    onGetLike: payload => {
      dispatch(ProductsActions.onGetLike(payload));
    },
    onGetRelate: payload => {
      dispatch(ProductsActions.onGetRelate(payload));
    },
    onGetReviews: params => {
      dispatch(ReviewActions.onGetList(params));
    },
    onClearStateReview: () => {
      dispatch(ReviewActions.onClearState());
    },
    onUpdateReview: (id, params) => {
      dispatch(ReviewActions.onUpdate(id, params));
    },
    onHistoryProduct: (id, params) => {
      dispatch(UsersActions.onUpdate({id, params}));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
