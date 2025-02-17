import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Story from "./pages/Story";
import SearchResults from "./pages/SearchResults";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoryList from "./pages/CategoryList";
import CategoryDetail from "./pages/Category";
import { useEffect } from 'react';
import { initializeAuth } from './services/authService';

function App() {
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/the-loai" element={<CategoryList />} />
          <Route path="/the-loai/:id" element={<CategoryDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/story/:id" element={<Story />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
