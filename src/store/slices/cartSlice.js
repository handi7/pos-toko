import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
  },
  reducers: {
    fillCart: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fillCart } = cartSlice.actions;
export const selectCart = (state) => state.cart.data;

export const getCart = (userId) => async (dispatch) => {
  try {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
    const res = await axios.get(`${api}/cart/${userId}`, {
      headers: { Authorization: token },
    });

    dispatch(fillCart(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
    await axios.post(api + "/cart", data, {
      headers: { Authorization: token },
    });
    message.success(`Product successfully added to cart`);
    dispatch(getCart(data?.user_id));
  } catch (error) {}
};

export const updateCart = (userId, data) => async (dispatch) => {
  try {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
    await axios.patch(api + "/cart", data, {
      headers: { Authorization: token },
    });

    dispatch(getCart(userId));
  } catch (error) {}
};

export const deleteCart = (userId, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
    await axios.delete(api + "/cart/" + id, {
      headers: { Authorization: token },
    });
    dispatch(getCart(userId));
  } catch (error) {}
};

export default cartSlice.reducer;
