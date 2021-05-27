import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import CheckBox from '@react-native-community/checkbox';
import {Table, Row, Rows} from 'react-native-table-component';

import UsersActions from '../../redux/actions/user';
import AddressActions from '../../redux/actions/address';
import AuthorizationActions from '../../redux/actions/auth';
import ProductsActions from '../../redux/actions/products';
import OrdersActions from '../../redux/actions/order';


import {connect} from 'react-redux';
import {compose} from 'redux';
import {AsyncStorage} from 'react-native';

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    const {authInfo} = props;
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
          this.setTotalPrice(cartData);
        }
      })
      .catch(err => {
        alert(err);
      });

    this.state = {
      order_list: [],
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
      payment_method: 'local',
      order_comments: '',
      noteOrder: '',
      shipping_type: 1,
    };
  }
  // Hàm tính tổng số lượng và tổng tiền
  setTotalPrice(dataCart) {
    var total = 0;
    var totalPrice = 0;
    for (var i = 0; i < dataCart.length; i++) {
      total = total + dataCart[i].quantity;
      totalPrice =
        totalPrice +
        dataCart[i].quantity *
          dataCart[i].product.colors.find(
            item => item._id === dataCart[i].color,
          ).price;
    }
    this.setState({
      total,
      totalPrice,
    });
  }
  placeOrder(){
    const {onCreateAnOrder, authInfo, onClearCart} = this.props;
    const {shipToDifferentAddress, order_comments, total, totalPrice, phonenumber, 
      address, city, district, ward, payment_method, order_list} = this.state;
    var data = {};
    //3. Truyền thông tin order vào body req
    
    if(shipToDifferentAddress === true){
      data = {
        order_list,
        total_price: totalPrice,
        total_quantity: total,
        shipping_phonenumber: phonenumber,
        email: authInfo.email,
        shipping_address: `${address}, ${ward}, ${district}, ${city}`,
        note: order_comments,
        status: -1,
        payment_method,
        is_paid: false
      }
    }
    else {
      data = {
        order_list,
        total_price: totalPrice,
        total_quantity: total,
        shipping_phonenumber: authInfo.phonenumber,
        email: authInfo.email,
        shipping_address: authInfo.address,
        payment_method,
        note: order_comments,
        status: -1,
        is_paid: false
      }
    }
    onCreateAnOrder(data);
    onClearCart();
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

  componentWillMount = async () => {
    const token = await AsyncStorage.getItem('AUTH_USER');
    const {onGetProfile, onGetListCity} = this.props;
    //Get profile
    await onGetProfile(null, token);

    //get list city
    await onGetListCity();

    const {onGetListDistrict} = this.props;
    const {cityID} = this.state;
    if (cityID) {
      await onGetListDistrict({province_id: cityID});
    }
  };

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
    this.setState({
      districtInfo: value,
      district: value.DistrictName,
      districtID: value.DistrictID,
    });
    onGetListWard(cityID, value.DistrictID);
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

  changeShipping = value => {
    this.setState({
      shipping_type: value,
    });
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
      shipping_type,
      total,
      totalPrice,
      payment_method
    } = this.state;
    const {listCity, listDistrict, listWard} = this.props;
    const tableHead = ['Product', 'Total'];

    const tableData = [
      ['Total of product x ' + total, totalPrice + ' VND'],
      ['Shipping and handling', 'Free shipping'],
      ['Order total', totalPrice + ' VND'],
    ];

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
              onValueChange={() => {
                this.setState({
                  shipToDifferentAddress: !shipToDifferentAddress,
                });
              }}
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
            Shipping types:
          </Text>
          <View style={styles.shippingContainer}>
            <Text style={styles.labelShipping}>Express</Text>
            <CheckBox
              value={shipToDifferentAddress}
              onValueChange={() => this.changeShipping(1)}
              style={styles.checkbox}
              value={shipping_type === 1 ? true : false}
            />
            <Text style={[styles.labelShipping, {marginLeft: 10}]}>
              Standard
            </Text>
            <CheckBox
              value={shipToDifferentAddress}
              onValueChange={() => this.changeShipping(2)}
              style={styles.checkbox}
              value={shipping_type === 2 ? true : false}
            />
          </View>
          {/* ----------------------------------------------------- */}

          {/* ----------------- Thông tin đặt hàng ---------------- */}
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
                marginBottom: 10
              },
            ]}>
            Your Order:
          </Text>

          <Table borderStyle={{borderWidth: 2, borderColor: '#1e88e5'}}>
            <Row
              data={tableHead}
              style={{height: 40, backgroundColor: '#f1f8ff'}}
              textStyle={{margin: 6, fontWeight: 'bold', fontSize:16}}
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
                marginBottom: 10
              },
            ]}>
            Shipping Methods:
          </Text>

          <View style={styles.shippingContainer}>
            <Text style={styles.labelShipping}>COD (Collect on Delivery)</Text>
            <CheckBox
              value={shipToDifferentAddress}
              onValueChange={() => this.changePaymentMethod('local')}
              style={styles.checkbox}
              value={payment_method === 'local' ? true : false}
            />
            <Text style={[styles.labelShipping, {marginLeft: 20}]}>
              PayPal
            </Text>
            <CheckBox
              value={shipToDifferentAddress}
              onValueChange={() => this.changePaymentMethod('paypal')}
              style={styles.checkbox}
              value={payment_method === 'paypal' ? true : false}
            />
          </View>
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
    }
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
    margin: 0,
    fontSize: 18,
    fontWeight: 'bold',
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
