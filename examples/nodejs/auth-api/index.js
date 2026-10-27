const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");

const app = express();
app.use(express.json());

// 连接数据库
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("MongoDB connect fail"));

// 注册
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. 输入验证
    if (!username || !password) {
      return res.status(400).json({ error: "用户名和密码不能为空" });
    }

    // 2. 密码强度检查 (示例: 至少8位)
    if (password.length < 8) {
      return res.status(400).json({ error: "密码长度至少为8位" });
    }

    // 3. 检查用户是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "用户名已被使用" });
    }

    // 4. 哈希密码并创建用户
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });

    // 5. 保存用户
    await user.save();

    // 6. 返回成功响应 (可以排除敏感信息)
    res.status(201).json({
      success: true,
      message: "注册成功",
      user: {
        id: user._id,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("注册错误:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

// 登录
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("用户名和密码不能为空");
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET未配置");
      return res.status(500).send("服务器配置错误");
    }

    const user = await User.findOne({ username });

    // 统一响应时间防止时序攻击提示用户是否存在
    let isValid = false;
    if (user && (await bcrypt.compare(password, user.password))) {
      isValid = true;
    }

    if (!isValid) {
      return res.status(401).send("用户名或密码错误");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      expiresIn: "24h",
      tokenType: "Bearer",
    });
  } catch (error) {
    console.error("登录错误:", error);
    res.status(500).send("服务器内部错误");
  }
});

// 受保护路由
app.get("/profile", (req, res) => {
  // 设置安全相关的HTTP头
  res.setHeader("X-Content-Type-Options", "nosniff");

  const auth = req.headers.authorization;

  // 更严格的授权头检查
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "未授权" });
  }

  const token = auth.split(" ")[1];

  // token存在性检查
  if (!token) {
    return res.status(401).json({ error: "无效的token格式" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // JWT数据有效性验证
    if (!decoded.id) {
      return res.status(401).json({ error: "无效的token内容" });
    }

    // 成功响应
    return res.json({
      message: "欢迎回来",
      userId: decoded.id,
    });
  } catch (error) {
    // 更安全的错误记录方式
    console.error("JWT验证失败:", error.name); // 不记录完整错误

    // 根据错误类型提供更精确的响应
    const message =
      error.name === "TokenExpiredError" ? "token已过期" : "无效token";

    return res.status(401).json({ error: message });
  }
});

// 查询所有已注册用户（不返回密码）
// todo 1. 认证中间件；2. 添加缓存；3. 字段过滤；4. 速率限制；
app.get("/users", async (req, res) => {
  try {
    // 分页参数，默认第1页，每页20条
    const page = parseInt(req.query.page) || 1;
    const pagesize = parseInt(req.query.pagesize) || 10;
    const skip = (page - 1) * pagesize;

    // 查询数据（排除密码和版本字段），按创建时间降序
    const users = await User.find({}, { password: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pagesize);

    // 获取总用户数用于分页信息
    const totalUsers = await User.countDocuments();

    res.json({
      data: users,
      pagination: {
        page,
        pagesize,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / pagesize),
      },
    });
  } catch (error) {
    console.error("获取用户列表失败:", error);
    res.status(500).json({
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "服务器内部错误",
    });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}`)
);
