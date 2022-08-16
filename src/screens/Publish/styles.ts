import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    width: '100%',
  },
  content: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 20,
  },
  form: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    height: '100%',
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
  backgroundTop: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: 'red',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
