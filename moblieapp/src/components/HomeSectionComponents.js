import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  Link,
} from 'react-native';
import Button from 'react-native-button';

import {connect} from 'react-redux';
import {compose} from 'redux';

// @Actions
import ProductsSelectors from '../redux/selectors/products';
import ProductsActions from '../redux/actions/products';
import BrandActions from '../redux/actions/brands';
import ColorActions from '../redux/actions/color';

const {width} = Dimensions.get('window');

const section_banner = require('../assets/section_banner.png');
const item_image_1 = require('../assets/item_image_1.png');
const item_image_2 = require('../assets/item_image_2.png');
const item_image_3 = require('../assets/item_image_3.png');
const item_image_4 = require('../assets/item_image_4.png');

const ProductItem = ({image, name, price}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri: image}} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}>{price}</Text>
  </View>
);

class HomeSectionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {movieName: '', releaseYear: ''};
  }

  componentDidMount() {
    this.props.onGetList();
  }

  render() {
    const {listProducts} = this.props;
    return (
      <View style={styles.sectionContainer}>
        {/*  */}
        <Text style={styles.sectionTitle}>Điện thoại - Máy tính bảng</Text>
        {/*  */}
        <Image source={section_banner} style={styles.sectionImage} />
        {/*  */}
        <ScrollView horizontal={true}>
          <View style={styles.filterContainer}>
            {[
              'Tất cả',
              'Điện thoại SmartPhone',
              'Máy tính bảng',
              'Điện thoại',
            ].map((e, index) => (
              <View
                key={index.toString()}
                style={
                  index === 0
                    ? styles.filterActiveButtonContainer
                    : styles.filterInactiveButtonContainer
                }>
                <Text
                  style={
                    index === 0
                      ? styles.filterActiveText
                      : styles.filterInactiveText
                  }>
                  {e}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <ScrollView horizontal={true}>
          <View style={styles.listItemContainer}>
          {listProducts &&
              listProducts.map((product, index) =>  (
              <View key={index.toString()}>
                <ProductItem
                  name={product.name}
                      image={product.bigimage.public_url}
                      price={product.price_min}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        {/*  */}
        <View style={styles.seeMoreContainer}>
          <Text style={styles.seeMoreText}>XEM THÊM 636 SẢN PHẨM</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    listProducts: ProductsSelectors.getList(state),
    listColor: state.color.list,
    listBrand: state.brands.list,
    total: state.products.total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: params => {
      dispatch(ProductsActions.onGetList(params));
    },
    onGetListBrand: () => {
      dispatch(BrandActions.onGetList());
    },
    onGetListColor: () => {
      dispatch(ColorActions.onGetList());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeSectionComponent);

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    marginVertical: 12,
  },
  sectionImage: {
    width: width - 24,
    height: 130,
    borderRadius: 4,
  },
  //
  filterContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  filterActiveButtonContainer: {
    backgroundColor: '#242424',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  filterInactiveButtonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: '#5a5a5a',
    borderWidth: 1,
    marginRight: 10,
  },
  filterActiveText: {
    color: '#fff',
  },
  filterInactiveText: {
    color: '#5a5a5a',
  },
  //
  listItemContainer: {
    flexDirection: 'row',
  },
  itemContainer: {
    width: 100,
    marginRight: 12,
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemName: {
    fontSize: 14,
    color: '#484848',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2a2a2a',
  },
  //
  seeMoreContainer: {
    marginTop: 10,
    padding: 12,
    borderTopWidth: 0.6,
    borderTopColor: '#ededed',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#0e45b4',
  },
});
