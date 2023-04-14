import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../Context/Context';
import './Card.css';

function Card({ card }) {
  const [quantity, setquantity] = useState('');
  const { setUpdate, update, getTotalPriceFromCart } = useContext(Context);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const index = cart.findIndex((item) => +item.productId === card.id);
    if (index >= 0) {
      setquantity(cart[index].quantity);
    } else {
      setquantity(0);
    }
  });
  const handleInput = ({ target: { id, value, name } }) => {
    if (+value < 0) {
      setquantity(0);
    } else {
      setquantity(+value);
    }
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    const index = cart.findIndex((item) => item.productId === id);
    if (index < 0) {
      const newItem = {
        productId: id,
        name,
        quantity: +value,
        unitPrice: +card.price,
      };
      cart.push(newItem);
    } else {
      cart[index].quantity = +value;
    }
    localStorage.setItem('carrinho', JSON.stringify(cart));
    setquantity();
    setUpdate(!update);
    getTotalPriceFromCart();
  };

  const handleAddProduct = ({ target: { id, name } }) => {
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    const index = cart.findIndex((item) => item.productId === id);
    if (index < 0) {
      const newItem = {
        productId: id,
        name,
        quantity: 1,
        unitPrice: +card.price,
      };
      cart.push(newItem);
    } else {
      cart[index].quantity = Number(cart[index].quantity) + Number(1);
    }
    localStorage.setItem('carrinho', JSON.stringify(cart));
    setquantity();
    setUpdate(!update);
    getTotalPriceFromCart();
  };

  const handleRemoveProduct = ({ target: { id } }) => {
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    const index = cart.findIndex((item) => item.productId === id);
    if (index >= 0 && cart[index].quantity > 0) {
      cart[index].quantity -= Number(1);
    }
    localStorage.setItem('carrinho', JSON.stringify(cart));
    setquantity();
    setUpdate(!update);
    getTotalPriceFromCart();
  };

  return (
    <div className="Card">
      <div className="Card__container">
        <div className="Card__container__top">
          <p data-testid={ `customer_products__element-card-price-${card.id}` }>
            {card.price.replace(/\./g, ',')}
          </p>
          <img
            data-testid={ `customer_products__img-card-bg-image-${card.id}` }
            src={ card.urlImage }
            alt={ card.name }
            style={ { width: '100px' } }
          />
        </div>
        <div className="Card__container__down">
          <h2
            data-testid={ `customer_products__element-card-title-${card.id}` }
            className="Card__title"
          >
            {card.name}
          </h2>
          <div className="Card__container-buttons">
            <button
              name={ card.name }
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${card.id}` }
              id={ card.id }
              onClick={ handleRemoveProduct }
            >
              -
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${card.id}` }
              type="number"
              min={ 0 }
              id={ card.id }
              name={ card.name }
              value={ +quantity }
              onChange={ handleInput }
              placeholder="0"
            />
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${card.id}` }
              id={ card.id }
              onClick={ handleAddProduct }
              price={ card.price }
              name={ card.name }
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
}.isRequired;

export default Card;
