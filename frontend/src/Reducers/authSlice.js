import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    accessToken: null,
    userId: null,
    username: null,
    history: 3
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      // state.accessToken = action.payload.accessToken;
    },
    setAccessToken: (state, action) => {
      // state.isAuthenticated = true;
      state.accessToken = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    }
  }
});

export const { login, setAccessToken, setUserId, setUsername, setHistory } = authSlice.actions;
export default authSlice.reducer;
