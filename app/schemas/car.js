const joi = require("joi");

const carSchema = joi.object({
    make: joi.string().required(),
    color: joi.string().required(),
    model: joi.string().required(),
    year: joi.number().required(),
    vin: joi.string().required()
})


const carSchemaPartial = joi.object({
    make: joi.string().optional(),
    color: joi.string().optional(),
    model: joi.string().optional(),
    year: joi.number().optional(),
    vin: joi.string().optional()
})




module.exports = {
    carSchema,
    carSchemaPartial
}