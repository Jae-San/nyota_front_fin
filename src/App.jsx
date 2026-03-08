import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/landing/Navbar"; 
import Footer from "./components/landing/Footer"; 

import Login from "./components/landing/Login";
import Landing from "./pages/Landing";
// Changement ici : On importe la PAGE et non plus le composant seul
import LandingRegister from "./pages/LandingRegister"; 
import LandingLogin from "./pages/LandingLogin"; 
import LandingPersonalityTest from "./pages/LandingPersonalityTest"; 
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import PersonalityTest from "./components/landing/PersonalityTest";

import ProtectedRoute from "./routes/ProtectedRoute";
import LandingForgotPassword from "./pages/LandingForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-column min-h-screen">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            
            {/* Mise à jour de la route Register */}
            <Route path="/register" element={<LandingRegister />} /> 
            <Route path="/login" element={<LandingLogin />} /> 
            <Route path="/forgot-password" element={<LandingForgotPassword />} /> 
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <LandingPersonalityTest />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;