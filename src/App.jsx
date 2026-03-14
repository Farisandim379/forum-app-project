import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DetailPage from './pages/DetailPage'
import AddThreadPage from './pages/AddThreadPage'
import LeaderboardsPage from './pages/LeaderboardsPage'

function App () {
  const { authUser, isPreload } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser())
  }

  return (
    <>
  <LoadingBar style={{ backgroundColor: '#F26A5A', height: '5px', position: 'fixed', top: 0, left: 0, zIndex: 9999 }} />

      {isPreload
        ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-muted)', fontWeight: '600' }}>
            Mempersiapkan RuangSapa...
          </div>
          )
        : (
        <>
          <header className="app-header">
            <h1 className="brand-logo"><Link to="/">RuangSapa.</Link></h1>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

              {/* 2. Menambah Link Navigasi Klasemen di sini */}
              <Link to="/leaderboards" style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Klasemen</Link>

              {authUser
                ? (
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <img src={authUser.avatar} alt={authUser.name} width="35" className="avatar" />
                  <strong style={{ fontSize: '14px' }}>{authUser.name}</strong>
                  <button onClick={onSignOut} className="btn-outline">Logout</button>
                </div>
                  )
                : (
                <Link to="/login" className="btn-primary">Masuk / Daftar</Link>
                  )}
            </nav>
          </header>

          <main className="app-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/new" element={<AddThreadPage />} />
              <Route path="/threads/:id" element={<DetailPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
            </Routes>
          </main>
        </>
          )}
    </>
  )
}

export default App
