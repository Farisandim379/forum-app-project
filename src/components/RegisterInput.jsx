import useInput from '../hooks/useInput'

function RegisterInput ({ register }) {
  const [name, onNameChange] = useInput('')
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  function handleSubmit (event) {
    event.preventDefault()
    register({ name, email, password })
  }

  return (
    <form className="register-input" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Nama Lengkap"
        required
        style={{ padding: '8px' }}
      />
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        required
        style={{ padding: '8px' }}
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password (minimal 6 karakter)"
        required
        minLength={6}
        style={{ padding: '8px' }}
      />
      <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Daftar</button>
    </form>
  )
}

export default RegisterInput
