import Card from '../ui/Card'

const SERVICES = [
  { label: 'ms-datos',    port: ':8081' },
  { label: 'ms-kpi',      port: ':8082' },
  { label: 'ms-reportes', port: ':8083' },
  { label: 'ms-auth',     port: ':8084' },
  { label: 'ms-bff',      port: ':8085' },
  { label: 'api-gateway', port: ':9090' },
]

export default function CircuitBreakerStatus({ estado }) {
  return (
    <Card padding="20px 24px">
      <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '0 0 16px' }}>
        Estado del sistema
      </h2>

      <div className="cb-service-list" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {SERVICES.map(s => (
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
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 6px #22c55e',
              }}
            />
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{s.label}</span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{s.port}</span>
          </div>
        ))}
      </div>

      {estado && (
        <div
          style={{
            marginTop: '16px',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
          }}
        >
          <span style={{ fontSize: '12px', color: '#15803d', fontWeight: '500' }}>
            Estado BFF: <strong>{estado}</strong>
          </span>
        </div>
      )}
    </Card>
  )
}
