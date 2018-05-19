import React, { PureComponent } from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import CustomIconConfig from '../Config/CustomIconConfig.json';

const Icon = createIconSetFromIcoMoon(CustomIconConfig, 'icomoon');

export default class CustomIcon extends PureComponent {
  render() {
    return (
      <Icon {...this.props} />
    );
  }
}
