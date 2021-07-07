import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';

// @Actions
import AdActions from '../../redux/actions/ad';

const {width} = Dimensions.get('window');

class PromotionPage extends Component {
  componentDidMount() {
    const {onGetList} = this.props;
    onGetList({active: 1});
  }
  setStatus = (startedAt, endedAt) => {
    var today = new Date();
    if (new Date(startedAt) > today) return 'Chưa diễn ra';
    else {
      if (new Date(endedAt) > today) return 'Đang diễn ra';
      else return 'Đã kết thúc';
    }
    return '';
  };
  render() {
    const {listAd} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerScroll}>
          {listAd &&
            listAd.map((ad, index) => {
              return (
                <View key={index} style={styles.containerPromotion}>
                  <Image
                    style={styles.imgPromotion}
                    source={{uri: ad.image.public_url}}></Image>
                  <View style={styles.containerNameAd}>
                    <Text style={styles.name}>{ad.name}</Text>
                    <Text style={styles.content}>{ad.content}</Text>
                  </View>
                  <View style={styles.containerNameAd}>
                    <Text style={styles.statusEvent}>
                      {this.setStatus(ad.startedAt, ad.endedAt)}
                    </Text>
                    <Text style={styles.dateEvent}>
                      ({new Date(ad.startedAt).toLocaleDateString('vn-VN')} -{' '}
                      {new Date(ad.endedAt).toLocaleDateString('vn-VN')})
                    </Text>
                  </View>
                  {/* <View style={styles.containerButton}>
                    <TouchableHighlight style={styles.btnDetail}>
                      <Text style={styles.textBtn}>Xem chi tiết</Text>
                    </TouchableHighlight>
                  </View> */}
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    listAd: state.ad.list,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetList: params => {
      dispatch(AdActions.onGetList(params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PromotionPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  containerScroll: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  containerPromotion: {
    padding: 10,
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
  imgPromotion: {
    width: width - 54,
    height: 150,
  },
  containerNameAd: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  statusEvent: {
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: 17,
  },
  dateEvent: {
    fontSize: 16,
  },
  containerButton: {
    marginTop: 12,
    marginBottom: 5,
  },
  btnDetail: {
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
  },
  textBtn: {
    color: '#fff',
    fontSize: 18,
  },
});
