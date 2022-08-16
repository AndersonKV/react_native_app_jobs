import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    background: '#F5F5F5',
    backgroundRegister: '#151e26',
    backgroundSubmit: '#0095f6',
    surface_primary: '#18181B',
    surface_secondary: '#27272A',
    backgroundForm: '#2A3F54',
    text_primary: '#F4F4F5',
    text_secondary: '#A1A1AA',
    text_on_brand_color: '#FFFFFF',

    gray: '#696969',
    black: '#000',
    activeTab: '#0095f6',
    darkDesaturatedBlue: '#34495E',
  },
  labels: {
    bottomFontSize: 15,
    bold: 'bold',
  },
  fonts: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
  },
};

export const styleForm = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    width: '100%',
  },
  content: {
    backgroundColor: '#fff',
    padding: 10,
  },
  form: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    borderWidth: 3,
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 15,
  },
  brandRed: {
    color: 'red',
  },
});
