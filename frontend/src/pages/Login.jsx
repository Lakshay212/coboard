import { useState } from 'react'
import { loginUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
  try {
    const data = await loginUser(email, password)
    localStorage.setItem('token', data.token)
    console.log('Login success:', data)
    navigate('/dashboard')
    // redirect to dashboard after login
  } catch (err) {
    console.error('Login failed:', err)
  }
}
const goSignup = async () => {
  try {
    navigate('/signup')
    // redirect to dashboard after login
  } catch (err) {
    console.error('Error:', err)
  }
}

  return (
    <div>
        <h1>LogIn</h1>
        <div>
            <input type='email' placeholder='Enter your Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
        </div>
        <div>
            <input type='password'  placeholder='Enter your Password' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
        </div>
        <div>
            <button onClick={handleSubmit}>Log In</button>
        </div>
        <div>
          <a onClick={goSignup}>Have no account</a>
        </div>
    </div>
  )
}

export default Login