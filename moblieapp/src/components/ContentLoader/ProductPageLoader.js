import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';
const {width} = Dimensions.get('window');
export default class ProductPageLoader extends Component {
  render() {
    return (
      <ContentLoader
        speed={2}
        width={width - 20}
        height={710}
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
        <Rect x="318" y="216" rx="0" ry="0" width="60" height="12" />

        {/* Row 2 */}
        <Rect x="0" y="240" rx="0" ry="0" width="120" height="141" />
        <Rect x="0" y="390" rx="0" ry="0" width="118" height="16" />
        <Rect x="0" y="425" rx="0" ry="0" width="99" height="12" />
        <Rect x="0" y="434" rx="0" ry="0" width="112" height="16" />
        <Rect x="0" y="456" rx="0" ry="0" width="49" height="12" />
        <Rect x="58" y="456" rx="0" ry="0" width="60" height="12" />

        <Rect x="130" y="240" rx="0" ry="0" width="120" height="141" />
        <Rect x="130" y="390" rx="0" ry="0" width="118" height="16" />
        <Rect x="130" y="425" rx="0" ry="0" width="99" height="12" />
        <Rect x="130" y="434" rx="0" ry="0" width="112" height="16" />
        <Rect x="130" y="456" rx="0" ry="0" width="49" height="12" />
        <Rect x="188" y="456" rx="0" ry="0" width="60" height="12" />

        <Rect x="260" y="240" rx="0" ry="0" width="120" height="141" />
        <Rect x="260" y="390" rx="0" ry="0" width="118" height="16" />
        <Rect x="260" y="425" rx="0" ry="0" width="99" height="12" />
        <Rect x="260" y="434" rx="0" ry="0" width="112" height="16" />
        <Rect x="260" y="456" rx="0" ry="0" width="49" height="12" />
        <Rect x="318" y="456" rx="0" ry="0" width="60" height="12" />

        {/* Row 3 */}
        <Rect x="0" y="480" rx="0" ry="0" width="120" height="141" />
        <Rect x="0" y="630" rx="0" ry="0" width="118" height="16" />
        <Rect x="0" y="665" rx="0" ry="0" width="99" height="12" />
        <Rect x="0" y="674" rx="0" ry="0" width="112" height="16" />
        <Rect x="0" y="696" rx="0" ry="0" width="49" height="12" />
        <Rect x="58" y="696" rx="0" ry="0" width="60" height="12" />

        <Rect x="130" y="480" rx="0" ry="0" width="120" height="141" />
        <Rect x="130" y="630" rx="0" ry="0" width="118" height="16" />
        <Rect x="130" y="665" rx="0" ry="0" width="99" height="12" />
        <Rect x="130" y="674" rx="0" ry="0" width="112" height="16" />
        <Rect x="130" y="696" rx="0" ry="0" width="49" height="12" />
        <Rect x="188" y="696" rx="0" ry="0" width="60" height="12" />

        <Rect x="260" y="480" rx="0" ry="0" width="120" height="141" />
        <Rect x="260" y="630" rx="0" ry="0" width="118" height="16" />
        <Rect x="260" y="665" rx="0" ry="0" width="99" height="12" />
        <Rect x="260" y="674" rx="0" ry="0" width="112" height="16" />
        <Rect x="260" y="696" rx="0" ry="0" width="49" height="12" />
        <Rect x="318" y="696" rx="0" ry="0" width="60" height="12" />
      </ContentLoader>
    );
  }
}
