import {StatusBar, StyleSheet} from 'react-native';
import {theme} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    padding: 8,
  },
  content: {
    backgroundColor: '#fff',
    padding: 10,
  },
  form: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    borderWidth: 3,
    height: '100%',
    justifyContent: 'center',
  },
  contentAvatar: {
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  avatar: {width: 100, height: 100, borderRadius: 100},
});
