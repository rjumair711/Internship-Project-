import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Register from "../Pages/Auth/Register.jsx";
import Login from "../Pages/Auth/Login.jsx";
import InvestorDashboard from '../Pages/Dashboard/InvestorDashboard.jsx';
import EnterpreneurDashboard from '../Pages/Dashboard/EnterpreneurDasboard.jsx'; // ✅ FIXED
import InvestorProfile from '../Pages/Profile/InvestorProfile.jsx';
import EnterpreneurProfile from '../Pages/Profile/EnterpreneurProfile.jsx';
import Chat from '../Pages/Chat/ChatPage.jsx';

const PrivateRoute = ({ element, redirectTo }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to={redirectTo} />;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} /> {/* Optional default route */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/investor" element={<PrivateRoute element={<InvestorDashboard />} redirectTo="/login" />} />
      <Route path="/dashboard/entrepreneur" element={<PrivateRoute element={<EnterpreneurDashboard />} redirectTo="/login" />} />
      <Route path="/profile/investor/:id" element={<PrivateRoute element={<InvestorProfile />} redirectTo="/login" />} />
      <Route path="/profile/entrepreneur/:id" element={<PrivateRoute element={<EnterpreneurProfile />} redirectTo="/login" />} />
      <Route path="/chat" element={<PrivateRoute element={<Chat />} redirectTo="/login" />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} /> {/* Optional 404 */}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
