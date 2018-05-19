import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './Styles/Rating';

export default class Rating extends PureComponent {
  static propTypes = {
    containerStyle: PropTypes.any,
    starStyle: PropTypes.any,
    starCount: PropTypes.number
  }

  static defaultProps = {
    containerStyle: null,
    starStyle: null,
    starCount: 0,
  }

  render() {
    const {
      containerStyle,
      starStyle,
      starCount,
      onStarChange = () => {},
    } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        {
          Array.from({ length: 5 }, (value, index) => index < starCount ?
            <Icon key={index} style={[styles.star, starStyle]} name='star' onPress={() => onStarChange(index + 1)}/> :
            <Icon key={index} style={[styles.star, starStyle]} name='star-border' onPress={() => onStarChange(index + 1)} />
          )
        }
      </View>
    );
  }
}