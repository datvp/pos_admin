import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { navigate } from '../Helpers';
import { ROUTES } from '../Constants';
import { Button } from '../Components';

import styles from './Styles/LoggedOutSection';

class LoggedOutSection extends PureComponent {
  render() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have not logged in</Text>
        <Button
          style={styles.emptyButton}
          titleStyle={styles.emptyButtonText}
          title='Login'
          onPress={() => this.props.navigate(ROUTES.LOGIN)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  navigate: (route) => dispatch(navigate(route)),
});

export default connect(null, mapDispatchToProps)(LoggedOutSection);
