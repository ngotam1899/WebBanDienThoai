import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-community/picker';

import AuthorizationActions from '../../redux/actions/auth';
import AddressActions from '../../redux/actions/address';

import { connect } from 'react-redux';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      firstname: null,
      lastname: null,
      phonenumber: null,
      cityInfo: '',
      city: '',
      cityID: '',
      districtInfo: '',
      district: '',
      ward: '',
      password: null,
      confirmPassword: '',
      check_textInputChange: false,
      secureTextEntry: true,
      confirm_secureTextEntry: true,
    };
  }
  componentDidMount() {
    const { onGetListCity } = this.props;
    onGetListCity();
  }
  setDistrict = (value, index) => {
    const { onGetListDistrict } = this.props;
    this.setState({
      cityInfo: value,
      city: value.ProvinceName,
      cityID: value.ProvinceID,
    });
    onGetListDistrict({ province_id: value.ProvinceID });
  };

  setWard = (value, index) => {
    const { onGetListWard } = this.props;
    const { cityID } = this.state.cityID;
    this.setState({
      districtInfo: value,
      district: value.DistrictName,
    });
    onGetListWard(cityID, value.DistrictID);
  };

  setAddress = (value, index) => {
    this.setState({
      ward: value,
    });
  };

  textInputChange = val => {
    if (val.trim().length >= 4) {
      this.setState({
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      this.setState({
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  handlePasswordChange = val => {
    if (val.trim().length >= 6) {
      this.setState({
        password: val,
        isValidPassword: true,
      });
    } else {
      this.setState({
        password: val,
        isValidPassword: false,
      });
    }
  };

  updateSecureTextEntry = () => {
    const { secureTextEntry } = this.state;
    this.setState({
      secureTextEntry: !secureTextEntry,
    });
  };

  updateConfirmSecureTextEntry = () => {
    const confirm_secureTextEntry = this.state.confirm_secureTextEntry;
    this.setState({
      confirm_secureTextEntry: !confirm_secureTextEntry,
    });
  };
  onChangeFirstname = val => {
    this.setState({
      firstname: val,
    });
  };
  onChangeLastname = val => {
    this.setState({
      lastname: val,
    });
  };
  onRegister() {
    const {
      firstname,
      lastname,
      phonenumber,
      address,
      city,
      district,
      ward,
      email,
      password,
      confirmPassword,
    } = this.state;
    const { onRegister, t } = this.props;

    const data = {
      firstname,
      lastname,
      phonenumber,
      address: `${address}, ${ward}, ${district}, ${city}`,
      email,
      password,
    };

    if (password === confirmPassword) {
      onRegister(data);
    }
  }

  render() {
    const {
      check_textInputChange,
      cityInfo,
      districtInfo,
      ward,
      secureTextEntry,
      confirm_secureTextEntry,
    } = this.state;
    const { listCity, listDistrict, listWard, navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}> Đăng ký ngay tài khoản TellPhone!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text style={styles.text_footer}>Tên đăng nhập</Text>
            <View style={styles.action}>
              <FontAwesome name="envelope" color="#05375a" size={20} />
              <TextInput
                placeholder="Tên đăng nhập của bạn"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => this.textInputChange(val)}
              />
              {check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 20,
                },
              ]}>
              Tên
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Vui lòng nhập tên của bạn"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => this.onChangeFirstname(val)}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 20,
                },
              ]}>
              Họ về tên đệm
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Vui lòng nhập họ của bạn"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => this.onChangeLastname(val)}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 20,
                },
              ]}>
              Số điện thoại
            </Text>
            <View style={styles.action}>
              <FontAwesome name="phone" color="#05375a" size={20} />
              <TextInput
                placeholder="Số điện thoại của bạn"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={val => {
                  this.setState({
                    phonenumber: val,
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
              Địa chỉ
            </Text>
            <View style={styles.action}>
              <FontAwesome name="home" color="#05375a" size={20} />
              <TextInput
                placeholder="Địa chỉ nhà của bạn"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val =>
                  this.setState({
                    address: val,
                  })
                }
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Picker
                selectedValue={cityInfo}
                style={{ height: 50, width: 180 }}
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
                style={{ height: 50, width: 180 }}
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
            <View style={{ flexDirection: 'row' }}>
              <Picker
                selectedValue={ward}
                style={{ height: 50, width: 220 }}
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
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 20,
                },
              ]}>
              Mật khẩu
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Vui lòng nhập mật khẩu"
                secureTextEntry={secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => this.handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={this.updateSecureTextEntry}>
                {secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 20,
                },
              ]}>
              Xác nhận mật khẩu
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Vui lòng nhập lại mậu khẩu"
                secureTextEntry={confirm_secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val =>
                  this.setState({
                    confirmPassword: val,
                  })
                }
              />
              <TouchableOpacity
                onPress={() => this.updateConfirmSecureTextEntry()}>
                {secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                Bằng cách đăng ký, bạn đồng ý với
              </Text>
              <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
                {' '}
                Điều khoản dịch vụ
              </Text>
              <Text style={styles.color_textPrivate}> and</Text>
              <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
                {' '}
                Chính sách bảo mật
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => this.onRegister()}>
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
                    Đăng ký
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[
                  styles.signIn,
                  {
                    borderColor: '#1e88e5',
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#1e88e5',
                    },
                  ]}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    listCity: state.address.city,
    listDistrict: state.address.district,
    listWard: state.address.ward,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: data => {
      dispatch(AuthorizationActions.onRegister(data));
    },
    onGetListCity: () => {
      dispatch(AddressActions.onGetCity());
    },
    onGetListDistrict: cityID => {
      dispatch(AddressActions.onGetDistrict(cityID));
    },
    onGetListWard: (cityID, districtID) => {
      dispatch(AddressActions.onGetWard(cityID, districtID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e88e5',
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
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
