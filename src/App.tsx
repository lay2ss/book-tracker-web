import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Nav from './components/Nav';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from './pages/Profile';

function AppLayout() {
  const location = useLocation();
  const showNav = ["/", "/home", "/profile"].includes(location.pathname);

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
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

