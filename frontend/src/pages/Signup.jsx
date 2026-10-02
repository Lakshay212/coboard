import { useState } from 'react'
import { signupUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'


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
    <div className='body'>
    <div className='holder'>
        <h1 className='heading1'>Signup</h1>
        <div>
            <input type='email' className='textInputL' placeholder='Enter your Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
        </div>
        <div>
          <input type="text" className='textInputL' placeholder='Enter your Name' value={name} onChange={(e)=> setName(e.target.value)}/>
        </div>
        <div>
            <input type='password' className='textInputL'  placeholder='Enter your Password' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
        </div>
        <div>
            <button className="SubmitButton" onClick={handleSubmit}>Log In</button>
        </div>
        <div>
          <p>Already have an account? <span onClick={() => navigate('/login')} style={{cursor:'pointer', color:'blue'}}>Log In</span></p>
        </div>
    </div>
    </div>
  )
}

export default Signup