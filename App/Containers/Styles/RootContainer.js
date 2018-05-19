import {StyleSheet} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'

export default StyleSheet.create({
  applicationView: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: Colors.bgStatusBar,
    height: Metrics.statusBarHeight,
  },
})
