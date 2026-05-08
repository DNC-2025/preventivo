import { useState } from 'react'

function ClienteForm({ client, onSave, onClose }) {
  const [form, setForm] = useState({
    nameOrCompany: client?.nameOrCompany || '',
    address: client?.address || '',
    country: client?.country || 'Italia',
    city: client?.city || '',
    phone: client?.phone || '',
    email: client?.email || '',
    notes: client?.notes || '',
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.nameOrCompany.trim()) return
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', padding: '1.5rem',
        width: '480px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '1.25rem' }}>
          {client ? 'Modifica cliente' : 'Nuovo cliente'}
        </h3>

        {[
          { label: 'Nome / Ragione sociale *', name: 'nameOrCompany', type: 'text', placeholder: 'Es. Rossi Marco o Rossi Srl' },
          { label: 'Indirizzo', name: 'address', type: 'text', placeholder: 'Via Roma 1, Milano' },
          { label: 'Città', name: 'city', type: 'text', placeholder: 'Torino' },
          { label: 'Paese', name: 'country', type: 'text', placeholder: 'Italia' }, 
          { label: 'Telefono', name: 'phone', type: 'text', placeholder: '+39 333 123 4567' },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'nome@email.it' },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#666', marginBottom: '4px' }}>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              style={{
                width: '100%', padding: '8px 10px', fontSize: '13px',
                border: '0.5px solid #d0d0d0', borderRadius: '8px',
                background: '#fff', outline: 'none',
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#666', marginBottom: '4px' }}>
            Note
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Note interne sul cliente..."
            rows={3}
            style={{
              width: '100%', padding: '8px 10px', fontSize: '13px',
              border: '0.5px solid #d0d0d0', borderRadius: '8px',
              background: '#fff', outline: 'none', resize: 'vertical',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '8px 16px', fontSize: '13px',
            border: '0.5px solid #d0d0d0', borderRadius: '8px',
            background: '#fff', cursor: 'pointer',
          }}>Annulla</button>
          <button onClick={handleSubmit} disabled={saving} style={{
            padding: '8px 16px', fontSize: '13px', fontWeight: '500',
            border: 'none', borderRadius: '8px',
            background: saving ? '#93c5fd' : '#185FA5',
            color: '#fff', cursor: saving ? 'not-allowed' : 'pointer',
          }}>
            {saving ? 'Salvataggio...' : client ? 'Salva modifiche' : 'Crea cliente'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClienteForm