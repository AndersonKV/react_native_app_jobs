import { createSlice } from '@reduxjs/toolkit';
import { JobInterface } from '../utils/types';

type SelectJob = {
  data: {
    jobs: JobInterface[];
  };
};

type TypeAction = {
  payload: {
    jobs: JobInterface;
  };
  type: string;
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: {},
  },
  reducers: {
    setData(state: { jobs: {} }, action: TypeAction) {
      return { ...state, jobs: action.payload.jobs };
    },
  },
});

export const { setData } = jobSlice.actions;

export const selectJob = (state: SelectJob) => state.data;

export default jobSlice.reducer;
