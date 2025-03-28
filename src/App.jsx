import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoutes";
import { WorkDataProvider } from "./context/WorkDataContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />

                    <Route path="/dashboard" element={<PrivateRoute>
                        <WorkDataProvider>
                            <Dashboard />
                        </WorkDataProvider>
                    </PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
