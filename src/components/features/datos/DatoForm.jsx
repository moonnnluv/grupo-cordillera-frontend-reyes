import { useState, useEffect } from 'react'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

const EMPTY = { indicador: '', valor: '', unidad: '', sucursal: '' }

<<<<<<< Updated upstream
export default function DatoForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState(EMPTY)
=======
export default function DatoForm({ onSubmit, loading = false, initialData = null }) {
  const fromInitial = (d) => ({
    fuente: FUENTES.includes(d?.fuente) ? d.fuente : 'VENTAS',
    indicador: d?.indicador ?? '',
    valor: d?.valor != null ? String(d.valor) : '',
    fecha: d?.fecha ?? today(),
    sucursal: d?.sucursal ?? '',
  })

  const [form, setForm] = useState(initialData ? fromInitial(initialData) : EMPTY())

  useEffect(() => {
    setForm(initialData ? fromInitial(initialData) : EMPTY())
  }, [initialData])
>>>>>>> Stashed changes

  const set = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit?.({ ...form, valor: Number(form.valor) })
<<<<<<< Updated upstream
    setForm(EMPTY)
=======
    if (!initialData) setForm(EMPTY())
>>>>>>> Stashed changes
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
          label="Unidad"
          value={form.unidad}
          onChange={set('unidad')}
          placeholder="Ej: CLP, %, unidades"
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
        {loading ? 'Guardando...' : initialData ? 'Actualizar dato' : 'Guardar dato'}
      </Button>
    </form>
  )
}
