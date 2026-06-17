import { useEffect, useState, useCallback } from 'react'
import Card from '../ui/Card'

const GW = 'http://localhost:9090'

const SERVICES = [
  { label: 'ms-datos',    url: `${GW}/health/datos`,    port: ':8081' },
  { label: 'ms-kpi',      url: `${GW}/health/kpi`,      port: ':8082' },
  { label: 'ms-reportes', url: `${GW}/health/reportes`, port: ':8083' },
  { label: 'ms-auth',     url: `${GW}/health/auth`,     port: ':8084' },
  { label: 'ms-bff',      url: `${GW}/health/bff`,      port: ':8085' },
]

const TIMEOUT_MS = 4000

async function checkService(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: controller.signal })
    return res.ok
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

export default function CircuitBreakerStatus({ estado }) {
  const [statuses, setStatuses] = useState({})
  const [checking, setChecking] = useState(true)
  const [lastChecked, setLastChecked] = useState(null)

  const runCheck = useCallback(async () => {
    setChecking(true)
    const results = await Promise.all(
      SERVICES.map(async s => ({ label: s.label, up: await checkService(s.url) }))
    )
    const map = {}
    results.forEach(r => { map[r.label] = r.up })
    setStatuses(map)
    setLastChecked(new Date())
    setChecking(false)
  }, [])

  useEffect(() => {
    runCheck()
    const interval = setInterval(runCheck, 30000)
    return () => clearInterval(interval)
  }, [runCheck])

  const upCount = Object.values(statuses).filter(Boolean).length
  const total = SERVICES.length

  return (
    <Card padding="20px 24px">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
          Estado del sistema
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!checking && lastChecked && (
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>
              {upCount}/{total} activos · {lastChecked.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button
            onClick={runCheck}
            disabled={checking}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
              background: 'none',
              fontSize: '11px',
              fontWeight: '600',
              color: checking ? '#94a3b8' : '#6366f1',
              cursor: checking ? 'default' : 'pointer',
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
          >
            {checking ? 'Verificando...' : '↻ Actualizar'}
          </button>
        </div>
      </div>

      <div className="cb-service-list" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {SERVICES.map(s => {
          const isUp = statuses[s.label]
          const isLoading = checking && statuses[s.label] === undefined
          const dotColor = isLoading ? '#94a3b8' : isUp ? '#22c55e' : '#ef4444'
          const dotShadow = isLoading ? 'none' : isUp ? '0 0 6px #22c55e' : '0 0 6px #ef4444'

          return (
            <div
              key={s.label}
              className="cb-badge"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: `1px solid ${isLoading ? '#e2e8f0' : isUp ? '#bbf7d0' : '#fecdd3'}`,
              }}
            >
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: dotColor,
                  boxShadow: dotShadow,
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
              />
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{s.label}</span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{s.port}</span>
            </div>
          )
        })}
      </div>

      <BffStatusBanner estado={estado} />
    </Card>
  )
}

function BffStatusBanner({ estado }) {
  if (estado === 'SERVICIO_NO_DISPONIBLE') {
    return (
      <div
        style={{
          marginTop: '16px',
          padding: '10px 14px',
          borderRadius: '8px',
          backgroundColor: '#fff7ed',
          border: '1px solid #fed7aa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>⚠</span>
          <span style={{ fontSize: '12px', color: '#c2410c', fontWeight: '700' }}>
            Servicio degradado — Circuit Breaker activo
          </span>
        </div>
        <p style={{ fontSize: '11px', color: '#c2410c', margin: '6px 0 0', opacity: 0.85 }}>
          Algunos datos pueden no estar disponibles temporalmente. El sistema está usando una respuesta de respaldo mientras el servicio se recupera.
        </p>
      </div>
    )
  }

  if (estado === 'OK') {
    return (
      <div
        style={{
          marginTop: '16px',
          padding: '10px 14px',
          borderRadius: '8px',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
        }}
      >
        <span style={{ fontSize: '12px', color: '#15803d', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>✓</span> Sistema operativo
        </span>
      </div>
    )
  }

  return (
    <div
      style={{
        marginTop: '16px',
        padding: '10px 14px',
        borderRadius: '8px',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
      }}
    >
      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
        Verificando estado...
      </span>
    </div>
  )
}
