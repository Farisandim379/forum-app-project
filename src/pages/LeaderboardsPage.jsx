import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPopulateLeaderboards } from '../states/leaderboards/action'
import LeaderboardItem from '../components/LeaderboardItem'

function LeaderboardsPage () {
  const { leaderboards = [] } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards())
  }, [dispatch])

  return (
    <section className="leaderboards-page card">
      <h2 style={{ fontSize: '24px', marginBottom: '10px', marginTop: 0 }}>Klasemen Pengguna Aktif</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>Terima kasih telah berpartisipasi dan membantu sesama di RuangSapa.</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '10px', padding: '0 10px' }}>
        <span>Pengguna</span>
        <span>Skor</span>
      </div>

      <div className="leaderboards-list">
        {leaderboards.map((leaderboard) => (
          <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
        ))}
      </div>
    </section>
  )
}

export default LeaderboardsPage
