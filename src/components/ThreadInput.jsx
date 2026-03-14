import useInput from '../hooks/useInput'

function ThreadInput ({ addThread }) {
  const [title, onTitleChange] = useInput('')
  const [category, onCategoryChange] = useInput('')
  const [body, onBodyChange] = useInput('')

  function handleSubmit (event) {
    event.preventDefault()
    addThread({ title, body, category })
  }

  return (
    <form className="thread-input" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
      <input type="text" value={title} onChange={onTitleChange} placeholder="Judul Diskusi" required style={{ padding: '10px' }} />
      <input type="text" value={category} onChange={onCategoryChange} placeholder="Kategori (Opsional)" style={{ padding: '10px' }} />
      <textarea value={body} onChange={onBodyChange} placeholder="Tulis apa yang sedang kamu pikirkan..." required rows="8" style={{ padding: '10px' }} />
      <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#000', color: '#fff', border: 'none' }}>Buat Thread Baru</button>
    </form>
  )
}

export default ThreadInput
