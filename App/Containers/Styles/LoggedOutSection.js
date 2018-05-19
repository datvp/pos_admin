import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.bgScreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...ApplicationStyles.textBold,
    fontSize: 16,
  },
  emptyButton: {
    ...ApplicationStyles.buttonMain,
    paddingVertical: 7,
    paddingHorizontal: 40,
    marginTop: 15,
  },
  emptyButtonText: {
    ...ApplicationStyles.textLight,
    fontWeight: 'normal',
    fontSize: 14,
  },
})
