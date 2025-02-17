import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthenticated, logout } from '../services/authService';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand text-success" to="/">
            <i className="fas fa-book-open me-2"></i>
            Truyện Hay
          </Link>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/the-loai">
                  <i className="fas fa-list me-1"></i>
                  Thể loại
                </Link>
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i className="fas fa-user-plus me-1"></i>
                      Đăng Ký
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <i className="fas fa-sign-in-alt me-1"></i>
                      Đăng Nhập
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="nav-link">
                      <i className="fas fa-user me-1"></i>
                      Xin chào, {userData?.name}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button 
                      className="btn btn-link nav-link" 
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-1"></i>
                      Đăng xuất
                    </button>
                  </li>
                </>
              )}
            </ul>
            
            <form className="d-flex" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm truyện..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-light" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <div className="header-spacer"></div>
    </header>
  );
};

export default Header;
