import Badge from '../../ui/Badge'

export default function KpiTable({ kpis = [], loading = false, accent = '#34d399', accentBg = 'rgba(52,211,153,0.1)', title = 'Indicadores KPI' }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{title}</h2>
        <Badge color={accent} bgColor={accentBg}>
          {loading ? '...' : `${kpis.length} KPIs`}
        </Badge>
      </div>

      {loading && (
        <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
          Cargando datos...
        </div>
      )}

      {!loading && kpis.length === 0 && (
        <div style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>No hay KPIs registrados</div>
          <div style={{ color: '#cbd5e1', fontSize: '12px', marginTop: '4px' }}>
            Los indicadores aparecerán cuando se calculen KPIs
          </div>
        </div>
      )}

      {!loading && kpis.length > 0 && (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              padding: '10px 24px 6px',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            {['Nombre', 'Tipo', 'Valor', 'Sucursal'].map(h => (
              <div
                key={h}
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#94a3b8',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {kpis.map((k, i) => (
            <div
              key={k.id || i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                padding: '14px 24px',
                borderBottom: i < kpis.length - 1 ? '1px solid #f8fafc' : 'none',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafafa')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                {k.nombre || k.indicador || `Indicador ${i + 1}`}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>{k.tipo || k.fuente || '—'}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: accent }}>
                {k.valor ?? '—'} {k.unidad || ''}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{k.sucursal || '—'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
