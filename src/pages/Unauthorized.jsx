import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow p-10 text-center max-w-md">
        <p className="text-6xl mb-4">🚫</p>
        <h1 className="text-3xl font-bold text-red-500 mb-2">Acceso denegado</h1>
        <p className="text-gray-500 mb-6">
          No tienes permisos para acceder a esta sección.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Volver al login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;