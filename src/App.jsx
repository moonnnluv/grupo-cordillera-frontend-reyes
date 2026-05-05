import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdminGeneral from './pages/DashboardAdminGeneral';
import DashboardAdminSucursal from './pages/DashboardAdminSucursal';
import DashboardVendedor from './pages/DashboardVendedor';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const DashboardRouter = () => {
  const { user } = useAuth();
  if (user?.role === 'ADMIN_GENERAL')  return <Navigate to="/dashboard/admin-general" replace />;
  if (user?.role === 'ADMIN_SUCURSAL') return <Navigate to="/dashboard/admin-sucursal" replace />;
  if (user?.role === 'VENDEDOR')       return <Navigate to="/dashboard/vendedor" replace />;
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"        element={<Login />} />
        <Route path="/register"     element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardRouter /></ProtectedRoute>
        } />

        <Route path="/dashboard/admin-general" element={
          <ProtectedRoute allowedRoles={['ADMIN_GENERAL']}>
            <DashboardAdminGeneral />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/admin-sucursal" element={
          <ProtectedRoute allowedRoles={['ADMIN_SUCURSAL']}>
            <DashboardAdminSucursal />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/vendedor" element={
          <ProtectedRoute allowedRoles={['VENDEDOR']}>
            <DashboardVendedor />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;