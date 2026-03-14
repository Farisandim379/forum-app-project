import useInput from '../hooks/useInput'
import { Link } from 'react-router-dom'

function CommentInput ({ addComment, authUser }) {
  const [content, onContentChange, setContent] = useInput('')

  function handleSubmit (event) {
    event.preventDefault()
    addComment(content)
    setContent('') // Kosongkan input setelah submit
  }

  // Jika belum login, tampilkan pesan peringatan alih-alih form
  if (!authUser) {
    return (
      <p style={{ backgroundColor: '#f9f9f9', padding: '15px', border: '1px solid #ddd' }}>
        <Link to="/login">Login</Link> untuk memberikan komentar.
      </p>
    )
  }

  return (
    <form className="comment-input" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <textarea
        value={content}
        onChange={onContentChange}
        placeholder="Tulis komentarmu di sini..."
        required
        rows="4"
        style={{ padding: '10px', width: '100%', maxWidth: '500px' }}
      />
      <button type="submit" style={{ padding: '10px', width: '150px', cursor: 'pointer' }}>Kirim Komentar</button>
    </form>
  )
}

export default CommentInput
