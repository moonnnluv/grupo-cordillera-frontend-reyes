import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', rol: 'VENDEDOR' })
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
    if (!form.email.trim()) e.email = 'Email obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Formato de email inválido'
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
      await api.post('/api/auth/register', form)
      navigate('/login')
    } catch (err) {
      if (err.response?.data?.message) setGlobalError(err.response.data.message)
      else if (!err.response) setGlobalError('No se pudo conectar con el servidor.')
      else setGlobalError('Error al registrarse. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (hasError) => ({
    width: '100%', padding: '11px 14px', borderRadius: '10px', boxSizing: 'border-box',
    border: `1.5px solid ${hasError ? '#f87171' : '#e2e8f0'}`,
    backgroundColor: '#fff', fontSize: '14px', color: '#0f172a',
    outline: 'none', transition: 'border-color 0.15s', fontFamily: 'inherit'
  })

  const ROL_OPTIONS = [
    { value: 'VENDEDOR', label: 'Vendedor', desc: 'Acceso a KPIs de ventas' },
    { value: 'ADMIN_SUCURSAL', label: 'Admin Sucursal', desc: 'Gestión de una sucursal' },
    { value: 'ADMIN_GENERAL', label: 'Admin General', desc: 'Acceso completo al sistema' },
  ]

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      fontFamily: "'DM Sans', system-ui, sans-serif"
    }}>
      {/* Left panel */}
      <div style={{
        width: '38%', minHeight: '100vh',
        background: 'linear-gradient(160deg, #0b0f1a 0%, #111827 100%)',
        display: 'flex', flexDirection: 'column', padding: '48px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'auto' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #34d399, #10b981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', fontWeight: '800', color: '#0b0f1a',
            boxShadow: '0 0 24px rgba(52,211,153,0.3)'
          }}>G</div>
          <span style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.4px' }}>
            Grupo Cordillera
          </span>
        </div>
        <div style={{ marginTop: '60px' }}>
          <h2 style={{
            color: '#f1f5f9', fontSize: '30px', fontWeight: '800',
            lineHeight: 1.2, letterSpacing: '-0.8px', margin: '0 0 14px'
          }}>Únete a la plataforma</h2>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
            Crea tu cuenta y obtén acceso al panel de monitoreo según tu rol en la organización.
          </p>
          <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Acceso seguro con JWT', 'Datos en tiempo real', 'Panel personalizado por rol'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '13px' }}>
                <span style={{ color: '#34d399' }}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#f8fafc', padding: '48px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h1 style={{
            fontSize: '24px', fontWeight: '800', color: '#0f172a',
            letterSpacing: '-0.5px', margin: '0 0 6px'
          }}>Crear cuenta</h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 28px' }}>
            Completa los datos para registrarte
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

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { name: 'username', label: 'Usuario', placeholder: 'tu_usuario', type: 'text' },
              { name: 'email', label: 'Email corporativo', placeholder: 'correo@empresa.cl', type: 'email' },
              { name: 'password', label: 'Contraseña', placeholder: '••••••••', type: 'password' },
            ].map(field => (
              <div key={field.name}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  style={inputStyle(errors[field.name])}
                  onFocus={e => e.target.style.borderColor = '#818cf8'}
                  onBlur={e => e.target.style.borderColor = errors[field.name] ? '#f87171' : '#e2e8f0'}
                />
                {errors[field.name] && <p style={{ color: '#e11d48', fontSize: '12px', margin: '4px 0 0' }}>{errors[field.name]}</p>}
              </div>
            ))}

            {/* Rol selector */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Rol en la organización
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ROL_OPTIONS.map(opt => (
                  <label key={opt.value} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 14px', borderRadius: '10px', cursor: 'pointer',
                    border: `1.5px solid ${form.rol === opt.value ? '#818cf8' : '#e2e8f0'}`,
                    backgroundColor: form.rol === opt.value ? 'rgba(129,140,248,0.06)' : '#fff',
                    transition: 'all 0.15s'
                  }}>
                    <input
                      type="radio" name="rol" value={opt.value}
                      checked={form.rol === opt.value}
                      onChange={handleChange}
                      style={{ accentColor: '#6366f1', width: '14px', height: '14px' }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{opt.label}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px', borderRadius: '10px',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #10b981, #34d399)',
                color: loading ? '#fff' : '#0b0f1a', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px', fontWeight: '700', letterSpacing: '-0.2px',
                fontFamily: 'inherit',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(16,185,129,0.35)',
                marginTop: '4px'
              }}
            >
              {loading ? 'Registrando...' : 'Crear cuenta →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', marginTop: '20px' }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={{ color: '#6366f1', fontWeight: '600', textDecoration: 'none' }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}