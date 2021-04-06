module.exports = (err, request, response, next) => {
    const { code, message } = err;
    response.status(code).json({ message })
}