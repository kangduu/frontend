const http = require("node:http");
const fs = require("node:fs");

const NOTES_FILE = "notes.json";

function readNotes() {
  if (!fs.existsSync(NOTES_FILE)) return [];
  return JSON.parse(fs.readFileSync(NOTES_FILE, "utf-8"));
}

function writeNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

// REST API
const server = http.createServer((req, res) => {
  // read
  if (req.method === "GET" && req.url === "/notes") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(readNotes()));
  } else if (req.method === "POST" && req.url === "/notes") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const notes = readNotes();
      notes.push({ id: Date.now(), text: JSON.parse(body).text });
      writeNotes(notes);
      res.end("Note Added.");
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/notes/")) {
    const id = Number(req.url.split("/")[2]);
    const notes = readNotes().filter((n) => n.id !== id);
    writeNotes(notes);
    res.end("Note deleted");
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log(`Notes API running on http://localhost:3000`);
});
