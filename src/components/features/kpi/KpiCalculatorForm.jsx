import { useState } from 'react'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

const TIPOS = ['VENTAS', 'RENTABILIDAD', 'INVENTARIO']
const EMPTY = { nombre: '', tipo: 'VENTAS', valor: '', unidad: '', sucursal: '' }

export default function KpiCalculatorForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState(EMPTY)

  const set = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const { tipo, nombre, valor, sucursal } = form
    onSubmit?.({ tipo, nombre, valorBase: Number(valor), sucursal })
    setForm(EMPTY)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label="Nombre del KPI"
        value={form.nombre}
        onChange={set('nombre')}
        placeholder="Ej: Ventas mensuales"
        required
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>
          Tipo <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
        </label>
        <select
          value={form.tipo}
          onChange={set('tipo')}
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
          {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

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
          label="Unidad"
          value={form.unidad}
          onChange={set('unidad')}
          placeholder="Ej: %, CLP"
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
        {loading ? 'Calculando...' : 'Calcular KPI'}
      </Button>
    </form>
  )
}
