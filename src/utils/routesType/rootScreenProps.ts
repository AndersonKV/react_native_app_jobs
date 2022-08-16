import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  RootStackParamList,
  RootStackParamJobDetail,
  RootStackParamHome,
  RootStackParamSignIn,
  RootStackParamApply,
  RootStackParamSignOut,
  RootStackParamError,
  RootStackParamModal,
  RootStackParamOpportunity,
  RootStackParamEdit,
  RootStackParamDashboard,
  RootStackParamJobList,
  RootStackParamPublish,
} from './rootStackParams';

export type ScreenHome = NativeStackScreenProps<RootStackParamHome>;
export type ScreenSignIn = NativeStackScreenProps<RootStackParamSignIn>;
export type TabScreenList = NativeStackScreenProps<RootStackParamList>;
export type ScreenJobDetail = NativeStackScreenProps<RootStackParamJobDetail>;

export type ScreenApply = NativeStackScreenProps<RootStackParamApply>;
export type ScreenSignOut = NativeStackScreenProps<
  RootStackParamSignOut,
  'HomeStack'
>;

export type ScreenError = NativeStackScreenProps<RootStackParamError>;

export type PropsModal = NativeStackNavigationProp<RootStackParamModal>;

export type ScreenOpportunity =
  NativeStackScreenProps<RootStackParamOpportunity>;

export type ScreenPublish = NativeStackScreenProps<RootStackParamPublish>;

export type ScreenEdit = NativeStackScreenProps<
  RootStackParamEdit,
  'AuthStack'
>;

export type ScreenDashboard = NativeStackScreenProps<RootStackParamDashboard>;
export type ScreenJobList = NativeStackScreenProps<RootStackParamJobList>;
