import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';

enum ActionType {
  SET_PATH = 'SET_PATH',
}

const initialState = {
  path: 'home',
};

export const setPath = createAction<string>(ActionType.SET_PATH);

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setPath, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.path = action.payload;
  });
});

export const store = configureStore({
  reducer,
});
