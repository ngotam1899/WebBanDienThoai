import React, {Component} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {View, TextInput, Dimensions, TouchableOpacity} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

import CategoryActions from '../../redux/actions/categories';
import ProductsActions from '../../redux/actions/products';
import BrandActions from '../../redux/actions/brands';

import styles from './style';
import Header from '../HeaderComponent';
import HomeContainer from './HomeContainer';
import ProductPage from './ProductPage';
import AccessoriesPage from '../AccessoriesPage';
import PromotionPage from '../PromotionPage';
const {width, height} = Dimensions.get('window');

class FirstRoute extends Component {
  render() {
    const {navigation} = this.props;
    return <HomeContainer navigation={navigation}></HomeContainer>;
  }
}
class SecondRoute extends Component {
  render() {
    const {navigation} = this.props;
    return <AccessoriesPage navigation={navigation} />;
  }
}
class ThirdRoute extends Component {
  render() {
    const {navigation, listProducts, category, listBrand} = this.props;
    return (
      <ProductPage
        navigation={navigation}
        listProducts={listProducts}
        listBrand={listBrand}
        category={category}
      />
    );
  }
}

class FourRoute extends Component {
  render() {
    const {navigation, listProducts, category, listBrand} = this.props;
    return (
      <ProductPage
        navigation={navigation}
        listProducts={listProducts}
        listBrand={listBrand}
        category={category}
      />
    );
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {key: 'HomePage', title: 'Trang Chủ'},
        {key: 'Promotion', title: 'Khuyến mãi'},
        {key: 'Accessories', title: 'Phụ Kiện'},
      ],
      index: 0,
      filter: {
        limit: 100,
        page: 0,
      },
      category: '',
      key: '',
    };
  }
  onSearchProduct = () => {
    const {navigation} = this.props;
    const {key} = this.state;
    navigation.navigate('Search', {keyword: key});
  };

  setIndex = val => {
    this.setState({
      index: val,
    });
    const {onGetList, onGetListBrand, onAddParams} = this.props;
    var filters = '';
    const {filter} = this.state;
    if (val === 2) {
      filters = {
        category: '608c195b99e77e244c7db4b5',
      };
      this.setState({
        category: '608c195b99e77e244c7db4b5',
      });
      var params = {
        ...filter,
        ...filters,
      };
      onGetList(params);
      onGetListBrand(filters);
      onAddParams(params);
    } else if (val === 3) {
      filters = {
        category: '608c197a99e77e244c7db4b6',
      };
      this.setState({
        category: '608c197a99e77e244c7db4b6',
      });
      var params = {
        ...filter,
        ...filters,
      };
      onGetList(params);
      onGetListBrand(filters);
      onAddParams(params);
    } else if (val === 4) {
      filters = {
        category: '60cf08806a958c26284fa8ad',
      };
      this.setState({
        category: '60cf08806a958c26284fa8ad',
      });
      var params = {
        ...filter,
        ...filters,
      };
      onGetList(params);
      onGetListBrand(filters);
      onAddParams(params);
    }
  };

  renderScene = ({route}) => {
    switch (route.key) {
      case 'HomePage':
        return <FirstRoute navigation={this.props.navigation} />;
      case 'Accessories':
        return (
          <SecondRoute
            navigation={this.props.navigation}
            params={true}
            category={this.state.category}
          />
        );
      case 'Promotion':
        return <PromotionPage></PromotionPage>;
      case 'Phone':
        return (
          <ThirdRoute
            navigation={this.props.navigation}
            listProducts={this.props.listProducts}
            listBrand={this.props.listBrand}
            category={this.state.category}
          />
        );
      case 'PC':
        return (
          <FourRoute
            navigation={this.props.navigation}
            listProducts={this.props.listProducts}
            listBrand={this.props.listBrand}
            category={this.state.category}
          />
        );
      default:
        return null;
    }
  };

  onSetRoute() {
    const {listCategories} = this.props;
    if (listCategories) {
      listCategories.map((item, index) => {
        this.setState(prevState => ({
          routes: [
            ...prevState.routes,
            {key: item.name_en.replace(' ', ''), title: item.name},
          ],
        }));
      });
    }
  }
  componentDidUpdate(prevProps) {
    var {listCategories} = this.props;
    if (listCategories !== prevProps.listCategories) {
      this.onSetRoute();
    }
  }
  componentDidMount = async () => {
    const {onGetListCategory} = this.props;
    onGetListCategory({accessories: -1});
  };

  renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled={true}
      style={{backgroundColor: '#1e88e5'}}
    />
  );
  render() {
    const {navigation} = this.props;
    const {index, routes} = this.state;
    return (
      <>
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
        <TabView
          navigationState={{index, routes}}
          renderScene={navigation => this.renderScene(navigation)}
          onIndexChange={index => this.setIndex(index)}
          initialLayout={{width: width}}
          renderTabBar={this.renderTabBar}
          style={{backgroundColor: '#fff'}}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    listCategories: state.categories.list,
    listProducts: state.products.list,
    listBrand: state.brands.list,
    category: state.categories.detail,
    params: state.products.params,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetListCategory: params => {
      dispatch(CategoryActions.onGetList(params));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
