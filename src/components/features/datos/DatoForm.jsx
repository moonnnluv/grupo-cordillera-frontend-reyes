import { useState } from 'react'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

const FUENTES = ['VENTAS', 'INVENTARIO', 'FINANZAS', 'ECOMMERCE']
const today = () => new Date().toISOString().split('T')[0]
const EMPTY = () => ({ fuente: 'VENTAS', indicador: '', valor: '', fecha: today(), sucursal: '' })

export default function DatoForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState(EMPTY())

  const set = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit?.({ ...form, valor: Number(form.valor) })
    setForm(EMPTY())
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>
          Fuente <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
        </label>
        <select
          value={form.fuente}
          onChange={set('fuente')}
          style={{
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '13px',
            color: '#0f172a',
            backgroundColor: '#fff',
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}
        >
          {FUENTES.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <Input
        label="Indicador"
        value={form.indicador}
        onChange={set('indicador')}
        placeholder="Ej: Ventas netas"
        required
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input
          label="Valor"
          type="number"
          value={form.valor}
          onChange={set('valor')}
          placeholder="0"
          required
        />
        <Input
          label="Fecha"
          type="date"
          value={form.fecha}
          onChange={set('fecha')}
          required
        />
      </div>
      <Input
        label="Sucursal"
        value={form.sucursal}
        onChange={set('sucursal')}
        placeholder="Ej: SANTIAGO"
        required
      />
      <Button type="submit" disabled={loading} style={{ alignSelf: 'flex-end' }}>
        {loading ? 'Guardando...' : 'Guardar dato'}
      </Button>
    </form>
  )
}
