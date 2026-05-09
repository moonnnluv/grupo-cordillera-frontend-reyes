import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const STATS = [
  { value: '3', label: 'Microservicios' },
  { value: '4', label: 'Sucursales' },
  { value: '∞', label: 'Datos en tiempo real' },
]

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
    const e = {}
    if (!form.username.trim()) e.username = 'Usuario obligatorio'
    else if (form.username.trim().length < 3) e.username = 'Mínimo 3 caracteres'
    if (!form.password) e.password = 'Contraseña obligatoria'
    else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalError('')
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }
    setLoading(true)
    try {
      const response = await api.post('/api/auth/login', form)
      const { token, user } = response.data
      if (!token || !user) { setGlobalError('Respuesta inesperada del servidor.'); return }
      login(user, token)
      navigate('/dashboard')
    } catch (err) {
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
    <div style={{
      display: 'flex', minHeight: '100vh',
      fontFamily: "'DM Sans', system-ui, sans-serif"
    }}>
      {/* Left panel - brand */}
      <div className="auth-brand-panel" style={{
        width: '45%', minHeight: '100vh',
        background: 'linear-gradient(160deg, #0b0f1a 0%, #111827 50%, #0b0f1a 100%)',
        display: 'flex', flexDirection: 'column',
        padding: '48px',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '80px', left: '-40px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'auto' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #818cf8, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', fontWeight: '800', color: '#fff',
            boxShadow: '0 0 24px rgba(129,140,248,0.4)'
          }}>G</div>
          <span style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.4px' }}>
            Grupo Cordillera
          </span>
        </div>

        {/* Main copy */}
        <div style={{ marginTop: '64px', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px', borderRadius: '20px',
            border: '1px solid rgba(129,140,248,0.3)',
            color: '#818cf8', fontSize: '11px', fontWeight: '600',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            Plataforma de monitoreo
          </div>
          <h2 style={{
            color: '#f1f5f9', fontSize: '36px', fontWeight: '800',
            lineHeight: 1.15, letterSpacing: '-1px', margin: '0 0 16px',
          }}>
            Datos en tiempo real para decisiones más inteligentes
          </h2>
          <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Consolida tus indicadores de ventas, inventario y finanzas en una sola plataforma.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ color: '#818cf8', fontSize: '26px', fontWeight: '800', letterSpacing: '-1px' }}>
                {s.value}
              </div>
              <div style={{ color: '#334155', fontSize: '11px', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#f8fafc', padding: '48px'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <h1 style={{
            fontSize: '26px', fontWeight: '800', color: '#0f172a',
            letterSpacing: '-0.6px', margin: '0 0 6px'
          }}>Bienvenido de nuevo</h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 32px' }}>
            Ingresa tus credenciales para continuar
          </p>

          {globalError && (
            <div style={{
              padding: '12px 14px', borderRadius: '10px', marginBottom: '20px',
              backgroundColor: '#fff1f2', border: '1px solid #fecdd3',
              color: '#e11d48', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <span>⚠</span> {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Usuario
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="tu_usuario"
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px', boxSizing: 'border-box',
                  border: `1.5px solid ${errors.username ? '#f87171' : '#e2e8f0'}`,
                  backgroundColor: '#fff', fontSize: '14px', color: '#0f172a',
                  outline: 'none', transition: 'border-color 0.15s',
                  fontFamily: 'inherit'
                }}
                onFocus={e => e.target.style.borderColor = '#818cf8'}
                onBlur={e => e.target.style.borderColor = errors.username ? '#f87171' : '#e2e8f0'}
              />
              {errors.username && <p style={{ color: '#e11d48', fontSize: '12px', margin: '4px 0 0' }}>{errors.username}</p>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px', boxSizing: 'border-box',
                  border: `1.5px solid ${errors.password ? '#f87171' : '#e2e8f0'}`,
                  backgroundColor: '#fff', fontSize: '14px', color: '#0f172a',
                  outline: 'none', transition: 'border-color 0.15s',
                  fontFamily: 'inherit'
                }}
                onFocus={e => e.target.style.borderColor = '#818cf8'}
                onBlur={e => e.target.style.borderColor = errors.password ? '#f87171' : '#e2e8f0'}
              />
              {errors.password && <p style={{ color: '#e11d48', fontSize: '12px', margin: '4px 0 0' }}>{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px', borderRadius: '10px',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #6366f1, #818cf8)',
                color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px', fontWeight: '700', letterSpacing: '-0.2px',
                transition: 'opacity 0.15s', fontFamily: 'inherit',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(99,102,241,0.4)'
              }}
            >
              {loading ? 'Ingresando...' : 'Ingresar al sistema →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', marginTop: '20px' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/register" style={{ color: '#6366f1', fontWeight: '600', textDecoration: 'none' }}>
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}