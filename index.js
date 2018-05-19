import './App/Config/ReactotronConfig'
import { AppRegistry, YellowBox } from 'react-native'
import App from './App/Containers/App'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RCTMFBLoginManager',
  'Module RNGoogleSignin',
  'Module RNFetchBlob',
  ]);
AppRegistry.registerComponent('POS_Admin', () => App)
