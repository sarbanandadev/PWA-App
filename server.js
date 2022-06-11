const http = require("http");
const url = require("url");
const fs = require("fs");

const port = 3636;
const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");

  if (path == "") {
    path = "index.html";
  }
  console.log(`Requested path ${path} `);

  let file = __dirname + "/" + path;
  fs.readFile(file, function (err, content) {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      console.log(`Returning ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      switch (path) {
        case "css/app.css":
          res.writeHead(200, { "Content-type": "text/css" });
          break;
        case "js/app.js":
          res.writeHead(200, { "Content-type": "application/javascript" });
          break;
        case "/" || "index.html":
          res.writeHead(200, { "Content-type": "text/html" });
          break;
        case "404.html":
          res.writeHead(200, { "Content-type": "text/html" });
      }
      res.end(content);
    }
  });
});

server.listen(port, "localhost", () => {
  console.log(`Listening on port localhost:${port}`);
});
