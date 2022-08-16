import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
  },
  clearButton: {
    width: 80,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 2,
    marginVertical: 24,
    padding: 8,
  },
  clearText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  boxMessage: {
    alignItems: 'center',
    borderColor: '#000',
    paddingVertical: 10,
  },
  flatList: {
    marginVertical: 20,
    height: 300,

    borderColor: '#d3d3d3',
    shadowColor: '#000',
    zIndex: 10,
  },
  textSpan: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
