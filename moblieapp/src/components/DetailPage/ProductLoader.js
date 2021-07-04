import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
const {width} = Dimensions.get('window');
export default class ProductLoader extends Component {
  render() {
    return (
      <ContentLoader
        speed={2}
        width={width}
        height={620}
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6">
        <Rect x="0" y="-1" rx="10" ry="10" width="370" height="359" />
        <Rect x="0" y="377" rx="10" ry="10" width="268" height="26" />
        <Rect x="0" y="414" rx="10" ry="10" width="170" height="20" />
        <Rect x="0" y="444" rx="10" ry="10" width="253" height="26" />
        <Rect x="0" y="485" rx="10" ry="10" width="185" height="20" />
        <Rect x="0" y="515" rx="10" ry="10" width="84" height="25" />
        <Rect x="98" y="517" rx="10" ry="10" width="84" height="25" />
        <Rect x="196" y="517" rx="10" ry="10" width="84" height="25" />
        <Rect x="0" y="554" rx="10" ry="10" width="185" height="20" />
        <Rect x="0" y="586" rx="10" ry="10" width="99" height="33" />
        <Rect x="109" y="586" rx="10" ry="10" width="99" height="33" />
      </ContentLoader>
    );
  }
}
