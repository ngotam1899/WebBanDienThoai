import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: null,
    };
  }

  render() {
    const { title, value, navigation, quantity } = this.props;
    return (
      <View style={styles.headerContainer}>
        {value === '1' ? (
          <View>
            <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.cartContainer}>
              <View style={styles.cartIcon} />
            </View></View>
        ) : (
          <></>
        )}
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.cartContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart', {})}>
            <FontAwesome
              name="shopping-cart"
              size={HEADER_ICON_SIZE}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.number}>{quantity}</Text>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    quantity: state.cart.quantity,
  };
};


export default connect(mapStateToProps)(Header);

const HEADER_ICON_SIZE = 24;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  btnGoBack: {
    marginLeft: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e88e5',
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingTop: 10
  },
  number: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 2,
    marginTop: -10,
    borderRadius: 50,
    backgroundColor: 'red',
    color: '#fff',
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cartIcon: {
    width: HEADER_ICON_SIZE,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});
