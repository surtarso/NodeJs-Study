const http = require('http');
const HOST = 'http://localhost';
const PORT = 8000;
//local import
const status = require('./ramUsage.js');

http.createServer((request, response) => {
    let url = request.url;

    if (url === '/stats'){
        response.end(JSON.stringify(status, null, 2));
    } else {
        response.end('<h1>home</h1>');
    };

    
}).listen(PORT, () => console.log(`server is running in ${HOST}:${PORT}`));