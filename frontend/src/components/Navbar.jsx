import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
    
        <nav>
        <Link to="/">Artiklar</Link> |{' '}
        <Link to="/signup">Anmälan</Link> |{' '}

         {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
      
        </nav>

    );


}