import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../../components/admin/OrderCard';
import AdminSideBar from '../../components/admin/AdminSideBar';
import checkLogin from '../../services/checkLogin';
import history from '../../services/history';
import '../../styles/AdminOrders.css';

const numberZero = 0;
const unauthorized = 401;
export default function AdminOrders() {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const token = checkLogin();

    const getOrders = async () => {
      const ordersData = await axios({
        baseURL: 'http://localhost:3001/sales',
        method: 'get',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: token },
      })
        .catch(({ response: { status } }) => status === unauthorized && history.push('/login'));
      return ordersData && setOrdersData(ordersData.data);
    };

    getOrders();
  }, [setOrdersData]);

  return (
    <div className="admin-orders-page-container">
      <AdminSideBar />
      <div className="admin-orders-content">
        <h1 className="admin-orders-header">Pedidos</h1>
        <div className="admin-orders-container">
          {ordersData && ordersData.length !== numberZero && ordersData.map((order, index) => (
            <div className="admin-orders-card" key={ order.saleId }>
              <OrderCard orders={ order } index={ index } />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
