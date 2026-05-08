export default function Card({ children, style, padding = '20px 24px' }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
