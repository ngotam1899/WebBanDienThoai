import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { compose } from 'redux';

import Review from './Review';

// Actions
import OrdersActions from '../../redux/actions/order';
import ReviewActions from '../../redux/actions/review';
// @Functions
import numberWithCommas from '../../utils/formatPrice';

const { width, height } = Dimensions.get('window');

class OrderDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      product: null,
      params: null,
    };
  }
  onClose() {
    const { onCloseModal } = this.props;
    onCloseModal();
  }
  onClose1 = () => {
    this.setState({
      modal: false,
    });
  };
  onOpenModal = () => {
    this.setState({
      modal: true,
    });
  };
  onReview = product => {
    const { onGetReview, authInfo } = this.props;
    const { params } = this.props;
    this.setState({
      product: product,
    });
    var params1 = {
      user: authInfo._id,
      product: product.product,
      color: product.color._id,
    };
    this.setState({
      params: {
        ...params,
        user: authInfo._id,
        product: product.product,
        color: product.color._id,
      },
      modal: true,
    });
    onGetReview(params1);
  };
  render() {
    const { orderItem } = this.props;
    const { modal, product, params } = this.state;

    return (
      <Modal visible={this.props.showModal}>
        <View style={styles.containerModal}>
          <View style={styles.backgroundModal}>
            <View style={styles.modalBox}>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => this.onClose()}>
                  <FontAwesome name="close" size={24} color="#969696" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1 }}>
                <View style={styles.containerInput}>
                  <Text style={styles.title}>Mã đơn hàng</Text>
                  <TextInput
                    style={styles.textInput}
                    value={orderItem ? orderItem._id : ''}></TextInput>
                </View>
                <View style={styles.containerInput}>
                  <Text style={styles.title}>Tổng hóa đơn: (VND)</Text>
                  <TextInput
                    style={styles.textInput}
                    value={
                      orderItem
                        ? numberWithCommas(orderItem.total_price).toString()
                        : ''
                    }></TextInput>
                </View>
                <View style={styles.containerInput}>
                  <Text style={styles.title}>Tình trạng đơn hàng</Text>
                  <TextInput
                    style={styles.textInput}
                    value={
                      orderItem && orderItem.status === true
                        ? 'Đã nhận được'
                        : 'Chưa nhận được'
                    }></TextInput>
                </View>
                <View style={styles.containerInput}>
                  <Text style={styles.title}>Phương thức thanh toán:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={
                      orderItem && orderItem.payment_method === 'local'
                        ? 'COD (Collect on Delivery)'
                        : 'PayPal'
                    }></TextInput>
                </View>
                {orderItem && orderItem.payment_method === 'local' ? (
                  <View style={styles.containerInput}>
                    <Text style={styles.title}>Trạng thái đơn hàng:</Text>
                    <TextInput
                      style={styles.textInput}
                      value={
                        orderItem && orderItem.confirmed === true
                          ? 'Đã xác nhận'
                          : 'Chưa xác nhận'
                      }></TextInput>
                  </View>
                ) : (
                  <View style={styles.containerInput}>
                    <Text style={styles.title}>Trạng thái đơn hàng:</Text>
                    <TextInput
                      style={styles.textInput}
                      value={
                        orderItem && orderItem.paid === true
                          ? 'Đã xác nhận'
                          : 'Chưa xác nhận'
                      }></TextInput>
                  </View>
                )}
                <View style={styles.containerInput}>
                  <Text style={styles.title}>Danh sách sản phẩm</Text>
                  {orderItem && orderItem.order_list ? (
                    orderItem.order_list.map((item, index) => (
                      <View key={index} style={styles.items}>
                        <Image
                          style={styles.imageItem}
                          source={{
                            uri:
                              item && item.image
                                ? item.image
                                : 'http://www.pha.gov.pk/img/img-02.jpg',
                          }}></Image>
                        <View>
                          <Text style={styles.nameItem}>
                            {item ? item.name : ''}
                          </Text>
                          <Text style={styles.colorItem}>
                            Màu sắc: {item ? item.color.name_vn : ''}
                          </Text>
                          <Text>
                            <Text>
                              {item ? numberWithCommas(item.price) : 0}
                            </Text>
                            <Text>VND x</Text>
                            <Text>{item ? item.quantity : ''}</Text>
                          </Text>
                        </View>
                        <View>
                          {orderItem && item && orderItem.status === 1 ? (
                            <TouchableOpacity
                              style={styles.btnReview}
                              onPress={() => this.onReview(item)}>
                              <Text style={{ fontWeight: 'bold' }}>Đánh giá</Text>
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )}
                        </View>
                      </View>
                    ))
                  ) : (
                    <></>
                  )}
                </View>
                <View style={styles.containerInput}>
                  <Text style={styles.title}>Số điện thoại người nhận</Text>
                  <TextInput
                    style={styles.textInput}
                    value={
                      orderItem ? orderItem.shipping_phonenumber.toString() : ''
                    }></TextInput>
                </View>
                <View style={styles.containerInput}>
                  <Text style={styles.title}>Địa chỉ người nhận</Text>
                  <TextInput
                    editable={false}
                    style={styles.textInput}
                    multiline={true}
                    value={
                      orderItem ? orderItem.shipping_address : ''
                    }></TextInput>
                </View>
                <View style={styles.containerInput}>
                  <Text style={styles.title}>Email người nhận</Text>
                  <TextInput
                    editable={false}
                    style={styles.textInput}
                    value={orderItem ? orderItem.email : ''}></TextInput>
                </View>
                <View style={styles.containerCancel}>
                  <TouchableOpacity
                    onPress={() => this.onClose()}
                    style={styles.btnCancel}>
                    <Text style={styles.txtCancel}>Đóng</Text>
                  </TouchableOpacity>
                </View>
                <Modal visible={this.state.modal}>
                  <View style={styles.containerModal}>
                    <View style={styles.backgroundModal}>
                      <View style={styles.modalBox}>
                        <View style={{ alignItems: 'flex-end' }}>
                          <TouchableOpacity
                            style={styles.btnClose}
                            onPress={() => this.onClose1()}>
                            <FontAwesome
                              name="close"
                              size={24}
                              color="#969696"
                            />
                          </TouchableOpacity>
                        </View>
                        {modal && product && (
                          <Review product={product} params={params} />
                        )}
                      </View>
                    </View>
                  </View>
                </Modal>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth.detail,
    review: state.review.detail,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetReview: params => {
      dispatch(ReviewActions.onGetDetail(params));
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(OrderDetailView);

const styles = StyleSheet.create({
  containerInput: {
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 5,
  },
  textInput: {
    paddingLeft: 10,
    color: '#212529',
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageItem: {
    width: 70,
    height: 90,
  },
  nameItem: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colorItem: {
    marginBottom: 5,
  },
  btnReview: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fac107',
    borderRadius: 5,
    justifyContent: 'center',
  },
  containerModal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundModal: {
    width: width,
    height: height,
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    height: height - 200,
    width: width - 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  btnClose: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  containerCancel: {
    flex: 0.08,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderColor: '#dee2e6',
    borderTopWidth: 1,
    marginTop: 30,
    paddingTop: 10,
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
});
