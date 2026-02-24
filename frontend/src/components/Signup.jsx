import { useState } from 'react';
import api from '../api/api';

// tar bort icke-siffror
const onlyDigits = s => {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c >= '0' && c <= '9') out += c;
  }
  return out;
};


const isValidEmail = email => {
  if (!email) return false;
  if (email.indexOf(' ') !== -1) return false;
  const at = email.indexOf('@');
  if (at <= 0) return false;
  if (email.indexOf('@', at + 1) !== -1) return false;
  const dot = email.lastIndexOf('.');
  if (dot <= at + 1) return false;
  if (dot === email.length - 1) return false;
  return true;
};

// svensk telefon utan regex
const isValidSwedishPhone = ph => {
  if (!ph) return false;
  const d = onlyDigits(ph);
  if (d.length === 10 && d[0] === '0') return true;    // 070...
  if (d.length === 11 && d.startsWith('46')) return true; // 4670...
  return false;
};

// personnummer: endast 12 siffror
const isValidPersonnummer = pn => {
  if (!pn) return false;
  const d = onlyDigits(pn);
  return d.length === 12;
};

export default function Signup(){
    const [form, setForm] = useState({
    namn: '', efternamn: '', personnummer: '', experience: 'Nybörjare',
    goal: '', phone: '', email: ''
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
      let err = '';
      const v = value ? value.trim() : '';
      if (name === 'namn' && !v) err = 'Namn saknas';
      if (name === 'efternamn' && !v) err = 'Efternamn saknas';
      if (name === 'personnummer') {
        if (!v) err = 'Personnummer saknas';
        else if (!isValidPersonnummer(v)) err = 'Ogiltigt personnummer';
      }
      if (name === 'email') {
        if (!v) err = 'E-post saknas';
        else if (!isValidEmail(v)) err = 'Ogiltig e-post';
      }
      if (name === 'phone' && v && !isValidSwedishPhone(v)) err = 'Ogiltigt telefonnummer (07xxxxxxxx eller +467xxxxxxxx)';
      setErrors(prev => ({ ...prev, [name]: err }));

    }

    const handleChange = e=> {
        setForm({ ...form, [e.target.name]: e.target.value});
        validateField(e.target.name, e.target.value);
    };

    const handleSubmit = async e => {
  e.preventDefault();

  const newErrors = validateAll();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);               // visa fältspecifika fel
    setMessage('Fixera valideringsfel innan du skickar');
    return;                             // avbryt submit
  }

  // fortsätt med POST om inga fel
  try {
    const res = await api.post('/signup', form);
    setMessage(res.data.message);
    setForm({ namn: '', efternamn: '', personnummer: '', experience: 'Nybörjare', goal: '', phone: '', email: '' });
    setErrors({});
  } catch (err) {
    const backendErrors = err.response?.data?.errors;
    if (Array.isArray(backendErrors)) setMessage(backendErrors.join('; '));
    else setMessage(err.response?.data?.message || 'Fel vid sändning');
  }
};

    const validateAll = () => {
      const newErrors = {};
      if (!form.namn.trim()) newErrors.namn = 'Namn saknas';
      if (!form.personnummer.trim()) newErrors.personnummer = 'Personnummer saknas';
      else if (!isValidPersonnummer(form.personnummer)) newErrors.personnummer = 'Ogiltigt personnummer';
      if (!form.email.trim()) newErrors.email = 'E-post saknas';
      else if (!isValidEmail(form.email)) newErrors.email = 'Ogiltig e-post';
      if (form.phone && !isValidSwedishPhone(form.phone)) newErrors.phone = 'Ogiltigt telefonnummer (07xxxxxxxx eller +467xxxxxxxx)';
      return newErrors;
    };

    return(

        <div>
            <h2>Anmälan PT Thaiboxning</h2>
            <form onSubmit={handleSubmit}>
        <input
          name='namn'
          className={errors.namn ? 'input-error' : (form.namn.trim() ? 'input-valid' : '')}
          placeholder='Namn'
          value={form.namn}
          onChange={handleChange}
          required
        />

        <input
          name='efternamn'
          className={errors.efternamn ? 'input-error' : (form.efternamn.trim() ? 'input-valid' : '')}
          placeholder='Efternamn'
          value={form.efternamn}
          onChange={handleChange}
          required
        />

        <input
          name="personnummer"
          className={errors.personnummer ? 'input-error' : (form.personnummer.trim() ? 'input-valid' : '')}
          placeholder="Personnummer"
          value={form.personnummer}
          onChange={handleChange}
        />

        <select name="experience" value={form.experience} onChange={handleChange}>
          <option>Nybörjare</option>
          <option>Medel</option>
          <option>Avancerad</option>
        </select>

        <input name="goal" placeholder="Mål med träningen" value={form.goal} onChange={handleChange} />

        <input
          name="phone"
          className={errors.phone ? 'input-error' : (form.phone.trim() ? 'input-valid' : '')}
          placeholder="Telefon"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          className={errors.email ? 'input-error' : (form.email.trim() ? 'input-valid' : '')}
          placeholder="E-post"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={Object.keys(validateAll()).length > 0}>Skicka</button>
      </form>
            <p>{message}</p>
            {errors.namn && <p className="error">{errors.namn}</p>}
{errors.personnummer && <p className="error">{errors.personnummer}</p>}
{errors.email && <p className="error">{errors.email}</p>}
{errors.phone && <p className="error">{errors.phone}</p>}
        </div>
    )
}