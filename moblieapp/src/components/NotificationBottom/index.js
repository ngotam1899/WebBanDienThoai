import React, {Component} from 'react';
import {Text, View, StyleSheet, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationActions from '../../redux/actions/notification';
import AuthorizationActions from '../../redux/actions/auth';
import {AsyncStorage} from 'react-native';
import io from 'socket.io-client';
import {API_ENDPOINT_AUTH} from '../../constants';

let socket = io(API_ENDPOINT_AUTH);

class NotificationBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsCount: 0,
      status: -1,
      order: '',
    };
  }

  componentDidMount = async () => {
    const {onGetProfile} = this.props;
    await AsyncStorage.getItem('AUTH_USER').then(data => {onGetProfile(null, data);});
  };

  componentDidUpdate(prevProps, prevState) {
    const {itemsCount, order, status} = this.state;
    const {onGetAllNotifications, userInfo, totalNotification} = this.props;
    if (userInfo !== prevProps.userInfo && userInfo) {
      var user = userInfo._id;
      onGetAllNotifications({user, limit: 5, page: 0, active: 1});
    }
    if (totalNotification !== prevProps.totalNotification) {
      this.setState({itemsCount: totalNotification});
    }
    if (userInfo) {
      socket.on(`${userInfo._id}`, res => {
        this.setState({
          itemsCount: itemsCount + 1,
          status: res.status,
          order: res.order,
        });
      });
    }
    if (itemsCount !== prevState.itemsCount && itemsCount > totalNotification) {
      switch (status) {
        case 0:
          ToastAndroid.showWithGravity(
            `Đơn hàng ${order} đã xuất kho vận chuyển`,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
          onGetAllNotifications({user: userInfo._id, limit: 5, page: 0});
          break;
        case 1:
          ToastAndroid.showWithGravity(
            `Đơn hàng ${order} đã vận chuyển thành công`,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
          onGetAllNotifications({user: userInfo._id, limit: 5, page: 0});
          break;
        default:
          onGetAllNotifications({user: userInfo._id, limit: 5, page: 0});
      }
    }
  }

  render() {
    const {color, userInfo} = this.props;
    const {itemsCount} = this.state;
    return (
      <View style={styles.container}>
        <MaterialIcons name="notifications" size={26} color={color} />
        {userInfo && itemsCount > 0 ? (
          <View style={styles.number}>
            <Text style={styles.textNumber}>{itemsCount}</Text>
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
    listNotification: state.notification.detail,
    totalNotification: state.notification._total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllNotifications: data => {
      dispatch(NotificationActions.onGetNewest(data));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBottom);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  number: {
    color: '#fff',
    borderRadius: 50,
    backgroundColor: 'red',
    color: '#fff',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -4,
    marginLeft: -4,
  },
  textNumber: {
    color: '#fff',
    fontSize: 12,
  },
});
