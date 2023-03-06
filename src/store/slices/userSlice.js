import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem(process.env.REACT_APP_TOKEN);
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.data;

export const keepLogin = (token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/keep-login`,
      {},
      { headers: { Authorization: token } }
    );

    localStorage.setItem(process.env.REACT_APP_TOKEN, res.data.token);
    dispatch(login(res.data.data));
  } catch (error) {
    localStorage.removeItem(process.env.REACT_APP_TOKEN);
    console.log(error);
  }
};

export default userSlice.reducer;
