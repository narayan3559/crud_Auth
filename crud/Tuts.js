const http = require("http")
const url = require('url')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const pathname = req.url
  if(pathname === "/" || pathname === "/page1"){
    res.end("page 1")
  } else if( pathname === "/api"){
    fs.readFile(`${__dirname}/data/data.json`, 'utf-8', (err, data) => {
      const productData = JSON.parse(data)
      console.log(productData)
      res.writeHead(200, {'content-type': 'application/json'})
      res.end(data)
    })
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    })
    res.end("<h1>page does not exist</h1>")
  }
})

server.listen(3000, '127.0.0.1', () => {
  console.log("server listening 🥑 on port: 3000");
})