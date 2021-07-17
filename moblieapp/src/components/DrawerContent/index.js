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
      paramsTemp: {},
    };
  }

  onSearch = async (min, max) => {
    await this.setState(prevState => ({
      paramsTemp: {
        ...prevState.paramsTemp,
        min_p: min,
        max_p: max,
      },
      min_p: min,
      max_p: max,
    }));
    await this.onGet();
  };

  onGet = () => {
    const {onGetList} = this.props;
    const {paramsTemp} = this.state;
    onGetList(paramsTemp);
  };

  componentDidMount() {
    const {onGetParams} = this.props;
    onGetParams();
  }
  onSubmitPriceRange = async () => {
    const {min_p_temp, max_p_temp} = this.state;
    await this.setState(prevState => ({
      paramsTemp: {
        ...prevState.paramsTemp,
        min_p: min_p_temp,
        max_p: max_p_temp,
        limit: 100,
      },
    }));
    await this.onGet();
  };
  onSearchFilter = async (name, id) => {
    await this.setState(prevState => ({
      paramsTemp: {
        ...prevState.paramsTemp,
        limit: 100,
        [name]: id,
      },
    }));
    await this.onGet();
  };
  componentDidUpdate(prevProps) {
    const {params, onGetCategory} = this.props;
    if (params && params !== prevProps.params) {
      onGetCategory(params ? params.category : null);
      this.setState({
        paramsTemp: params,
      });
    }
  }
  render() {
    const {category} = this.props;
    const {min_p_temp, max_p_temp, paramsTemp} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>BỘ LỌC</Text>
        </View>
        <ScrollView style={styles.containerCrollView}>
          <Text style={styles.priceRange}>Price range</Text>
          <View style={styles.checkboxPriceRange}>
            <CheckBox
              value={
                paramsTemp.min_p || paramsTemp.max_p
                  ? paramsTemp.min_p === null && paramsTemp.max_p === null
                  : true
              }
              onValueChange={() => this.onSearch(null, null)}
              style={styles.checkbox}
            />
            <Text style={styles.textPriceRange}>All</Text>
          </View>
          {category && category.price ? (
            category.price.map(price => {
              return (
                <View key={price._id} style={styles.checkboxPriceRange}>
                  <CheckBox
                    value={
                      paramsTemp.min_p === price.min &&
                      paramsTemp.max_p === price.max
                    }
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
              value={min_p_temp}
              placeholder="0"
              onChangeText={value => {
                this.setState({
                  min_p_temp: value,
                });
              }}></TextInput>
            <TextInput
              style={styles.textInput}
              value={max_p_temp}
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
                <View key={item._id._id} style={styles.operatingSystem}>
                  <Text style={styles.textOS}>{item._id.name}</Text>
                  <View style={styles.checkboxPriceRange}>
                    <CheckBox
                      value={
                        this.state.paramsTemp[`${item.query}`]
                          ? this.state.paramsTemp[`${item.query}`] === null
                          : true
                      }
                      onValueChange={() =>
                        this.onSearchFilter(item.query, null)
                      }
                      style={styles.checkbox}
                    />
                    <Text style={styles.textPriceRange}>All</Text>
                  </View>
                  {item._id.selections.map(selector => {
                    return (
                      <View
                        key={selector._id}
                        style={styles.checkboxPriceRange}>
                        <CheckBox
                          value={
                            this.state.paramsTemp[`${item.query}`] ===
                            selector._id
                          }
                          style={styles.checkbox}
                          onValueChange={() =>
                            this.onSearchFilter(item.query, selector._id)
                          }
                        />
                        <Text style={styles.textPriceRange}>
                          {selector.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })
          ) : (
            <></>
          )}
        </ScrollView>
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
  container: {flex: 1},
  titleContainer: {
    backgroundColor: '#1e88e5',
    height: 40,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: '#fff',
    fontSize: 16,
  },
  containerCrollView: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
    marginBottom: 20,
  },
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
    marginBottom: 30,
  },
  textBtnSearchPrice: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  operatingSystem: {
    marginBottom: 20,
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
