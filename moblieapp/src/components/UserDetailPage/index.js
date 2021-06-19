import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-community/picker';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'react-native-image-picker';

import UsersActions from '../../redux/actions/user';
import AddressActions from '../../redux/actions/address';
import AuthorizationActions from '../../redux/actions/auth';
import Modal from 'react-native-modal';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {AsyncStorage} from 'react-native';

const {width} = Dimensions.get('window');

class UserDetailPage extends Component {
  constructor(props) {
    super(props);
    const {userInfo} = props;

    this.state = {
      firstname: userInfo ? userInfo.firstname : '',
      lastname: userInfo ? userInfo.lastname : '',
      phonenumber: userInfo ? userInfo.phonenumber : '',
      addressInfo: userInfo && userInfo.address ? userInfo.address : '',
      address:
        userInfo && userInfo.address ? userInfo.address.split(', ')[0] : '',
      email: userInfo ? userInfo.email : '',
      imageURL: userInfo ? userInfo.image.public_url : '',
      cityInfo: '',
      cityID: '',
      districtID: null,
      districtInfo: '',
      wardID: null,
      city: userInfo && userInfo.address ? userInfo.address.split(', ')[3] : '',
      districtName:
        userInfo && userInfo.address ? userInfo.address.split(', ')[2] : '',
      ward: userInfo && userInfo.address ? userInfo.address.split(', ')[1] : '',
      checkUpdateAddress: false,
      sourceImage: '',
      isModalVisible: false,
      isSecureTextEntryOld: true,
      isSecureTextEntryNew: true,
      isSecureTextEntryConfirm: true,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  toggleModal = () => {
    const {isModalVisible} = this.state;
    this.setState({
      isModalVisible: !isModalVisible,
    });
  };

  findLastCity() {
    const {listCity, userInfo} = this.props;
    var lastCity;
    if (userInfo.address && listCity) {
      lastCity = listCity.findIndex(
        obj => obj.ProvinceName === userInfo.address.split(', ')[3],
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

  onChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  updateProfile = () => {
    const {userInfo, onUpdate} = this.props;
    const {
      firstname,
      lastname,
      phonenumber,
      address,
      ward,
      city,
      district,
      email,
    } = this.state;
    /* Xử lý ảnh */
    const {selectedFile} = this.props;
    var formData = new FormData();
    formData.append('image', selectedFile);
    /* Xử lý ảnh */
    var data = {
      firstname,
      lastname,
      phonenumber,
      address: `${address}, ${ward}, ${district}, ${city}`,
      email,
      image: selectedFile ? formData : null,
    };
    onUpdate(userInfo._id, data);
  };

  updateProfile = () => {
    const {userInfo, onUpdate} = this.props;
    const {
      firstname,
      lastname,
      phonenumber,
      address,
      ward,
      city,
      district,
      email,
      image,
    } = this.state;
    /* Xử lý ảnh */
    var data = {
      firstname,
      lastname,
      phonenumber,
      address: `${address}, ${ward}, ${district}, ${city}`,
      email,
      image: image ? image : null,
    };
    onUpdate(userInfo._id, data);
  };

  // Hàm xử lý file - set hiển thị ảnh mới thêm vào state previewSource
  handleUpdata = photo => {
    const data = new FormData();
    data.append('image', photo);
    this.setState({
      image: data,
    });
  };

  _uploadImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'Image_Italy_',
      },
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error', response.error);
      } else {
        const uri = response.uri;
        const type = 'image/jpg';
        const name = response.fileName;
        const source = {uri, type, name};
        const source2 = {
          uri: 'data:image/jpg/png/jpeg;base64,' + response.base64,
        };
        this.setState({
          previewSource: source2,
        });
        this.handleUpdata(source);
      }
    });
  };

  updateSecureTextEntryOld = () => {
    const {isSecureTextEntryOld} = this.state;
    this.setState({
      isSecureTextEntryOld: !isSecureTextEntryOld,
    });
  };

  updateSecureTextEntryNew = () => {
    const {isSecureTextEntryNew} = this.state;
    this.setState({
      isSecureTextEntryNew: !isSecureTextEntryNew,
    });
  };

  updateSecureTextEntryConfirm = () => {
    const {isSecureTextEntryConfirm} = this.state;
    this.setState({
      isSecureTextEntryConfirm: !isSecureTextEntryConfirm,
    });
  };

  changePassword() {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    const {onChangePassword, t, userInfo} = this.props;
 
    if (newPassword === confirmPassword && newPassword !== null) {
      if (userInfo.password) {
        onChangePassword({
          password: oldPassword,
          new_password: newPassword,
        });
      } else {
        onChangePassword({
          new_password: newPassword,
        });
      }
    }
  }
  render() {
    const {
      firstname,
      lastname,
      phonenumber,
      address,
      email,
      imageURL,
      addressInfo,
      cityInfo,
      districtInfo,
      ward,
      checkUpdateAddress,
      previewSource,
      isModalVisible,
      isSecureTextEntryOld,
      isSecureTextEntryNew,
      isSecureTextEntryConfirm,
    } = this.state;
    const {listCity, listDistrict, listWard} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {previewSource ? (
            <Image style={styles.avatarUser} source={previewSource} />
          ) : (
            <Image
              style={styles.avatarUser}
              source={{
                uri: imageURL,
              }}
            />
          )}

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => this._uploadImage()}>
              <Text>Change Image</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              value={email}
              onChangeText={val => {
                this.setState({
                  email: val,
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
            First Name
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your First Name"
              style={styles.textInput}
              autoCapitalize="none"
              value={firstname}
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
            {checkUpdateAddress ? 'New Your Address' : 'Your Address'}
          </Text>
          {checkUpdateAddress ? (
            <View>
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
          )}
          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>Change address: </Text>
            <CheckBox
              value={checkUpdateAddress}
              onValueChange={() => {
                this.setState({
                  checkUpdateAddress: !checkUpdateAddress,
                });
              }}
              style={styles.checkbox}
            />
          </View>
          <TouchableOpacity onPress={this.toggleModal}>
            <Text style={{color: '#1877F2', marginTop: 15}}>
              Change password?
            </Text>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 500,
                  width: width - 40,
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      color: '#05375a',
                      marginTop: 35,
                    },
                  ]}>
                  Input your old password
                </Text>
                <View style={styles.action}>
                  <Feather name="lock" color={{color: '#05375a'}} size={20} />
                  <TextInput
                    placeholder="Your Old Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={isSecureTextEntryOld}
                    onChangeText={val => {
                      this.setState({
                        oldPassword: val,
                      });
                    }}
                    style={[
                      styles.textInput,
                      {
                        color: '#05375a',
                      },
                    ]}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={this.updateSecureTextEntryOld}>
                    {isSecureTextEntryOld ? (
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
                      color: '#05375a',
                      marginTop: 35,
                    },
                  ]}>
                  Input your new password
                </Text>
                <View style={styles.action}>
                  <Feather name="lock" color={{color: '#05375a'}} size={20} />
                  <TextInput
                    placeholder="Your New Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={isSecureTextEntryNew}
                    onChangeText={val => {
                      this.setState({
                        newPassword: val,
                      });
                    }}
                    style={[
                      styles.textInput,
                      {
                        color: '#05375a',
                      },
                    ]}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={this.updateSecureTextEntryNew}>
                    {isSecureTextEntryNew ? (
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
                      color: '#05375a',
                      marginTop: 35,
                    },
                  ]}>
                  Confirm your old password
                </Text>
                <View style={styles.action}>
                  <Feather name="lock" color={{color: '#05375a'}} size={20} />
                  <TextInput
                    placeholder="Your New Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={isSecureTextEntryConfirm}
                    onChangeText={val => {
                      this.setState({
                        confirmPassword: val,
                      });
                    }}
                    style={[
                      styles.textInput,
                      {
                        color: '#05375a',
                      },
                    ]}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={this.updateSecureTextEntryConfirm}>
                    {isSecureTextEntryConfirm ? (
                      <Feather name="eye-off" color="grey" size={20} />
                    ) : (
                      <Feather name="eye" color="grey" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.confirmPassword}
                      onPress={() => this.changePassword()}>
                      <LinearGradient
                        colors={['#1F7cdb', '#1e88e5']}
                        style={styles.confirmPassword}>
                        <Text
                          style={[
                            styles.textSign,
                            {
                              color: '#fff',
                            },
                          ]}>
                          Xác nhận
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.confirmPassword}
                      onPress={() => this.toggleModal()}>
                      <LinearGradient
                        colors={['#ccd', '#ccc']}
                        style={styles.confirmPassword}>
                        <Text
                          style={[
                            styles.textSign,
                            {
                              color: '#000',
                            },
                          ]}>
                          Thoát
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => this.updateProfile()}>
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
                  LƯU THÔNG TIN THAY ĐỔI
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
    userInfo: state.auth.detail,
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
    onClearState: () => {
      dispatch(AddressActions.onClearState());
    },
    onGetListDistrict: cityID => {
      dispatch(AddressActions.onGetDistrict(cityID));
    },
    onGetListWard: (cityID, districtID) => {
      dispatch(AddressActions.onGetWard(cityID, districtID));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
    onChangePassword: data => {
      dispatch(UsersActions.onChangePassword(data));
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserDetailPage);

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
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  checkbox: {
    alignSelf: 'flex-end',
  },
  label: {
    margin: 0,
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
