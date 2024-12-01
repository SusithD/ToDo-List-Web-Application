import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TodoDashboard from './pages/TodoDashboard';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AuthProvider, { AuthContext } from './context/AuthContext';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<ProtectedRoute component={<TodoDashboard />} />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

// Protected Route
const ProtectedRoute = ({ component }) => {
    const { token } = useContext(AuthContext);
    return token ? component : <Navigate to="/login" replace />;
};

export default App;
