import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

GoogleSignin.configure({
  scopes: [],
  webClientId:
    '520786358832-90jh3dlb0b1r4j7g9i6p4njehi5irf9g.apps.googleusercontent.com',
  offlineAccess: true,
  //forceConsentPrompt: true,
});

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
      },
      userInfo: {},
      userGoogleInfo: {},
      loaded: false,
    };
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('asdsad: ', userInfo);
      this.setState({
        userGoogleInfo: userInfo,
        loaded: true,
      });
      console.log(this.state.userGoogleInfo);
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
          this.setState({userInfo: result});
          console.log('result:', result);
          console.log('Token: ', token);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
            console.log('result-->', result);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  render() {
    const {navigation} = this.props;
    const {data} = this.state;
    console.log('data', data);
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
            <Text style={[styles.text_footer, {color: '#05375a'}]}>
              Username
            </Text>
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
                style={[
                  styles.textInput,
                  {
                    color: '#05375a',
                  },
                ]}
                autoCapitalize="none"
              />
              <TouchableOpacity>
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
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}

            <TouchableOpacity>
              <Text style={{color: '#009387', marginTop: 15}}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection:'row', margin: 20, marginTop: 30, alignItems:'center', justifyContent:'center'}}>
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
                  onLogoutFinished={() => this.setState({userInfo: {}})}
                />
              </View>

              {this.state.userInfo.name && (
                <Text style={{fontSize: 16, marginVertical: 16}}>
                  Logged in As {this.state.userInfo.name}
                </Text>
              )}
              <GoogleSigninButton
                style={{width: 200, height: 50}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn}
              />
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn}>
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
