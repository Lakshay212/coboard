import { useState } from 'react'
import { signupUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
  try {
    const data = await signupUser(name, email, password)
    localStorage.setItem('token', data.token)
    console.log('Signup success:', data)
    navigate('/dashboard')
    // redirect to dashboard after login
  } catch (err) {
    console.error('Signup failed:', err)
  }
}
const goLogin = async () => {
  try {
    navigate('/login')
    // redirect to dashboard after login
  } catch (err) {
    console.error('Error:', err)
  }
}
  return (
    <div>
        <h1>Signup</h1>
        <div>
            <input type='email' placeholder='Enter your Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
        </div>
        <div>
          <input type="text" placeholder='Enter your Name' value={name} onChange={(e)=> setName(e.target.value)}/>
        </div>
        <div>
            <input type='password'  placeholder='Enter your Password' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
        </div>
        <div>
            <button onClick={handleSubmit}>Log In</button>
        </div>
        <div>
          <a onClick={goLogin}>Already have account</a>
        </div>
    </div>
  )
}

export default Signup