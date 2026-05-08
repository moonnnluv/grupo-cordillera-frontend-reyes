import Sidebar from '../Sidebar'

export default function Layout({ children, title, subtitle }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        backgroundColor: '#f1f5f9',
      }}
    >
      <Sidebar />

      <main style={{ flex: 1, overflowY: 'auto' }}>
        {/* Top bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backgroundColor: 'rgba(241,245,249,0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #e2e8f0',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '60px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '17px',
                fontWeight: '700',
                color: '#0f172a',
                letterSpacing: '-0.3px',
                margin: 0,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{subtitle}</p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                backgroundColor: '#e2e8f0',
                color: '#64748b',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              {new Date().toLocaleDateString('es-CL', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </div>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 6px #22c55e',
              }}
              title="Sistema activo"
            />
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: '32px 40px' }}>{children}</div>
      </main>
    </div>
  )
}
