export const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: statusCode === 400 ? 'Bad Request: Something went wrong' : 'Internal Server Error',
    });
}