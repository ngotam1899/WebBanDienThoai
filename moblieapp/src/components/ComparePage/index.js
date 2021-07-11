import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {Table, Row, Rows} from 'react-native-table-component';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// @Actions
import ProductsActions from '../../redux/actions/products';
import CategoryActions from '../../redux/actions/categories';

class ComparePage extends Component {
  constructor(props) {
    super(props);
    const {route} = this.props;
    this.state = {
      data: '',
      dropdown: null,
      compare: [],
      params: {
        compare: route.params.id,
        category: route.params.category,
      },
      specifications: [],
    };
  }
  componentDidMount() {
    const {onGetList, onGetCategory, onCompare, route} = this.props;
    let {compare} = this.state;
    const params = {
      limit: 100,
      category: route.params.category,
    };
    const params1 = {
      compare,
    };
    let temp = compare;
    temp.push(route.params.id);
    this.setState({
      compare: temp,
    });
    onGetList(params);
    onCompare(params1);

    onGetCategory(route.params.category);
  }
  componentDidUpdate(prevProps) {
    const {listProducts, listCompare, category} = this.props;
    if (listProducts && listProducts !== prevProps.listProducts) {
      this.setState({
        data: listProducts,
      });
    }
    if (
      (prevProps.category !== category && listCompare) ||
      (prevProps.listCompare !== listCompare && category && listCompare)
    ) {
      var specifications = category.specifications;
      for (let i = 0; i < specifications.length; i++) {
        var product = [];
        for (let j = 0; j < listCompare.length; j++) {
          if (listCompare[j].specifications[i].selection.length > 0) {
            var selection = [];
            listCompare[j].specifications[i].selection.map(item =>
              selection.push(item.name),
            );
            selection = selection.join(', ');
            product.push(selection);
          } else product.push(listCompare[j].specifications[i].value);
          specifications[i].product = product;
        }
      }
      this.setState({specifications});
    }
  }
  componentWillUnmount() {
    const {onCompare} = this.props;
    this.setState({
      compare: '',
    });
    onCompare({compare: ''});
  }
  setCompare = productID => {
    const {onCompare} = this.props;
    const {compare} = this.state;
    let temp = compare;
    const filters = compare.toString();
    var compareString = filters || '';
    const index = compare.findIndex(item => item === productID);
    if (index === -1) {
      if (temp[0] === '') {
        temp = [productID];
        this.setState({compare: temp});
      } else {
        temp = temp.concat(productID);
        this.setState({compare: temp});
      }
      compareString = temp.join();
      onCompare({compare: compareString});
    } else {
      ToastAndroid.showWithGravity(
        'Sản phẩm đã được chọn',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };

  removeCompare = productID => {
    const {compare} = this.state;
    const {onCompare, navigation, route} = this.props;
    const filters = compare.join();
    var compareString = filters;
    var compare1 = filters.split(',');
    const index = compare1.indexOf(productID);
    if (index > -1) {
      compare1.splice(index, 1);
      console.log('de: ', compare1);
      compareString = compare1.join();
      this.setState({compare: compare1});
      if (compareString === '') {
        navigation.replace('Compare', {
          id: '',
          category: route.params.category,
        });
      } else {
        onCompare({compare: compareString});
      }
    }
  };

  _renderItem = item => {
    return (
      <View style={styles.item}>
        <Image
          style={styles.imgItem}
          source={{uri: item.bigimage.public_url}}></Image>
        <Text style={styles.textItem}>{item.name}</Text>
      </View>
    );
  };
  setDropdown = value => {
    const {listCompare} = this.props;
    if (listCompare.length < 2 || !listCompare) {
      this.setState({
        dropdown: value.name,
      });
      this.setCompare(value._id);
    } else {
      ToastAndroid.showWithGravity(
        'Chỉ cho phép so sánh hai sản phẩm cùng loại',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };
  render() {
    const {dropdown, data, specifications, compare} = this.state;
    const {listCompare} = this.props;
    console.log(listCompare);
    const tableHead = ['Thuộc tính'];
    listCompare && listCompare.length > 0
      ? listCompare.map(item => {
          tableHead.push(item.name);
        })
      : tableHead.push('Tên sản phẩm', 'Tên sản phẩm');
    const tableData = specifications.map((item, index) => {
      const temp = [];
      {
        item.product && item.product.length > 0
          ? item.product.map((element, index) => {
              return element
                ? temp.push(element)
                : temp.push('Chưa có thông tin');
            })
          : temp.push('Chưa có thông tin', 'Chưa có thông tin');
      }
      return [item.name, ...temp];
    });
    // Thông tin khác
    let tableHead1 = ['Thuộc tính'];
    listCompare && listCompare.length > 0
      ? listCompare.map(item => {
          tableHead1.push(item.name);
        })
      : tableHead1.push('Tên sản phẩm', 'Tên sản phẩm');
    //-------
    let tableData1 = [];
    let Warranty = ['Bảo hành'];
    let Included = ['Hộp bao gồm'];
    let Size = ['Kích thước'];
    let Weight = ['Khối lượng'];
    {
      listCompare && listCompare.length > 0
        ? listCompare.map(item => {
            return (
              item.warrently
                ? Warranty.push(item.warrently)
                : Warranty.push('Chưa có thông tin'),
              item.included
                ? Included.push(item.included)
                : Included.push('Chưa có thông tin'),
              item.size ? Size.push(item.size) : Size.push('Chưa có thông tin'),
              item.weight
                ? Weight.push(item.weight)
                : Weight.push('Chưa có thông tin')
            );
          })
        : (Warranty.push('Chưa có thông tin', 'Chưa có thông tin'),
          Included.push('Chưa có thông tin', 'Chưa có thông tin'),
          Size.push('Chưa có thông tin', 'Chưa có thông tin'),
          Weight.push('Chưa có thông tin', 'Chưa có thông tin'));
    }
    tableData1.push(Warranty, Included, Size, Weight);
    return (
      <ScrollView style={styles.container}>
        {data ? (
          <View>
            <Text style={styles.titleItem}>Chọn sản phẩm cần so sánh</Text>
            <Dropdown
              style={styles.dropdown}
              data={data}
              search
              searchPlaceholder="Search"
              labelField="name"
              valueField="name"
              placeholder="Select item"
              value={dropdown}
              onChange={item => this.setDropdown(item)}
              renderItem={item => this._renderItem(item)}
            />
            <View>
              <Text style={styles.titleItem}>Danh sách sản phẩm so sánh</Text>
              <View style={styles.boxListCompare}>
                {listCompare && listCompare.length > 0 ? (
                  listCompare.map(item => {
                    return (
                      <TouchableOpacity
                        key={item._id}
                        onPress={() => this.removeCompare(item._id)}
                        style={styles.itemCompare}>
                        <Text style={styles.textItem}>{item.name}</Text>
                        <FontAwesome name="close" color="#6c757d" size={14} />
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text style={styles.textWarning}>
                    Vui lòng chọn sản phẩm muốn so sánh
                  </Text>
                )}
              </View>
            </View>
            <Text style={styles.titleItem}>Chi tiết so sánh</Text>
            <View style={{marginTop: 5, marginBottom: 10}}>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: '#1e88e5',
                  marginBottom: 30,
                }}>
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
            <Text style={styles.titleItem}>Các thông tin khác</Text>
            <View style={{marginTop: 5, marginBottom: 10}}>
              <Table borderStyle={{borderWidth: 2, borderColor: '#1e88e5'}}>
                <Row
                  data={tableHead1}
                  style={{height: 60, backgroundColor: '#f1f8ff'}}
                  textStyle={{
                    margin: 6,
                    fontWeight: 'bold',
                    fontSize: 16,
                    textAlign: 'center',
                  }}
                />
                <Rows data={tableData1} textStyle={{margin: 6}} />
              </Table>
            </View>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    listProducts: state.products.list,
    currency: state.currency,
    category: state.categories.detail,
    listCompare: state.products.compare,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetList: params => {
      dispatch(ProductsActions.onGetList(params));
    },
    onCompare: params => {
      dispatch(ProductsActions.onCompare(params));
    },
    onGetCategory: id => {
      dispatch(CategoryActions.onGetDetail(id));
    },
    onCompareFilter: payload => {
      dispatch(ProductsActions.onCompareFilter(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    marginTop: 5,
    padding: 8,
    marginBottom: 15,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgItem: {
    height: 60,
    width: 50,
    marginHorizontal: 10,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  //
  boxListCompare: {
    marginTop: 0,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCompare: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#ccc',
    backgroundColor: '#f1f8ff',
    borderWidth: 1,
    marginVertical: 5,
  },
  textItem: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  titleItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textWarning: {
    fontStyle: 'italic',
  },
});
