const packageData = require('../package.json');
const { createServer } = require('http');
const { readFileSync } = require('fs');
const authorizeFetchFile = require('./authorizeFetchFile');
const { clientEntryPoint } = require('./constants');
const {
    serveFile,
    internalServerError,
    notFound,
} = require('./responses');

const {
    config: {
        host,
        port,
    }
} = packageData;

const server = createServer((req, res) => {
    try {
        const {
            url,
        } = req;
    
        const { length } = url;
        if (!authorizeFetchFile(url)) {
            return notFound(req, res, 'Unauthorized.');
        }

        let path = url.slice(1, length);
        if (!path) path = 'index.html';
        const clientPath = `${clientEntryPoint}/${path}`;

        let file;
        try {
            file = readFileSync(clientPath);
        } catch (exception) {
            return notFound(req, res, exception);
        }
        return serveFile(req, res, file);
    } catch (exception) {
        return internalServerError(req, res, exception);
    }
});

module.exports = () => {
    server.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}/`);
    });
};
