import * as React from 'react';
import {Component} from 'react';
import {
  Text,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import ProductsActions from '../../redux/actions/products';
import OrdersActions from '../../redux/actions/order';
import AuthorizationActions from '../../redux/actions/auth';

import numberWithCommas from '../../utils/formatPrice';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {AsyncStorage} from 'react-native';
import order from '../../redux/reducers/order';

const {width} = Dimensions.get('window');

class OrderItem extends Component {
  render() {
    const item = this.props;
    return (
      <View style={styles.cartOrder}>
        <View style={styles.topCart}>
          <Text style={styles.orderCode}>Mã đơn hàng: {item.item._id}</Text>
        </View>
        {item.item.order_list.map((itemProduct, index) => (
          <View style={styles.bodyCart}>
            <Image
              style={styles.imgProduct}
              source={{
                uri: itemProduct ? itemProduct.image : '',
              }}></Image>
            <View style={styles.infoProduct}>
              <Text style={styles.nameProduct}>{itemProduct.name}</Text>
              <Text style={styles.colorProduct}>
                Màu sắc: {itemProduct.color.name_vn}
              </Text>
              <Text style={styles.quantityProduct}>
                Số lượng :{itemProduct.quantity}
              </Text>
            </View>
            <Text style={styles.totalPriceProduct}>
              {numberWithCommas(itemProduct.price)} VNĐ
            </Text>
          </View>
        ))}
        <View style={styles.bottomCart}>
          <View>
            <TouchableOpacity style={styles.btnDetail}>
              <Text style={styles.textBtnDetail}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.textTotal}>
              Tổng đơn: {numberWithCommas(item.item.total_price)} VNĐ
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
class PageView extends Component {
  render() {
    const {orderList} = this.props;
    return <View style={styles.container}>
      <FlatList
              data={orderList}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={true}
              scrollEventThrottle={10}
              keyExtractor={(item, index) => item._id}
              renderItem={({item, index}) => {
                return (
                  <OrderItem item={item} index={index}></OrderItem>
                );
              }}>

              </FlatList>
    </View>;
  }
}
class FirstRoute extends Component {
  render() {
    const {orderList} = this.props;
    return <PageView orderList={orderList}></PageView>;
  }
}
class SecondRoute extends Component {
  render() {
    const {orderList} = this.props;
    return <PageView orderList={orderList}></PageView>;
  }
}

class ThirdRoute extends Component {
  render() {
    const {orderList} = this.props;
    return <PageView orderList={orderList}></PageView>;
  }
}

class FourRoute extends Component {
  render() {
    const {orderList} = this.props;
    return <PageView orderList={orderList}></PageView>;
  }
}

class FiveRoute extends Component {
  render() {
    const {orderList} = this.props;
    return <PageView orderList={orderList}></PageView>;
  }
}

class SixRoute extends Component {
  render() {
    const {orderList} = this.props;
    return <PageView orderList={orderList}></PageView>;
  }
}

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {key: 'first', title: 'Tất cả'},
        {key: 'second', title: 'Chờ xác nhận'},
        {key: 'third', title: 'Chờ giao hàng'},
        {key: 'four', title: 'Đang giao'},
        {key: 'five', title: 'Đã giao'},
        {key: 'six', title: 'Đã hủy'},
      ],
      index: 0,
      keyword: '',
      filter: {
        limit: 12,
        page: 0,
      },
    };
  }

  setIndex = val => {
    this.setState({
      index: val,
    });
    const {onGetList} = this.props;
    var filters = '';
    const {filter} = this.state;
    const {authInfo} = this.props;
    if (val === 0) {
      filters = '';
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      console.log('tất cả');
      onGetList(params);
    } else if (val === 1) {
      filters = {
        confirmed: -1,
        status: 1,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      console.log('Chờ xác nhận');
      onGetList(params);
    } else if (val === 2) {
      filters = {
        confirmed: 1,
        status: -1,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params);
    } else if (val === 3) {
      filters = {
        confirmed: 1,
        status: 0,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      console.log('Đang giao');
      onGetList(params);
    } else if (val === 4) {
      filters = {
        confirmed: 1,
        status: 1,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      console.log('Đã giao');
      onGetList(params);
    } else if (val === 5) {
      filters = {
        active: -1,
      };
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      console.log('Đã hủy');
      onGetList(params);
    }
  };

  componentWillMount = async () => {
    const token = await AsyncStorage.getItem('AUTH_USER').then(data => {});
    const {onGetProfile} = this.props;
    onGetProfile(null, token);

    const {authInfo} = this.props;
    if (authInfo) {
      const {onGetList} = this.props;
      const {filter} = this.state;
      const filters = '';
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };

      onGetList(params);
    }
  };

  renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute orderList={this.props.orderList} />;
      case 'second':
        return <SecondRoute orderList={this.props.orderList} />;
      case 'third':
        return <ThirdRoute orderList={this.props.orderList} />;
      case 'four':
        return <FourRoute orderList={this.props.orderList} />;
      case 'five':
        return <FiveRoute orderList={this.props.orderList} />;
      case 'six':
        return <SixRoute orderList={this.props.orderList} />;
      default:
        return null;
    }
  };

  renderTabBar = props => <TabBar {...props} scrollEnabled={true} />;

  render() {
    const {index, routes} = this.state;
    return (
      <>
        <TabView
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          onIndexChange={index => this.setIndex(index)}
          initialLayout={{width: width}}
          renderTabBar={this.renderTabBar}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth.detail,
    orderList: state.order.list,
    orderItem: state.order.detail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: payload => {
      dispatch(OrdersActions.onGetList(payload));
    },
    onGetDetail: id => {
      dispatch(OrdersActions.onGetDetail(id));
    },
    onUpdate: (id, params) => {
      dispatch(OrdersActions.onUpdate(id, params));
    },
    onPurchaseAgain: order_list => {
      dispatch(ProductsActions.onPurchaseAgain(order_list));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Orders);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  cartOrder: {
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 5,
    width: width - 20,
    marginTop: 20,
  },
  topCart: {
    backgroundColor: '#1e88e5',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  orderCode: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  bodyCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  imgProduct: {
    width: 60,
    height: 75,
  },
  infoProduct: {
    paddingHorizontal: 18,
  },
  nameProduct: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  colorProduct: {
    marginBottom: 2,
  },
  quantityProduct: {
    marginBottom: 2,
  },
  totalPriceProduct: {
    fontWeight: 'bold',
  },
  bottomCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,.04)',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },
  btnDetail: {
    backgroundColor: '#1e7e34',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  textBtnDetail: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textTotal: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
  },
});
