import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3001/register',
        {
          name,
          email,
          password,
        },
      );
      navigate('/customer/products');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const validateInputs = () => {
    const MIN_PASSWORD_LENGTH = 6;
    const MIN_NAME = 12;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailIsValid = emailRegex.test(email);
    if (
      password.length >= MIN_PASSWORD_LENGTH
      && emailIsValid
      && name.length >= MIN_NAME
    ) {
      setIsValid(true);
    }
  };

  useEffect(() => {
    validateInputs();
  }, [email, password, name]);

  return (
    <div className="register">
      <form onSubmit={ handleSubmit }>
        <h1>Nova conta:</h1>

        <label htmlFor="nome">
          Nome
          <input
            data-testid="common_register__input-name"
            name="nome"
            type="text"
            placeholder="Seu nome"
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_register__input-email"
            name="email"
            type="email"
            placeholder="email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="passowrd">
          Password
          <input
            data-testid="common_register__input-password"
            name="password"
            type="password"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="submit"
          disabled={ !isValid }
        >
          Cadastrar
        </button>

        {error && (
          <p
            data-testid="common_register__element-invalid_register"
            className="error"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;
