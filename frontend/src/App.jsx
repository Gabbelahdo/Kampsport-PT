import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticlePage from './pages/ArticlePage';
import SignupPage from './pages/SignupPage';
import Login from './components/Login';
import './App.css';



function App() {
  return (
    <Router>
     <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<ArticlePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </Router>
    
  
  );
}



export default App;