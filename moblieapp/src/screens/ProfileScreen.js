import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../components/HeaderComponent';
import AuthorizationActions from '../redux/actions/auth';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Component} from 'react';

const {width} = Dimensions.get('window');

const ProfileItem = ({icon, name}) => (
  <View style={styles.itemContainer}>
    <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
    <Text style={[styles.itemText, {marginLeft: icon ? 20 : 0}]}>{name}</Text>
    <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
  </View>
);

class ProfileScreen extends Component {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('AUTH_USER').then(data => {});
    const {onGetProfile} = this.props;
    onGetProfile(null, token);
  };

  setLogout = () => {
    const {onLogout, navigation} = this.props;
    localStorage.removeItem('AUTH_USER');
    onLogout();
    navigation.navigate('HomeScreen');
  };

  render() {
    const {navigation, userInfo} = this.props;
    return (
      <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" />
        {/*  */}
        <Header value="1" title="Cá nhân" navigation={navigation} />
        {/*  */}
        <View style={styles.bodyContainer}>
          {userInfo ? (
            <View style={styles.userContainer}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatarImg}
                  source={{
                    uri: userInfo.image.public_url,
                  }}
                />
              </View>
              <View style={styles.textContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UserDetail')}>
                  <Text style={styles.username}>
                    {userInfo.lastname} {userInfo.firstname}
                  </Text>
                </TouchableOpacity>
              </View>
              <FontAwesome name="angle-right" size={26} color="#1e88e5" />
            </View>
          ) : (
            <>
              <View style={styles.userContainer}>
                <View style={styles.avatarContainer}>
                  <MaterialIcons name="person" size={26} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.welcomeText}>
                    Chào mừng bạn đến với TelMe
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.authText}>Đăng nhập/Đăng ký</Text>
                  </TouchableOpacity>
                </View>
                <FontAwesome name="angle-right" size={26} color="#1e88e5" />
              </View>
            </>
          )}
          {/*  */}
          <View style={styles.divider} />
          <TouchableOpacity onPress={userInfo?() => navigation.navigate('Orders'):() => navigation.navigate('SignIn')}>
            <ProfileItem icon="format-list-bulleted" name="Quản lý đơn hàng" />
          </TouchableOpacity>
          <ProfileItem icon="cart-outline" name="Sản phẩm đã mua" />
          <ProfileItem icon="eye-outline" name="Sản phẩm đã xem" />
          <ProfileItem icon="heart-outline" name="Sản phẩm yêu thích" />
          <ProfileItem icon="bookmark-outline" name="Sản phẩm mua sau" />
          <ProfileItem icon="star-outline" name="Sản phẩm đánh giá" />
          {/*  */}
          <View style={styles.divider} />
          <ProfileItem name="Ưu đãi cho chủ thẻ ngân hàng" />
          <ProfileItem name="Cài đặt" />
          {/*  */}
          <View style={styles.divider} />
          <ProfileItem icon="headphones" name="Hỗ trợ" />
        </View>
        {userInfo ? (
          <View style={{alignItems: 'center'}}>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signOut}
                onPress={() => this.setLogout()}>
                <LinearGradient
                  colors={['#fa1111', '#c22f2f']}
                  style={styles.signOut}>
                  <Text
                    style={[
                      styles.textSignOut,
                      {
                        color: '#fff',
                      },
                    ]}>
                    ĐĂNG XUẤT
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth.detail,
    isLogin: state.auth.loggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
    onLogout: () => {
      dispatch(AuthorizationActions.onLogout());
    },
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfileScreen);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  //
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e88e5',
  },
  avatarImg: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  welcomeText: {
    color: '#828282',
  },
  username: {
    color: '#1e88e5',
    fontSize: 22,
    fontWeight: '600',
  },
  authText: {
    color: '#1e88e5',
    fontSize: 18,
    fontWeight: '500',
  },
  //
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  //
  divider: {
    height: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 0,
    width: width - 40,
    marginBottom: 20,
  },
  signOut: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSignOut: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
