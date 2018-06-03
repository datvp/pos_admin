import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {
  StackNavigator,
  SwitchNavigator,
  TabNavigator,
  addNavigationHelpers,
} from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';

import { isIOS } from '../Helpers';
import { ROUTES } from '../Constants';
import {
  LaunchScreen,
  LoginScreen,
  SignupScreen,
  HomeTab,
  ReportsTab,
  InstocksTab,
  AccountTab,
  MyAccount,
  CustomerTab,
  ForgotPasswordScreen,
} from '../Containers';
import { CustomIcon } from '../Components';
import { Colors } from '../Themes';
import styles from './Styles/Navigation';

// Navigator for 4 main bottom tabs
const DashboardNavigator = TabNavigator(
  {
    [ROUTES.HOME]: {
      screen: HomeTab,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: ({ focused, tintColor }) => (
          <CustomIcon
            style={styles.bottomTabIcon}
            name="home"
            color={tintColor}
          />
        ),
      },
    },
    [ROUTES.REPORTS]: {
      screen: ReportsTab,
      navigationOptions: {
        title: 'Reports',
        tabBarIcon: ({ focused, tintColor }) => (
          <CustomIcon
            style={styles.bottomTabIcon}
            name="reports"
            color={tintColor}
          />
        ),
      },
    },
    [ROUTES.INSTOCKS]: {
      screen: InstocksTab,
      navigationOptions: {
        title: 'Instocks',
        tabBarIcon: ({ focused, tintColor }) => (
          <CustomIcon
            style={styles.bottomTabIcon}
            name="instocks"
            color={tintColor}
          />
        ),
      },
    },
    [ROUTES.CUSTOMER]: {
      screen: CustomerTab,
      navigationOptions: {
        title: 'Customer',
        tabBarIcon: ({ focused, tintColor }) => (
          <CustomIcon
            style={styles.bottomTabIcon}
            name="customer"
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: ROUTES.HOME,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    lazy: true,
    removeClippedSubviews: true,
    tabBarOptions: {
      activeTintColor: Colors.activeBottomTab,
      inactiveTintColor: Colors.textMain,
      tabStyle: styles.bottomTabItem,
      style: styles.bottomTabBar,
      labelStyle: styles.bottomTabLabel,
      upperCaseLabel: false,
      showIcon: true,
      indicatorStyle: styles.bottomTabIndicator,
    },
  },
);

// Navigator for main screens
const MainNavigator = StackNavigator(
  {
    [ROUTES.DASHBOARD]: DashboardNavigator,
    [ROUTES.LOGIN]: LoginScreen,
    [ROUTES.SIGNUP]: SignupScreen,
    [ROUTES.FORGOT_PASSWORD]: ForgotPasswordScreen,
  },
  {
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
    initialRouteName: ROUTES.DASHBOARD,
    navigationOptions: {
      header: null,
    },
  },
);

export const AppNavigator = SwitchNavigator(
  {
    [ROUTES.LAUNCH]: LaunchScreen,
    [ROUTES.MAIN]: MainNavigator,
  },
  {
    initialRouteName: ROUTES.LAUNCH,
  },
);

class AppNavigation extends React.Component {
  componentWillMount() {
    if (isIOS()) return;
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props;
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (
        nav.routes.length === 1 &&
        nav.routes[0].routeName === ROUTES.LAUNCH
      ) {
        return false;
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' });
      return true;
    });
  }

  componentWillUnmount() {
    if (isIOS()) return;
    BackHandler.removeEventListener('hardwareBackPress');
  }

  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener: createReduxBoundAddListener('root'),
        })}
      />
    );
  }
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(AppNavigation);
