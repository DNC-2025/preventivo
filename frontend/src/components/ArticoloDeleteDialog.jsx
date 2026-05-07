// src/components/ArticoloDeleteDialog.jsx
//  riceve l'articolo da eliminare e due callback: conferma e annulla.
import { Trash2 } from 'lucide-react'

function ArticoloDeleteDialog({ articolo, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '1.5rem',
        width: '360px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Trash2 size={18} color="#dc2626" />
          <h3 style={{ fontSize: '15px', fontWeight: '500', margin: 0 }}>Elimina articolo</h3>
        </div>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
          Stai per eliminare:
        </p>
        <p style={{ fontSize: '13px', fontWeight: '500', color: '#1a1a1a', marginBottom: '1.5rem' }}>
          {articolo.name}
        </p>
        <p style={{ fontSize: '12px', color: '#999', marginBottom: '1.5rem' }}>
          L'operazione non può essere annullata.
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{
            padding: '8px 16px', fontSize: '13px', border: '0.5px solid #d0d0d0',
            borderRadius: '8px', background: '#fff', cursor: 'pointer',
          }}>
            Annulla
          </button>
          <button onClick={onConfirm} style={{
            padding: '8px 16px', fontSize: '13px', border: 'none',
            borderRadius: '8px', background: '#dc2626', color: '#fff', cursor: 'pointer',
          }}>
            Elimina
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticoloDeleteDialog