import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    borderColor: '#d3d3d3',
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
    padding: 10,
    alignSelf: 'center',
  },
  content: {
    flexDirection: 'column',
    padding: 5,
    width: '100%',
  },
  viewWraped: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewExpired: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    height: '100%',
  },
  textExpired: {
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
  listTech: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
    alignContent: 'center',
    width: '100%',
  },
  textTech: {
    padding: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
    marginRight: 5,
  },
  div: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  span: {
    marginHorizontal: 5,
  },
  title: {
    color: '#000',
    fontSize: 15,
    marginVertical: 10,
  },
});
