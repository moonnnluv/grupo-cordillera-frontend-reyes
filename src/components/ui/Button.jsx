const VARIANTS = {
  primary:   { backgroundColor: '#6366f1', color: '#fff', border: 'none' },
  secondary: { backgroundColor: '#e2e8f0', color: '#374151', border: 'none' },
  ghost:     { backgroundColor: 'transparent', color: '#64748b', border: '1px solid #e2e8f0' },
  danger:    { backgroundColor: '#ef4444', color: '#fff', border: 'none' },
}

export default function Button({ children, onClick, variant = 'primary', disabled = false, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '13px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        transition: 'opacity 0.15s',
        ...VARIANTS[variant],
        ...style,
      }}
    >
      {children}
    </button>
  )
}
