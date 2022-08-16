import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
    width: '85%',
    borderBottomWidth: 2,
    height: 50,
    borderColor: '#d3d3d3',
  },
  inputMultLine: {
    width: '85%',
    height: 80,
    borderWidth: 1,
  },
  inputFocus: {
    marginVertical: 10,
    backgroundColor: '#fff',
    width: '85%',
    borderBottomWidth: 1,
    height: 50,
    borderColor: '#DC1637',
  },
  contentFocus: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderEndColor: '#DC1637',
  },
  boxIcon: {
    width: '15%',
    borderWidth: 1,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
});
