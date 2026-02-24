import { useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async e => {
  e.preventDefault();

  try{
    const res = await api.post('/auth/login', {username, password});
    localStorage.setItem('token', res.data.token);
    setMessage('Inloggad');
    navigate('/');

  } catch(err){
    setMessage(err.response?.data?.message || 'Fel');

  }

 };

 return (
    <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
    <input placeholder="Användarnamn" value={username} onChange={e => setUsername(e.target.value)} required/>
    <input type="password" placeholder="Lösenord" value={password} onChange={e => setPassword(e.target.value)} required />
    <button type="submit">Logga in</button>
    </form>
    <p>{message}</p>
    <p>Har du inget konto? <Link to="/register">Registrera dig här</Link></p>
    </div>
 );

}