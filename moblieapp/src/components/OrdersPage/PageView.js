import React, {Component} from 'react';

import {
  Text,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ProductsActions from '../../redux/actions/products';
import OrdersActions from '../../redux/actions/order';

import numberWithCommas from '../../utils/formatPrice';

import OrderDetailView from './OrderDetailView';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {AsyncStorage} from 'react-native';

const {width, height} = Dimensions.get('window');

class OrderItem extends Component {
  checkValid = (confirmed, active, status) => {
    if (confirmed === true && active === true && status === 1) {
      return true;
    }
    return false;
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

  sendData = val => {
    this.props.onShowModal(val);
  };
  onDeleteOrder = id => {
    const {onUpdateOrder, params} = this.props;
    onUpdateOrder(id, {active: false}, params);
  };

  setStatus = (confirmed, status, active) => {
    if (active === false) return 'Đã hủy';
    else {
      if (confirmed === false) return 'Chờ xác nhận';
      else {
        if (status === -1) return 'Chờ giao hàng';
        else if (status === 0) return 'Đang giao';
        else return 'Đã giao';
      }
    }
  };
  render() {
    const item = this.props;
    return (
      <View style={styles.cartOrder}>
        <View style={styles.topCart}>
          <Text style={styles.orderCode}>Mã đơn hàng: {item.item._id}</Text>
        </View>
        {item.item.order_list.map((itemProduct, index) => (
          <View key={itemProduct._id} style={styles.bodyCart}>
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
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.btnDetail}
              onPress={() => this.sendData(item.item._id)}>
              <Text style={styles.textBtnDetail}>Chi tiết</Text>
            </TouchableOpacity>
            {this.setStatus(
              item.item.confirmed,
              item.item.status,
              item.item.active,
            ) === 'Chờ xác nhận' && (
              <TouchableOpacity
                style={[
                  styles.btnDetail,
                  {backgroundColor: 'red', marginLeft: 10},
                ]}
                onPress={() => this.onDeleteOrder(item.item._id)}>
                <Text style={styles.textBtnDetail}>Hủy đơn</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <Text style={styles.textTotal}>
              Tổng: {numberWithCommas(item.item.total_price)} VNĐ
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

class PageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      showModal: false,
    };
  }
  onShowModal = val => {
    this.setState({
      showModal: true,
    });
    const {onGetDetail} = this.props;
    onGetDetail(val);
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  textInputChange = val => {
    this.setState({
      keyword: val,
    });
  };

  searchKeyWord = () => {
    const {onGetList, authInfoID} = this.props;
    const {filter} = {
      limit: 12,
      page: 0,
    };
    const {keyword} = this.state;
    if (keyword) {
      var params = {
        ...filter,
        keyword,
        page: 0,
        user: authInfoID,
      };
      onGetList(params);
    }
  };
  onReset() {
    const {params} = this.props;
    onGetList(params);
  }
  render() {
    const {
      orderList,
      orderItem,
      onAddProductToCart,
      onUpdateOrder,
      params,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <FontAwesome name="search" size={24} color="#969696" />
          <TextInput
            style={styles.inputText}
            placeholder="Nhập hóa đơn tìm kiếm..."
            placeholderTextColor="#666666"
            onChangeText={val => this.textInputChange(val)}
          />
          <TouchableOpacity
            style={styles.btnSearch}
            onPress={() => this.searchKeyWord()}>
            <Text style={styles.textSearch}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        {orderList && orderList.length != 0 ? (
          <View style={{justifyContent: 'center', paddingBottom: 70}}>
            <OrderDetailView
              orderItem={orderItem ? orderItem : null}
              onCloseModal={this.onCloseModal}
              showModal={this.state.showModal}></OrderDetailView>

            <FlatList
              data={orderList ? orderList : null}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={true}
              scrollEventThrottle={10}
              keyExtractor={(item, index) => item._id}
              renderItem={({item, index}) => {
                return (
                  <OrderItem
                    item={item}
                    key={index}
                    onUpdateOrder={onUpdateOrder}
                    params={params}
                    onAddProductToCart={onAddProductToCart}
                    onShowModal={this.onShowModal}></OrderItem>
                );
              }}></FlatList>
          </View>
        ) : (
          <Text style={styles.title}>Không có đơn hàng tại trạng thái này</Text>
        )}
      </View>
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
    onUpdateOrder: (id, data, params) => {
      dispatch(OrdersActions.onUpdate(id, data, params));
    },
    onPurchaseAgain: order_list => {
      dispatch(ProductsActions.onPurchaseAgain(order_list));
    },
    onAddProductToCart: () => {
      dispatch(ProductsActions.onAddProductToCart());
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PageView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 10,
    alignItems: 'center',
    paddingLeft: 12,
    borderRadius: 2,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  btnSearch: {
    flex: 2,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  textSearch: {
    color: '#fff',
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
    flex: 8,
  },
  cartOrder: {
    marginLeft: 3,
    width: width - 26,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
    borderRadius: 5,
    marginBottom: 25,
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
    flex: 0.2,
  },
  infoProduct: {
    paddingHorizontal: 18,
    flex: 0.4,
  },
  totalPriceProduct: {
    fontWeight: 'bold',
    flex: 0.4,
    textAlign: 'right',
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
  btnBuyAgain: {
    backgroundColor: '#fac107',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 10,
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
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },

  backgroundModal: {
    width: width,
    height: height,
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    height: 600,
    width: width - 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  btnClose: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
