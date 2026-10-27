const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 配置临时存储（分片存放目录）
const UPLOAD_DIR = path.resolve(__dirname, process.env.UPLOAD_DIR || "uploads"); // 最终文件目录
const CHUNK_DIR = path.resolve(__dirname, process.env.CHUNK_DIR || "chunks"); // 分片临时目录

// 确保目录存在
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(CHUNK_DIR)) fs.mkdirSync(CHUNK_DIR);

// 使用 multer 处理 multipart/form-data，但分片上传时我们手动处理更灵活
// 这里只用于普通文件上传，分片上传接口单独处理

// 辅助函数：获取文件已上传的分片索引
function getUploadedChunks(fileHash) {
  const chunkDir = path.join(CHUNK_DIR, fileHash);
  if (!fs.existsSync(chunkDir)) return [];
  return fs
    .readdirSync(chunkDir)
    .filter((name) => name.startsWith("chunk_"))
    .map((name) => parseInt(name.split("_")[1]))
    .sort((a, b) => a - b);
}

// 1. 验证文件是否已存在（秒传）
app.post("/api/verify", (req, res) => {
  const { fileHash, fileName, totalChunks } = req.body;
  // 检查最终文件是否存在
  const finalPath = path.join(UPLOAD_DIR, `${fileHash}_${fileName}`);
  if (fs.existsSync(finalPath)) {
    return res.json({ shouldUpload: false, uploadedChunks: [] });
  }
  // 获取已上传的分片
  const uploadedChunks = getUploadedChunks(fileHash);
  const shouldUpload = uploadedChunks.length < totalChunks;
  res.json({ shouldUpload, uploadedChunks });
});

// 2. 上传分片
const upload = multer({ dest: path.join(CHUNK_DIR, "temp") }); // 临时存放分片
app.post("/api/upload", upload.single("chunk"), (req, res) => {
  const { fileHash, chunkIndex, totalChunks, fileName } = req.body;
  const chunk = req.file; // multer 处理后的文件信息

  if (!chunk) {
    return res.status(400).json({ error: "No chunk uploaded" });
  }

  // 创建该文件的分片存储目录
  const chunkDir = path.join(CHUNK_DIR, fileHash);
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir, { recursive: true });
  }

  // 将临时文件移动到最终分片位置
  const chunkPath = path.join(chunkDir, `chunk_${chunkIndex}`);
  fs.renameSync(chunk.path, chunkPath);

  // 检查是否所有分片都已上传
  const uploadedChunks = getUploadedChunks(fileHash);
  if (uploadedChunks.length === Number(totalChunks)) {
    // 所有分片已上传，触发合并
    mergeChunks(fileHash, fileName, totalChunks);
    res.json({ uploaded: true, allUploaded: true });
  } else {
    res.json({ uploaded: true, allUploaded: false });
  }
});

// 3. 合并分片（内部调用）
function mergeChunks(fileHash, fileName, totalChunks) {
  const chunkDir = path.join(CHUNK_DIR, fileHash);
  const finalPath = path.join(UPLOAD_DIR, `${fileHash}_${fileName}`);
  const writeStream = fs.createWriteStream(finalPath);

  let current = 0;
  function appendNextChunk() {
    if (current >= totalChunks) {
      writeStream.end();
      // 删除临时分片目录
      fs.rmdirSync(chunkDir, { recursive: true });
      console.log(`File ${fileName} merged successfully`);
      return;
    }
    const chunkPath = path.join(chunkDir, `chunk_${current}`);
    if (!fs.existsSync(chunkPath)) {
      // 如果缺少分片，等待？实际应保证所有分片已存在才调用此函数
      console.error(`Missing chunk ${current} for ${fileName}`);
      return;
    }
    const readStream = fs.createReadStream(chunkPath);
    readStream.on("end", () => {
      current++;
      appendNextChunk();
    });
    readStream.pipe(writeStream, { end: false });
  }
  appendNextChunk();
}

// 4. 可选：合并接口（若前端主动触发合并）
app.post("/api/merge", (req, res) => {
  const { fileHash, fileName, totalChunks } = req.body;
  const chunkDir = path.join(CHUNK_DIR, fileHash);
  if (!fs.existsSync(chunkDir)) {
    return res.status(404).json({ error: "No chunks found" });
  }
  // 检查分片数量
  const uploaded = getUploadedChunks(fileHash);
  if (uploaded.length !== Number(totalChunks)) {
    return res.status(400).json({ error: "Chunks missing" });
  }
  mergeChunks(fileHash, fileName, totalChunks);
  res.json({ success: true });
});

// 下载文件
app.get("/api/download", (req, res) => {
  const { fileName } = req.query;
  const finalPath = path.join(UPLOAD_DIR, fileName);
  if (!fs.existsSync(finalPath)) {
    return res.status(404).json({ error: "File not found" });
  }
  res.download(finalPath);
});

// 文件列表
app.get("/api/fileList", (req, res) => {
  const fileList = fs.readdirSync(UPLOAD_DIR);
  res.json({ fileList });
});

// 普通单文件/多文件上传（示例）
const multerUpload = multer({ dest: UPLOAD_DIR });
app.post("/api/simple-upload", multerUpload.array("files"), (req, res) => {
  res.json({ files: req.files });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
