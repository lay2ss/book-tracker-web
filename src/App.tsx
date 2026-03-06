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
import ChangePassword from "./pages/changePassword";

function AppLayout() {
  const location = useLocation();
  const showNav = ["/", "/home", "/profile", "/settings", "/change-password"].includes(location.pathname) ||
  location.pathname.startsWith("/book/") || location.pathname.startsWith("/collection/")

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/book/add/:id" element={<AddBook />} />
        <Route path="/collection/:id/:qnt" element={<CollectionDetails />} />
        <Route path="/collection/create" element={<CreateCollection />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

