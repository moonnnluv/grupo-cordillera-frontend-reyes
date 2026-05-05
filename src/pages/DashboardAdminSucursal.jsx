import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const DashboardAdminSucursal = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState({ datos: [], kpis: [], reportes: [] });
  const [loading, setLoading] = useState(true);
  const sucursal = 'SANTIAGO';

  useEffect(() => {
    api.get(`/bff/dashboard/sucursal/${sucursal}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Grupo Cordillera</h1>
          <p className="text-sm text-green-200">Panel Administrador de Sucursal</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">👤 {user?.username}</span>
          <span className="bg-green-600 text-xs px-2 py-1 rounded">{user?.role}</span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Sucursal: {sucursal}
        </h2>

        {loading ? (
          <p className="text-gray-400">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-gray-500 text-sm mb-1">KPIs de mi sucursal</h3>
              <p className="text-4xl font-bold text-green-600">{data.kpis.length}</p>
              <p className="text-gray-400 text-sm mt-1">indicadores activos</p>
            </div>
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-gray-500 text-sm mb-1">Reportes de mi sucursal</h3>
              <p className="text-4xl font-bold text-purple-600">{data.reportes.length}</p>
              <p className="text-gray-400 text-sm mt-1">reportes generados</p>
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-gray-400">
          Acceso limitado a sucursal {sucursal}
        </p>
      </div>
    </div>
  );
};

export default DashboardAdminSucursal;