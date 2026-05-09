import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import Layout from '../components/layout/Layout'
import StatCard from '../components/ui/StatCard'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import CircuitBreakerStatus from '../components/features/CircuitBreakerStatus'
import DatosTable from '../components/features/datos/DatosTable'
import DatoForm from '../components/features/datos/DatoForm'
import KpiTable from '../components/features/kpi/KpiTable'
import KpiCalculatorForm from '../components/features/kpi/KpiCalculatorForm'

const ACCENT = '#818cf8'

export default function DashboardAdminGeneral() {
  const { user } = useAuth()

  const [data, setData] = useState({ datos: [], kpis: [], reportes: [], estado: '' })
  const [loading, setLoading] = useState(true)

  const [showDatoForm, setShowDatoForm] = useState(false)
  const [showKpiForm, setShowKpiForm] = useState(false)
  const [savingDato, setSavingDato] = useState(false)
  const [savingKpi, setSavingKpi] = useState(false)

  const [refreshDatos, setRefreshDatos] = useState(0)
  const [refreshKpis, setRefreshKpis] = useState(0)

  useEffect(() => {
    setLoading(true)
    api.get('/bff/dashboard')
      .then(res => setData(res.data))
      .catch(err => console.error('Error al cargar dashboard:', err))
      .finally(() => setLoading(false))
  }, [refreshDatos, refreshKpis])

  const handleDatoSubmit = async (formData) => {
    setSavingDato(true)
    try {
      await api.post('/api/datos', formData)
      setShowDatoForm(false)
      setRefreshDatos(n => n + 1)
    } catch (err) {
      console.error('Error al guardar dato:', err)
    } finally {
      setSavingDato(false)
    }
  }

  const handleKpiSubmit = async (formData) => {
    setSavingKpi(true)
    try {
      await api.post('/api/kpi/calcular', formData)
      setShowKpiForm(false)
      setRefreshKpis(n => n + 1)
    } catch (err) {
      console.error('Error al calcular KPI:', err)
    } finally {
      setSavingKpi(false)
    }
  }

  const CARDS = [
    {
      label: 'Datos Organizacionales',
      value: loading ? '—' : data.datos.length,
      subtitle: 'Registros consolidados',
      icon: '◈', color: '#6366f1', bgColor: 'rgba(99,102,241,0.1)',
      badge: 'activo',
    },
    {
      label: 'KPIs Calculados',
      value: loading ? '—' : data.kpis.length,
      subtitle: 'Indicadores activos',
      icon: '▲', color: '#10b981', bgColor: 'rgba(16,185,129,0.1)',
      badge: 'activo',
    },
    {
      label: 'Reportes Generados',
      value: loading ? '—' : data.reportes.length,
      subtitle: 'Reportes disponibles',
      icon: '■', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.1)',
      badge: 'activo',
    },
  ]

  return (
    <Layout
      title="Admin General"
      subtitle="Visión consolidada de todas las sucursales"
    >
      {/* Welcome banner */}
      <div className="banner-row" style={{
        borderRadius: '16px', padding: '24px 28px',
        background: 'linear-gradient(135deg, #0b0f1a 0%, #1e293b 100%)',
        border: '1px solid #1e293b', marginBottom: '28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
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
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>
          {user?.role?.replace('_', ' ')}
        </div>
      </div>

      {/* Stats */}
      <div className="grid-3-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {CARDS.map(c => <StatCard key={c.label} {...c} />)}
      </div>

      {/* Datos section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            Datos Organizacionales
          </h2>
          <Button onClick={() => setShowDatoForm(true)} variant="primary">
            + Nuevo dato
          </Button>
        </div>
        <DatosTable datos={data.datos} loading={loading} />
      </div>

      {/* KPIs section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            Indicadores KPI
          </h2>
          <Button onClick={() => setShowKpiForm(true)} variant="primary">
            + Calcular KPI
          </Button>
        </div>
        <KpiTable kpis={data.kpis} loading={loading} />
      </div>

      {/* Circuit breaker / system status */}
      <CircuitBreakerStatus estado={data.estado} />

      {/* Modal: nuevo dato */}
      <Modal
        open={showDatoForm}
        onClose={() => setShowDatoForm(false)}
        title="Registrar nuevo dato"
      >
        <DatoForm onSubmit={handleDatoSubmit} loading={savingDato} />
      </Modal>

      {/* Modal: calcular KPI */}
      <Modal
        open={showKpiForm}
        onClose={() => setShowKpiForm(false)}
        title="Calcular KPI"
      >
        <KpiCalculatorForm onSubmit={handleKpiSubmit} loading={savingKpi} />
      </Modal>
    </Layout>
  )
}
