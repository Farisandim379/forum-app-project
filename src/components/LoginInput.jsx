import useInput from '../hooks/useInput'

function LoginInput ({ login }) {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  function handleSubmit (event) {
    event.preventDefault()
    // Kirim data email dan password ke fungsi login bawaan props
    login({ email, password })
  }

  return (
    <form className="login-input" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
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
        placeholder="Password"
        required
        style={{ padding: '8px' }}
      />
      <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Login</button>
    </form>
  )
}

export default LoginInput
