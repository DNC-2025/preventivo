import { useState, useEffect, useCallback  } from 'react'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { clientsApi } from '../api/clients'
import ClienteForm from '../components/ClienteForm'

function ClientiPage() {
  const { getToken } = useAuth()
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true)
      const data = await clientsApi.getAll(getToken, search)
      console.log('clienti ricevuti:', data)
      setClients(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Errore fetch clienti:',err)
      
      toast.error('Errore nel caricamento clienti')
    } finally {
      setLoading(false)
    }
  }, [getToken, search])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  const handleSave = async (formData) => {
    try {
      if (editingClient) {
        await clientsApi.update(getToken, editingClient.id, formData)
        toast.success('Cliente aggiornato!')
      } else {
        await clientsApi.create(getToken, formData)
        toast.success('Cliente creato!')
      }
      setShowForm(false)
      setEditingClient(null)
      fetchClients()
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || 'Errore nel salvataggio'
      toast.error(msg)
    }
  }

  const handleEdit = (client) => {
    setEditingClient(client)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await clientsApi.delete(getToken, id)
      toast.success('Cliente eliminato')
      setDeletingId(null)
      fetchClients()
    } catch (err) {
      toast.error("Errore nell'eliminazione", err)
    }
  }

  const handleNewClient = () => {
    setEditingClient(null)
    setShowForm(true)
  }

  return (
    <div>
      {/* Header pagina */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '1.5rem',
        flexWrap: 'nowrap' }}>
        <h1 style={{ fontSize: '20px', fontWeight: '500' , whiteSpace: 'nowrap'}}>
            Clienti
            </h1>
        <button onClick={handleNewClient} style={{
          padding: '8px 16px', fontSize: '13px', fontWeight: '500',
          background: '#185FA5', color: '#fff', border: 'none',
          borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap'
        }}>
          + Nuovo cliente
        </button>
      </div>

      {/* Ricerca */}
      <input
        type="text"
        placeholder="Cerca cliente..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', maxWidth: '360px', padding: '8px 12px',
          fontSize: '13px', border: '0.5px solid #d0d0d0',
          borderRadius: '8px', marginBottom: '1rem',
          background: '#fff', outline: 'none',
        }}
      />

      {/* Tabella */}
      {loading ? (
        <p style={{ color: '#888', fontSize: '13px' }}>Caricamento...</p>
      ) : clients.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>👥</p>
          <p style={{ fontSize: '14px' }}>Nessun cliente trovato</p>
          <p style={{ fontSize: '12px', marginTop: '4px' }}>Clicca "Nuovo cliente" per aggiungerne uno</p>
        </div>
      ) : (
        <div style={{ border: '0.5px solid #e8e8e8', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f9f9f8' }}>
                {['Nome / Azienda', 'Telefono', 'Email', 'Indirizzo', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '500', fontSize: '12px', color: '#888', borderBottom: '0.5px solid #e8e8e8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((client, i) => (
                <tr key={client.id} style={{ borderBottom: i < clients.length - 1 ? '0.5px solid #f0f0f0' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '500', color: '#1a1a1a' }}>{client.nameOrCompany}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{client.phone || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{client.email || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{client.address || '—'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(client)} style={{
                      padding: '4px 10px', fontSize: '12px', marginRight: '6px',
                      border: '0.5px solid #d0d0d0', borderRadius: '6px',
                      background: '#fff', cursor: 'pointer', color: '#555',
                    }}>Modifica</button>
                    <button onClick={() => setDeletingId(client.id)} style={{
                      padding: '4px 10px', fontSize: '12px',
                      border: '0.5px solid #fca5a5', borderRadius: '6px',
                      background: '#fff', cursor: 'pointer', color: '#dc2626',
                    }}>Elimina</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form modale */}
      {showForm && (
        <ClienteForm
          client={editingClient}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingClient(null) }}
        />
      )}

      {/* Dialog conferma eliminazione */}
      {deletingId && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
        }}>
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '1.5rem',
            width: '360px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '500', marginBottom: '8px' }}>Elimina cliente</h3>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '1.5rem' }}>
              Sei sicura di voler eliminare questo cliente? L'operazione non può essere annullata.
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeletingId(null)} style={{
                padding: '8px 16px', fontSize: '13px', border: '0.5px solid #d0d0d0',
                borderRadius: '8px', background: '#fff', cursor: 'pointer',
              }}>Annulla</button>
              <button onClick={() => handleDelete(deletingId)} style={{
                padding: '8px 16px', fontSize: '13px', border: 'none',
                borderRadius: '8px', background: '#dc2626', color: '#fff', cursor: 'pointer',
              }}>Elimina</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientiPage