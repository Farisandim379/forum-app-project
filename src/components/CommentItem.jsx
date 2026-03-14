import { useDispatch, useSelector } from 'react-redux'
import { asyncToggleUpVoteComment, asyncToggleDownVoteComment, asyncToggleNeutralVoteComment } from '../states/detailThread/action'

function CommentItem ({ id, content, createdAt, owner, upVotesBy = [], downVotesBy = [] }) {
  const postedAt = new Date(createdAt).toLocaleDateString()
  const dispatch = useDispatch()
  const { authUser } = useSelector((states) => states)

  const isUpVoted = authUser ? upVotesBy.includes(authUser.id) : false
  const isDownVoted = authUser ? downVotesBy.includes(authUser.id) : false

  const onUpVoteClick = () => {
    if (!authUser) return alert('Silakan login untuk memberikan vote!')
    if (isUpVoted) dispatch(asyncToggleNeutralVoteComment(id))
    else dispatch(asyncToggleUpVoteComment(id))
  }

  const onDownVoteClick = () => {
    if (!authUser) return alert('Silakan login untuk memberikan vote!')
    if (isDownVoted) dispatch(asyncToggleNeutralVoteComment(id))
    else dispatch(asyncToggleDownVoteComment(id))
  }

  return (
    <div className="card" style={{ padding: '15px', marginBottom: '15px' }}>
      <header className="user-info" style={{ borderTop: 'none', padding: 0, marginTop: 0, marginBottom: '15px' }}>
        <img src={owner.avatar} alt={owner.name} width="28" className="avatar" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong style={{ fontSize: '14px', color: 'var(--text-dark)' }}>{owner.name}</strong>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{postedAt}</span>
        </div>
      </header>

      <p dangerouslySetInnerHTML={{ __html: content }} style={{ margin: '0 0 15px 0', color: 'var(--text-dark)' }} />

      {/* Tombol Vote Komentar */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onUpVoteClick} style={{ cursor: 'pointer', background: 'none', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', color: isUpVoted ? 'var(--primary)' : 'inherit', fontWeight: isUpVoted ? 'bold' : 'normal' }}>
          👍 {upVotesBy.length}
        </button>
        <button onClick={onDownVoteClick} style={{ cursor: 'pointer', background: 'none', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', color: isDownVoted ? 'red' : 'inherit', fontWeight: isDownVoted ? 'bold' : 'normal' }}>
          👎 {downVotesBy.length}
        </button>
      </div>
    </div>
  )
}

export default CommentItem
