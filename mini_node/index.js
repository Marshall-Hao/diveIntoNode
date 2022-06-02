const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const notfound = (req, res) => {
  fs.readFile(
    path.join(__dirname, "404.html"),
    (err, data) => {
      if (err) {
        res.write("404 not found");
      } else {
        res.writeHead(404, {
          "Content-Type": "text/html",
          charset: "utf-8",
        });
        res.write(data);
        res.end();
      }
    }
  );
};

const writeDb = (chunk) => {
  fs.appendFile(
    path.join(__dirname, "db"),
    chunk,
    (err) => {
      if (err) throw err;
      console.log("db insert", chunk && chunk.toString());
    }
  );
};

http
  .createServer((req, res) => {
    // * routes
    // * static resources
    // * http verb
    // * store
    let pathName = url.parse(req.url).pathname;

    if (pathName === "/") {
      pathName = path.join(__dirname, "index.html");
    }

    const extName = path.extname(pathName);

    //  /API=》
    if (pathName.startsWith("/api")) {
      const method = req.method;
      if (method === "GET") {
        const query = qs.parse(url.parse(req.url).query); // * ?a=1
        const resData = {
          code: 200,
          msg: "success",
          data: query,
        };
        res.end(JSON.stringify(resData));
      }

      if (method === "POST") {
        const contentType = req.headers["content-type"];
        if (contentType === "application/json") {
          let postData = "";
          req.on("data", (chunk) => {
            postData += chunk;
            writeDb(chunk);
          });
          req.on("end", () => {
            res.end(postData);
          });
        }
      }
    }

    if (extName === ".html") {
      // index.html
      fs.readFile(pathName, (err, data) => {
        if (err) {
          //  404
          notfound(req, res);
        } else {
          res.writeHead(200, {
            "Content-Type": "text/html",
            charset: "utf-8",
          });
          res.write(data);
          res.end();
        }
      });
    }

    // res.write("hello Nodejs");
    // res.end();
  })
  .listen(8080);
