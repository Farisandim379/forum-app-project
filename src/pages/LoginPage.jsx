import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import LoginInput from '../components/LoginInput'
import { asyncSetAuthUser } from '../states/authUser/action'

function LoginPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogin = ({ email, password }) => {
    // Memanggil fungsi thunk untuk proses API dan simpan token
    dispatch(asyncSetAuthUser({ email, password }))
    // Arahkan pengguna kembali ke halaman utama setelah login ditekan
    navigate('/')
  }

  return (
    <section className="login-page">
      <h2>Silakan Login</h2>
      <LoginInput login={onLogin} />
      <p style={{ marginTop: '15px' }}>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  )
}

export default LoginPage
