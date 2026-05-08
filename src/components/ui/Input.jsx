export default function Input({ label, value, onChange, placeholder, type = 'text', required = false, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>
          {label}{required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          padding: '9px 12px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          fontSize: '13px',
          outline: 'none',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: '#0f172a',
          backgroundColor: '#fff',
          ...style,
        }}
      />
    </div>
  )
}
