import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

function SellerOrders() {
  const navigate = useNavigate();
  const sellerId = JSON.parse(localStorage.getItem('userID'));
  const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchSales = async () => {
    const response = await axios.post(
      'http://localhost:3001/salesGetSeller',
      { sellerId },
    );
    console.log(response);
    setOrders(response.data.salesSeller);
    setisLoading(false);
  };
  function formatDate(param) {
    const date = new Date(param);
    return date.toLocaleDateString('pt-br');
  }
  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="SellerOrders">
      <Navbar />
      {isLoading ? (
        'Carrengado...'
      ) : (
        <div className="SellerOrders__container">
          {orders.map === []
            ? 'Você não tem pedidos'
            : orders.map((order) => (
              <div
                onKeyDown={ (e) => {
                  if (e.key === 'Enter') {
                    console.log('Enter key pressed!');
                  }
                } }
                role="button"
                tabIndex="0"
                data
                onClick={ () => navigate(`/seller/orders/${order.id}`) }
                className="SellerOrders__container__order"
                key={ `order-${order.id}` }
              >
                <div className="Order_left">
                  <p data-testid={ `seller_orders__element-order-id-${order.id}` }>
                    {order.id}
                  </p>
                </div>
                <div className="Order_center">
                  <p
                    data-testid={ `seller_orders__element-delivery-status-${order.id}` }
                  >
                    {order.status}
                  </p>
                  <p data-testid={ `seller_orders__element-card-address-${order.id}` }>
                    {`${order.deliveryAddress} , ${order.deliveryNumber}` }
                  </p>
                </div>
                <div className="Order_right">
                  <p
                    data-testid={ `seller_orders__element-order-date-${order.id}` }
                  >
                    {formatDate(order.saleDate)}

                  </p>
                  <p
                    data-testid={ `seller_orders__element-card-price-${order.id}` }
                  >
                    {order.totalPrice.replace(/\./g, ',')}

                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SellerOrders;
