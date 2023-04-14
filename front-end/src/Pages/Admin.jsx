import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
// import './Admin.scss';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [users, setUsers] = useState([]);
  const [role, setrole] = useState('seller');
  const roles = ['seller', 'administrator', 'customer'];

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

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      role,
    };
    console.log(newUser);
    const user = JSON.parse(localStorage.getItem('user'));
    const { token } = user;
    console.log(token);
    try {
      await axios.post(
        'http://localhost:3001/register/admin',
        {
          newUser,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    validateInputs();
  }, [email, password, name]);

  return (
    <div className="Admin">
      <Navbar />
      <div className="Admin__container">
        <form onSubmit={ handleSubmit }>
          <label htmlFor="email">
            Nome
            <input
              data-testid="admin_manage__input-name"
              name="email"
              type="text"
              placeholder="Email"
              onChange={ (e) => setName(e.target.value) }
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              data-testid="admin_manage__input-email"
              name="email"
              type="text"
              placeholder="Email"
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              data-testid="admin_manage__input-password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>

          <label htmlFor="seller">
            Tipo de UsuÃ¡rio
            <select
              name="role"
              id="role"
              type="text"
              onChange={ (e) => setrole(e.target.value) }
              data-testid="admin_manage__select-role"
            >
              {roles.map((rol) => (
                <option key={ rol } value={ rol }>
                  {rol}
                </option>
              ))}
            </select>
          </label>

          <button
            data-testid="admin_manage__button-register"
            type="submit"
            disabled={ !isValid }
          >
            Cadastrar
          </button>
          {error && (
            <p data-testid="admin_manage__element-invalid-register">
              {error}
            </p>
          )}
        </form>

        <table>
          <thead>
            {/* <tr>
              <th>Item</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Excluir</th>
            </tr> */}
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={ user.id }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  {user.name}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  {user.email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  {user.role}
                </td>
                <td>
                  <button
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
