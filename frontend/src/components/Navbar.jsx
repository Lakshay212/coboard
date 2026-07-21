import { useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'



function Navbar(){
    const navigate = useNavigate()
    const handleLogout= async ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div className="navbar-main">
            <div className="logo-area">
                <h1>CoBoard</h1>
            </div>
            <div className="logout-button">
                <button className="logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}
export default Navbar