const {validateSchema} = require("../schemas/validation")

function validationMiddleware(schema, requestPart="body") {
    return async (req, res, next) => {
        const {body, query} = req
        const currentElementToValidate = requestPart == "body" ? body : query
       
        const validationResult = await validateSchema(schema,currentElementToValidate )

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
    validationMiddleware,
}