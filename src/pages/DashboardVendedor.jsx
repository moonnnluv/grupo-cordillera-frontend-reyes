import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const DashboardVendedor = () => {
  const { user, logout } = useAuth();
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/kpi/tipo/VENTAS')
      .then(res => setKpis(res.data))
      .catch(err => console.error('Error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-orange-700 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Grupo Cordillera</h1>
          <p className="text-sm text-orange-200">Panel Vendedor</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">👤 {user?.username}</span>
          <span className="bg-orange-600 text-xs px-2 py-1 rounded">{user?.role}</span>
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
          Mis KPIs de Ventas
        </h2>

        {loading ? (
          <p className="text-gray-400">Cargando...</p>
        ) : kpis.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-5 text-gray-400">
            No hay KPIs de ventas registrados aún.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow divide-y">
            {kpis.map(k => (
              <div key={k.id} className="px-5 py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">{k.nombre}</p>
                  <p className="text-xs text-gray-400">{k.fecha} · {k.sucursal ?? 'General'}</p>
                </div>
                <span className="text-green-600 font-bold text-lg">
                  {k.valor} {k.unidad}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 text-xs text-gray-400">
          Acceso limitado — solo indicadores de ventas
        </p>
      </div>
    </div>
  );
};

export default DashboardVendedor;