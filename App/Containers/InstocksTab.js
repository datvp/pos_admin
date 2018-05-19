import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { isEmpty } from 'lodash/fp';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';

import { NavBar } from '../Components';
import { LoggedOutSection } from '../Containers';
import styles from './Styles/InstocksTab';

class InstocksTab extends PureComponent {
  render() {
    const {
      credential: { token },
    } = this.props;
    const isLoggedIn = !isEmpty(token);

    return (
      <Container style={styles.mainContainer}>
        <NavBar
          title='Instocks'
          showBackButton={false}
          navigation={this.props.navigation}
        />
        {
          isLoggedIn ?
          <Content contentContainerStyle={styles.container}>
          </Content> :
          <LoggedOutSection />
        }
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {
    credential = {},
  } = state;
  return { credential };
};
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(InstocksTab);
