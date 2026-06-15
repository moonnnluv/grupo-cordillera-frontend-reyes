import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import Layout from '../components/layout/Layout'
import StatCard from '../components/ui/StatCard'
import KpiTable from '../components/features/kpi/KpiTable'

const ACCENT = '#34d399'

export default function DashboardAdminSucursal() {
  const { user } = useAuth()
  const SUCURSAL = user?.sucursal || user?.username || 'GENERAL'
  const [data, setData] = useState({ datos: [], kpis: [], reportes: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get(`/bff/dashboard/sucursal/${SUCURSAL}`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error('Error:', err)
        setError('No se pudo cargar la información. Verifica tu conexión.')
      })
      .finally(() => setLoading(false))
  }, [SUCURSAL])

  return (
    <Layout
      title={`Sucursal ${SUCURSAL}`}
      subtitle="Panel de administración de sucursal"
    >
      {error && (
        <div style={{
          padding: '12px 14px', borderRadius: '10px', marginBottom: '20px',
          backgroundColor: '#fff1f2', border: '1px solid #fecdd3',
          color: '#e11d48', fontSize: '13px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚠</span> {error}
          </div>
          <button
            onClick={() => setError(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e11d48', fontSize: '18px', lineHeight: 1, padding: '0 2px' }}
          >×</button>
        </div>
      )}

      {/* Banner */}
      <div className="banner-row" style={{
        borderRadius: '16px', padding: '24px 28px',
        background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
        border: '1px solid #065f46', marginBottom: '28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
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
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>
          SUCURSAL
        </div>
      </div>

      {/* Stats */}
      <div className="grid-2-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '28px' }}>
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
      <KpiTable
        kpis={data.kpis}
        loading={loading}
        accent={ACCENT}
        accentBg="rgba(52,211,153,0.1)"
        title={`Indicadores — Sucursal ${SUCURSAL}`}
      />
    </Layout>
  )
}
