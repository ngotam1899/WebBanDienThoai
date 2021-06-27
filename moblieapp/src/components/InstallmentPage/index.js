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
import {AsyncStorage} from 'react-native';
import {AccordionList} from 'accordion-collapse-react-native';
import {Picker} from '@react-native-community/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Table, Row, Rows} from 'react-native-table-component';
// @Actions
import ProductsActions from '../../redux/actions/products';
import InstallmentActions from '../../redux/actions/installment';
import AuthorizationActions from '../../redux/actions/auth';

// @Constance
import installmentRules from './installmentRules.json';
import installmentData from '../../utils/installment.json';
import installmentQuestion from './installmentQuestion.json';
import numberWithCommas from '../../utils/formatPrice';

const {width} = Dimensions.get('window');

class InstallmentPage extends Component {
  constructor(props) {
    super(props);
    const {route} = props;
    this.state = {
      color: route.params.color,
      percent: 30,
      loan: 0,
      detail: [],
      total_interest: 0,
      total: 0,
      prepay: 0,
      period: 0,
    };
  }

  componentDidMount = async () => {
    const {route, onGetDetailProduct, onGetProfile} = this.props;
    await AsyncStorage.getItem('AUTH_USER').then(data => {
      onGetProfile(null, data);
    });
    onGetDetailProduct(route.params.productID);
  };
  _head(item) {
    return (
      <View style={styles.headQuestion}>
        <Text style={{fontWeight: 'bold', flex: 0.9}}>{item.title}</Text>
        <FontAwesome
          name="chevron-down"
          size={14}
          color="#000"
          style={[
            styles.fontAwesome,
            {flex: 0.1, marginRight: -20, marginLeft: 5},
          ]}
        />
      </View>
    );
  }

  _body(item) {
    return (
      <View style={{padding: 10}}>
        <Text>{item.content}</Text>
      </View>
    );
  }
  setPercent = (itemValue, index) => {
    this.setState({
      percent: itemValue,
    });
  };
  setPeriod = (itemValue, index) => {
    console.log(itemValue);
    this.setState({
      period: itemValue,
    });
  };
  showAlert = () => {
    Alert.alert(
      'Sorry',
      'Mời bạn vui lòng chọn thời gian bạn muốn trả góp.',
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  showAlertLogin = () => {
    Alert.alert(
      'Sorry',
      'Mời bạn vui lòng đăng nhập trước khi thực hiện trả góp.',
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  onGetInstallment = () => {
    const {product} = this.props;
    var {color, percent, period, detail} = this.state;
    if (period === 0) return this.showAlert();
    const interest_rate = JSON.parse(period).percent;
    period = JSON.parse(period).month_sum;
    //var debt = Math.ceil(((product.product_price-prepay )*(1 + interest_rate*0.01))/1000)* 1000
    var detail = [];
    for (let i = 0; i < period; i++) {
      detail[i] = {
        month: i + 1,
        origin:
          Math.ceil(
            (product.colors.find(i => i._id === color).price *
              (1 - percent * 0.01)) /
              period /
              1000,
          ) * 1000,
        interest:
          Math.ceil(
            (product.colors.find(i => i._id === color).price *
              (1 - percent * 0.01) *
              interest_rate *
              0.01) /
              period /
              1000,
          ) * 1000,
        total:
          Math.ceil(
            (product.colors.find(i => i._id === color).price *
              (1 - percent * 0.01) *
              (1 + interest_rate * 0.01)) /
              period /
              1000,
          ) * 1000,
      };
    }
    this.setState({
      prepay:
        Math.ceil(
          (product.colors.find(i => i._id === color).price * percent * 0.01) /
            1000,
        ) * 1000,
      loan:
        Math.ceil(
          (product.colors.find(i => i._id === color).price *
            (1 - percent * 0.01)) /
            1000,
        ) * 1000,
      detail,
      total_interest:
        Math.ceil(
          (product.colors.find(i => i._id === color).price *
            (1 - percent * 0.01) *
            interest_rate *
            0.01) /
            1000,
        ) * 1000,
      total:
        Math.ceil(
          (product.colors.find(i => i._id === color).price *
            (1 - percent * 0.01) *
            (1 + interest_rate * 0.01)) /
            1000,
        ) * 1000,
    });
  };
  onCreateInstallment = () => {
    const {onCreate, product, authInfo} = this.props;
    var {color, period, prepay} = this.state;
    if (period === 0) return this.showAlert();
    if (authInfo) {
      const interest_rate = JSON.parse(period).percent;
      period = JSON.parse(period).month_sum;
      var data = {
        period,
        interest_rate,
        prepay,
        product: {
          _id: product._id,
          color,
          product_price: product.colors.find(i => i._id === color).price,
        },
        user: authInfo._id,
      };
      onCreate(data);
    } else {
      this.showAlertLogin();
    }
  };
  render() {
    const {authInfo, product} = this.props;
    const {
      color,
      percent,
      prepay,
      loan,
      period,
      detail,
      total_interest,
      total,
    } = this.state;
    const tableHead = ['Tháng', 'Tiền gốc', 'Tiền lãi', 'Tổng'];
    const tableData = detail.map((item, index) => {
      return [
        item.month,
        numberWithCommas(item.origin),
        numberWithCommas(item.interest),
        numberWithCommas(item.total),
      ];
    });
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerScroll}>
          <View style={styles.containerProduct}>
            <Text style={styles.title}> Sản phẩm </Text>
            {product && (
              <View style={styles.containerInfoProduct}>
                <View style={styles.boxImage}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: product.bigimage.public_url,
                    }}></Image>
                </View>
                <View style={styles.boxInfo}>
                  <Text style={styles.nameProduct}>{product.name}</Text>
                  <Text style={styles.nameColor}>
                    Màu {product.colors.find(i => i._id === color).name_vn}
                  </Text>
                  <Text style={styles.priceProduct}>
                    {product.colors.find(i => i._id === color).price} VND
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.containerInfoUser}>
            <Text style={styles.title}> Kế hoạch trả góp </Text>
            <View style={styles.installmentPlan}>
              <View style={styles.borderPicker}>
                <Picker
                  selectedValue={percent}
                  style={styles.pickerSort}
                  onValueChange={(itemValue, index) =>
                    this.setPercent(itemValue, index)
                  }>
                  <Picker.Item label="Trả trước 30%" value={30} />
                  <Picker.Item label="Trả trước 40%" value={40} />
                  <Picker.Item label="Trả trước 50%" value={50} />
                  <Picker.Item label="Trả trước 60%" value={60} />
                  <Picker.Item label="Trả trước 70%" value={70} />
                </Picker>
              </View>
              <View style={[styles.borderPicker, {marginLeft: 6}]}>
                <Picker
                  selectedValue={period}
                  style={styles.pickerLong}
                  onValueChange={(itemValue, index) =>
                    this.setPeriod(itemValue, index)
                  }>
                  <Picker.Item label="Thời gian trả" key={-1} value={0} />
                  {installmentData.installments.map((item, index) => {
                    let temp = `Trả trong ${item.month_sum} tháng`;
                    return (
                      <Picker.Item
                        label={temp}
                        key={index}
                        value={JSON.stringify(item)}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={styles.boxBtn}>
              <TouchableOpacity
                onPress={() => this.onGetInstallment()}
                style={styles.btnFilter}>
                <Text style={styles.textBtn}>Lọc kết quả</Text>
              </TouchableOpacity>
            </View>
            {detail.length > 0 && (
              <View style={styles.containerDetail}>
                <Text style={styles.title}> Chi tiết </Text>
                <View style={styles.containerPrepayLoan}>
                  <View style={styles.boxPrepayLoan}>
                    <FontAwesome
                      name="check-square"
                      size={24}
                      color="#00"
                      style={styles.fontAwesome}
                    />
                    <View>
                      <Text style={{fontWeight: 'bold'}}>Thanh toán trước</Text>
                      <Text>{prepay}</Text>
                    </View>
                  </View>
                  <View style={styles.boxPrepayLoan}>
                    <FontAwesome
                      name="money"
                      size={24}
                      color="#000"
                      style={styles.fontAwesome}
                    />
                    <View>
                      <Text style={{fontWeight: 'bold'}}>
                        Tổng số tiền cần vay
                      </Text>
                      <Text>{loan}</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Table borderStyle={{borderWidth: 2, borderColor: '#1e88e5'}}>
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
                <View style={styles.containerPrepayLoan}>
                  <View style={styles.boxPrepayLoan}>
                    <FontAwesome
                      name="level-up"
                      size={24}
                      color="#00"
                      style={styles.fontAwesome}
                    />
                    <View>
                      <Text style={{fontWeight: 'bold'}}>
                        Tổng lãi chênh lệch
                      </Text>
                      <Text>{total_interest}</Text>
                    </View>
                  </View>
                  <View style={styles.boxPrepayLoan}>
                    <FontAwesome
                      name="dollar"
                      size={24}
                      color="#000"
                      style={styles.fontAwesome}
                    />
                    <View>
                      <Text style={{fontWeight: 'bold'}}>
                        Tổng tiền phải trả
                      </Text>
                      <Text>{total}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.boxBtn}>
                  <TouchableOpacity
                    onPress={() => this.onCreateInstallment()}
                    style={[styles.btnFilter, {marginBottom: 10}]}>
                    <Text style={styles.textBtn}>Đăng ký chờ xét duyệt</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View>
              <Text style={styles.textSuggestion}>
                Số tiền chênh lệch thực tế từ 10.000đ -> 100.000đ một tháng, bạn
                vui lòng qua trực tiếp cửa hàng để được tư vấn chính xác
              </Text>
            </View>
          </View>
          <View style={styles.containerInfoUser}>
            <Text style={styles.title}> Installment details </Text>
            {authInfo && (
              <View style={styles.containerInfo}>
                <View style={styles.containerNameUser}>
                  <View
                    style={[styles.boxInfoUser, {flex: 0.5, marginRight: 10}]}>
                    <Text style={styles.titleInfo}>Frist Name*</Text>
                    <Text>{authInfo.firstname}</Text>
                  </View>
                  <View style={[styles.boxInfoUser, {flex: 0.5}]}>
                    <Text style={styles.titleInfo}>Last Name*</Text>
                    <Text>{authInfo.lastname}</Text>
                  </View>
                </View>
                <View style={{marginBottom: 10}}>
                  <View style={styles.boxInfoUser}>
                    <Text style={styles.titleInfo}>Address*</Text>
                    <Text>{authInfo.address}</Text>
                  </View>
                </View>
                <View style={{marginBottom: 10}}>
                  <View style={styles.boxInfoUser}>
                    <Text style={styles.titleInfo}>Email*</Text>
                    <Text>{authInfo.email}</Text>
                  </View>
                </View>
                <View>
                  <View style={styles.boxInfoUser}>
                    <Text style={styles.titleInfo}>Phone*</Text>
                    <Text>{authInfo.phonenumber}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.containerInfoUser}>
            <Text style={styles.title}> Thông tin đăng ký trả góp </Text>
            {installmentRules &&
              installmentRules.rules.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: index % 2 !== 0 ? '#F9F9F9' : 'white',
                    }}>
                    <Text style={styles.flatListItemName}>{item.title}</Text>
                    <Text style={styles.flatListItemValue}>{item.content}</Text>
                  </View>
                );
              })}
          </View>
          <View style={styles.containerInfoUser}>
            <Text style={styles.title}> Câu hỏi thường gặp</Text>
            {installmentQuestion && (
              <AccordionList
                list={installmentQuestion.questions}
                header={this._head}
                body={this._body}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    authInfo: state.auth.detail,
    product: state.products.detail,
    isLogin: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetDetailProduct: payload => {
      dispatch(ProductsActions.onGetDetail(payload));
    },
    onCreate: params => {
      dispatch(InstallmentActions.onCreate({params}));
    },
    onGetProfile: (data, headers) => {
      dispatch(AuthorizationActions.onGetProfile(data, headers));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InstallmentPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerScroll: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  containerProduct: {
    padding: 10,
    margin: 5,
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
    marginBottom: 20,
    borderRadius: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 7,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  containerInfoProduct: {
    flexDirection: 'row',
    paddingTop: 10,
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
  containerNameUser: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  boxInfoUser: {
    backgroundColor: '#F9F9F9',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 10,
    paddingLeft: 15,
    borderRadius: 10,
  },
  titleInfo: {
    color: '#555',
    marginBottom: 2,
  },
  contentInfo: {
    color: '#212529',
  },
  //
  flatListItemName: {
    color: 'black',
    padding: 5,
    fontSize: 13,
    flex: 0.4,
  },
  flatListItemValue: {
    color: 'black',
    padding: 5,
    fontSize: 12,
    flex: 0.6,
  },
  //
  headQuestion: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  //
  installmentPlan: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  borderPicker: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  pickerSort: {
    height: 50,
    width: 162,
  },
  pickerLong: {
    height: 50,
    width: 185,
  },
  boxBtn: {
    marginTop: 10,
    paddingBottom: 7,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  btnFilter: {
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
  },
  textBtn: {
    color: '#fff',
    fontSize: 18,
  },
  containerDetail: {
    paddingVertical: 10,
  },
  containerPrepayLoan: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  boxPrepayLoan: {
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
  },
  fontAwesome: {
    marginRight: 15,
  },
  textSuggestion: {
    paddingTop: 10,
    fontSize: 15,
    fontStyle: 'italic',
    color: '#888',
  },
});
