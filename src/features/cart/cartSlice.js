import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from '../../cartItems'

const url = "https://course-api.com/react-useReducer-cart-project"

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
});

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
  isLoading: true,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
      state.quantity = 0
    },
    removeItem : (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increaseAmount : (state, {payload}) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount + 1
    },
    decreaseAmount: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotals : (state) => {
      let quantity = 0
      let total = 0
      state.cartItems.forEach(item => {
        quantity += item.amount
        total += item.amount * item.price
      })
      state.quantity = quantity
      state.total = total
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false
    }
  }
})

export const { clearCart, removeItem, increaseAmount, decreaseAmount, calculateTotals } = cartSlice.actions

export default cartSlice.reducer