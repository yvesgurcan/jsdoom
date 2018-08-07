module.exports = (req, res, file) => {
    const {
        method,
        url,
    } = req;
    const statusCode = 200;
    console.error(`${method} ${url} ${statusCode}`);
    res.writeHead(statusCode, {'Content-Type': 'text/html'});
    res.write(file);
    res.end();
}