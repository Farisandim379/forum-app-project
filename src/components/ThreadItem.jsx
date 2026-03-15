import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' // Import hooks Redux
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread, asyncToggleNeutralVoteThread } from '../states/threads/action'

// props upVotesBy dan downVotesBy
function ThreadItem ({ id, title, body, category, createdAt, totalComments, upVotesBy, downVotesBy, user }) {
  const postedAt = new Date(createdAt).toLocaleDateString()
  const dispatch = useDispatch()
  const { authUser } = useSelector((states) => states) // Ambil authUser untuk cek status vote

  const isUpVoted = authUser ? upVotesBy.includes(authUser.id) : false
  const isDownVoted = authUser ? downVotesBy.includes(authUser.id) : false

  const onUpVoteClick = () => {
    if (!authUser) return alert('Silakan login untuk memberikan vote!')
    if (isUpVoted) dispatch(asyncToggleNeutralVoteThread(id))
    else dispatch(asyncToggleUpVoteThread(id))
  }

  const onDownVoteClick = () => {
    if (!authUser) return alert('Silakan login untuk memberikan vote!')
    if (isDownVoted) dispatch(asyncToggleNeutralVoteThread(id))
    else dispatch(asyncToggleDownVoteThread(id))
  }

  return (
    <div className="card">
      <header>
        {category && <span className="tag">#{category}</span>}
        <h3 style={{ marginTop: '0', fontSize: '20px' }}>
          <Link
            to={`/threads/${id}`}
            style={{ color: 'var(--text-dark)', transition: 'color 0.2s' }}
            onMouseOver={(e) => { e.target.style.color = 'var(--primary)' }}
            onMouseOut={(e) => { e.target.style.color = 'var(--text-dark)' }}
          >
            {parse(title)}
          </Link>
        </h3>
      </header>

      <div className="thread-item__body" style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
        {parse(body.substring(0, 120) + '...')}
      </div>
      <footer className="user-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={user?.avatar} alt={user?.name} width="32" className="avatar" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: '14px', color: 'var(--text-dark)' }}>{user?.name}</strong>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{postedAt}</span>
          </div>
        </div>

        {/* Action Buttons: Votes & Comments */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={onUpVoteClick} style={{ cursor: 'pointer', background: 'none', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '4px 12px', display: 'flex', gap: '5px', alignItems: 'center', color: isUpVoted ? 'var(--primary)' : 'inherit', fontWeight: isUpVoted ? 'bold' : 'normal' }}>
            👍 {upVotesBy.length}
          </button>

          <button onClick={onDownVoteClick} style={{ cursor: 'pointer', background: 'none', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '4px 12px', display: 'flex', gap: '5px', alignItems: 'center', color: isDownVoted ? 'red' : 'inherit', fontWeight: isDownVoted ? 'bold' : 'normal' }}>
            👎 {downVotesBy.length}
          </button>

          <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600', backgroundColor: 'var(--border-light)', padding: '4px 12px', borderRadius: '20px' }}>
            💬 {totalComments}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ThreadItem
