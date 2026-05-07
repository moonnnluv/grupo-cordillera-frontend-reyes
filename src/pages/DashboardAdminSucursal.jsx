import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import Layout from '../components/Layout'

const ACCENT = '#34d399'
const ACCENT_BG = 'rgba(52,211,153,0.1)'
const SUCURSAL = 'SANTIAGO'

function StatCard({ label, value, subtitle, icon, color, bgColor }) {
  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: '14px', padding: '24px',
      border: '1px solid #e2e8f0', transition: 'box-shadow 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          backgroundColor: bgColor, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '18px'
        }}>{icon}</div>
      </div>
      <div style={{ fontSize: '38px', fontWeight: '800', color: '#0f172a', letterSpacing: '-1.5px', lineHeight: 1 }}>{value}</div>
      <div style={{ color: '#64748b', fontSize: '13px', marginTop: '6px', fontWeight: '500' }}>{label}</div>
      {subtitle && <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>{subtitle}</div>}
    </div>
  )
}

export default function DashboardAdminSucursal() {
  const { user } = useAuth()
  const [data, setData] = useState({ datos: [], kpis: [], reportes: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/bff/dashboard/sucursal/${SUCURSAL}`)
      .then(res => setData(res.data))
      .catch(err => console.error('Error:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout
      title={`Sucursal ${SUCURSAL}`}
      subtitle="Panel de administración de sucursal"
    >
      {/* Banner */}
      <div style={{
        borderRadius: '16px', padding: '24px 28px',
        background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
        border: '1px solid #065f46', marginBottom: '28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div style={{ color: ACCENT, fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
            Acceso sucursal
          </div>
          <h2 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.4px', margin: 0 }}>
            Hola, {user?.username} 👋
          </h2>
          <p style={{ color: '#4ade80', fontSize: '13px', marginTop: '4px', opacity: 0.7, marginBottom: 0 }}>
            Gestionando sucursal <strong>{SUCURSAL}</strong>
          </p>
        </div>
        <div style={{
          padding: '8px 16px', borderRadius: '8px',
          backgroundColor: 'rgba(52,211,153,0.15)',
          border: '1px solid rgba(52,211,153,0.3)',
          color: ACCENT, fontSize: '12px', fontWeight: '700',
          letterSpacing: '0.05em', textTransform: 'uppercase'
        }}>
          SUCURSAL
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '28px' }}>
        <StatCard
          label="KPIs de la sucursal"
          value={loading ? '—' : data.kpis.length}
          subtitle="Indicadores activos"
          icon="◆" color="#10b981" bgColor="rgba(16,185,129,0.1)"
        />
        <StatCard
          label="Reportes disponibles"
          value={loading ? '—' : data.reportes.length}
          subtitle="Reportes generados"
          icon="■" color="#f59e0b" bgColor="rgba(245,158,11,0.1)"
        />
      </div>

      {/* KPIs table */}
      <div style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Indicadores — Sucursal {SUCURSAL}</h2>
          <span style={{
            backgroundColor: ACCENT_BG, color: ACCENT,
            fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px'
          }}>{loading ? '...' : data.kpis.length} KPIs</span>
        </div>

        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>Cargando datos...</div>
          </div>
        ) : data.kpis.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>No hay KPIs para esta sucursal</div>
            <div style={{ color: '#cbd5e1', fontSize: '12px', marginTop: '4px' }}>Los indicadores aparecerán cuando se registren datos</div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 0, padding: '10px 24px 6px', borderBottom: '1px solid #f8fafc' }}>
              {['Nombre', 'Tipo', 'Valor', 'Sucursal'].map(h => (
                <div key={h} style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {data.kpis.map((k, i) => (
              <div key={k.id || i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                padding: '14px 24px', borderBottom: i < data.kpis.length - 1 ? '1px solid #f8fafc' : 'none',
                transition: 'background 0.1s',
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{k.nombre || k.indicador || `Indicador ${i + 1}`}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{k.tipo || k.fuente || '—'}</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: ACCENT }}>{k.valor ?? '—'} {k.unidad || ''}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{k.sucursal || SUCURSAL}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}