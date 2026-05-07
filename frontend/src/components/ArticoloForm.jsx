// src/components/ArticoloForm.jsx
// Gestisce sia creazione che modifica. Se riceve articolo come prop, pre-popola i campi — altrimenti è un form vuoto. 
// Nota come gestisce metadata come stringa JSON editabile.

import { useState } from 'react'
import { X } from 'lucide-react'

const emptyForm = {
  name: '',
  category: '',
  unit: '',
  price: '',
  active: true,
  metadata: '',
}

function ArticoloForm({ articolo, onSave, onClose }) {
  const isEdit = !!articolo

  const [form, setForm] = useState(() => {
    if (!articolo) return emptyForm
    return {
      name: articolo.name || '',
      category: articolo.category || '',
      unit: articolo.unit || '',
      price: articolo.price?.toString() || '',
      active: articolo.active ?? true,
      // metadata è un oggetto JSON — lo convertiamo in stringa per editarlo
      metadata: articolo.metadata ? JSON.stringify(articolo.metadata, null, 2) : '',
    }
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Rimuove l'errore sul campo che l'utente sta modificando
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Il nome è obbligatorio'
    if (!form.category.trim()) newErrors.category = 'La categoria è obbligatoria'
    if (!form.unit.trim()) newErrors.unit = "L'unità è obbligatoria"
    if (!form.price) newErrors.price = 'Il prezzo è obbligatorio'
    if (parseFloat(form.price) < 0) newErrors.price = 'Il prezzo deve essere positivo'

    // Valida metadata solo se compilato
    if (form.metadata.trim()) {
      try {
        JSON.parse(form.metadata)
      } catch {
        newErrors.metadata = 'Il metadata deve essere un JSON valido'
      }
    }

    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      unit: form.unit.trim(),
      price: parseFloat(form.price),
      active: form.active,
      metadata: form.metadata.trim() ? JSON.parse(form.metadata) : null,
    }

    onSave(payload)
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '8px 12px', fontSize: '13px',
    border: `0.5px solid ${errors[field] ? '#dc2626' : '#d0d0d0'}`,
    borderRadius: '8px', outline: 'none', boxSizing: 'border-box',
    background: '#fff',
  })

  const labelStyle = {
    fontSize: '12px', fontWeight: '500', color: '#555', marginBottom: '4px', display: 'block',
  }

  const errorStyle = {
    fontSize: '11px', color: '#dc2626', marginTop: '3px',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '1.5rem',
        width: '480px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        maxHeight: '90vh', overflowY: 'auto',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '500', margin: 0 }}>
            {isEdit ? 'Modifica articolo' : 'Nuovo articolo'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={18} color="#888" />
          </button>
        </div>

        {/* Campi */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          <div>
            <label style={labelStyle}>Nome *</label>
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle('name')} placeholder="Es. Rovere naturale" />
            {errors.name && <p style={errorStyle}>{errors.name}</p>}
          </div>

          <div>
            <label style={labelStyle}>Categoria *</label>
            <input name="category" value={form.category} onChange={handleChange} style={inputStyle('category')} placeholder="Es. Parquet" />
            {errors.category && <p style={errorStyle}>{errors.category}</p>}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Unità *</label>
              <input name="unit" value={form.unit} onChange={handleChange} style={inputStyle('unit')} placeholder="Es. m²" />
              {errors.unit && <p style={errorStyle}>{errors.unit}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Prezzo *</label>
              <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} style={inputStyle('price')} placeholder="Es. 45.50" />
              {errors.price && <p style={errorStyle}>{errors.price}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input name="active" type="checkbox" checked={form.active} onChange={handleChange} id="active" />
            <label htmlFor="active" style={{ fontSize: '13px', color: '#555', cursor: 'pointer' }}>Articolo attivo</label>
          </div>

          <div>
            <label style={labelStyle}>Metadata JSON <span style={{ fontWeight: '400', color: '#999' }}>(opzionale)</span></label>
            <textarea
              name="metadata"
              value={form.metadata}
              onChange={handleChange}
              style={{ ...inputStyle('metadata'), resize: 'vertical', minHeight: '80px', fontFamily: 'monospace', fontSize: '12px' }}
              placeholder={'{\n  "fornitore": "Listone Giordano"\n}'}
            />
            {errors.metadata && <p style={errorStyle}>{errors.metadata}</p>}
          </div>

        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button onClick={onClose} style={{
            padding: '8px 16px', fontSize: '13px', border: '0.5px solid #d0d0d0',
            borderRadius: '8px', background: '#fff', cursor: 'pointer',
          }}>
            Annulla
          </button>
          <button onClick={handleSubmit} style={{
            padding: '8px 16px', fontSize: '13px', border: 'none',
            borderRadius: '8px', background: '#185FA5', color: '#fff', cursor: 'pointer',
          }}>
            {isEdit ? 'Salva modifiche' : 'Crea articolo'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ArticoloForm