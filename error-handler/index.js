const errorHandler = {};

errorHandler.error404Handler = async (req, res, next) => {
    next({status: 404, message: 'Sorry, resource not found.'});
};

errorHandler.generalErrorHandler = async (err, req, res, next) => {
    let message;
    if (err.status == 404) { 
        message = { message: err.message };
    } else {
         message = { message: 'Oh no! We had a problem with that. Maybe try a different resource?' }; 
    }
    res.setHeader("Content-Type", "application/json");
    res.status(err.status || 500).send(message);
};

errorHandler.handleErrorsMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = errorHandler;