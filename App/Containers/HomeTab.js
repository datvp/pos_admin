import React, { PureComponent } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  RefreshControl, FlatList, TouchableWithoutFeedback, Clipboard,
} from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/fp';
import moment from 'moment';

import { navigate } from '../Helpers';
import { DATE_FORMAT, ROUTES } from '../Constants';
import { NavBar, SearchBar, Rating } from '../Components';
import { StartupTypes } from '../Redux/Startup';
import { SearchTypes } from '../Redux/Search';
import { LoginTypes } from '../Redux/Login';
import { Images } from '../Themes';
import styles from './Styles/HomeTab';

class HomeTab extends PureComponent {
  _onMenuPress = () => {
    let { showMenu = false } = this.props.login;
    showMenu = !showMenu;
    this.props.updateLoginState({showMenu});
  } 

  render() {
    const {
      asyncRequest: { reqSending = '' } = {},
      search: { input = '' } = {},
    } = this.props;

    return (
      <Container style={styles.mainContainer}>
        <NavBar
          title='Home'
          showBackButton={false}
          navigation={this.props.navigation}
          onMenuPress={this._onMenuPress}
        />
        <SearchBar
          style={styles.searchBar}
          placeholder='Search...'
          value={input}
          onChangeText={this._onChangeSearchText}
          onSubmit={this.props.requestSearch}
          showLoading={false}
        />
        <ScrollView
          bounces={false}
          refreshControl={
            <RefreshControl
              refreshing={reqSending === StartupTypes.FETCH_LAUNCH_DATA}
              onRefresh={this.props.refresh}
            />
          }>
          
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { asyncRequest, search, login } = state;
  return { asyncRequest, search, login };
};
const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch({ type: StartupTypes.FETCH_LAUNCH_DATA }),
  updateLoginState: data => dispatch({ type: LoginTypes.LOGIN_UPDATE_STATE, data }),
  // navigate: route => dispatch(navigate(route)),
  // updateState: action => dispatch(action),
  // requestSearch: () => dispatch({ type: SearchTypes.SEARCH_REQUEST }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);
