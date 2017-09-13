const http = require('http');
const fs = require('fs');

const server= http.createServer();
server.on('request',(request,response)=>{
    const {method, url, headers} = request;
    console.log(`${method} ${url}`);

        response.setHeader("Content-Type","text/html");

    let filePath = '/projects/NoosphereNodeJS/kub/index.html';
    let readStream = fs.createReadStream(filePath);

    readStream.pipe(response);

//response.write(JSON.stringify(res));
//response.end();
});
server.listen(8080);