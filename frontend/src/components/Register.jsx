import { useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

export default function Register(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');

const handleSubmit = async e => {
    e.preventDefault();

    if(password !== passwordConfirm){
        setMessage('Lösenord matchar ej');
        return;
    }

    try{
        await api.post('/auth/register', { username, password });
        setMessage('Konto Skapat');
    } catch(err){
        setMessage(err.response?.data?.message || 'Fel vid registrering');
    }

};

return(
    <div className='container'>
    <h2>Skapa konto</h2>
    <form onSubmit={handleSubmit}>
    <input placeholder="användarnamn"
    value={username}
    onChange={e => setUsername(e.target.value)}
    required
    />

    <input 
    type="password"
    placeholder='Lösenord'
    value={password}
    onChange={e => setPassword(e.target.value)}
    required
    />

    <input 
    type="password"
    placeholder='Validera Lösenord'
    value={passwordConfirm}
    onChange={e => setPasswordConfirm(e.target.value)}
    required
    />
    <button type='submit'>Registrera</button>
    </form>

    <p>{message}</p>
    <p>Har du redan ett konto? <Link to="/login">Logga in här</Link></p>
    </div>
)


}