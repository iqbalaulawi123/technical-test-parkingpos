import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import SketchTemplate from "./pages/SketchTemplate";
import Checkin from "./pages/Checkin";
import Checkout from "./pages/Checkout";
import MainContainer from './layout/MainContainer';
import ActionSelector from './pages/ActionSelector';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <MainContainer>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/temp" element={<SketchTemplate />} />
          <Route path="/selector" element={<ActionSelector />} />
          <Route path="/check-in" element={<Checkin />} />
          <Route path="/check-out" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </MainContainer>
    </AuthProvider>
  );
}