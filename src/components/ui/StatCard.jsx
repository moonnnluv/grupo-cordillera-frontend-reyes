export default function StatCard({ label, value, subtitle, icon, color, bgColor, badge }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        padding: '24px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}
        >
          {icon}
        </div>
        {badge && (
          <div
            style={{
              padding: '3px 8px',
              borderRadius: '20px',
              backgroundColor: bgColor,
              color,
              fontSize: '11px',
              fontWeight: '600',
            }}
          >
            {badge}
          </div>
        )}
      </div>

      <div>
        <div
          style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#0f172a',
            letterSpacing: '-1.5px',
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div style={{ color: '#64748b', fontSize: '13px', marginTop: '4px', fontWeight: '500' }}>{label}</div>
        {subtitle && (
          <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>{subtitle}</div>
        )}
      </div>
    </div>
  )
}
