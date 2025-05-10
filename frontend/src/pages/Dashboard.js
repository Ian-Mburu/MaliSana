import React from "react";
import '../styles/Dashboard/dashboard.css'
import { 
  FiHome, FiPieChart, FiDollarSign, FiTarget, 
  FiBell, FiCreditCard, FiTrendingUp, FiUser, FiSettings 
} from 'react-icons/fi';
import { FaMoneyBills } from "react-icons/fa6";



const Dashboard = () => {


  return (
    <div className="dash-1">
      <div className="header-1">
        <h5>Mali Sana</h5>
      </div>

      <div className="lists">
        <a href="home"> <FiHome /> Home</a>
        <a href="home"> <FiPieChart /> Budget</a>
        <a href="home"> <FiDollarSign /> Transactions</a>
        <a href="Savings"> <FiTarget /> Savings</a>
        <a href="bills"> <FaMoneyBills /> Bills</a>
        <a href="home"> <FiCreditCard /> Goals</a>
        <a href="investments"> <FiTrendingUp /> Investments</a>
        <a href="home"> <FiUser /> Profile</a>
        <a href="home"> <FiSettings /> Settings</a>
        <a href="login">Login</a>
        <FiBell /> 
      </div>
    </div>
  );
};

export default Dashboard;