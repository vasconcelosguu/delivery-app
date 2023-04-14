import React, { useContext, useEffect } from 'react';

import Navbar from '../Components/Navbar';
import Descriptions from '../Components/Descriptions';
import { Context } from '../Context/Context';
import Address from '../Components/Address';

function Checkout() {
  const { total, update, setUpdate, getTotalPriceFromCart } = useContext(Context);
  const cart = JSON.parse(localStorage.getItem('carrinho')) || [];

  useEffect(() => {
  }, [total]);

  const handleRemove = ({ target: { id } }) => {
    const cartL = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (cartL !== []) {
      const newCart = cartL.filter((item) => item.productId !== id);
      localStorage.setItem('carrinho', JSON.stringify(newCart));
      getTotalPriceFromCart();
      setUpdate(!update);
    } else {
      console.log('empety');
    }
  };
  return (
    <main className="Checkout">
      <Navbar />
      <section className="Checkout__container">
        <h3>Finalizar Pedido</h3>
        <table>
          <thead>
            <Descriptions />
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={ index }>
                {console.log(item, 'ITEM')}
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {item.unitPrice.toFixed(2).toString().replace(/\./g, ',')}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {(item.unitPrice * item.quantity)
                    .toFixed(2)
                    .replace(/\./g, ',')}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                >
                  <button
                    type="button"
                    id={ item.productId }
                    onClick={ handleRemove }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          data-testid="customer_checkout__element-order-total-price"
          type="button"
        >
          {total.replace(/\./g, ',')}
        </button>
        <h1>Detalhes e Endereço para Entrega</h1>
        <Address />
      </section>
    </main>
    // teste
  );
}

export default Checkout;
