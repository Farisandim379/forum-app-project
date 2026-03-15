import { useDispatch, useSelector } from 'react-redux'
import { asyncToggleUpVoteThreadDetail, asyncToggleDownVoteThreadDetail, asyncToggleNeutralVoteThreadDetail } from '../states/detailThread/action'
import parse from 'html-react-parser'

function ThreadDetail ({ title, body, category, createdAt, owner, upVotesBy = [], downVotesBy = [] }) {
  const postedAt = new Date(createdAt).toLocaleDateString()
  const dispatch = useDispatch()
  const { authUser } = useSelector((states) => states)

  const isUpVoted = authUser ? upVotesBy.includes(authUser.id) : false
  const isDownVoted = authUser ? downVotesBy.includes(authUser.id) : false

  const onUpVoteClick = () => {
    if (!authUser) return alert('Silakan login untuk memberikan vote!')
    if (isUpVoted) dispatch(asyncToggleNeutralVoteThreadDetail())
    else dispatch(asyncToggleUpVoteThreadDetail())
  }

  const onDownVoteClick = () => {
    if (!authUser) return alert('Silakan login untuk memberikan vote!')
    if (isDownVoted) dispatch(asyncToggleNeutralVoteThreadDetail())
    else dispatch(asyncToggleDownVoteThreadDetail())
  }

  return (
    <section className="card" style={{ marginBottom: '30px' }}>
      <header>
        <span className="tag">#{category}</span>
        <h2 style={{ marginTop: '10px' }}>{parse(title)}</h2>
      </header>

      <div style={{ marginTop: '15px', color: 'var(--text-dark)' }}>{parse(body)}</div>

      <footer className="user-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={owner.avatar} alt={owner.name} width="32" className="avatar" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: '14px', color: 'var(--text-dark)' }}>{owner.name}</strong>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{postedAt}</span>
          </div>
        </div>

        {/* Tombol Vote Thread Detail */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onUpVoteClick} style={{ cursor: 'pointer', background: 'none', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '4px 12px', color: isUpVoted ? 'var(--primary)' : 'inherit', fontWeight: isUpVoted ? 'bold' : 'normal' }}>
            👍 {upVotesBy.length}
          </button>
          <button onClick={onDownVoteClick} style={{ cursor: 'pointer', background: 'none', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '4px 12px', color: isDownVoted ? 'red' : 'inherit', fontWeight: isDownVoted ? 'bold' : 'normal' }}>
            👎 {downVotesBy.length}
          </button>
        </div>
      </footer>
    </section>
  )
}

export default ThreadDetail
