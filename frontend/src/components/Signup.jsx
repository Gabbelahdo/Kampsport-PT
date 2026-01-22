import { useState } from 'react';
import api from '../api/api';

export default function Signup(){
    const [form, setForm] = useState({
    namn: '', efternamn: '', personnummer: '', experience: 'Nybörjare',
    goal: '', phone: '', email: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = e=> setForm({ ...form, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        try{
        const res = await api.post('/signup', form);
        setMessage(res.data.message);
        setForm({ namn: '', efternamn: '', personnummer: '', experience: 'Nybörjare', goal: '', phone: '', email: '' });
        } catch(err){
        setMessage(err.response?.data?.message || 'fel');
        }
    };

    return(

        <div>
            <h2>Anmälan PT Thaiboxning</h2>
            <form onSubmit={handleSubmit}>
                <input name='namn' placeholder='Namn' value={form.namn} onChange={handleChange} required/>
                 <input name='efternamn' placeholder='Efternamn' value={form.efternamn} onChange={handleChange} required/>
                <input name="personnummer" placeholder="Personnummer" value={form.personnummer} onChange={handleChange} />
                <select name="experience" value={form.experience} onChange={handleChange}>
                    <option>Nybörjare</option>
                   <option>Medel</option>
                   <option>Avancerad</option>
                </select>
        <input name="goal" placeholder="Mål med träningen" value={form.goal} onChange={handleChange} />
        <input name="phone" placeholder="Telefon" value={form.phone} onChange={handleChange} />
        <input name="email" placeholder="E-post" value={form.email} onChange={handleChange} required />
        <button type="submit">Skicka</button>
            </form>
            <p>{message}</p>
        </div>
    )
}