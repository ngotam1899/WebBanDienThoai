import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
const {width} = Dimensions.get('window');
export default class ItemProduct extends Component {
  render() {
    return (
      <ContentLoader
        speed={2}
        width={width - 20}
        height={230}
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6">
        <Rect x="0" y="0" rx="0" ry="0" width="120" height="141" />
        <Rect x="0" y="150" rx="0" ry="0" width="118" height="16" />
        <Rect x="0" y="175" rx="0" ry="0" width="99" height="12" />
        <Rect x="0" y="194" rx="0" ry="0" width="112" height="16" />
        <Rect x="0" y="216" rx="0" ry="0" width="49" height="12" />
        <Rect x="58" y="216" rx="0" ry="0" width="60" height="12" />

        <Rect x="130" y="0" rx="0" ry="0" width="120" height="141" />
        <Rect x="130" y="150" rx="0" ry="0" width="118" height="16" />
        <Rect x="130" y="175" rx="0" ry="0" width="99" height="12" />
        <Rect x="130" y="194" rx="0" ry="0" width="112" height="16" />
        <Rect x="130" y="216" rx="0" ry="0" width="49" height="12" />
        <Rect x="188" y="216" rx="0" ry="0" width="60" height="12" />

        <Rect x="260" y="0" rx="0" ry="0" width="120" height="141" />
        <Rect x="260" y="150" rx="0" ry="0" width="118" height="16" />
        <Rect x="260" y="175" rx="0" ry="0" width="99" height="12" />
        <Rect x="260" y="194" rx="0" ry="0" width="112" height="16" />
        <Rect x="260" y="216" rx="0" ry="0" width="49" height="12" />
        <Rect x="218" y="216" rx="0" ry="0" width="60" height="12" />
      </ContentLoader>
    );
  }
}
