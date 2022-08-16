import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: theme.colors.darkDesaturatedBlue,
    width: 150,
    padding: 10,
    margin: 10,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
