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
    const {image, name, price, navigation, id} = this.props;
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => {
        navigation.push('Detail',{id});
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
