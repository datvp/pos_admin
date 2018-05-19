import React, { PureComponent } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import { Container, Content, Tab, Tabs } from 'native-base';
// import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { isEmpty, findIndex } from 'lodash/fp';
import moment from 'moment';

import { NavBar, Button } from '../Components';
import { navigate, getTextByTime, NEXT_30_DAYS } from '../Helpers';
import { Images } from '../Themes';
import { CustomerTypes } from '../Redux/Customer'
import { BookingTypes } from '../Redux/Booking'
import { StartupTypes } from '../Redux/Startup';
import { ROUTES, TABS, STATUS_MESSAGES } from '../Constants';
import { LoggedOutSection } from '../Containers';
import styles from './Styles/ReportsTab';
import tabStyles from './Styles/TabBar';

class ReportsTab extends PureComponent {  
  _fetchAvailableDate = (item) => {
    const {
      appointment: {
        date: dateSelected = -1,
      },
      artists: selectedArtists = [],
    } = item;
    let days = [];

    if (isEmpty(selectedArtists)) {
      days = NEXT_30_DAYS;
    } else {
      const { workings = [] } = selectedArtists[0] || {};
      days = NEXT_30_DAYS.filter(item => findIndex(o => o.day === item.day, workings) >= 0);
    }
    this.props.updateCustomer({ availableDates: days });
  }

  // onPress event on per item to show full detail screen
  _onPressItem = (item) => {
    const {
      navigate,
      updateDetailAppointment,
    } = this.props;
    this._fetchAvailableDate(item);
    updateDetailAppointment({ detailAppointment: item })
    this.props.fetchArtistWorkingTime(item);
  }

  _renderItem = (items) =>{
    const { asyncRequest: { reqSending = '' } = {}, } = this.props;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={reqSending === CustomerTypes.CUSTOMER_REFRESH_DATA}
            onRefresh={this.props.refresh}
          />
        }
      >
        {
          !isEmpty(items) ?
            items.map(item => {
              const {
                _id,
                appointment: { date = '', time = -1} = {},
                cart: [{
                  url: photoURL = '',
                }] = [],
                cart = [],
                artists: [{
                  name: artistName = '',
                }],
                createdAt,
                status = '',
              } = item;
              const dateCreate = isEmpty(createdAt) ? '' : moment(createdAt, 'MM/DD/YYYY').format('MMM Do, YYYY');
              const dateAppointment = isEmpty(date) ? '' : moment(date, 'MM/DD/YYYY').format('MMM Do, YYYY');
              const timeAppointment = getTextByTime(time);
              return (
                <TouchableOpacity key={_id} onPress={() => this._onPressItem(item)}>
                  <View style={styles.itemGroupContainer}>
                    <Text style={styles.itemTitle}>Order place on {dateCreate}</Text>
                    <View style={styles.itemContainer}>
                      {/* <FastImage
                        style={styles.itemImage}
                        source={isEmpty(photoURL) ? Images.logo : { uri: photoURL }}
                        // source={Images.logo}
                        resizeMode={FastImage.resizeMode.contain} 
                      /> */}
                      <View style={styles.itemSubContain}>
                          <View style={styles.itemContainDescription}>
                            <Text>Artist: </Text>
                            <Text style={styles.itemDescription}>{artistName}</Text>
                          </View>
                          <View style={styles.itemContainDescription}>
                           <Text>Detailed: </Text>
                           <Text style={styles.itemDescription}>{`${cart.length} service(s)`}</Text>
                          </View>
                          <View style={styles.itemContainDescription}>
                            <Text>Date &amp; Time: </Text>
                            <Text style={styles.itemDescription}>{`${dateAppointment} @ ${timeAppointment}`}</Text>
                          </View>
                          <View style={styles.itemContainDescription}>
                            <Text>Status: </Text>
                            <Text style={styles.itemStatus}>{`${STATUS_MESSAGES[status].detail}`}</Text>
                          </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }) :
            <View>
              <Text style={styles.textNoBooking}>There is no booking available</Text>
            </View>
        }
      </ScrollView>
    )
  }

  _renderContent = (tab, items = []) => {
    return (
      <Tab
        heading={tab}
        tabStyle={[tabStyles.tabContainer, tabStyles.tabBorderRight]}
        activeTabStyle={[tabStyles.activeTabContainer, tabStyles.tabBorderRight]}
        textStyle={tabStyles.tabTitle}
        activeTextStyle={tabStyles.activeTabTitle}>
        <View style={styles.contentContainer}>
          {this._renderItem(items)}
        </View>
      </Tab>
    );
  }

  render() {
    const {
      credential: { token },
      pending = [],
      upcoming = [],
      inprogress = [],
      completed = [],
    } = this.props;

    const isLoggedIn = !isEmpty(token);

    return (
      <Container style={styles.mainContainer}>
        <NavBar
          title='Reports'
          showBackButton={false}
          navigation={this.props.navigation}
        />
        {
          isLoggedIn ?
          <Tabs
            locked
            initialPage={0}
            tabBarUnderlineStyle={tabStyles.underline}
            tabContainerStyle={styles.tabContainer}>
            {this._renderContent(TABS.PENDING, pending)}
            {this._renderContent(TABS.UPCOMING, upcoming)}
            {this._renderContent(TABS.INPROGRESS, inprogress)}
            {this._renderContent(TABS.COMPLETED, completed)}
          </Tabs> :
          <LoggedOutSection />
        }
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { credential = {}, asyncRequest, customer: { appointments = {} } = {} } = state;
  return {
    ...appointments,
    asyncRequest,
    credential,
  };
};
const mapDispatchToProps = dispatch => ({
  updateDetailAppointment: data => {
    dispatch({ type: CustomerTypes.CUSTOMER_UPDATE_STATE, data });
  },
  updateCustomer: data => dispatch({ type: CustomerTypes.CUSTOMER_UPDATE_STATE, data }),
  navigate: (route) => dispatch(navigate(route)),
  refresh: () => dispatch({ type: CustomerTypes.CUSTOMER_REFRESH_DATA }),
  fetchArtistWorkingTime: data => dispatch({ type: BookingTypes.FETCH_ARTIST_WORKING_TIME, data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsTab);
