import Table from '../../ui/Table'

function formatNumber(value) {
  const num = Number(value)
  return isNaN(num) ? '—' : num.toLocaleString('es-CL')
}

export default function DatosTable({ datos = [], loading = false }) {
  const columns = [
    { label: 'Indicador' },
    { label: 'Valor' },
    { label: 'Sucursal', className: 'col-mobile-hidden' },
    { label: 'Fecha', className: 'col-mobile-hidden' },
  ]

  const renderRow = (d, i) => (
    <div
      key={d.id || i}
      className="table-card-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '14px 24px',
        borderBottom: i < datos.length - 1 ? '1px solid #f8fafc' : 'none',
        transition: 'background 0.1s',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafafa')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <div className="table-card-name" style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
        {d.indicador || d.nombre || `Dato ${i + 1}`}
      </div>
      <div className="table-card-value" style={{ fontSize: '13px', fontWeight: '700', color: '#6366f1' }}>
        {d.valor != null ? formatNumber(d.valor) : '—'} {d.unidad || ''}
      </div>
      <div className="col-mobile-hidden" style={{ fontSize: '12px', color: '#94a3b8' }}>{d.sucursal || '—'}</div>
      <div className="col-mobile-hidden" style={{ fontSize: '12px', color: '#94a3b8' }}>{d.fecha || '—'}</div>
    </div>
  )

  return (
    <Table
      title="Datos Organizacionales"
      columns={columns}
      rows={datos}
      loading={loading}
      renderRow={renderRow}
      headerRowClassName="table-card-header"
      emptyIcon="◈"
      emptyTitle="Sin datos registrados"
      emptySubtitle="Los registros aparecerán cuando se ingresen datos al sistema"
      accent="#6366f1"
      accentBg="rgba(99,102,241,0.1)"
    />
  )
}
