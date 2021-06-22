import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Header from '../HeaderComponent';

import ProductsActions from '../../redux/actions/products';
import BrandActions from '../../redux/actions/brands';
import ProductPage from '../HomePage/ProductPage';

class AccProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
    };
  }
  componentDidMount() {
    const {onGetList, onGetListBrand, onAddParams, route} = this.props;
    const params = {
      limit: 100,
      page: 0,
      category: route.params.id,
    };
    onGetList(params);
    onGetListBrand({category: route.params.id});
    onAddParams(params);
  }

  onSearchProduct = () => {
    const {navigation} = this.props;
    const {key} = this.state;
    navigation.navigate('Search', {keyword: key});
  };

  render() {
    const {navigation, totalBrand, listProducts, route} = this.props;
    return (
      <ScrollView style={{backgroundColor: '#fff',flex:1}}>
        <View style={styles.headerContainer}>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => this.onSearchProduct()}>
              <FontAwesome name="search" size={24} color="#969696" />
            </TouchableOpacity>
            <TextInput
              placeholder="Bạn tìm gì hôm nay?"
              style={styles.inputText}
              onChangeText={val => {
                this.setState({
                  key: val,
                });
              }}></TextInput>
          </View>
          <Header value="2" navigation={navigation}></Header>
        </View>
        <ProductPage
          navigation={navigation}
          listProducts={listProducts}
          totalBrand={totalBrand}
          category={route.params.id}
        />
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    listProducts: state.products.list,
    listBrand: state.brands.list,
    totalBrand: state.brands.total,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetList: params => {
      dispatch(ProductsActions.onGetList(params));
    },
    onGetListBrand: params => {
      dispatch(BrandActions.onGetList(params));
    },
    onAddParams: params => {
      dispatch(ProductsActions.onAddParams(params));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccProductPage);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#1e88e5',
  },
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderRadius: 2,
  },
  inputText: {
    color: '#969696',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
    flex: 8,
  },
});
