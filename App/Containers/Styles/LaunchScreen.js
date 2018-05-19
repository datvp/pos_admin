import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.bgLaunchScreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...ApplicationStyles.textLight,
    fontSize: 16,
    marginTop: 15,
  }
})
