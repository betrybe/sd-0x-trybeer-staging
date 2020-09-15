import { useState, useEffect } from 'react';

const numberZero = 0;
export default function useRefreshTotalPrice(sensorVariable) {
  const [totalPrice, setTotalPrice] = useState(numberZero);

  useEffect(() => {
    const refreshTotalPrice = () => {
      const currentCart = JSON.parse(localStorage.getItem('cart'));
      const cartTotalPrice = currentCart ? currentCart.reduce((total,
        { totalValue }) => total + totalValue, numberZero) : numberZero;
      setTotalPrice(cartTotalPrice);
    };
    refreshTotalPrice();
  }, [setTotalPrice, sensorVariable]);

  return totalPrice;
}
