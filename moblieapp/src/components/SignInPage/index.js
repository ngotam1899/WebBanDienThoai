import React, {Component} from 'react';
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
import {connect} from 'react-redux';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

// @Actions
import AuthorizationActions from '../../redux/actions/auth';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: [],
  webClientId:
    '66829264659-07n3208p778ai83rldvls9niq8vhahi0.apps.googleusercontent.com',
  offlineAccess: true,
});


const {width} = Dimensions.get('window');
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

  signInGoogle = async () => {
    const {onLoginGoogle} = this.props;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onLoginGoogle(userInfo.idToken);
      this.setState({
        userGoogleInfo: userInfo,
      });
      //navigation.navigate('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('e 1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('e 2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('e 3');
      } else {
        console.log(error.message);
      }
    }
  };
  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          const {onLoginFacebook, navigation} = this.props;
          this.setState({userFacebookInfo: result});
          onLoginFacebook(token);
          console.log('result:', result);
          console.log('Token: ', token);
          navigation.navigate('Home');
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  onClickLogin = () => {
    const {email, password, isValidPassword, isValidUser} = this.state.data;
    const {onLogin} = this.props;
    const data = {email, password};
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
        data: {...prevState.data, password: val, isValidPassword: false},
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
    const {loggedIn, navigation} = props;
    if (loggedIn && loggedIn === true) {
      navigation.navigate('Home');
    }
  }
  componentDidMount() {}

  toggleModal = () => {
    const {isModalVisible} = this.state;
    this.setState({
      isModalVisible: !isModalVisible,
    });
  };

  sendEmail() {
    const {email, isModalVisible} = this.state;
    console.log('email: ', email);
    const {onForgotPassword} = this.props;
    if (email) {
      onForgotPassword({email});
      this.setState({
        isModalVisible: !isModalVisible,
      });
    } else {
      toastError('Vui lòng nhập email để đặt lại mật khẩu');
    }
  }

  render() {
    const {navigation} = this.props;
    const {data, isModalVisible} = this.state;
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <StatusBar backgroundColor="#1e88e5" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={[{backgroundColor: '#fff'}, styles.footer]}>
            <Text style={[styles.text_footer, {color: '#05375a'}]}>Email</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={{color: '#05375a'}} size={20} />
              <TextInput
                placeholder="Your Username"
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
                  Username must be 4 characters long.
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
              Password
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color={{color: '#05375a'}} size={20} />
              <TextInput
                placeholder="Your Password"
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
                  Password must be 6 characters long.
                </Text>
              </Animatable.View>
            )}

            <TouchableOpacity onPress={this.toggleModal}>
              <Text style={{color: '#1877F2', marginTop: 15}}>
                Forgot password?
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
                  style={{height: 220, width:width - 40,borderRadius: 10, backgroundColor: '#fff', padding: 50}}>
                  <Text style={[styles.text_footer]}>
                    Nhập email để xác thực
                  </Text>
                  <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={20} />
                    <TextInput
                      placeholder="Your Email"
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
                  onLogoutFinished={() => this.setState({userFacebookInfo: {}})}
                />
              </View>
              <GoogleSigninButton
                style={{width: 200, height: 50}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signInGoogle}
              />
            </View>
            <View style={styles.button}>
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
                    Sign In
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
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
                  Sign Up
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
