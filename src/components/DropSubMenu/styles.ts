import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputText: {
    fontWeight: 'bold',
    backgroundColor: '#3f5460',
    padding: 10,
    color: '#fff',
  },
  content: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    padding: 10,
    flexWrap: 'wrap',
  },
  insideContent: {},
  button: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  activeButton: {
    backgroundColor: '#d3d',
  },
  desactiveButton: {
    backgroundColor: '#fff',
  },
  activeText: {
    color: '#fff',
  },
  desactiveText: {
    color: '#000',
  },
});
