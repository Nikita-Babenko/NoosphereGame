const http = require('http');
const fs = require('fs');
const path = require('path');

const types = {
    '.js':{
        contentType:'text/javascript'
    },
    '.css':{
        contentType:'text/css'
    },
    '.jpg':{
        contentType:'text/jpg'
    },
    '.html':{
        contentType:'text/html'
    },
    '.mp3':{
        contentType:'audio/mpeg'
    },
    'default':{
        contentType:'text/plain'
    },

};

const server= http.createServer();

server.on('request',(request,response)=>{

    const {method, url, headers} = request;

    console.log(`${method} ${url}`);

    let filePath = url;

    if (filePath === '/'){
        filePath = '/index.html';
    }

    let fileExt = path.extname(filePath);

    let responseParams = types[fileExt] || types.default;

    response.setHeader("Content-Type",responseParams.contentType);

     filePath = '/projects/NoosphereNodeJS/kub/'+ filePath;
    let readStream = fs.createReadStream(filePath);

    readStream.on('error', err => {
        console.log(err);

        response.statusCode = 404;
        response.end();
    });

    readStream.pipe(response);

//response.write(JSON.stringify(res));
//response.end();
});
server.listen(8080);