// La pagina principale — gestisce stato, fetch e coordina i due componenti sopra. 
// Nota che è molto più snella rispetto a ClientiPage grazie alla separazione.

// src/pages/ArticoliPage.jsx
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import { articlesApi } from '../api/articles'
import ArticoloForm from '../components/ArticoloForm'
import ArticoloDeleteDialog from '../components/ArticoloDeleteDialog'

function ArticoliPage() {
  const { getToken } = useAuth()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [deletingArticle, setDeletingArticle] = useState(null)

const fetchArticles = useCallback(async () => {
  try {
    setLoading(true)
    const data = await articlesApi.getAll(getToken, { search })
    setArticles(Array.isArray(data) ? data : [])
  } catch (err){
    toast.error('Errore nel caricamento articoli')
  } finally {
    setLoading(false)
  }
}, [getToken, search])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const handleSave = async (formData) => {
    try {
      if (editingArticle) {
        await articlesApi.update(getToken, editingArticle.id, formData)
        toast.success('Articolo aggiornato!')
      } else {
        await articlesApi.create(getToken, formData)
        toast.success('Articolo creato!')
      }
      setShowForm(false)
      setEditingArticle(null)
      fetchArticles()
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || 'Errore nel salvataggio'
      toast.error(msg)
    }
  }

  const handleDelete = async () => {
    try {
      await articlesApi.delete(getToken, deletingArticle.id)
      toast.success('Articolo eliminato')
      setDeletingArticle(null)
      fetchArticles()
    } catch {
      toast.error("Errore nell'eliminazione")
    }
  }

  const handleNew = () => {
    setEditingArticle(null)
    setShowForm(true)
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setShowForm(true)
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.5rem', flexWrap: 'nowrap',
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: '500', whiteSpace: 'nowrap' }}>Articoli</h1>
        <button onClick={handleNew} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 16px', fontSize: '13px', fontWeight: '500',
          background: '#185FA5', color: '#fff', border: 'none',
          borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
          <Plus size={15} /> Nuovo articolo
        </button>
      </div>

      {/* Ricerca */}
      <input
        type="text"
        placeholder="Cerca articolo..."
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
      ) : articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#aaaaaa' }}>
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>📦</p>
          <p style={{ fontSize: '14px' }}>Nessun articolo trovato</p>
          <p style={{ fontSize: '12px', marginTop: '4px' }}>Clicca "Nuovo articolo" per aggiungerne uno</p>
        </div>
      ) : (
        <div style={{ border: '0.5px solid #e8e8e8', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f9f9f8' }}>
                {['Nome', 'Categoria', 'Unità', 'Prezzo', 'Stato', ''].map(h => (
                  <th key={h} style={{
                    padding: '10px 16px', textAlign: 'left', fontWeight: '500',
                    fontSize: '12px', color: '#888', borderBottom: '0.5px solid #e8e8e8',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr key={article.id} style={{ borderBottom: i < articles.length - 1 ? '0.5px solid #f0f0f0' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '500', color: '#1a1a1a' }}>{article.name}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{article.category}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{article.unit}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>€ {Number(article.price || 0).toFixed(2)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: '11px', padding: '3px 8px', borderRadius: '20px',
                      background: article.active ? '#dcfce7' : '#f3f4f6',
                      color: article.active ? '#16a34a' : '#6b7280',
                    }}>
                      {article.active ? 'Attivo' : 'Inattivo'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(article)} style={{
                      padding: '4px 10px', fontSize: '12px', marginRight: '6px',
                      border: '0.5px solid #d0d0d0', borderRadius: '6px',
                      background: '#fff', cursor: 'pointer', color: '#555',
                    }}>Modifica</button>
                    <button onClick={() => setDeletingArticle(article)} style={{
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
        <ArticoloForm
          articolo={editingArticle}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingArticle(null) }}
        />
      )}

      {/* Dialog eliminazione */}
      {deletingArticle && (
        <ArticoloDeleteDialog
          articolo={deletingArticle}
          onConfirm={handleDelete}
          onCancel={() => setDeletingArticle(null)}
        />
      )}
    </div>
  )
}

export default ArticoliPage