export default function Badge({ children, color = '#6366f1', bgColor = 'rgba(99,102,241,0.1)', style }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '20px',
        backgroundColor: bgColor,
        color,
        fontSize: '12px',
        fontWeight: '600',
        ...style,
      }}
    >
      {children}
    </span>
  )
}
