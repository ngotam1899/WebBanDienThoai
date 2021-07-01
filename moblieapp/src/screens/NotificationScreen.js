import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import Moment from 'react-moment';

import NotificationActions from '../redux/actions/notification';
import InstallmentActions from '../redux/actions/installment';
import OrdersActions from '../redux/actions/order';
import AuthorizationActions from '../redux/actions/auth';

import Header from '../components/HeaderComponent';
import DetailModal from '../components/UserInstallmentPage/DetailModal';
import OrderDetailView from '../components/OrdersPage/OrderDetailView';
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    const {userInfo} = props;
    this.state = {
      params: {
        limit: 20,
        page: 0,
        user: userInfo ? userInfo._id : '',
      },
      showModal: false,
      statusModal: false,
    };
  }
  setModal = (value, id) => {
    this.setState({
      statusModal: value,
    });
  };
  openModalOrder = () => {
    this.setState({
      showModal: true,
    });
  };
  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };
  selectButton(val, id, type, link) {
    const {
      onUpdate,
      onDelete,
      onGetDetailInstallment,
      onGetDetailOrder,
    } = this.props;
    const {params} = this.state;
    if (val === 0) {
      const data = {
        active: false,
      };
      switch (type) {
        case 0:
          onGetDetailOrder(link);
          this.openModalOrder();
          break;
        case 2:
          onGetDetailInstallment(link);
          this.setModal(true);
          break;
        default:
          return null;
      }
      onUpdate(id, data, params);
    } else {
      onDelete(id, params);
    }
  }

  componentDidMount = async () => {
    const {onGetProfile, userInfo} = this.props;
    await AsyncStorage.getItem('AUTH_USER').then(data => {
      onGetProfile(null, data);
    });
    if (userInfo) {
      var params = {
        limit: 20,
        page: 0,
        user: userInfo._id,
      };
      onGetList(params);
    }
  };
  componentDidUpdate(prevProps) {
    const {totalNotification, userInfo, onGetList} = this.props;

    if (userInfo !== prevProps.userInfo && userInfo) {
      var user = userInfo._id;
      onGetList({user, limit: 20, page: 0, active: 1});
    }
    if (totalNotification !== prevProps.totalNotification && userInfo) {
      var user = userInfo._id;
      onGetList({user, limit: 20, page: 0, active: 1});
    }
  }
  onReadAllNoti() {
    const {userInfo, onUpdateAll} = this.props;
    var id = userInfo._id;
    var params = {
      limit: 8,
      page: 0,
      user: id,
    };
    onUpdateAll(id, params);
  }
  onDeleteAllNoti() {
    const {userInfo, onDeleteAll} = this.props;
    var id = userInfo._id;
    var params = {
      limit: 8,
      page: 0,
      user: id,
    };
    onDeleteAll(id, params);
  }
  render() {
    const {
      navigation,
      listNotification,
      installmentItem,
      orderItem,
    } = this.props;
    const {statusModal, params, showModal} = this.state;
    return (
      <View style={styles.screenContainer}>
        <DetailModal
          openModal={this.setModal}
          params={params}
          status={statusModal}
          installmentItem={installmentItem}></DetailModal>
        <OrderDetailView
          orderItem={orderItem ? orderItem : null}
          onCloseModal={this.onCloseModal}
          showModal={showModal}></OrderDetailView>
        <StatusBar barStyle="light-content" />
        <Header value="1" title="Thông báo" navigation={navigation} />
        <View style={styles.bodyContainer}>
          <View style={styles.listContainer}>
            {listNotification && listNotification.length > 0 ? (
              <ScrollView>
                <FlatList
                  data={listNotification}
                  keyExtractor={item => item._id}
                  renderItem={({item}) => (
                    <View
                      style={
                        item.active === true
                          ? styles.itemContainerActive
                          : styles.itemContainer
                      }>
                      <View style={styles.itemTopContainer}>
                        <View style={{flex: 1}}>
                          <View style={styles.itemTypeContainer}>
                            <MaterialCommunityIcons
                              name="file-document"
                              color="#fff"
                              size={22}
                            />
                          </View>
                        </View>
                        <View style={styles.itemTopTextContainer}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Moment
                            element={Text}
                            format="DD/MM/YYYY - HH:mm:ss"
                            style={styles.itemDate}>
                            {item.createdAt}
                          </Moment>
                        </View>
                        <View style={{flex: 1}}>
                          <ModalDropdown
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={{width: 150, height: 86}}
                            dropdownTextStyle={{fontSize: 16, color: '#333'}}
                            onSelect={val =>
                              this.selectButton(
                                val,
                                item._id,
                                item.type,
                                item.link,
                              )
                            }
                            options={['Đã xem', 'Xóa']}>
                            <MaterialCommunityIcons
                              name="dots-vertical"
                              color="#000"
                              size={25}
                            />
                          </ModalDropdown>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.itemDetail}>{item.content}</Text>
                      </View>
                    </View>
                  )}
                />
                <View style={styles.groupBtn}>
                  <TouchableOpacity
                    style={styles.btnReadAll}
                    onPress={() => this.onReadAllNoti()}>
                    <Text style={{color: '#fff'}}>Đánh dấu đã đọc tất cả</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnDeleteAll}
                    onPress={() => this.onDeleteAllNoti()}>
                    <Text style={{color: '#fff'}}>Xóa tất cả</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : (
              <View style={styles.boxZeroNotifi}>
                <Text styles={styles.textZeroNotifi}>
                  Không có thông báo mới
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth.detail,
    listNotification: state.notification.list,
    totalNotification: state.notification._total,
    installmentItem: state.installment.detail,
    orderItem: state.order.detail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: payload => {
      dispatch(NotificationActions.onGetList(payload));
    },
    onGetDetailInstallment: id => {
      dispatch(InstallmentActions.onGetDetail(id));
    },
    onGetDetailOrder: id => {
      dispatch(OrdersActions.onGetDetail(id));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
    onUpdate: (id, data, params) => {
      dispatch(NotificationActions.onUpdate(id, data, params));
    },
    onUpdateAll: (data, params) => {
      dispatch(NotificationActions.onUpdateAll(data, params));
    },
    onDelete: (id, params) => {
      dispatch(NotificationActions.onDelete(id, params));
    },
    onDeleteAll: (id, params) => {
      dispatch(NotificationActions.onDeleteAll(id, params));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  //
  listContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e5e5',
  },
  //
  itemContainerActive: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
  itemTopContainer: {
    flexDirection: 'row',
  },
  itemTypeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc820a',
  },
  itemTypeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  itemTopTextContainer: {
    marginRight: 5,
    marginLeft: 4,
    flex: 8,
    marginLeft: 10,
  },
  itemName: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 15,
  },
  itemDate: {
    color: '#787878',
    fontSize: 13,
    marginTop: 5,
  },
  itemDetail: {
    color: '#787878',
    fontSize: 14,
    marginTop: 5,
  },
  boxZeroNotifi: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textZeroNotifi: {
    color: '#000',
    fontSize: 18,
  },
  //
  groupBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    paddingBottom: 40,
    marginBottom: 60,
  },
  btnReadAll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#1e88e5',
    backgroundColor: '#1e88e5',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
  },
  btnDeleteAll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: 'red',
    backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
  },
});
