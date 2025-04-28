import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import SpendingChart from '../components/dashboard/SpendingChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import BudgetProgres from '../components/dashboard/BudgetProgres'


const Dashboard = () => {
  const [data, setData] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
  
    const loadData = async () => {
      try {
        const [dashboard, transactions] = await Promise.all([
          api.get('/dashboard/', { signal: controller.signal }),
          api.get('/transactions/', { signal: controller.signal })
        ]);
        
        if (isMounted) {
          setData({
            total_savings: dashboard.data.total_savings,
            monthly_spending: dashboard.data.monthly_spending,
            total_debt: dashboard.data.total_debt,
            transactions: transactions.data,
            active_budgets: dashboard.data.active_budgets,
            pending_bills: dashboard.data.pending_bills
          });
        }
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
        }
      }
    };
  
    if (user) loadData();
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [user, logout]);

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