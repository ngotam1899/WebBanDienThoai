import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
const {width} = Dimensions.get('window');
export default class NotificationLoader extends Component {
  render() {
    return (
      <ContentLoader
        speed={2}
        width={width - 20}
        height={700}
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6">
        <Circle cx="20" cy="21" r="19" />
        <Circle cx="375" cy="7" r="2" />
        <Circle cx="375" cy="14" r="2" />
        <Circle cx="375" cy="21" r="2" />
        <Rect x="45" y="3" rx="0" ry="0" width="310" height="22" />
        <Rect x="45" y="34" rx="0" ry="0" width="151" height="12" />
        <Rect x="0" y="56" rx="0" ry="0" width="390" height="28" />

        <Circle cx="20" cy="131" r="19" />
        <Circle cx="375" cy="117" r="2" />
        <Circle cx="375" cy="124" r="2" />
        <Circle cx="375" cy="131" r="2" />
        <Rect x="45" y="113" rx="0" ry="0" width="310" height="22" />
        <Rect x="45" y="144" rx="0" ry="0" width="151" height="12" />
        <Rect x="0" y="166" rx="0" ry="0" width="390" height="28" />

        <Circle cx="20" cy="241" r="19" />
        <Circle cx="375" cy="227" r="2" />
        <Circle cx="375" cy="234" r="2" />
        <Circle cx="375" cy="241" r="2" />
        <Rect x="45" y="223" rx="0" ry="0" width="310" height="22" />
        <Rect x="45" y="254" rx="0" ry="0" width="151" height="12" />
        <Rect x="0" y="276" rx="0" ry="0" width="390" height="28" />

        <Circle cx="20" cy="351" r="19" />
        <Circle cx="375" cy="337" r="2" />
        <Circle cx="375" cy="344" r="2" />
        <Circle cx="375" cy="351" r="2" />
        <Rect x="45" y="333" rx="0" ry="0" width="310" height="22" />
        <Rect x="45" y="364" rx="0" ry="0" width="151" height="12" />
        <Rect x="0" y="386" rx="0" ry="0" width="390" height="28" />

        <Circle cx="20" cy="461" r="19" />
        <Circle cx="375" cy="447" r="2" />
        <Circle cx="375" cy="454" r="2" />
        <Circle cx="375" cy="461" r="2" />
        <Rect x="45" y="443" rx="0" ry="0" width="310" height="22" />
        <Rect x="45" y="474" rx="0" ry="0" width="151" height="12" />
        <Rect x="0" y="496" rx="0" ry="0" width="390" height="28" />

        <Circle cx="20" cy="571" r="19" />
        <Circle cx="375" cy="557" r="2" />
        <Circle cx="375" cy="564" r="2" />
        <Circle cx="375" cy="571" r="2" />
        <Rect x="45" y="553" rx="0" ry="0" width="310" height="22" />
        <Rect x="45" y="584" rx="0" ry="0" width="151" height="12" />
        <Rect x="0" y="606" rx="0" ry="0" width="390" height="28" />
      </ContentLoader>
    );
  }
}
