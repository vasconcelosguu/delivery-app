import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

function ShoppingCart() {
  const navigate = useNavigate();
  const { update, total, getTotalPriceFromCart } = useContext(Context);

  useEffect(() => {
    getTotalPriceFromCart();
  }, [update]);
  return (
    <div className="ShoppingCart">
      <div className="ShoppingCart__container">
        <button
          onClick={ () => navigate('/customer/checkout') }
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ +total === 0 }
        >
          <p data-testid="customer_products__checkout-bottom-value">
            {(total.toString(2)).replace(/\./g, ',')}
          </p>
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
