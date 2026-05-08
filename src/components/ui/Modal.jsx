export default function Modal({ open, onClose, title, children, width = '480px' }) {
  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          width,
          maxWidth: '90vw',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#94a3b8',
              fontSize: '16px',
              lineHeight: 1,
              padding: '4px 8px',
            }}
          >
            ×
          </button>
        </div>

        {/* Modal body */}
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  )
}
