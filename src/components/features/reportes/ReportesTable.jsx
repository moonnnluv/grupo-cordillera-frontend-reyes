import Badge from '../../ui/Badge'

export default function ReportesTable({ reportes = [], loading = false, accent = '#f59e0b', accentBg = 'rgba(245,158,11,0.1)' }) {
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
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
          Reportes Generados
        </h2>
        <Badge color={accent} bgColor={accentBg}>
          {loading ? '...' : `${reportes.length} reportes`}
        </Badge>
      </div>

      {loading && (
        <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
          Cargando reportes...
        </div>
      )}

      {!loading && reportes.length === 0 && (
        <div style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📄</div>
          <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Sin reportes disponibles</div>
          <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
            Los reportes aparecerán cuando se generen desde el sistema
          </div>
        </div>
      )}

      {!loading && reportes.length > 0 && (
        <div>
          {/* Encabezado: oculto en móvil */}
          <div
            className="table-card-header"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              padding: '10px 24px 6px',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            {['Título', 'Tipo', 'Sucursal', 'Fecha'].map(h => (
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

          {reportes.map((r, i) => (
            <div
              key={r.id || i}
              className="table-card-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '14px 24px',
                borderBottom: i < reportes.length - 1 ? '1px solid #f8fafc' : 'none',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafafa')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div className="table-card-name" style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                {r.titulo || r.nombre || `Reporte ${i + 1}`}
              </div>
              <div>
                <Badge color={accent} bgColor={accentBg}>
                  {r.tipo || 'GENERAL'}
                </Badge>
              </div>
              <div className="col-mobile-hidden" style={{ fontSize: '12px', color: '#94a3b8' }}>
                {r.sucursal || '—'}
              </div>
              <div className="col-mobile-hidden" style={{ fontSize: '12px', color: '#94a3b8' }}>
                {r.fecha || r.createdAt || '—'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
