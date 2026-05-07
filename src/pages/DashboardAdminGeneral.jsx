import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import Layout from '../components/Layout'

const ACCENT = '#818cf8'
const ACCENT_BG = 'rgba(129,140,248,0.1)'

function StatCard({ label, value, subtitle, icon, color, bgColor }) {
  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: '14px',
      padding: '24px', border: '1px solid #e2e8f0',
      display: 'flex', flexDirection: 'column', gap: '12px',
      transition: 'box-shadow 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          backgroundColor: bgColor, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '18px'
        }}>{icon}</div>
        <div style={{
          padding: '3px 8px', borderRadius: '20px',
          backgroundColor: bgColor, color: color,
          fontSize: '11px', fontWeight: '600'
        }}>activo</div>
      </div>
      <div>
        <div style={{
          fontSize: '36px', fontWeight: '800', color: '#0f172a',
          letterSpacing: '-1.5px', lineHeight: 1
        }}>{value}</div>
        <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>{label}</div>
        {subtitle && <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>{subtitle}</div>}
      </div>
    </div>
  )
}

function SectionHeader({ title, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
      <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{title}</h2>
      {count !== undefined && (
        <span style={{
          backgroundColor: ACCENT_BG, color: ACCENT,
          fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px'
        }}>{count} registros</span>
      )}
    </div>
  )
}

export default function DashboardAdminGeneral() {
  const { user } = useAuth()
  const [data, setData] = useState({ datos: [], kpis: [], reportes: [], estado: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/bff/dashboard')
      .then(res => setData(res.data))
      .catch(err => console.error('Error al cargar dashboard:', err))
      .finally(() => setLoading(false))
  }, [])

  const CARDS = [
    {
      label: 'Datos Organizacionales',
      value: loading ? '—' : data.datos.length,
      subtitle: 'Registros consolidados',
      icon: '◈', color: '#6366f1', bgColor: 'rgba(99,102,241,0.1)'
    },
    {
      label: 'KPIs Calculados',
      value: loading ? '—' : data.kpis.length,
      subtitle: 'Indicadores activos',
      icon: '▲', color: '#10b981', bgColor: 'rgba(16,185,129,0.1)'
    },
    {
      label: 'Reportes Generados',
      value: loading ? '—' : data.reportes.length,
      subtitle: 'Reportes disponibles',
      icon: '■', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.1)'
    },
  ]

  return (
    <Layout
      title="Panel Administrador General"
      subtitle="Visión consolidada de todas las sucursales"
    >
      {/* Welcome banner */}
      <div style={{
        borderRadius: '16px', padding: '24px 28px',
        background: 'linear-gradient(135deg, #0b0f1a 0%, #1e293b 100%)',
        border: '1px solid #1e293b', marginBottom: '28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div style={{ color: ACCENT, fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
            Acceso completo
          </div>
          <h2 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.4px', margin: 0 }}>
            Hola, {user?.username} 👋
          </h2>
          <p style={{ color: '#475569', fontSize: '13px', marginTop: '4px', marginBottom: 0 }}>
            Tienes acceso a todos los datos de Grupo Cordillera
          </p>
        </div>
        <div style={{
          padding: '8px 16px', borderRadius: '8px',
          backgroundColor: 'rgba(129,140,248,0.15)',
          border: '1px solid rgba(129,140,248,0.3)',
          color: ACCENT, fontSize: '12px', fontWeight: '700',
          letterSpacing: '0.05em', textTransform: 'uppercase'
        }}>
          {user?.role?.replace('_', ' ')}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {CARDS.map(c => <StatCard key={c.label} {...c} />)}
      </div>

      {/* System status */}
      <div style={{
        backgroundColor: '#fff', borderRadius: '14px', padding: '20px 24px',
        border: '1px solid #e2e8f0'
      }}>
        <SectionHeader title="Estado del sistema" />
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: 'ms-datos', port: ':8081', ok: true },
            { label: 'ms-kpi', port: ':8082', ok: true },
            { label: 'ms-reportes', port: ':8083', ok: true },
            { label: 'ms-auth', port: ':8084', ok: true },
            { label: 'ms-bff', port: ':8085', ok: true },
            { label: 'api-gateway', port: ':9090', ok: true },
          ].map(s => (
            <div key={s.label} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 14px', borderRadius: '8px',
              backgroundColor: '#f8fafc', border: '1px solid #e2e8f0',
            }}>
              <div style={{
                width: '7px', height: '7px', borderRadius: '50%',
                backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e'
              }} />
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{s.label}</span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{s.port}</span>
            </div>
          ))}
        </div>

        {data.estado && (
          <div style={{ marginTop: '16px', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <span style={{ fontSize: '12px', color: '#15803d', fontWeight: '500' }}>
              Estado BFF: <strong>{data.estado}</strong>
            </span>
          </div>
        )}
      </div>
    </Layout>
  )
}