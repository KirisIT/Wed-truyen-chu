const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../helpers/mailSender");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    mailSender({
      email: email,
      subject: "Chào mừng đến với Truyện Hay 📖✨",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #FF5733;">Chào mừng, ${name}! 🎉</h2>
          <p>Chúc mừng bạn đã trở thành thành viên của <strong>Truyện Hay</strong>! 🚀</p>
          <p>Hãy bắt đầu hành trình khám phá những câu chuyện hấp dẫn ngay hôm nay!</p>
          <hr />
          <p style="font-size: 12px; color: gray;">Nếu bạn không đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
      </div>
  `,
    });

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });

  }

};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Tài khoản không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
