import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Nav from './components/Nav';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from './pages/Profile';
import Settings from "./pages/Settings";
import AddBook from "./components/AddBook";
import CollectionDetails from "./components/CollectionDetails";

function AppLayout() {
  const location = useLocation();
  const showNav = ["/", "/home", "/profile", "/settings"].includes(location.pathname) ||
  location.pathname.startsWith("/book/") || location.pathname.startsWith("/collection/")

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/book/add/:id" element={<AddBook />} />
        <Route path="/collection/:id/:qnt" element={<CollectionDetails />} />
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

