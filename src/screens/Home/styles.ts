import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
    contentBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    contentButtons: {
        zIndex: 10,
        backgroundColor: '#fff',
        width: '100%',
        padding: 30,
    },
});
