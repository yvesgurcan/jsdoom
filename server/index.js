const { createServer } = require('http');
const { readFileSync } = require('fs');
const authorizeFetchFile = require('./authorizeFetchFile');
const {
    clientFolder,
} = require("./constants");
const {
    serveFile,
    internalServerError,
    notFound,
} = require("./responses");


const server = createServer((req, res) => {
    try {
        const {
            method,
            url,
        } = req;
    
        const { length } = url;
        if (!authorizeFetchFile(url)) {
            return notFound(req, res, 'Unauthorized.');
        }

        let path = url.slice(1, length);
        if (!path) path = 'index.html';
        const clientPath = `${clientFolder}/${path}`;

        let file;
        try {
            file = readFileSync(clientPath);
        } catch (exception) {
            return notFound(req, res, exception);
        }
        return serveFile(req, res, file);

    } catch (exception) {
        return internalServerError(req, res, exception)
    }
});



module.exports = (port = '3000', hostname = 'localhost') => {
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
};
