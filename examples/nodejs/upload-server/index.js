const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    // 获取原始扩展名
    const ext = path.extname(file.originalname);
    // 用时间戳+随机数+扩展名命名
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  dest: "uploads/",
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 限制10MB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Sanitize original filename
  const originalName = path.basename(req.file.originalname);

  res.json({
    filename: req.file.filename,
    original: originalName,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Static file serving with security headers
app.use(
  "/files",
  express.static("uploads", {
    setHeaders: (res) => {
      res.set("X-Content-Type-Options", "nosniff");
    },
  })
);

app.listen(3000, () =>
  console.log("Upload server running at http://localhost:3000")
);
