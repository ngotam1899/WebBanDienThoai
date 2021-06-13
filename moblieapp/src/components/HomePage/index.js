import React, {Component} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {View, Text, Dimensions} from 'react-native';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../HeaderComponent';
import {connect} from 'react-redux';

import CategoryActions from '../../redux/actions/categories';
import ProductsActions from '../../redux/actions/products';
import BrandActions from "../../redux/actions/brands";

import HomeContainer from './HomeContainer';
import ProductPage from './ProductPage'

const {width} = Dimensions.get('window');

class FirstRoute extends Component {
  render() {
    const {navigation} = this.props;
    return <HomeContainer navigation={navigation}></HomeContainer>;
  }
}
class SecondRoute extends Component {
  render() {
    const {navigation, listProducts, category, totalBrand} = this.props;
    return <ProductPage navigation={navigation}  listProducts={listProducts} totalBrand={totalBrand} category={category}/>;
  }
}
class ThirdRoute extends Component {
  render() {
    const {navigation, listProducts, category, totalBrand} = this.props;
    return <ProductPage navigation={navigation} listProducts={listProducts} totalBrand={totalBrand} category={category}/>;
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [{key: 'HomePage', title: 'Trang Chủ'}],
      index: 0,
      filter: {
        limit: 100,
        page: 0,
      },
      category: ''
    };
  }
  
  setIndex = val => {
    this.setState({
      index: val,
    });
    const {onGetList, onGetListBrand} = this.props;
    var filters = '';
    const {filter} = this.state;
    if (val === 1) {
      filters = {
        category: '608c195b99e77e244c7db4b5',
      };
      this.setState({
        category: '608c195b99e77e244c7db4b5',
      })
      var params = {
        ...filter,
        ...filters,
      };
      onGetList(params);
      onGetListBrand(filters)
    } else if (val === 2) {
      filters = {
        category: "608c197a99e77e244c7db4b6"
      };
      this.setState({
        category: "608c197a99e77e244c7db4b6"
      })
      var params = {
        ...filter,
        ...filters,
      };
      onGetList(params);
      onGetListBrand(filters)
    }
  };

  renderScene = ({route}) => {
    switch (route.key) {
      case 'HomePage':
        return <FirstRoute navigation={this.props.navigation} />;
      case 'Earphone':
        return <SecondRoute navigation={this.props.navigation} listProducts={this.props.listProducts} totalBrand={this.props.totalBrand} category={this.state.category}/>;
      case 'Phone':
        return <ThirdRoute navigation={this.props.navigation} listProducts={this.props.listProducts} totalBrand={this.props.totalBrand} category={this.state.category}/>;
      default:
        return null;
    }
  };

  onSetRoute(){
    const {listCategories} = this.props;
    if (listCategories) {
      listCategories.map((item, index) => {
        this.setState(prevState => ({
          routes: [
            ...prevState.routes,
            {key: (item.name_en).replace(" ",""), title: item.name},
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
    onGetListCategory();
  }

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
            <FontAwesome name="search" size={24} color="#969696" />
            <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
          </View>
          <Header value="2" navigation={navigation}></Header>
        </View>

        <TabView
          navigationState={{index, routes}}
          renderScene={navigation => this.renderScene(navigation)}
          onIndexChange={index => this.setIndex(index)}
          initialLayout={{width: width}}
          renderTabBar={this.renderTabBar}
          style={{backgroundColor:'#fff'}}
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
    totalBrand: state.brands.total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetListCategory: () => {
      dispatch(CategoryActions.onGetList());
    },
    onGetList: params => {
      dispatch(ProductsActions.onGetList(params));
    },
    onGetListBrand: (params) => {
      dispatch(BrandActions.onGetList(params))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
