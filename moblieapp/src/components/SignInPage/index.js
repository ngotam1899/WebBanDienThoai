import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { connect } from 'react-redux';

import * as Animatable from 'react-native-animatable';
import ProductsActions from '../../redux/actions/products';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

// @Actions
import AuthorizationActions from '../../redux/actions/auth';

const { width } = Dimensions.get('window');
class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
      },
      userFacebookInfo: {},
      userGoogleInfo: {},
      isModalVisible: false,
      email: '',
    };
  }


  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          const { onLoginFacebook, navigation } = this.props;
          this.setState({ userFacebookInfo: result });
          onLoginFacebook(token);
          navigation.navigate('HomeScreen');
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  onClickLogin = () => {
    const { email, password, isValidPassword, isValidUser } = this.state.data;
    const { onLogin } = this.props;
    const data = { email, password };
    if (data && isValidUser && isValidPassword) {
      onLogin(data);
    }
  };

  textInputChange = val => {
    const data = this.state.data;
    if (val.trim().length >= 4) {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          email: val,
          check_textInputChange: true,
          isValidUser: true,
        },
      }));
    } else {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          email: val,
          check_textInputChange: false,
          isValidUser: false,
        },
      }));
    }
  };
  handlePasswordChange = val => {
    const data = this.state.data;
    if (val.trim().length >= 6) {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          password: val,
          isValidPassword: true,
        },
      }));
    } else {
      this.setState(prevState => ({
        data: { ...prevState.data, password: val, isValidPassword: false },
      }));
    }
  };
  updateSecureTextEntry = () => {
    const data = this.state.data;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        secureTextEntry: !data.secureTextEntry,
      },
    }));
  };

  UNSAFE_componentWillReceiveProps(props) {
    const { loggedIn, navigation, isCheckout } = props;
    if (loggedIn && loggedIn === true && isCheckout === false) {
      navigation.navigate('HomeScreen');
    }
    else if (loggedIn && loggedIn === true && isCheckout === true) {
      navigation.navigate('Checkout');
    }
  }
  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '294595937480-1dmic1qhjg6smh36vi44sli4j5r9g6vi.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }
  signIn = async () => {
    const { onLoginGoogle } = this.props;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onLoginGoogle(userInfo.idToken)
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  toggleModal = () => {
    const { isModalVisible } = this.state;
    this.setState({
      isModalVisible: !isModalVisible,
    });
  };

  sendEmail() {
    const { email, isModalVisible } = this.state;
    const { onForgotPassword } = this.props;
    if (email) {
      onForgotPassword({ email });
      this.setState({
        isModalVisible: !isModalVisible,
      });
    } else {
      toastError('Vui lòng nhập email để đặt lại mật khẩu');
    }
  }

  render() {
    const { navigation, isCheckout } = this.props;
    const { data, isModalVisible } = this.state;
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>Xin chào đến với TellPhone!</Text>
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={[{ backgroundColor: '#fff' }, styles.footer]}>
            <Text style={[styles.text_footer, { color: '#05375a' }]}>
              Tên đăng nhập
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={{ color: '#05375a' }} size={20} />
              <TextInput
                placeholder="Tên đăng nhập của bạn"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: '#05375a',
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => this.textInputChange(val)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Tên đăng nhập cần có ít nhất 4 kí tự.
                </Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  color: '#05375a',
                  marginTop: 35,
                },
              ]}>
              Mật khẩu
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color={{ color: '#05375a' }} size={20} />
              <TextInput
                placeholder="Mật khẩu của bạn"
                placeholderTextColor="#666666"
                secureTextEntry={data.secureTextEntry ? true : false}
                onChangeText={val => this.handlePasswordChange(val)}
                style={[
                  styles.textInput,
                  {
                    color: '#05375a',
                  },
                ]}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={this.updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Mật khẩu có ít nhất 6 kí tự.
                </Text>
              </Animatable.View>
            )}

            <TouchableOpacity onPress={this.toggleModal}>
              <Text style={{ color: '#1877F2', marginTop: 15 }}>
                Quên mật khẩu?
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
                    height: 220,
                    width: width - 40,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    padding: 50,
                  }}>
                  <Text style={[styles.text_footer]}>
                    Nhập email để xác thực
                  </Text>
                  <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20} />
                    <TextInput
                      placeholder="Nhập email của bạn"
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={val => {
                        this.setState({
                          email: val,
                        });
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View style={styles.button}>
                      <TouchableOpacity
                        style={styles.btnExit}
                        onPress={() => this.sendEmail()}>
                        <LinearGradient
                          colors={['#1F7cdb', '#1e88e5']}
                          style={styles.btnExit}>
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
                        style={styles.btnExit}
                        onPress={() => this.toggleModal()}>
                        <LinearGradient
                          colors={['#ccd', '#ccc']}
                          style={styles.btnExit}>
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
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                margin: 20,
                marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 160, // whatever you want
                  height: 46, // whatever you want
                  borderRadius: 6,
                  marginRight: 15,
                  justifyContent: 'center', // center the button
                  backgroundColor: '#1877F2', // the same as the actual button
                  paddingHorizontal: 0,
                }}>
                <LoginButton
                  style={{
                    flex: 1, // fill the container
                    maxHeight: 30,
                  }}
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log('login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        this.getInfoFromToken(accessToken);
                      });
                    }
                  }}
                  onLogoutFinished={() => this.setState({ userFacebookInfo: {} })}
                />
              </View>
              <GoogleSigninButton
                style={{ width: 200, height: 50 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn}
              />
            </View>
            <View style={styles.button}>
              {isCheckout ? (
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={this.onClickLogin}>
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
                      Đăng nhập
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={this.onClickLogin}>
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
                      Đăng nhập
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
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
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    isCheckout: state.cart.isCheckout,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onForgotPassword: data => {
      dispatch(AuthorizationActions.onForgotPassword(data));
    },
    onLogin: data => {
      dispatch(AuthorizationActions.onLogin(data));
    },
    onLoginFacebook: token => {
      dispatch(AuthorizationActions.onLoginFacebook(token));
    },
    onLoginGoogle: token => {
      dispatch(AuthorizationActions.onLoginGoogle(token));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
    endCheckout: () => {
      dispatch(ProductsActions.endCheckout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);

export const COLOR_PINK = 'rgb(221, 97, 97)';
export const COLOR_PINK_LIGHT = 'rgb(234, 195, 176)';
export const COLOR_FACEBOOK = '#3b5998';
export const COLOR_PINK_MEDIUM = 'rgb(255,119,34)';

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
    flex: 3,
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
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },

  btnExit: {
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
