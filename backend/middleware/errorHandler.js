const { constant } = require('../constant');
const errorhandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch (statuscode) {
        case constant.VALIDATION_ERROR:
            res.json({ title: "Validation failed", message: err.message, stackTrace: err.stack });
            break;
        case constant.NOT_FOUND:
            res.json({ title: "NOT FOUND", message: err.message, stackTrace: err.stack });
            break;
        case constant.UNAUTHORIZED:
            res.json({
                title: "UNAUTHORIZED", message: err.message, stackTrace: err.stack
            });
            break;
        case constant.FORBIDDEN:
            res.json({ title: "FORBIDDEN", message: err.message, stackTrace: err.stack });
            break;
        case constant.SERVER_ERROR:
            res.json({ title: "SERVER ERROR", message: err.message, stackTrace: err.stack });
            break;
        default:
            break;


    }
}
module.exports = errorhandler;