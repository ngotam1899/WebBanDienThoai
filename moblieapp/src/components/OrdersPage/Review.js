import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Rating} from 'react-native-ratings';

import {connect} from 'react-redux';
import {compose} from 'redux';

import ReviewActions from '../../redux/actions/review';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      message: '',
    };
  }
  componentWillMount(){
    const {onGetReview, params} = this.props;
    onGetReview(params);

  }
  componentDidUpdate(){
    const { review } = this.props;
    const {rating, message} = this.state;
    if(review && rating === 0 && message === ''){
      this.setState({
        rating: review ? review.rating : 0,
        message: review ? review.content : '',
      })
    }
  }
  onReview = () => {
    const {rating, message} = this.state;
    const {onAddReview, onUpdateReview, authInfo, product, review} = this.props;
    var data = {
      content: message,
      user: authInfo._id,
      product: product.product,
      rating,
      color: product.color._id,
    };
    console.log('Review', review)
    if (review) {
      onUpdateReview(review._id, data);
    } else {
      onAddReview(data);
    }
  };

  render() {
    const {product} = this.props;
    const {rating, message} = this.state;
    console.log(rating)
    return (
      <View>
        <Text style={styles.title}>ĐÁNH GIÁ SẢN PHẨM</Text>
        <View style={styles.infoProduct}>
          <Image
            style={styles.imgProduct}
            source={{
              uri: product.image
                ? product.image
                : 'http://www.pha.gov.pk/img/img-02.jpg',
            }}
          />
          <View style={styles.boxInfo}>
            <Text style={styles.nameProduct}>
              {product ? product.name : ''}
            </Text>
            <Text style={styles.colorProduct}>
              Màu sắc: {product ? product.color.name_vn : ''}
            </Text>
          </View>
        </View>
        <View style={styles.infoRating}>
          <Text style={styles.titleRating}>Your Rating: </Text>
          <Rating
            type="star"
            ratingCount={5}
            startingValue={rating}
            style={{alignItems: 'flex-start'}}
            imageSize={20}
            onFinishRating={rating => this.setState({rating})}
          />
        </View>
        <TextInput
          style={{borderWidth:1, borderColor: '#ccc',borderRadius: 5, marginTop: 10, paddingVertical:10, paddingHorizontal: 20}}
          multiline
          numberOfLines={4}
          onChangeText={value => this.setState({message:value})}
          value={message}></TextInput>
          <View style={styles.boxBtn}>
            <TouchableOpacity style={styles.btnSubmit} onPress={()=>this.onReview()}><Text style={styles.txtSubmit}>Đánh Giá</Text></TouchableOpacity>
          </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth.detail,
    review: state.review.detail,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddReview: data => {
      dispatch(ReviewActions.onCreate(data));
    },
    onGetReview: params => {
      dispatch(ReviewActions.onGetDetail(params));
    },
    onUpdateReview: (id, params) => {
      dispatch(ReviewActions.onUpdate(id, params));
    },
    onClearDetail: () => {
      dispatch(ReviewActions.onClearDetail());
    },
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Review);

const styles = StyleSheet.create({
  infoProduct: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    marginBottom: 30,
    marginTop: -30,
    width: 300,
  },
  imgProduct: {
    width: 100,
    height: 130,
  },
  nameProduct: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colorProduct: {
    fontSize: 16,
  },
  boxInfo: {
    marginLeft: 30,
  },
  infoRating: {
    flexDirection: 'row',
    marginTop: 20,
  },
  titleRating: {
    fontSize: 16,
    marginRight: 10,
  },
  boxBtn: {
    alignItems:'center',
    marginTop: 30
  },
  btnSubmit:{
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fac107',
    borderRadius: 5
  },
  txtSubmit:{
    fontSize: 14,
    fontWeight: 'bold',
  }
});
