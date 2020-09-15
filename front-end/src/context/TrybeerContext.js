import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TrybeerContext = createContext();

const numberZero = 0;
export default function TrybeerProvider({ children }) {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [totalQty, setTotalQty] = useState(numberZero);
  const [ordersData, setOrdersData] = useState([]);

  const toggleSideMenu = () => setShowSideMenu(!showSideMenu);
  const store = {
    sideMenu: [showSideMenu, setShowSideMenu, toggleSideMenu],
    shopCart: [totalQty, setTotalQty],
    ordersAdminPage: [ordersData, setOrdersData],
  };

  return <TrybeerContext.Provider value={ store }>{children}</TrybeerContext.Provider>;
}

TrybeerProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
