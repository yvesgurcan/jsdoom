const serveFile = require('./serveFile');
const internalServerError = require('./internalServerError');
const notFound = require('./notFound');

module.exports = {
    serveFile,
    internalServerError,
    notFound,
};
