import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Careers from './pages/Careers';
import CareerDetail from './pages/CareerDetail';
import Quiz from './pages/Quiz';
import Resources from './pages/Resources';
import Counseling from './pages/Counseling';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navigation from './components/Navigation';
import './App.css';
const CURRENT_USER_KEY = 'careerGuide_currentUser';
function getCurrentUser() {
    if (typeof window === 'undefined')
        return null;
    try {
        const stored = localStorage.getItem(CURRENT_USER_KEY);
        if (!stored)
            return null;
        return JSON.parse(stored);
    }
    catch {
        return null;
    }
}
function ProtectedRoute({ children, requiredRole, }) {
    const user = getCurrentUser();
    if (!user) {
        return <Navigate to="/login" replace state={{ requiredRole }}/>;
    }
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/login" replace state={{ requiredRole }}/>;
    }
    return children;
}
function App() {
    return (<Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/careers" element={<ProtectedRoute requiredRole="user">
              <Careers />
            </ProtectedRoute>}/>
        <Route path="/career/:id" element={<ProtectedRoute requiredRole="user">
              <CareerDetail />
            </ProtectedRoute>}/>
        <Route path="/quiz" element={<ProtectedRoute requiredRole="user">
              <Quiz />
            </ProtectedRoute>}/>
        <Route path="/resources" element={<ProtectedRoute requiredRole="user">
              <Resources />
            </ProtectedRoute>}/>
        <Route path="/counseling" element={<ProtectedRoute requiredRole="user">
              <Counseling />
            </ProtectedRoute>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>}/>
      </Routes>
    </Router>);
}
export default App;
