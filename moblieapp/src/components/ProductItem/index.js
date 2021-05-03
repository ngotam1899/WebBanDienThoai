import React, {Component} from 'react';
import styles from './style'
import {
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
export default class ProductItem extends Component {
  render() {
    const {image, name, price, navigation,id_pd} = this.props;
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => {
        navigation.navigate('Detail',{id_pd});
      }}>
        <Image source={{uri: image}} style={styles.itemImage} />
        <Text style={styles.itemName} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.itemPrice}>{price}</Text>
      </TouchableOpacity>
    );
  }
}
