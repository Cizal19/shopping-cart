import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'


const initialState = {
  cartItems: cartItems,
  quantity: 10,
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
  }
})

export const { clearCart, removeItem, increaseAmount, decreaseAmount, calculateTotals } = cartSlice.actions

export default cartSlice.reducer