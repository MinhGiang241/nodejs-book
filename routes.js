const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input name='message' type='text'/><button >Submit</button type='submit'></form></body>"
    );
    res.write("<html/>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 320;
        res.setHeader("Location", "/");
        return res.end();
      });
    });

    // res.writeHead(320, { Location: "/" });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Mt first Page</title></head>");
  res.write("<body><h1>Hello from my Node.js server</h1></body>");
  res.write("<html/>");
  res.end();
};

module.exports = requestHandler;
