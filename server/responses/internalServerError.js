module.exports = (req, res, exception) => {
    const {
        method,
        url,
    } = req;
    const statusCode = 500;
    console.error(`${method} ${url} ${statusCode}`);
    console.error(exception);
    res.writeHead(statusCode, {'Content-Type': 'text/html'});
    res.write('Internal Server Error');
    res.end();
}