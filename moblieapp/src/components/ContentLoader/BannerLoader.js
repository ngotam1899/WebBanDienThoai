import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
const {width} = Dimensions.get('window');
export default class BannerLoader extends Component {
  render() {
    return (
      <ContentLoader
        speed={2}
        width={width - 24}
        height={190}
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6">
        <Rect x="0" y="10" rx="10" ry="10" width="388" height="180" />
      </ContentLoader>
    );
  }
}
