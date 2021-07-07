import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {TabView, TabBar} from 'react-native-tab-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage} from 'react-native';

// @Actions
import InstallmentActions from '../../redux/actions/installment';
import AuthorizationActions from '../../redux/actions/auth';
// @Constance
import numberWithCommas from '../../utils/formatPrice';
import DetailModal from './DetailModal';

const {width} = Dimensions.get('window');
setStatus = (status, active) => {
  if (active === false) return 'Đã hủy';
  else {
    switch (status) {
      case -1:
        return 'Chờ duyệt';
      case 0:
        return 'Chưa hoàn tất';
      case 1:
        return 'Đã hoàn tất';
      case 2:
        return 'Qúa hạn';
      default:
        return 'Chờ duyệt';
    }
  }
};
class FirstRoute extends Component {
  setStatusModal(value, id) {
    const {openModal} = this.props;
    openModal(value, id);
  }
  onDeactiveInstallment(id) {
    const {onDeactive} = this.props;
    onDeactive(id);
  }
  render() {
    const {installmentList} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerScroll}>
          {installmentList &&
            installmentList.map((item, index) => {
              return (
                <View key={item._id} style={styles.containerInstallmentPage}>
                  <View style={styles.containerId}>
                    <Text style={styles.textId}>
                      Mã phiếu trả góp: {item._id}
                    </Text>
                  </View>
                  <View style={styles.containerInfo}>
                    <View style={styles.containerImage}>
                      <Image
                        style={styles.imgProduct}
                        source={{
                          uri: item.product._id.bigimage.public_url,
                        }}></Image>
                    </View>
                    <View style={styles.containerDetailInfo}>
                      <Text style={styles.name}>{item.product._id.name}</Text>
                      <Text style={styles.color}>
                        Màu sắc: {item.product.color.name_vn}
                      </Text>
                      <Text style={styles.price}>
                        Giá {numberWithCommas(item.product.product_price)} VND
                      </Text>
                    </View>
                    <View style={styles.containerStatus}>
                      <Text style={styles.status}>
                        | {setStatus(item.status, item.active)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.containerMoney}>
                    <View style={styles.containerDebtPaid}>
                      <View style={styles.containerDebt}>
                        <View style={styles.boxIcon}>
                          <View style={styles.icon}>
                            <FontAwesome
                              name="dollar"
                              size={20}
                              color="#000"
                              style={[styles.fontAwesome]}
                            />
                          </View>
                        </View>
                        <View style={styles.boxConten}>
                          <Text style={styles.nameDebtPaid}>Dư nợ</Text>
                          <Text style={styles.money}>
                            {item.debt ? numberWithCommas(item.debt) : 0} VND
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.containerDebtPaid}>
                      <View style={styles.containerPaid}>
                        <View style={styles.boxIcon}>
                          <View style={styles.icon}>
                            <FontAwesome
                              name="money"
                              size={20}
                              color="#000"
                              style={[styles.fontAwesome]}
                            />
                          </View>
                        </View>
                        <View style={styles.boxConten}>
                          <Text style={styles.nameDebtPaid}>Đã thanh toán</Text>
                          <Text style={styles.money}>
                            {item.paid ? numberWithCommas(item.paid) : 0} VND
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.bottomCart}>
                    <TouchableOpacity
                      style={styles.btnDetail}
                      onPress={() => this.setStatusModal(true, item._id)}>
                      <Text style={styles.textBtnDetail}>Chi tiết</Text>
                    </TouchableOpacity>
                    {setStatus(item.status, item.active) === 'Chờ duyệt' && (
                      <TouchableOpacity
                        style={[
                          styles.btnDetail,
                          {backgroundColor: 'red', marginLeft: 10},
                        ]}
                        onPress={() => this.onDeactiveInstallment(item._id)}>
                        <Text style={styles.textBtnDetail}>Hủy đơn</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
class UserInstallmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {key: 'first', title: 'Tất cả'},
        {key: 'second', title: 'Chờ duyệt'},
        {key: 'third', title: 'Chưa hoàn tất'},
        {key: 'four', title: 'Đã hoàn tất'},
        {key: 'five', title: 'Quá hạn'},
        {key: 'six', title: 'Đã hủy'},
      ],
      index: 0,
      filter: {
        limit: 12,
        page: 0,
      },
      params: {
        limit: 12,
        page: 0,
      },
      statusModal: false,
    };
  }
  onDeactivate = id => {
    const {t} = this.props;
    Alert.alert(
      'Sorry',
      'Bạn có muốn hủy phiếu trả góp này không?',
      [
        {
          text: 'Yes',
          onPress: () => this.onUpdateOrder(id, {active: false}),
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  onUpdateOrder = (id, data) => {
    const {onUpdate} = this.props;
    const {params} = this.state;
    onUpdate(id, data, params);
  };

  componentDidMount = async () => {
    const {onGetProfile, onGetList} = this.props;
    const token = await AsyncStorage.getItem('AUTH_USER').then(data => {
      onGetProfile(null, token);
    });
    const {authInfo} = this.props;
    if (authInfo) {
      const {filter} = this.state;
      const filters = '';
      var params = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      this.setState({params: params});
      onGetList(params);
    }
  };

  setIndex = val => {
    this.setState({
      index: val,
    });
    const {onGetList} = this.props;
    var filters = '';
    const {filter, params} = this.state;
    const {authInfo} = this.props;
    if (val === 0) {
      filters = '';
      var params1 = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      this.setState({
        params: {
          ...params,
          user: authInfo._id,
          active: '',
          status: '',
        },
      });
      onGetList(params1);
    } else if (val === 1) {
      filters = {
        status: -1,
        active: 1,
      };
      var params1 = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      this.setState({
        params: {
          ...params,
          user: authInfo._id,
          status: -1,
          active: 1,
        },
      });
      onGetList(params1);
    } else if (val === 2) {
      filters = {
        active: 1,
        status: 0,
      };
      var params1 = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      this.setState({
        params: {
          ...params,
          user: authInfo._id,
          status: 0,
          active: 1,
        },
      });
      onGetList(params1);
    } else if (val === 3) {
      filters = {
        active: 1,
        status: 1,
      };
      this.setState({
        params: {
          ...params,
          user: authInfo._id,
          status: 1,
          active: 1,
        },
      });
      var params1 = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params1);
    } else if (val === 4) {
      filters = {
        active: 1,
        status: 2,
      };
      this.setState({
        params: {
          ...params,
          user: authInfo._id,
          status: 2,
          active: 1,
        },
      });
      var params1 = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params1);
    } else if (val === 5) {
      filters = {
        active: -1,
      };
      this.setState({
        params: {
          ...params,
          user: authInfo._id,
          confirmed: '',
          status: '',
          active: -1,
        },
      });
      var params1 = {
        ...filter,
        ...filters,
        user: authInfo._id,
      };
      onGetList(params1);
    }
  };
  setModal = (value, id) => {
    this.setState({
      statusModal: value,
    });
    const {onGetDetail} = this.props;
    onGetDetail(id);
    console.log(id);
  };
  renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
      case 'second':
      case 'third':
      case 'four':
      case 'five':
      case 'six':
        return (
          <FirstRoute
            openModal={this.setModal}
            onDeactive={this.onDeactivate}
            installmentList={this.props.installmentList}
          />
        );
      default:
        return null;
    }
  };

  renderTabBar = props => <TabBar {...props} scrollEnabled={true} />;

  render() {
    const {index, routes, statusModal, params} = this.state;
    const {installmentItem} = this.props;
    return (
      <>
        <DetailModal
          openModal={this.setModal}
          params={params}
          status={statusModal}
          installmentItem={installmentItem}></DetailModal>
        <TabView
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          onIndexChange={index => this.setIndex(index)}
          initialLayout={{width: width}}
          renderTabBar={this.renderTabBar}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth.detail,
    installmentList: state.installment.list,
    installmentItem: state.installment.detail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: payload => {
      dispatch(InstallmentActions.onGetList(payload));
    },
    onGetDetail: id => {
      dispatch(InstallmentActions.onGetDetail(id));
    },
    onUpdate: (id, data, params) => {
      dispatch(InstallmentActions.onUpdate({id, data, params}));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInstallmentPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  containerScroll: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  containerInstallmentPage: {
    margin: 5,
    width: width - 34,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.54,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 25,
    borderRadius: 5,
  },
  containerId: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1e88e5',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textId: {
    color: '#fff',
    fontSize: 16,
  },
  containerInfo: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerImage: {
    flex: 0.2,
  },
  imgProduct: {
    height: 100,
    width: 80,
  },
  containerDetailInfo: {
    flex: 0.5,
    marginLeft: 20,
    marginTop: 10,
  },
  containerStatus: {
    flex: 0.3,
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  color: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  status: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',
  },
  containerMoney: {
    flexDirection: 'row',
    padding: 10,
  },
  containerDebtPaid: {
    flex: 0.5,
  },
  containerDebt: {
    flexDirection: 'row',
    backgroundColor: '#dc3545',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 5,
  },
  containerPaid: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 5,
  },
  money: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  nameDebtPaid: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  boxIcon: {
    flex: 0.2,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxConten: {
    flex: 0.8,
    marginLeft: 5,
  },
  bottomCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,.04)',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
  },
  btnDetail: {
    backgroundColor: '#1e7e34',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  textBtnDetail: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
