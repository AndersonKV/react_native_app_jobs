import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        fontWeight: '300',
    },
    modalView: {
        width: '100%',
        opacity: 5,
        backgroundColor: '#fff',
        padding: 35,
        alignItems: 'center',
        height: '100%',
    },

    textStyle: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontWeight: '300',
        textAlign: 'center',
        color: '#000',
        fontSize: 20,
    },
});
