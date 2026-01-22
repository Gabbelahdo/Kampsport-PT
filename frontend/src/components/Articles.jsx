import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Articles(){
    const [articles, setArticles] = useState([]);

    useEffect(() => {
    api.get('/articles').then(res => setArticles(res.data))
    .catch(err => console.error(err));

    }, []);


    return(
         <div>
            <h2>Artiklar</h2>
            {articles.map(a => (
            <div key={a.id} className="article">

             <h3>{a.title}</h3>
             <p>{a.content}</p>   
           </div>
            ))}
        </div>
       
    );
}