import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class NavigationBottom extends Component {
  render() {
    const {color} = this.props
    return (
      <View>
        <MaterialIcons name="notifications" size={26} color={color} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    authInfo: state.auth.detail,
    orderList: state.order.list,
    orderItem: state.order.detail,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBottom);
