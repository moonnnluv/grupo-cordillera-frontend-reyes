import Table from '../../ui/Table'

export default function DatosTable({ datos = [], loading = false }) {
  const columns = ['Indicador', 'Valor', 'Sucursal', 'Fecha']

  const renderRow = (d, i) => (
    <div
      key={d.id || i}
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
      <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
        {d.indicador || d.nombre || `Dato ${i + 1}`}
      </div>
      <div style={{ fontSize: '13px', fontWeight: '700', color: '#6366f1' }}>
        {d.valor ?? '—'} {d.unidad || ''}
      </div>
      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{d.sucursal || '—'}</div>
      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{d.fecha || '—'}</div>
    </div>
  )

  return (
    <Table
      title="Datos Organizacionales"
      columns={columns}
      rows={datos}
      loading={loading}
      renderRow={renderRow}
      emptyIcon="◈"
      emptyTitle="Sin datos registrados"
      emptySubtitle="Los registros aparecerán cuando se ingresen datos al sistema"
      accent="#6366f1"
      accentBg="rgba(99,102,241,0.1)"
    />
  )
}
