import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import CategoryActions from '../../redux/actions/categories';

import accessoryData from './accessory.json';

const {width} = Dimensions.get('window');

class AccessoriesPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const {onGetAccessory} = this.props;
    onGetAccessory({
      accessories: 1,
    });
  };

  onSelect = id => {
    const {navigation} = this.props;
    navigation.navigate('AccProductTemp', {id: id});
  };

  render() {
    const {listAccessory} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerContent}>
          <Text style={styles.titleName}>Danh mục phụ kiện</Text>
          <View style={styles.containerItem}>
            {listAccessory &&
              listAccessory.map(item => {
                return (
                  <TouchableOpacity
                    key={item._id}
                    style={styles.boxItem}
                    onPress={() => this.onSelect(item._id)}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      source={{
                        uri: item.image.public_url,
                      }}></Image>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          {accessoryData.accessoryAd.map((item, index) => {
            return (
              <View key={index} style={styles.boxContent}>
                <Text style={styles.titleName}>{item.title}</Text>
                {item.content.map((line, index) => {
                  return <Text key={index}>{line}</Text>;
                })}
                {item.image && (
                  <View className="text-center">
                    <Image
                      style={{
                        width: width,
                        height: 80,
                        marginVertical: 10,
                      }}
                      source={{uri: item.image}}
                      alt=""></Image>
                  </View>
                )}
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
    listAccessory: state.categories.accessories,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAccessory: payload => {
      dispatch(CategoryActions.onGetAccessory(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccessoriesPage);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  titleName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  containerItem: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  boxItem: {
    margin: 8,
    alignItems: 'center',
  },
  containerContent: {
    paddingVertical: 10,
    marginBottom: 5,
  },
  boxContent: {
    marginBottom: 20,
  },
});
