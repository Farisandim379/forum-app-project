import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import RegisterInput from '../components/RegisterInput'
import { asyncRegisterUser } from '../states/users/action'

function RegisterPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }))
      // Jika berhasil tanpa error, arahkan ke halaman login
      navigate('/login')
    } catch (error) {
      // Error sudah di-handle oleh alert di thunk, jadi kita abaikan saja di sini
    }
  }

  return (
    <section className="register-page">
      <h2>Buat Akun Baru</h2>
      <RegisterInput register={onRegister} />
      <p style={{ marginTop: '15px' }}>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </section>
  )
}

export default RegisterPage
