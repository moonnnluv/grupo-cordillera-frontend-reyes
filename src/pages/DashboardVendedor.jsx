import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import Layout from '../components/Layout'

const ACCENT = '#fbbf24'
const ACCENT_BG = 'rgba(251,191,36,0.1)'

function KpiRow({ kpi, index }) {
  const pct = Math.min(100, Math.max(5, (kpi.valor || 0) % 100))

  return (
    <div style={{
      padding: '16px 24px', borderBottom: '1px solid #f8fafc',
      transition: 'background 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fafafa'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '22px', height: '22px', borderRadius: '6px',
              backgroundColor: ACCENT_BG, color: ACCENT,
              fontSize: '10px', fontWeight: '800',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{index + 1}</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
              {kpi.nombre || `KPI ${index + 1}`}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px', paddingLeft: '30px' }}>
            {kpi.fecha || '—'} · {kpi.sucursal || 'General'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
            {kpi.valor ?? '—'}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{kpi.unidad || ''}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '3px', borderRadius: '2px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '2px', width: `${pct}%`,
          background: `linear-gradient(90deg, #f59e0b, #fbbf24)`,
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  )
}

export default function DashboardVendedor() {
  const { user } = useAuth()
  const [kpis, setKpis] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/kpi/tipo/VENTAS')
      .then(res => setKpis(res.data))
      .catch(err => console.error('Error:', err))
      .finally(() => setLoading(false))
  }, [])

  const total = kpis.reduce((sum, k) => sum + (Number(k.valor) || 0), 0)
  const promedio = kpis.length > 0 ? (total / kpis.length).toFixed(1) : 0
  const mejor = kpis.length > 0 ? Math.max(...kpis.map(k => Number(k.valor) || 0)) : 0

  return (
    <Layout
      title="Mis KPIs de Ventas"
      subtitle="Panel de indicadores personales"
    >
      {/* Banner */}
      <div style={{
        borderRadius: '16px', padding: '24px 28px',
        background: 'linear-gradient(135deg, #1a1000 0%, #292000 100%)',
        border: '1px solid #3d2e00', marginBottom: '28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div style={{ color: ACCENT, fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
            Vista vendedor
          </div>
          <h2 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.4px', margin: 0 }}>
            Hola, {user?.username} 👋
          </h2>
          <p style={{ color: '#a16207', fontSize: '13px', marginTop: '4px', marginBottom: 0 }}>
            Acceso limitado a tus indicadores de ventas
          </p>
        </div>
        <div style={{
          padding: '8px 16px', borderRadius: '8px',
          backgroundColor: 'rgba(251,191,36,0.15)',
          border: '1px solid rgba(251,191,36,0.3)',
          color: ACCENT, fontSize: '12px', fontWeight: '700',
          letterSpacing: '0.05em', textTransform: 'uppercase'
        }}>
          VENTAS
        </div>
      </div>

      {/* Mini stats */}
      {!loading && kpis.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'KPIs activos', value: kpis.length, icon: '◆' },
            { label: 'Valor promedio', value: promedio, icon: '◎' },
            { label: 'Mejor indicador', value: mejor, icon: '▲' },
          ].map(s => (
            <div key={s.label} style={{
              backgroundColor: '#fff', borderRadius: '12px', padding: '18px 20px',
              border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px'
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                backgroundColor: ACCENT_BG, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: ACCENT, fontSize: '14px', flexShrink: 0
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* KPIs list */}
      <div style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Indicadores de Ventas</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e'
            }} />
            <span style={{ fontSize: '12px', color: '#64748b' }}>en tiempo real</span>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: '14px' }}>Cargando indicadores...</div>
          </div>
        ) : kpis.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📈</div>
            <div style={{ color: '#64748b', fontSize: '15px', fontWeight: '600' }}>Sin KPIs de ventas</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '6px' }}>
              Usa el endpoint /api/kpi/calcular para registrar indicadores de tipo VENTAS
            </div>
          </div>
        ) : (
          kpis.map((k, i) => <KpiRow key={k.id || i} kpi={k} index={i} />)
        )}
      </div>

      {/* Footer hint */}
      <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <span style={{ color: '#d97706', fontSize: '14px', flexShrink: 0 }}>ℹ</span>
        <p style={{ color: '#92400e', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
          Solo puedes visualizar indicadores de tipo <strong>VENTAS</strong>. Para registrar KPIs, consulta con el administrador del sistema.
        </p>
      </div>
    </Layout>
  )
}