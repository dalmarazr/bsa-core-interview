const {validateSchema} = require("../schemas/validation")

function validationMiddleware(schema) {
    return async (req, res, next) => {
        const {body} = req
        const validationResult = await validateSchema(schema, body)

        if(validationResult.error) {
            res.status(400).send({
                message: validationResult.error.details[0].message
            })
            return
        }

        next()
    }
}

module.exports = {
    validationMiddleware
}