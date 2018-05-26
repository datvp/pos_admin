import React, { PureComponent } from 'react';
import { BarChart, LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
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

const fill = 'rgb(134, 65, 244)';
const data   = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ];
const dataLineChart = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
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
          title='Tổng quan'
          showBackButton={false}
          navigation={this.props.navigation}
          onMenuPress={this._onMenuPress}
        />
        {/* <SearchBar
          style={styles.searchBar}
          placeholder='Search...'
          value={input}
          onChangeText={this._onChangeSearchText}
          onSubmit={this.props.requestSearch}
          showLoading={false}
        /> */}
        <ScrollView
          bounces={false}
          refreshControl={
            <RefreshControl
              refreshing={reqSending === StartupTypes.FETCH_LAUNCH_DATA}
              onRefresh={this.props.refresh}
            />
          }>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionDetailContainer}>
              <Text style={styles.textTitle}>Biểu đồ doanh thu</Text>
              <View style={{ flexDirection: 'row' }}>
                <YAxis
                  data={ dataLineChart }
                  contentInset={{ height: 200, top: 10, bottom: 10, left: 10, right: 20, flex: 0.2 }}
                  svg={{
                    fill: 'grey',
                    fontSize: 10,
                  }}
                  numberOfTicks={ 10 }
                  formatLabel={ value => `${value} VNĐ` }
                />
                <LineChart
                  style={{ height: 200, flex: 1 }}
                  data={ dataLineChart }
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                  contentInset={{ top: 10, bottom: 10, left: 10, right: 20 }}
                >
                  <Grid/>
                </LineChart>
              </View>
              <XAxis
                style={{ marginHorizontal: -10 }}
                data={ dataLineChart }
                formatLabel={ (value, index) => index }
                contentInset={{ left: 50, right: 20 }}
                svg={{ fontSize: 10, fill: 'black' }}
              />
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionDetailContainer}>
              <Text style={styles.textTitle}>Mặt hàng bán chạy</Text>
              <View style={{ flexDirection: 'row' }}>
                <YAxis
                  data={ data }
                  contentInset={{ height: 200, top: 10, bottom: 10, left: 10, right: 10, flex: 0.2 }}
                  svg={{
                    fill: 'grey',
                    fontSize: 10,
                  }}
                  numberOfTicks={ 10 }
                  formatLabel={ value => `${value} VNĐ` }
                />
                <BarChart
                  style={{ height: 200, flex: 1 }}
                  data={ data }
                  svg={{ fill }}
                  contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Grid/>
                </BarChart>
              </View>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionDetailContainer}>
              <Text style={styles.textTitle}>Tổng doanh thu bán hàng theo ngày</Text>
              <Text>Thứ Hai: ~ 11.53 tr VNĐ</Text>
              <Text>Thứ Ba: ~ 10.81 tr VNĐ</Text>
              <Text>Thứ Tư: ~ 24.55 tr VNĐ</Text>
              <Text>Thứ Năm: ~ 90.69 tr VNĐ</Text>
              <Text>Thứ Sáu: ~ 29.34 tr VNĐ</Text>
              <Text>Thứ Bảy: ~ 55.00 tr VNĐ</Text>
              <Text>Thứ Hai: ~ 60.21 tr VNĐ</Text>
            </View>
          </View>
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
