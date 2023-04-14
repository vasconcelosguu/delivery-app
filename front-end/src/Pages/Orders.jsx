import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Descriptions from '../Components/Descriptions';
import { Context } from '../Context/Context';

function Orders() {
  const { update, setUpdate } = useContext(Context);
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [sellerName, setSellerName] = useState('');
  const [totalProducts, settotalProducts] = useState([]);
  function formatDate() {
    const date = new Date();
    return date.toLocaleDateString('pt-br');
  }

  const getOrder = async () => {
    const orderId = id;
    const sale = await axios.get(`http://localhost:3001/orders/${orderId}`);
    console.log(sale.data.sellerId, 'OBJETO DA SALE');
    setOrder(sale.data);
    const seller = await axios.post('http://localhost:3001/usersId', { id: sale.data.sellerId });
    console.log(seller, 'OBJETO Do seller');
    setSellerName(seller.data.name);
    const saleProduct = sale.data.id;
    const sales = await axios.post(
      'http://localhost:3001/saleproducts',
      { saleProduct },
    );

    console.log(sales.data);

    const totalProductsList = sales.data;
    console.log(totalProductsList, 'aqui');
    const totaltotal = totalProductsList.map(async (product) => {
      const productItem = await axios.get(`http://localhost:3001/products/${product.productId}`);
      productItem.data.quntity = product.quantity;
      return productItem.data;
    });
    const TotalPPP = await Promise.all(totaltotal);
    settotalProducts(TotalPPP);
  };

  useEffect(() => {
    getOrder();
  }, [update]);

  const handleChangeStatus = async (status) => {
    await axios.put(
      `http://localhost:3001/sales/${id}`,
      { status },
    );
    setUpdate(!update);
  };

  const status = 'customer_order_details__element-order-details-label-delivery-status';
  return (
    <main className="Checkout">
      <Navbar />
      <section className="Checkout__container">
        <h3>Detalhe do Pedido</h3>
        <form>
          <label
            htmlFor="id_order"
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            <p>{order.id}</p>
          </label>
          <label
            htmlFor="id_seller"
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            <p>{sellerName}</p>
          </label>
          <label
            htmlFor="sale_date"
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { formatDate() }
          </label>
          <button
            data-testid={ status }
            type="button"
          >
            {order.status}
          </button>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
            disabled={ order.status !== 'Em Trânsito' }
            onClick={ () => handleChangeStatus('Entregue') }
          >
            MARCAR COMO ENTREGUE
          </button>
        </form>
        <table>
          <thead>
            <Descriptions />
          </thead>
          <tbody>
            {totalProducts.map((item, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1 }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {item.quntity}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {item.price}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {(item.price * item.quntity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          data-testid="customer_order_details__element-order-total-price"
          type="button"
        >
          {((totalProducts.reduce((acc, item) => {
            const { quntity, price } = item;
            return acc + (quntity * price);
          }, 0)).toFixed(2).toString().replace(/\./g, ','))}

        </button>
      </section>
    </main>
  );
}

export default Orders;
