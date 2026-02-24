import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <h1>Privat Thaiboxning PT</h1>
      <p>Välkommen till vår plattform för thaiboxning träning och utveckling. Här kan du hitta värdefull information, träningsprogram och anmäla dig till våra kurser.</p>
      
      <h2>Om oss</h2>
      <p>Vi är dedikerade traininstruktörer med många års erfarenhet inom thaiboxning. Vår mission är att hjälpa både nybörjare och erfarna boxare att nå sina träningmål genom personlig vägledning och professionell expertis.</p>


      <h2>Priser</h2>
      <p>Vi erbjuder paketpriser utöver betalning för enstaka pass, 1 pass är 90 minuter</p>
      <ul>
      <li>1 pass: 300 SEK</li>
      <li>5 pass: 1200 SEK </li>
      <li>10 pass: 2500  SEK</li>
      <li>15 pass: 3,000 SEK</li>

      </ul>

      <h3>Kom igång</h3>
      <p>Vill du komma igång med träning, skapa ett konto hos oss för att få flertal förmåner såsom åtkomst till exklusivt material, få tillgång till artiklar, exklusiv medlemsinformation osv, <Link to="/register">Registrera dig här</Link></p>
   </div>


  );
}