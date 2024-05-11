export function notFound (req, res, next) {
    res.status(404);
    next(new Error(`Route not found: ${req.originalUrl}`, {cause: 404}));
}

export default function errorHandler (err, req, res, next) {
    if(res.headersSent) {
        return next(err);
    }
    
    if(err.cause){
        res.status(err.cause).json(err.message);
    } else {
        console.log(err);
        res.status(500).json("Something went wrong. Please try again later.");
    }
}