import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {TabView, TabBar} from 'react-native-tab-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Table, Row, Rows} from 'react-native-table-component';
import {AsyncStorage} from 'react-native';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
// @Actions
import InstallmentActions from '../../redux/actions/installment';
import AuthorizationActions from '../../redux/actions/auth';
// @Constance
import numberWithCommas from '../../utils/formatPrice';
import tryConvert from '../../utils/changeMoney';

import {API_ENDPOINT_AUTH} from '../../constants';

const {width, height} = Dimensions.get('window');

setStatusItem = status => {
  switch (status) {
    case -1:
      return 'Quá hạn';
    case 0:
      return 'Chưa tới hạn';
    case 1:
      return 'Hoàn tất';
    default:
      return 'Quá hạn';
  }
};
class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: 0,
      showModal: false,
      idDetail: '',
    };
  }
  paypalOrder(id) {
    const {onUpdate, params} = this.props;
    const {money} = this.state;
    onUpdate(id, {money: money}, params);
  }
  handleResponse = (data, id) => {
    if (data.title === 'success') {
      this.paypalOrder(id);
      this.setState({showModal: false, status: 'Complete'});
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
    } else {
      return;
    }
  };

  setStatusModal(value, id) {
    const {openModal} = this.props;
    openModal(value, id);
  }

  render() {
    const {status, installmentItem, params} = this.props;
    const {money} = this.state;
    const tableHead = ['Tháng', 'Ngày tới hạn', 'Tiền cần trả', 'Status'];
    const tableData =
      installmentItem &&
      installmentItem.detail.map((item, index) => {
        let a1 = item.status;
        let temp = setStatusItem(a1);
        return [
          item.month,
          new Date(item.due_date).toLocaleDateString('vn-VN'),
          numberWithCommas(item.payable),
          temp,
        ];
      });
    return (
      <View>
        <Modal style={styles.container} visible={status}>
          <View style={styles.containerModal}>
            {installmentItem && (
              <ScrollView style={styles.containerScrollView}>
                <View style={styles.containerContent}>
                  <Text style={styles.title}>Sản phẩm trả góp</Text>
                  <View style={styles.containerInfoProduct}>
                    <View style={styles.boxImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: installmentItem.product._id.bigimage.public_url,
                        }}></Image>
                    </View>
                    <View style={styles.boxInfo}>
                      <Text style={styles.nameProduct}>
                        {installmentItem.product._id.name}
                      </Text>
                      <Text style={styles.nameColor}>
                        Màu {installmentItem.product.color.name_vn}
                      </Text>
                      <Text style={styles.priceProduct}>
                        {numberWithCommas(
                          installmentItem.product.product_price,
                        )}{' '}
                        VND
                      </Text>
                    </View>
                  </View>
                  <View style={styles.breakLine}></View>
                  <Text style={styles.title}>Thông tin trả góp</Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={[styles.containerItem, {flex: 0.5}]}>
                      <View style={[styles.iconItem]}>
                        <FontAwesome5
                          name="money-check-alt"
                          size={26}
                          color="#000"
                        />
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.titleItem}>Trả trước (VND)</Text>
                        <Text style={styles.textItem}>
                          {numberWithCommas(installmentItem.prepay)}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.containerItem, {flex: 0.5}]}>
                      <View style={styles.iconItem}>
                        <FontAwesome5 name="coins" size={26} color="#000" />
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.titleItem}>Dư nợ (VND)</Text>
                        <Text style={styles.textItem}>
                          {numberWithCommas(installmentItem.debt)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={[styles.containerItem, {flex: 0.5}]}>
                      <View style={styles.iconItem}>
                        <FontAwesome5 name="percent" size={26} color="#000" />
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.titleItem}>Lãi suất (%/năm)</Text>
                        <Text style={styles.textItem}>
                          {installmentItem.interest_rate}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.containerItem, {flex: 0.5}]}>
                      <View style={styles.iconItem}>
                        <FontAwesome5
                          name="hand-holding-usd"
                          size={26}
                          color="#000"
                        />
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.titleItem}>Đã trả (VND)</Text>
                        <Text style={styles.textItem}>
                          {numberWithCommas(installmentItem.paid)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.containerItem}>
                    <View style={[styles.iconItem, {marginRight: -15}]}>
                      <FontAwesome5
                        name="business-time"
                        size={40}
                        color="#000"
                      />
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.titleItem}>Thời gian trả góp</Text>
                      <Text style={styles.textItem}>
                        Từ{' '}
                        {new Date(installmentItem.startedAt).toLocaleDateString(
                          'vn-VN',
                        )}{' '}
                        -{' '}
                        {new Date(installmentItem.endedAt).toLocaleDateString(
                          'vn-VN',
                        )}{' '}
                        ({installmentItem.period} tháng)
                      </Text>
                    </View>
                  </View>
                  <View style={styles.containerItem}>
                    <View style={[styles.iconItem, {marginRight: -15}]}>
                      <FontAwesome5 name="gifts" size={40} color="#000" />
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.titleItem}>Tình trạng trả góp</Text>
                      <Text style={styles.textItem}>
                        {setStatus(installmentItem.status)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.containerItem}>
                    <View style={[styles.iconItem, {marginRight: -15}]}>
                      <FontAwesome5
                        name="address-card"
                        size={40}
                        color="#000"
                      />
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.titleItem}>Nhân viên phụ trách</Text>
                      <Text style={styles.textItem}>
                        {installmentItem.staff.firstname}{' '}
                        {installmentItem.staff.lastname} (
                        {installmentItem.staff.phonenumber})
                      </Text>
                    </View>
                  </View>
                  <View style={styles.breakLine}></View>
                  <Text style={[styles.title, {marginBottom: 20}]}>
                    Lịch sử trả góp
                  </Text>
                  <View>
                    <Table
                      borderStyle={{
                        borderWidth: 2,
                        borderColor: '#1e88e5',
                      }}>
                      <Row
                        data={tableHead}
                        style={{height: 60, backgroundColor: '#f1f8ff'}}
                        textStyle={{
                          margin: 6,
                          fontWeight: 'bold',
                          fontSize: 16,
                          textAlign: 'center',
                        }}
                      />
                      <Rows data={tableData} textStyle={{margin: 6}} />
                    </Table>
                  </View>
                  <View style={styles.breakLine}></View>
                  <Text style={[styles.title, {marginTop: 10}]}>
                    Thanh toán trả góp online
                  </Text>
                  <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({showModal: false})}>
                    <WebView
                      source={{
                        uri: `${API_ENDPOINT_AUTH}/paypal?total=${parseFloat(
                          tryConvert(money, 'USD', false),
                        ).toFixed(2)}`,
                      }}
                      onNavigationStateChange={data =>
                        this.handleResponse(data, installmentItem._id)
                      }
                      injectedJavaScript={`document.f1.submit()`}
                    />
                  </Modal>
                  <View style={styles.containerPayment}>
                    <View>
                      <Text style={styles.titleItem}>
                        Nhập số tiền thanh toán (VND)
                      </Text>
                      <View style={styles.boxPayment}>
                        <TextInput
                          placeholder="5.000.000"
                          style={styles.inputText}
                          onChangeText={val => {
                            this.setState({
                              money: val,
                            });
                          }}></TextInput>
                        <TouchableOpacity
                          style={styles.boxBtn}
                          onPress={() => this.setState({showModal: true})}>
                          <Text style={styles.textBtn}>Xác nhận</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.containerCancel}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setStatusModal(false, installmentItem._id)
                    }
                    style={styles.btnCancel}>
                    <Text style={styles.txtCancel}>Close</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </Modal>
      </View>
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
    onUpdate: (id, data, params) => {
      dispatch(InstallmentActions.onUpdate({id, data, params}));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    margin: 0,
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    width: width - 30,
    height: height - 140,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  containerScrollView: {},
  containerContent: {
    flex: 0.92,
    paddingTop: 16,
    paddingHorizontal: 10,
  },
  containerCancel: {
    flex: 0.08,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderColor: '#dee2e6',
    borderTopWidth: 1,
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCancel: {
    width: 66,
    height: 36,
    backgroundColor: '#6c757d',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  txtCancel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ///////////////////
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 7,
    // borderBottomColor: '#ddd',
    // borderBottomWidth: 1,
  },
  breakLine: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    height: 1,
    marginBottom: 15,
    marginTop: 8,
  },
  containerInfoProduct: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
  },
  boxImage: {
    flex: 0.2,
  },
  image: {
    height: 100,
    width: 80,
  },
  boxInfo: {
    flex: 0.8,
    paddingHorizontal: 10,
    paddingLeft: 30,
  },
  nameProduct: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  nameColor: {
    fontSize: 17,
    fontWeight: 'normal',
    marginBottom: 3,
  },
  priceProduct: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  //
  containerInfoUser: {
    padding: 10,
    margin: 5,
    marginBottom: 20,
    width: width - 34,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
    borderRadius: 5,
  },
  containerInfo: {
    paddingVertical: 10,
  },

  /////////////
  containerItem: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  iconItem: {
    flex: 0.2,
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 5,
  },
  infoItem: {
    flex: 0.8,
    marginTop: 10,
  },
  titleItem: {
    fontSize: 16,
    color: '#888',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  textItem: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  lineBreak: {
    height: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  //
  containerPayment: {
    marginTop: 10,
  },
  boxPayment: {
    flexDirection: 'row',
  },
  inputText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 3,
    paddingLeft: 20,
    flex: 0.7,
  },
  boxBtn: {
    flex: 0.3,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e88e5',
    borderRadius: 5,
  },
  textBtn: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
