import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticlePage from './pages/ArticlePage';
import SignupPage from './pages/SignupPage';
import Login from './components/Login';

function App(){

  return(
  <Router>
  <Navbar />

  <Routes>
  <Route path="/" element={<ArticlesPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/login" element={<Login />} />

  </Routes>


  </Router>

  );
}

export default App;