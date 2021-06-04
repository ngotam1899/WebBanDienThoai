import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import CheckBox from '@react-native-community/checkbox';
import {Table, Row, Rows} from 'react-native-table-component';
import {WebView} from 'react-native-webview';

import UsersActions from '../../redux/actions/user';
import AddressActions from '../../redux/actions/address';
import AuthorizationActions from '../../redux/actions/auth';
import ProductsActions from '../../redux/actions/products';
import OrdersActions from '../../redux/actions/order';
import numberWithCommas from '../../utils/formatPrice';
import {
  SHIPPING_EXPRESS,
  SHIPPING_STANDARD,
  API_ENDPOINT_AUTH,
} from '../../constants';
import tryConvert from '../../utils/changeMoney';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {AsyncStorage} from 'react-native';
import Modal from 'react-native-modal';

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    const {authInfo} = props;
    this.state = {
      order_list: [],
      order_info: [],
      shipToDifferentAddress: false,
      firstname: authInfo ? authInfo.firstname : '',
      lastname: authInfo ? authInfo.lastname : '',
      phonenumber: authInfo ? authInfo.phonenumber : '',
      addressInfo: authInfo && authInfo.address ? authInfo.address : '',
      address:
        authInfo && authInfo.address ? authInfo.address.split(', ')[0] : '',
      cityInfo: '',
      cityID: '',
      districtID: null,
      districtInfo: '',
      wardID: null,
      city: authInfo && authInfo.address ? authInfo.address.split(', ')[3] : '',
      districtName:
        authInfo && authInfo.address ? authInfo.address.split(', ')[2] : '',
      ward: authInfo && authInfo.address ? authInfo.address.split(', ')[1] : '',
      isModalVisible: false,
      total: 0,
      totalPrice: 0,
      totalWeight: 0,
      totalHeight: 0,
      totalWidth: 0,
      totalLength: 0,
      payment_method: 'local',
      order_comments: '',
      noteOrder: '',
      service_type_id: '1',
      showModal: false,
      status: 'Pending',
      shipPrice: 0,
    };
  }
  handleResponse = data => {
    if (data.title === 'success') {
      this.setState({showModal: false, status: 'Complete'});
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
    } else {
      return;
    }
  };
  // Hàm tính tổng số lượng và tổng tiền
  setTotalPrice(dataCart) {
    var total = 0;
    var totalPrice = 0;
    var totalWeight = 0;
    var totalHeight = 0;
    var totalWidth = 0;
    var totalLength = 0;
    for (var i = 0; i < dataCart.length; i++) {
      total = total + dataCart[i].quantity;
      totalPrice =
        totalPrice +
        dataCart[i].quantity *
          dataCart[i].product.colors.find(
            item => item._id === dataCart[i].color,
          ).price;
      totalWeight =
        totalWeight + dataCart[i].quantity * dataCart[i].product.weight;
      totalHeight =
        totalHeight + dataCart[i].quantity * dataCart[i].product.height;
      totalWidth =
        totalWidth < dataCart[i].product.width
          ? dataCart[i].product.width
          : totalWidth;
      totalLength =
        totalLength < dataCart[i].product.width
          ? dataCart[i].product.width
          : totalLength;
    }

    this.setState({
      total,
      totalPrice,
      totalWeight,
      totalHeight,
      totalWidth,
      totalLength,
    });
  }

  componentWillReceiveProps(props) {
    const {
      service_type_id,
      totalHeight,
      totalLength,
      totalWeight,
      totalWidth,
    } = this.state;
    const {
      authInfo,
      onGetListDistrict,
      listCity,
      listDistrict,
      onGetListCity,
    } = this.props;
    if (authInfo !== props.authInfo && authInfo === null) {
      onGetListCity();
    }
    if (authInfo && authInfo.address) {
      if (listCity !== props.listCity && props.listCity) {
        onGetListDistrict({
          province_id: props.listCity.find(
            obj => obj.ProvinceName === authInfo.address.split(', ')[3],
          ).ProvinceID,
        });
      }
      if (listDistrict !== props.listDistrict && listDistrict === null) {
        var districtID = props.listDistrict.find(
          obj => obj.DistrictName === authInfo.address.split(', ')[2],
        ).DistrictID;
        this.setState({
          districtID,
        });
        this.calculateShipping(
          service_type_id,
          districtID,
          totalHeight,
          totalLength,
          totalWeight,
          totalWidth,
        );
      }
    }
  }
  placeOrder() {
    const {onCreateAnOrder, authInfo, ship} = this.props;
    const {
      shipToDifferentAddress,
      order_comments,
      total,
      totalPrice,
      phonenumber,
      address,
      city,
      district,
      ward,
      payment_method,
      order_list,
    } = this.state;
    var data = {};

    //3. Truyền thông tin order vào body req
    if (shipToDifferentAddress === true) {
      data = {
        order_list,
        total_price: ship ? totalPrice + ship.total : totalPrice,
        total_quantity: total,
        shipping_phonenumber: phonenumber,
        email: authInfo.email,
        shipping_address: `${address}, ${ward}, ${district}, ${city}`,
        note: order_comments,
        status: -1,
        payment_method,
        is_paid: false,
      };
    } else {
      data = {
        order_list,
        total_price: ship ? totalPrice + ship.total : totalPrice,
        total_quantity: total,
        shipping_phonenumber: authInfo.phonenumber,
        email: authInfo.email,
        shipping_address: authInfo.address,
        payment_method,
        note: order_comments,
        status: -1,
        is_paid: false,
      };
    }
    onCreateAnOrder(data);
  }

  shipDifferentAddress = shipToDifferentAddress => {
    this.setState({shipToDifferentAddress});
    const {
      service_type_id,
      districtID,
      totalHeight,
      totalLength,
      totalWeight,
      totalWidth,
    } = this.state;
    this.setState({
      shipToDifferentAddress,
    });
    if (shipToDifferentAddress === false) {
      this.calculateShipping(
        service_type_id,
        districtID,
        totalHeight,
        totalLength,
        totalWeight,
        totalWidth,
      );
    }
  };

  componentDidMount = async () => {
    const {onGetListCity, onGetProfile} = this.props;
    AsyncStorage.getItem('cart')
      .then(cart => {
        if (cart !== null) {
          // We have data!!
          const cartData = JSON.parse(cart);
          var items = cartData.map(item => {
            var dataItem = {
              product: item.product._id,
              quantity: item.quantity,
              color: item.color,
            };
            return dataItem;
          });
          this.setState({order_list: items});
          var items2 = cartData.map(item => {
            var dataItem2 = {
              name: item.product.name,
              quantity: item.quantity,
              color: item.product.colors.find(i => i._id === item.color)
                .name_vn,
              price: item.product.colors.find(i => i._id === item.color).price,
            };
            return dataItem2;
          });
          this.setState({order_info: items2});
          this.setTotalPrice(cartData);
        }
      })
      .catch(err => {
        alert(err);
      });
    const token = await AsyncStorage.getItem('AUTH_USER');

    //Get profile
    await onGetProfile(null, token);

    //get list city
    await onGetListCity();

    const {cityID} = this.state;
    if (cityID) {
      await onGetListDistrict({province_id: cityID});
    }
  };

  calculateShipping(service_type_id, to, height, length, weight, width) {
    const {onCalculateShipping} = this.props;
    var data = {
      service_type_id: parseInt(service_type_id),
      insurance_value: 0,
      coupon: null,
      from_district_id: 1450,
      to_district_id: Math.round(to),
      height: Math.round(height),
      length: Math.round(length),
      weight: Math.round(weight),
      width: Math.round(width),
    };
    onCalculateShipping(data);
  }

  findLastCity() {
    const {listCity, authInfo} = this.props;
    var lastCity;
    if (authInfo.address && listCity) {
      lastCity = listCity.findIndex(
        obj => obj.ProvinceName === authInfo.address.split(', ')[3],
      );
    } else {
      lastCity = null;
    }
    this.setState({
      cityInfo: listCity[lastCity],
    });
  }

  setDistrict = (value, index) => {
    const {onGetListDistrict} = this.props;
    this.setState({
      cityInfo: value,
      city: value.ProvinceName,
      cityID: value.ProvinceID,
    });
    onGetListDistrict({province_id: value.ProvinceID});
  };

  setWard = (value, index) => {
    const {onGetListWard} = this.props;
    const {cityID} = this.state.cityID;
    const {
      service_type_id,
      totalHeight,
      totalLength,
      totalWeight,
      totalWidth,
    } = this.state;
    this.setState({
      districtInfo: value,
      district: value.DistrictName,
      districtID: value.DistrictID,
    });
    onGetListWard(cityID, value.DistrictID);
    this.calculateShipping(
      service_type_id,
      value.DistrictID,
      totalHeight,
      totalLength,
      totalWeight,
      totalWidth,
    );
  };

  setAddress = (value, index) => {
    this.setState({
      ward: value,
    });
  };

  changePaymentMethod = value => {
    this.setState({
      payment_method: value,
    });
  };

  changeShipping = service_type_id => {
    this.setState({
      service_type_id,
    });
    const {
      totalHeight,
      districtID,
      totalLength,
      totalWeight,
      totalWidth,
      d,
    } = this.state;
    this.calculateShipping(
      service_type_id,
      districtID,
      totalHeight,
      totalLength,
      totalWeight,
      totalWidth,
    );
  };
  render() {
    const {
      firstname,
      lastname,
      phonenumber,
      address,
      addressInfo,
      cityInfo,
      districtInfo,
      ward,
      order_comments,
      shipToDifferentAddress,
      service_type_id,
      total,
      totalPrice,
      payment_method,
      order_info,
    } = this.state;
    const {listCity, listDistrict, listWard, ship} = this.props;
    const tableHead = ['Product', 'Total'];
    const tableData = [
      ['Total of product x ' + total, numberWithCommas(totalPrice) + ' VND'],
      [
        'Shipping and handling',
        ship ? numberWithCommas(ship.total) + ' VNĐ' : '',
      ],
      [
        'Order total',
        ship ? numberWithCommas(totalPrice + ship.total) + ' VND' : '',
      ],
    ];
    const tableInfoHead = ['Tên sản phẩm', 'Giá bán', 'Số lượng', 'Tổng giá'];
    const tableInfoData = order_info.map((item, index) => {
      return [
        item.name,
        numberWithCommas(item.price) + ' VNĐ',
        'x' + item.quantity,
        numberWithCommas(item.quantity * item.price) + ' VNĐ',
      ];
    });
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Checkout Page</Text>
        <ScrollView>
          <Text style={styles.nameTitle}>Customer Info</Text>
          {shipToDifferentAddress ? (
            <View>
              {/* ---------------------- Ship custom address --------------------- */}
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 20,
                  },
                ]}>
                First Name
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your First Name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={firstname}
                  editable={true}
                  onChangeText={val => {
                    this.setState({
                      firstname: val,
                    });
                  }}
                />
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 20,
                  },
                ]}>
                Last Name
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Last Name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={lastname}
                  editable={true}
                  onChangeText={val => {
                    this.setState({
                      lastname: val,
                    });
                  }}
                />
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 20,
                  },
                ]}>
                Phone Number
              </Text>
              <View style={styles.action}>
                <FontAwesome name="phone" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Phone Number"
                  style={styles.textInput}
                  autoCapitalize="none"
                  editable={true}
                  onChangeText={val => {
                    this.setState({
                      phonenumber: val,
                    });
                  }}
                  value={phonenumber.toString()}
                />
              </View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 20,
                  },
                ]}>
                New Your Address
              </Text>
              <View style={styles.action}>
                <FontAwesome name="home" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Address"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={val =>
                    this.setState({
                      address: val,
                    })
                  }
                  value={address}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Picker
                  selectedValue={cityInfo}
                  style={{height: 50, width: 180}}
                  onValueChange={(itemValue, index) =>
                    this.setDistrict(itemValue, index)
                  }>
                  {listCity &&
                    listCity.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={item.ProvinceName}
                          value={item}
                        />
                      );
                    })}
                </Picker>
                <Picker
                  selectedValue={districtInfo}
                  style={{height: 50, width: 180}}
                  onValueChange={(itemValue, index) =>
                    this.setWard(itemValue, index)
                  }>
                  {listDistrict &&
                    listDistrict.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={item.DistrictName}
                          value={item}
                        />
                      );
                    })}
                </Picker>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Picker
                  selectedValue={ward}
                  style={{height: 50, width: 220}}
                  onValueChange={(itemValue, index) =>
                    this.setAddress(itemValue, index)
                  }>
                  {listWard &&
                    listWard.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={item.WardName}
                          value={item.WardName}
                        />
                      );
                    })}
                </Picker>
              </View>
            </View>
          ) : (
            <View>
              {/* ------------------------ Ship default address ---------------------- */}
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 20,
                  },
                ]}>
                First Name
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your First Name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={firstname}
                  editable={false}
                  onChangeText={val => {
                    this.setState({
                      firstname: val,
                    });
                  }}
                />
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 20,
                  },
                ]}>
                Last Name
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Last Name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={lastname}
                  editable={false}
                  onChangeText={val => {
                    this.setState({
                      lastname: val,
                    });
                  }}
                />
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 20,
                  },
                ]}>
                Phone Number
              </Text>
              <View style={styles.action}>
                <FontAwesome name="phone" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Phone Number"
                  style={styles.textInput}
                  autoCapitalize="none"
                  editable={false}
                  onChangeText={val => {
                    this.setState({
                      phonenumber: val,
                    });
                  }}
                  value={phonenumber.toString()}
                />
              </View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 20,
                  },
                ]}>
                Your Address
              </Text>
              <View style={styles.action}>
                <FontAwesome name="home" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Address"
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={addressInfo}
                  editable={false}
                />
              </View>
            </View>
          )}
          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Ship to a different address: </Text>
            <CheckBox
              value={shipToDifferentAddress}
              onValueChange={val => this.shipDifferentAddress(val)}
              style={styles.checkbox}
            />
          </View>
          {/* ----------------------------------------------------- */}

          {/* --------------------- Order note--------------------- */}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}>
            Order notes
          </Text>
          <View style={styles.action}>
            <FontAwesome name="sticky-note" color="#05375a" size={20} />
            <TextInput
              placeholder="Note about your order"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val =>
                this.setState({
                  order_comments: val,
                })
              }
              value={order_comments}
            />
          </View>
          {/* ----------------------------------------------------- */}

          {/* ----------- Chọn hình thức giao hàng -------------- */}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}>
            Đơn vị vận chuyển:
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{borderWidth: 1, borderRadius: 10, width: 140, height: 70}}
              source={{
                uri: 'https://static.ybox.vn/2020/6/1/1592759417126-ghn.png',
              }}></Image>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                marginLeft: 40,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              : Giao Hàng Nhanh
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontStyle: 'italic', width: 180}}>
              {service_type_id === '2' ? SHIPPING_EXPRESS : SHIPPING_STANDARD}
            </Text>
            <Text style={{fontSize: 16}}>
              {ship ? ': ' + numberWithCommas(ship.total) + ' VNĐ' : ''}
            </Text>
          </View>
          <View style={styles.shippingContainer}>
            <Text style={styles.labelShipping}>Express</Text>
            <CheckBox
              value={shipToDifferentAddress}
              onValueChange={() => this.changeShipping('2')}
              style={styles.checkbox}
              value={service_type_id === '2' ? true : false}
            />
            <Text style={[styles.labelShipping, {marginLeft: 10}]}>
              Standard
            </Text>
            <CheckBox
              value={shipToDifferentAddress}
              onValueChange={() => this.changeShipping('1')}
              style={styles.checkbox}
              value={service_type_id === '1' ? true : false}
            />
          </View>
          {/* ----------------------------------------------------- */}

          {/* ----------------- Thông tin đặt hàng ---------------- */}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
                marginBottom: 10,
              },
            ]}>
            Your Order:
          </Text>

          <Table borderStyle={{borderWidth: 2, borderColor: '#1e88e5'}}>
            <Row
              data={tableInfoHead}
              style={{height: 60, backgroundColor: '#f1f8ff'}}
              textStyle={{margin: 6, fontWeight: 'bold', fontSize: 16}}
            />
            <Rows data={tableInfoData} textStyle={{margin: 6}} />
          </Table>
          <View style={{height: 20}}></View>
          <Table borderStyle={{borderWidth: 2, borderColor: '#1e88e5'}}>
            <Row
              data={tableHead}
              style={{height: 40, backgroundColor: '#f1f8ff'}}
              textStyle={{margin: 6, fontWeight: 'bold', fontSize: 16}}
            />
            <Rows data={tableData} textStyle={{margin: 6}} />
          </Table>
          {/* ---------------------------------------------------- */}

          {/* ------------------- Shipping method ---------------- */}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
                marginBottom: 10,
              },
            ]}>
            Payment Methods:
          </Text>

          <View style={styles.shippingContainer}>
            <Text style={styles.labelShipping}>COD (Collect on Delivery)</Text>
            <CheckBox
              value={shipToDifferentAddress}
              onValueChange={() => this.changePaymentMethod('local')}
              style={styles.checkbox}
              value={payment_method === 'local' ? true : false}
            />
            <Text style={[styles.labelShipping, {marginLeft: 20}]}>PayPal</Text>
            <CheckBox
              value={shipToDifferentAddress}
              onValueChange={() => this.changePaymentMethod('paypal')}
              style={styles.checkbox}
              value={payment_method === 'paypal' ? true : false}
            />
          </View>

          <Modal
            visible={this.state.showModal}
            onRequestClose={() => this.setState({showModal: false})}>
            <WebView
              source={{uri: `${API_ENDPOINT_AUTH}/paypal?total=${2}`}}
              onNavigationStateChange={data => this.handleResponse(data)}
              injectedJavaScript={`document.f1.submit()`}
            />
          </Modal>
          {payment_method === 'paypal' ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  width: 300,
                  height: 50,
                  backgroundColor: '#ffc439',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={() => this.setState({showModal: true})}>
                <Image
                  style={{width: 100, height: 40}}
                  source={{
                    uri:
                      'https://lh3.googleusercontent.com/proxy/_Kv4UvVVjBMbWm4dUNu0rJlw8kQSM6TzrPp6iQdawytOLR_G1mriHqo7EAclgfHIn5qSAEco9HG0WO1sr7m50Od3ll9aHwRBBbNvNx4jLLgh2-vdE8cpm1LiPF4',
                  }}></Image>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}

          {/* ---------------------------------------------------- */}
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => this.placeOrder()}>
              <LinearGradient
                colors={['#1F7cdb', '#1e88e5']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  THANH TOÁN
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    listCity: state.address.city,
    listDistrict: state.address.district,
    listWard: state.address.ward,
    authInfo: state.auth.detail,
    ship: state.address.ship,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdate: (id, params) => {
      dispatch(UsersActions.onUpdate({id, params}));
    },
    onGetListCity: () => {
      dispatch(AddressActions.onGetCity());
    },
    onGetListDistrict: cityID => {
      dispatch(AddressActions.onGetDistrict(cityID));
    },
    onClearState: () => {
      dispatch(AddressActions.onClearState());
    },
    onGetListWard: (cityID, districtID) => {
      dispatch(AddressActions.onGetWard(cityID, districtID));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
    onCreateAnOrder: data => {
      dispatch(OrdersActions.onCreate(data));
    },
    onClearCart: () => {
      dispatch(ProductsActions.onClearCart());
    },
    onCalculateShipping: payload => {
      dispatch(AddressActions.onCalculateShipping(payload));
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CheckoutPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textTitle: {
    color: '#1e88e5',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  nameTitle: {
    fontSize: 20,
    marginVertical: 0,
    fontWeight: 'bold',
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },

  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 0,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmPassword: {
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  avatarUser: {
    height: 230,
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 30,
  },
  containerAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  shippingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 20,
  },
  labelShipping: {
    margin: 0,
    fontSize: 14,
  },
  checkbox: {
    alignSelf: 'flex-end',
    marginBottom: -5,
  },
  label: {
    fontSize: 18,
    color: '#05375a',
    fontStyle: 'italic',
  },
  //Modal change password
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
