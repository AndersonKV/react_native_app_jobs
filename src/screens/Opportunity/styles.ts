import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    marginVertical: 20,
    height: 300,
    borderRightWidth: 2,
    borderColor: '#d3d3d3',
    zIndex: 10,
  },
  alignItem: {
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
  },
  sizeHeight: {
    height: '90%',
  },
  clearText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputBoxTech: {
    alignContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 20,
    borderWidth: 1,
  },
  boxSearch: {
    padding: 10,
    width: '15%',
    alignSelf: 'center',
  },
  inputSearch: {
    borderLeftWidth: 1,
    width: '85%',
    justifyContent: 'center',
  },
  inputTextSearch: {
    justifyContent: 'center',
    fontSize: 17,
    color: '#000',
    padding: 10,
    marginLeft: 10,
  },
  listTextTech: {
    borderWidth: 1,
    padding: 5,
    borderColor: '#d3d3d3',
    marginHorizontal: 20,
  },
  boxMessage: {
    marginVertical: 20,
    alignItems: 'center',
    borderColor: '#000',
    paddingVertical: 20,
  },
  span: {
    fontSize: 15,
    color: '#000',
  },
  contentAreaView: {
    height: 300,
    borderRightWidth: 1,
    borderColor: '#d3d3d3',
  },
});
