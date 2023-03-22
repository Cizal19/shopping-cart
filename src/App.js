import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import {useSelector, useDispatch} from 'react-redux'
import { calculateTotals } from './features/cart/cartSlice';

function App() {
  const { cartItems } = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [dispatch, cartItems]);
  

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
