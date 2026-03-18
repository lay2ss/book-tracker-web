import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Nav from './components/Nav';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from './pages/Profile';
import Settings from "./pages/Settings";
import AddBook from "./components/AddBook";
import CollectionDetails from "./components/CollectionDetails";
import CreateCollection from "./components/CreateCollection";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import { useAuth, AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from "./routes/PrivateRoute";

function AppLayout() {
  const location = useLocation();
  const { token } = useAuth();
  const showNav = token && ["/", "/home", "/profile", "/settings", "/change-password"].includes(location.pathname) ||
  location.pathname.startsWith("/book/") || location.pathname.startsWith("/collection/")

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
        <Route path="/book/add/:id" element={<PrivateRoute><AddBook /></PrivateRoute>} />
        <Route path="/collection/:id/:qnt" element={<PrivateRoute><CollectionDetails /></PrivateRoute>} />
        <Route path="/collection/create" element={<PrivateRoute><CreateCollection /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

