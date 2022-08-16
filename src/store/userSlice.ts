import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../utils/types';

type SelectAuth = {
  auth: {
    user: UserInterface;
    isLogged: boolean;
    token: string;
  };
  logout: {
    user: UserInterface;
    isLogged: boolean;
    token: string;
  };
};

type TypeAction = {
  payload: {
    user: UserInterface;
    token: string;
  };
  type: string;
};
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLogged: false,
    token: '',
  },
  reducers: {
    auth(state: { user: {} }, action: TypeAction) {
      return {
        ...state,
        isLogged: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
    logout(state: {}) {
      return { ...state, isLogged: false, user: {}, token: '' };
    },
  },
});

export const { logout, auth } = userSlice.actions;

export const selectAuth = (state: SelectAuth) => state.auth;

export default userSlice.reducer;
