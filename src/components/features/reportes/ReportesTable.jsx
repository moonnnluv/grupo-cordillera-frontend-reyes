import { useState } from 'react'
import Badge from '../../ui/Badge'
import Modal from '../../ui/Modal'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import api from '../../../api/axios'

const EMPTY_FORM = { titulo: '', descripcion: '', sucursal: '' }

export default function ReportesTable({
  reportes = [],
  loading = false,
  accent = '#f59e0b',
  accentBg = 'rgba(245,158,11,0.1)',
  onCreated,
}) {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const set = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await api.post('/api/reportes', form)
      setForm(EMPTY_FORM)
      setShowModal(false)
      onCreated?.()
    } catch (err) {
      console.error('Error al crear reporte:', err)
      setError('No se pudo crear el reporte. Intenta nuevamente.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            Reportes Generados
          </h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Badge color={accent} bgColor={accentBg}>
              {loading ? '...' : `${reportes.length} reportes`}
            </Badge>
            <Button variant="primary" onClick={() => setShowModal(true)} style={{ padding: '6px 14px', fontSize: '12px' }}>
              + Crear reporte
            </Button>
          </div>
        </div>

        {loading && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
            Cargando reportes...
          </div>
        )}

        {!loading && reportes.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📄</div>
            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Sin reportes disponibles</div>
            <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
              Los reportes aparecerán cuando se generen desde el sistema
            </div>
          </div>
        )}

        {!loading && reportes.length > 0 && (
          <div>
            <div
              className="table-card-header"
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '10px 24px 6px',
                borderBottom: '1px solid #f8fafc',
              }}
            >
              {['Título', 'Tipo', 'Sucursal', 'Fecha'].map(h => (
                <div
                  key={h}
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#94a3b8',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {reportes.map((r, i) => (
              <div
                key={r.id || i}
                className="table-card-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  padding: '14px 24px',
                  borderBottom: i < reportes.length - 1 ? '1px solid #f8fafc' : 'none',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fafafa')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div className="table-card-name" style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                  {r.titulo || r.nombre || `Reporte ${i + 1}`}
                </div>
                <div>
                  <Badge color={accent} bgColor={accentBg}>
                    {r.tipo || 'GENERAL'}
                  </Badge>
                </div>
                <div className="col-mobile-hidden" style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {r.sucursal || '—'}
                </div>
                <div className="col-mobile-hidden" style={{ fontSize: '12px', color: '#94a3b8' }}>
                  {r.fecha || r.createdAt || '—'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => { setShowModal(false); setError(null) }} title="Crear reporte">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Título"
            value={form.titulo}
            onChange={set('titulo')}
            placeholder="Ej: Reporte mensual de ventas"
            required
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={set('descripcion')}
              placeholder="Descripción del reporte..."
              rows={3}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '13px',
                color: '#0f172a',
                backgroundColor: '#fff',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                resize: 'vertical',
                outline: 'none',
              }}
            />
          </div>
          <Input
            label="Sucursal"
            value={form.sucursal}
            onChange={set('sucursal')}
            placeholder="Ej: SANTIAGO"
            required
          />
          {error && (
            <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', fontSize: '12px' }}>
              {error}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button type="button" variant="ghost" onClick={() => { setShowModal(false); setError(null) }}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Guardando...' : 'Crear reporte'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
