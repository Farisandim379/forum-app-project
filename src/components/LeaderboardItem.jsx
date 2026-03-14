function LeaderboardItem ({ user, score }) {
  return (
    <div className="user-info" style={{ justifyContent: 'space-between', borderTop: 'none', borderBottom: '1px solid var(--border-light)', padding: '15px 0', marginTop: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src={user.avatar} alt={user.name} className="avatar" width="45" />
        <strong style={{ fontSize: '16px', color: 'var(--text-dark)' }}>{user.name}</strong>
      </div>
      <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>
        {score}
      </div>
    </div>
  )
}

export default LeaderboardItem
