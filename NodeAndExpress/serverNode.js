// const { createServer } = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


const http = require("http");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const PORT = 3000;
const UPLOADS_DIR = path.join(__dirname, "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/upload") {
        const form = new formidable.IncomingForm();
        form.uploadDir = UPLOADS_DIR;
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "File upload error" }));
            }
            const oldPath = files.file.filepath;
            const newPath = path.join(UPLOADS_DIR, files.file.originalFilename);
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ message: "File save error" }));
                }
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "File uploaded successfully",
                    filename: files.file.originalFilename,
                    url: `/files/${files.file.originalFilename}`
                }));
            });
        });
    } else if (req.method === "GET" && req.url.startsWith("/files")) {
        const filePath = path.join(UPLOADS_DIR, req.url.replace("/files/", ""));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "File not found" }));
            }
            res.writeHead(200, { "Content-Type": "application/octet-stream" });
            res.end(data);
        });
    } else if (req.method === "GET" && req.url === "/list") {
        fs.readdir(UPLOADS_DIR, (err, files) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "Error reading files" }));
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ files }));
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});