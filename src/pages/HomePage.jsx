import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import ThreadList from '../components/ThreadList'

function HomePage () {
  const { threads = [], users = [], authUser } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())
  }, [dispatch])

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId)
  }))

  // ... kode logic tetap sama
  return (
    <section className="home-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', margin: 0 }}>Diskusi Hangat</h2>

        {authUser && (
          <Link to="/new" className="btn-primary">
            <span>+</span> Mulai Obrolan
          </Link>
        )}
      </div>

      <ThreadList threads={threadList} />
    </section>
  )
}

export default HomePage
