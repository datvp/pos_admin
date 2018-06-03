import React, { PureComponent } from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash/fp';

import { CustomerTypes as CustomersTypes } from '../Redux/Customers';
import { navigate } from '../Helpers';
import { NavBar } from '../Components';
import { LoggedOutSection } from '../Containers';
import styles from './Styles/CustomerTab';
import { Images } from '../Themes';

class CustomerTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lastItemIndex: 0,
      data: [],
    };
  }

  componentDidMount(){
    const { data = [] } = this.state;
    if (isEmpty(data)) {
      this._onRefresh();
    }
  }
  _onRefresh = () => {
    const { lastItemIndex } = this.state;
    this.props.refreshCustomers({ lastItemIndex });

    const {
      customers = [],      
    } = this.props;

    this.setState({
      lastItemIndex: this.state.data.length + 3,
      data: this.state.data.concat(customers),
    });
  }

  _renderContent = () => {
    const {
      asyncRequest: { reqSending } = {},
    } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
        refreshControl={
          <RefreshControl
            refreshing={reqSending === CustomersTypes.CUSTOMERS_REFRESH_DATA}
            onRefresh={this._onRefresh}
          />
        }
      >
        {/* <View style={styles.avatarContainer}>
          <FastImage
            style={styles.avatar}
            source={isEmpty(avatar) ? Images.avatarDefault : { uri: avatar }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View> */}
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <Text key={item.s_ID}>{item.s_Name}</Text>}
          />
        </View>
      </ScrollView>
    );
  }

  render() {
    const {
      credential: { token }
    } = this.props;
    const isLoggedIn = !isEmpty(token);

    return (
      <Container style={styles.mainContainer}>
        <NavBar
          title='Customers'
          showBackButton={false}
          navigation={this.props.navigation}
        />
        { isLoggedIn ? this._renderContent() : <LoggedOutSection /> }
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { credential, asyncRequest, customers } = state;
  return { credential, asyncRequest, customers };
};
const mapDispatchToProps = dispatch => ({
  fetchCustomers: data => dispatch({ type: CustomersTypes.CUSTOMERS_UPDATE_STATE, data }),
  refreshCustomers: data => dispatch({ type: CustomersTypes.CUSTOMERS_REFRESH_DATA, data }),
  navigate: (route) => dispatch(navigate(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTab);
