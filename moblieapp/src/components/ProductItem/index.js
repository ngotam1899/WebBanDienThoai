import React, {Component} from 'react';
import styles from './style';
import numberWithCommas from '../../utils/formatPrice';
import {Rating} from 'react-native-ratings';

import {TouchableOpacity, Image, Text, View} from 'react-native';
export default class ProductItem extends Component {
  render() {
    const {
      image,
      name,
      price,
      price_real,
      stars,
      navigation,
      id,
      reviewCount,
    } = this.props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate('Detail', {id});
        }}>
        <Image
          source={{uri: image}}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <View style={{paddingLeft: 6}}>
          <Text style={styles.itemName} numberOfLines={2}>
            {name}
          </Text>
          {price_real ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.itemPriceReal}>
                {numberWithCommas(price_real)}
              </Text>
              <Text style={styles.reducePrice}>
                {' '}
                Giảm {parseInt((1 - price / price_real) * 100)}%
              </Text>
            </View>
          ) : (
            <></>
          )}
          <Text style={styles.itemPrice}>{numberWithCommas(price)}</Text>
          {stars && reviewCount ? (
            <View style={styles.rating}>
              <Rating
                type="star"
                ratingCount={5}
                readonly={true}
                startingValue={stars}
                style={{
                  alignItems: 'flex-start',
                  marginRight: 3,
                  marginLeft: 0,
                }}
                size={11}
                imageSize={11}
              />
              <Text style={styles.countRating}>{reviewCount} đánh giá</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
