import Badge from './Badge'

export default function Table({
  title,
  columns,
  rows,
  loading = false,
  emptyIcon = '📋',
  emptyTitle = 'Sin registros',
  emptySubtitle = '',
  accent = '#6366f1',
  accentBg = 'rgba(99,102,241,0.1)',
  renderRow,
  headerRowClassName,
}) {
  const count = rows?.length ?? 0

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      {title && (
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
            {loading ? '...' : `${count} registros`}
          </Badge>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
          Cargando datos...
        </div>
      )}

      {/* Empty */}
      {!loading && count === 0 && (
        <div style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>{emptyIcon}</div>
          <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>{emptyTitle}</div>
          {emptySubtitle && (
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>{emptySubtitle}</div>
          )}
        </div>
      )}

      {/* Data */}
      {!loading && count > 0 && (
        <div>
          {/* Column headers */}
          <div
            className={headerRowClassName}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
              padding: '10px 24px 6px',
              borderBottom: '1px solid #f8fafc',
            }}
          >
            {columns.map(col => {
              const label = typeof col === 'string' ? col : col.label
              const cls = typeof col === 'object' ? col.className : undefined
              return (
                <div
                  key={label}
                  className={cls}
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#94a3b8',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </div>
              )
            })}
          </div>

          {/* Rows */}
          {rows.map((row, i) =>
            renderRow ? (
              renderRow(row, i)
            ) : (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                  padding: '14px 24px',
                  borderBottom: i < rows.length - 1 ? '1px solid #f8fafc' : 'none',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafafa')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {Object.values(row).map((cell, j) => (
                  <div key={j} style={{ fontSize: '13px', color: '#374151' }}>
                    {cell ?? '—'}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
