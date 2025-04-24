import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import SpendingChart from '../components/dashboard/SpendingChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import BudgetProgres from '../components/dashboard/BudgetProgres'


const Dashboard = () => {
  const [data, setData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      const [dashboard, transactions] = await Promise.all([
        api.getDashboard(),
        api.getTransactions()
      ]);
      setData({ ...dashboard.data, transactions: transactions.data });
    };
    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-8">
      <DashboardSummary 
        savings={data.total_savings}
        spending={data.monthly_spending}
        debt={data.total_debt}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SpendingChart data={data.transactions} />
        <BudgetProgres budgets={data.active_budgets} />
      </div>

      <RecentTransactions transactions={data.transactions.slice(0, 5)} />
    </div>
  );
};

export default Dashboard;