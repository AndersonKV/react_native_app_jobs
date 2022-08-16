import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  areaView: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  contentAvatar: {
    alignItems: 'center',
    marginVertical: 20,
    paddingBottom: getBottomSpace() + 16,
  },
  marginAvatar: {
    marginVertical: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000',
  },
  scrollView: {
    width: '100%',
  },
  viewCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
