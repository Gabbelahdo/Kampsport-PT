import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import SignupPage from './pages/SignupPage';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';



function App() {
  return (
    <Router>
     <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={
          <ProtectedRoute>
            <ArticlePage />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={
      <ProtectedRoute>
        <SignupPage />
      </ProtectedRoute> }
  />
      </Routes>
      </div>
    </Router>
    
  
  );
}



export default App;