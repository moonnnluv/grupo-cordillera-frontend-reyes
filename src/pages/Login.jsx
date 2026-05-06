import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setGlobalError('')
  }

  const validate = () => {
    const newErrors = {}
    if (!form.username.trim()) newErrors.username = 'El usuario es obligatorio'
    else if (form.username.trim().length < 3) newErrors.username = 'Mínimo 3 caracteres'
    if (!form.password) newErrors.password = 'La contraseña es obligatoria'
    else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalError('')
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    try {
      const response = await api.post('/api/auth/login', form)
      console.log('Respuesta login:', response.data)

      const token = response.data.token
      const user = response.data.user

      if (!token || !user) {
        setGlobalError('Respuesta inesperada del servidor.')
        return
      }

      login(user, token)
      navigate('/dashboard')
    } catch (err) {
      console.error('Error login:', err)
      if (err.response?.status === 401 || err.response?.status === 403) {
        setGlobalError('Usuario o contraseña incorrectos')
      } else if (err.response?.data?.message) {
        setGlobalError(err.response.data.message)
      } else if (!err.response) {
        setGlobalError('No se pudo conectar con el servidor.')
      } else {
        setGlobalError(`Error ${err.response?.status ?? 'desconocido'}. Intenta nuevamente.`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Grupo Cordillera</h1>
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Iniciar sesión</h2>

        {globalError && (
          <div className="bg-red-50 border border-red-300 text-red-600 text-sm rounded px-3 py-2 mb-4">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Usuario</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                errors.username ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-400'
              }`}
              placeholder="tu_usuario"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-400'
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-60"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}