import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();
function Provider({ children }) {
  const [update, setUpdate] = useState(false);
  const [total, settotal] = useState(0);

  function getTotalPriceFromCart() {
    const cartItems = JSON.parse(localStorage.getItem('carrinho'));

    const totalPrice = cartItems.reduce((acc, item) => {
      const { quantity, unitPrice } = item;
      return acc + (quantity * unitPrice);
    }, 0);
    settotal(totalPrice.toFixed(2));
    return totalPrice.toFixed(2);
  }

  const context = useMemo(
    () => ({
      update,
      setUpdate,
      getTotalPriceFromCart,
      total,
    }),
    [update],
  );

  Provider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}
export default Provider;
