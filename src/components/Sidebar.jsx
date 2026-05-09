import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLE_CONFIG = {
  ADMIN_GENERAL: {
    accent: '#818cf8',
    accentBg: 'rgba(129,140,248,0.12)',
    label: 'Admin General',
    badge: 'CORPORATIVO',
    items: [
      { icon: '▣', label: 'Dashboard' },
      { icon: '◈', label: 'Datos' },
      { icon: '◆', label: 'KPIs' },
      { icon: '◉', label: 'Reportes' },
    ]
  },
  ADMIN_SUCURSAL: {
    accent: '#34d399',
    accentBg: 'rgba(52,211,153,0.12)',
    label: 'Admin Sucursal',
    badge: 'SUCURSAL',
    items: [
      { icon: '▣', label: 'Dashboard' },
      { icon: '◆', label: 'KPIs' },
      { icon: '◉', label: 'Reportes' },
    ]
  },
  VENDEDOR: {
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.12)',
    label: 'Vendedor',
    badge: 'VENTAS',
    items: [
      { icon: '▣', label: 'Dashboard' },
      { icon: '◆', label: 'Mis KPIs' },
    ]
  }
}

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const config = ROLE_CONFIG[user?.role] || ROLE_CONFIG.VENDEDOR
  const { accent, accentBg, label, badge, items } = config

  return (
    <aside
      className={`sidebar-panel${isOpen ? ' sidebar-open' : ''}`}
      style={{
        width: '248px',
        minWidth: '248px',
        minHeight: '100vh',
        backgroundColor: '#0b0f1a',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #1a2035',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Brand */}
      <div style={{ padding: '28px 20px 24px', borderBottom: '1px solid #1a2035' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: `linear-gradient(135deg, ${accent}, ${accent}aa)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '17px', fontWeight: '800', color: '#0b0f1a', flexShrink: 0,
            boxShadow: `0 0 16px ${accent}44`
          }}>G</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              color: '#f1f5f9', fontSize: '14px', fontWeight: '700',
              letterSpacing: '-0.3px', lineHeight: 1.2
            }}>Grupo Cordillera</div>
            <div style={{
              color: accent, fontSize: '9px', fontWeight: '700',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px'
            }}>{badge}</div>
          </div>
          {/* Close button (mobile only) */}
          <button
            className="btn-hamburger"
            onClick={onClose}
            aria-label="Cerrar menú"
            style={{ marginLeft: 'auto' }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '20px 12px' }}>
        <div style={{
          color: '#334155', fontSize: '10px', fontWeight: '700',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          paddingLeft: '10px', marginBottom: '10px'
        }}>Menú</div>

        {items.map((item, i) => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '8px', marginBottom: '2px',
            cursor: 'default',
            backgroundColor: i === 0 ? accentBg : 'transparent',
            color: i === 0 ? accent : '#475569',
            fontSize: '13.5px', fontWeight: i === 0 ? '600' : '400',
            transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: '11px', width: '16px', textAlign: 'center' }}>{item.icon}</span>
            {item.label}
            {i === 0 && (
              <span style={{
                marginLeft: 'auto', width: '6px', height: '6px',
                borderRadius: '50%', backgroundColor: accent,
                boxShadow: `0 0 6px ${accent}`
              }} />
            )}
          </div>
        ))}

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#1a2035', margin: '16px 10px' }} />

        <div style={{
          color: '#334155', fontSize: '10px', fontWeight: '700',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          paddingLeft: '10px', marginBottom: '10px'
        }}>Sistema</div>
        {[{ icon: '◎', label: 'Configuración' }, { icon: '◷', label: 'Actividad' }].map(item => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '8px', marginBottom: '2px',
            cursor: 'default', color: '#334155',
            fontSize: '13.5px', fontWeight: '400',
          }}>
            <span style={{ fontSize: '11px', width: '16px', textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid #1a2035' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '12px', borderRadius: '10px',
          backgroundColor: '#111827', border: '1px solid #1a2035'
        }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: '700', color: '#0b0f1a', flexShrink: 0,
          }}>
            {user?.username?.[0]?.toUpperCase() || '?'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              color: '#e2e8f0', fontSize: '13px', fontWeight: '600',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}>{user?.username}</div>
            <div style={{ color: '#475569', fontSize: '11px' }}>{label}</div>
          </div>
          <button
            onClick={() => { logout(); navigate('/login') }}
            title="Cerrar sesión"
            style={{
              background: 'none', border: '1px solid #1e293b', cursor: 'pointer',
              color: '#475569', fontSize: '10px', padding: '5px 7px',
              borderRadius: '6px', transition: 'all 0.15s', flexShrink: 0,
              letterSpacing: '0.05em'
            }}
            onMouseEnter={e => { e.target.style.color = '#ef4444'; e.target.style.borderColor = '#ef444455' }}
            onMouseLeave={e => { e.target.style.color = '#475569'; e.target.style.borderColor = '#1e293b' }}
          >
            salir
          </button>
        </div>
      </div>
    </aside>
  )
}
