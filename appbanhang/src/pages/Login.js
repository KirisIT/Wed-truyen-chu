import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await login(formData.email, formData.password);
      console.log('Login successful:', response);
      
      if (response.token) {
        navigate("/");
      } else {
        throw new Error("Token không hợp lệ");
      }
    } catch (err) {
      console.error('Login error details:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo">
          <h1>📖 Truyện Chữ</h1>
          <p>Đăng nhập để tiếp tục</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit" disabled={loading} className="btn btn-success w-100 text-center">
            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
          </button>
        </form>

        <div className="auth-separator">
          <span>hoặc</span>
        </div>

        <div className="auth-links">
          <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
          <Link to="/forgot-password">Quên mật khẩu?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;