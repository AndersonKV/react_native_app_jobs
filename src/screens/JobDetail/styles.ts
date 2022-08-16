import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    flex: 1,
    height: '100%',
  },
  insideBackground: {
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  contentListTech: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
    alignContent: 'center',
    width: '90%',
  },
  tech: {
    padding: 8,
    margin: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 5,
    color: '#fff',
  },
  content: {
    padding: 30,
  },
  subTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  titleExpired: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'red',
  },
  containerExpired: {
    borderWidth: 1,
    borderColor: 'red',
    width: 150,
    alignSelf: 'center',
    padding: 6,
  },
  viewExpired: {
    width: '100%',
    height: '100%',
  },
  spanExpired: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    opacity: 1,
    width: '100%',
    borderWidth: 2,
    shadowColor: 'green',
    backgroundColor: theme.colors.darkDesaturatedBlue,
  },
});
