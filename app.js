const { createServer } = require('http')
const { parse } = require('url')
const { StringDecoder } = require('string_decoder');
const routeHandler = require('./lib/routeHandler')
const utility = require('./lib/utility');

const server = createServer((req, res) => {
     const parsedurl = parse(req.url, true);
     const queryString = parsedurl.query;
     const pathname = parsedurl.pathname;
     const trimedPath = pathname.replace(/^\/+|\/+$/g, "");
     const method = req.method.toLowerCase();

     const decoder = new StringDecoder('utf-8');
     let buffer = "";

     req.on('data', (datachunk) => { buffer += decoder.write(datachunk) })

     req.on('end', () => {
          decoder.end();
          const data = {
               query: queryString,
               method: method,
               payload: utility.parsejson(buffer)
          };

          console.log("===============================================")
          console.log("method", method)
          console.log("url", req.url)
          console.log("queryString", queryString)
          console.log("pathname", pathname)
          console.log("===============================================")

          const chosenRouteHandler = typeof (router[trimedPath]) !== 'undefined' ? router[trimedPath] : routeHandler.notFound;

          chosenRouteHandler(data).then((dataObj) => {
               res.setHeader("Content-Type", "application/json")
               res.setHeader("Access-Control-Allow-Origin", "*")
               res.setHeader("Access-Control-Allow-Methods", "DELETE")
               res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type")
               res.writeHead(statuscode = typeof (dataObj.status) == 'number' ? dataObj.status : 200)
               res.end(JSON.stringify(dataObj.payload));
          })
     })
})

const router = {
     'staffs': routeHandler.staffs
};

server.listen(3030, () => {
     console.log("server is running on port 3030...")
})