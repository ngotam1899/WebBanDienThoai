import React, {Component} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductsActions from '../../redux/actions/products';
import CategoryActions from '../../redux/actions/categories';
import CheckBox from '@react-native-community/checkbox';

import {connect} from 'react-redux';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min_p: null,
      max_p: null,
      min_p_temp: null,
      max_p_temp: null,
    };
  }
  onSearch = (min, max) => {
    const {onGetList, params} = this.props;
    this.setState({
      min_p: min,
      max_p: max,
    });
    console.log(params);
    if (params) {
      var newParams = {
        brand: params.brand,
        category: params.category,
        limit: 100,
        sort_p: params.sort_p,
        min_p: min,
        max_p: max,
      };
      onGetList(newParams);
    }
  };

  componentDidMount() {
    const {onGetParams} = this.props;
    onGetParams();
  }
  onSubmitPriceRange() {
    const {params, onGetList} = this.props;
    const {min_p_temp, max_p_temp} = this.state;
    if (params) {
      var newParams = {
        brand: params.brand,
        category: params.category,
        limit: 100,
        sort_p: params.sort_p,
        min_p: min_p_temp,
        max_p: max_p_temp,
      };
      console.log("new : ",newParams)
      onGetList(newParams);
    }
  }
  onSearchFilter(name,id){
    const {params, onGetList} = this.props;
    const {min_p_temp, max_p_temp} = this.state;
    this.setState({
      [name]:id
    })
    if (params) {
      var newParams = {
        brand: params.brand,
        category: params.category,
        limit: 100,
        sort_p: params.sort_p,
        min_p: min_p_temp,
        max_p: max_p_temp,
        [name]:id
      };
      console.log("new : ",newParams)
      onGetList(newParams);
    }
  }
  componentDidUpdate(prevProps) {
    const {params, onGetCategory} = this.props;
    if (params && params !== prevProps.params) {
      onGetCategory(params ? params.category : null);
    }
  }
  render() {
    const {category} = this.props;
    const {min_p, max_p} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.priceRange}>Price range</Text>
        <View style={styles.checkboxPriceRange}>
          <CheckBox
            value={min_p === null && max_p === null}
            onValueChange={() => this.onSearch(null, null)}
            style={styles.checkbox}
          />
          <Text style={styles.textPriceRange}>All</Text>
        </View>
        {category && category.price ? (
          category.price.map(price => {
            return (
              <View style={styles.checkboxPriceRange}>
                <CheckBox
                  value={min_p === price.min && max_p === price.max}
                  onValueChange={() => this.onSearch(price.min, price.max)}
                  style={styles.checkbox}
                />
                <Text style={styles.textPriceRange}>{price.name}</Text>
              </View>
            );
          })
        ) : (
          <></>
        )}
        <View style={styles.inputPriceRange}>
          <TextInput
            style={styles.textInput}
            value={min_p}
            placeholder="0"
            onChangeText={value => {
              this.setState({
                min_p_temp: value,
              });
            }}></TextInput>
          <TextInput
            style={styles.textInput}
            value={max_p}
            placeholder="10.000.000"
            onChangeText={value => {
              this.setState({
                max_p_temp: value,
              });
            }}></TextInput>
        </View>

        <TouchableOpacity
          style={styles.btnSearchPrice}
          onPress={() => this.onSubmitPriceRange()}>
          <Text style={styles.textBtnSearchPrice}>Áp Dụng</Text>
        </TouchableOpacity>
        {category ? (
          category.filter.map(item => {
            
            return (
              <View style={styles.operatingSystem}>
                <Text style={styles.textOS}>{item._id.name}</Text>
                <View style={styles.checkboxPriceRange}>
                  <CheckBox
                    value={this.state[`${item.query}`] === null}
                    onValueChange={()=> this.onSearchFilter(item.query,null)}
                    style={styles.checkbox}
                  />
                  <Text style={styles.textPriceRange}>All</Text>
                </View>
                {item._id.selections.map(selector => {
                  return (
                    <View style={styles.checkboxPriceRange}>
                      <CheckBox value={this.state[`${item.query}`] === selector._id} style={styles.checkbox} onValueChange={()=> this.onSearchFilter(item.query,selector._id)}/>
                      <Text style={styles.textPriceRange}>{selector.name}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })
        ) : (
          <></>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    params: state.products.params,
    category: state.categories.detail,
    listProducts: state.products.list,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetList: params => {
      dispatch(ProductsActions.onGetList(params));
    },
    onGetParams: () => {
      dispatch(ProductsActions.onGetParams());
    },
    onGetCategory: id => {
      dispatch(CategoryActions.onGetDetail(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 12, paddingVertical: 20},
  priceRange: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 7,
    marginBottom: 15,
  },
  checkboxPriceRange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  checkbox: {
    marginRight: 5,
  },
  textPriceRange: {
    fontSize: 18,
  },
  inputPriceRange: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  textInput: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
    paddingHorizontal: 20,
  },
  btnSearchPrice: {
    paddingVertical: 10,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  textBtnSearchPrice: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  operatingSystem: {
    marginTop: 40,
  },
  textOS: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 7,
    marginBottom: 15,
  },
});
