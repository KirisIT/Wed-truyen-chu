const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("Authorization Header nhận được:", authHeader); // ✅ Kiểm tra header nhận được

  // Kiểm tra xem có Authorization header không
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có token hoặc token sai định dạng" });
  }

  try {
    // Cắt token ra khỏi "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded); // ✅ Kiểm tra token có giải mã đúng không

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Lỗi xác thực token:", error.message); // ✅ Log lỗi token
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

module.exports = authMiddleware;
