import { useState } from 'react'
import { loginUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/login.css'

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
    <div className='body'>
      
      <div className='holder'>
          <h1 className='heading1'>LogIn</h1>
          <div>
              <input type='email' className='textInputL' placeholder='Enter your Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
          </div>
          <div>
              <input type='password'  className='textInputL' placeholder='Enter your Password' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
          </div>
          <div>
              <button className="SubmitButton" onClick={handleSubmit}>Log In</button>
          </div>
          <div className='NoAccount'>
            <p>Don't have an account? <span onClick={() => navigate('/signup')} style={{cursor:'pointer', color:'blue'}}>Sign up</span></p>
          </div>
      </div>
    </div>
  )
}

export default Login