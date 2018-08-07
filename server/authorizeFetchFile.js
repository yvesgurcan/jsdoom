module.exports = (url) => {
    const {
        clientSourceFolder,
        serverFolder,
    } = require('./constants')

    const clientPath = new RegExp(`^\/${clientSourceFolder}`);
    if (url.match(clientPath)) {
        return false;
    }

    const serverPath = new RegExp(`^\/${serverFolder}`);
    if (url.match(serverPath)) {
        return false;
    }
    return true;
}