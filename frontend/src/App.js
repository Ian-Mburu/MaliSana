import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Bills from './pages/Bills';
import Home from './pages/Home';
import Savings from './pages/Savings';
import ProtectedRoute from './components/common/ProtectedRoute';
import Categories from './pages/Categories';

import ErrorBoundary from '../src/components/error/ErrorBoundary'



function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/bills" element={<Bills />} />
          <Route path='/home' element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/categories" element={<Categories />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;