async function validateSchema(schema, body) {
    try {
        const value = await schema.validateAsync(body);
        return value
    }
    catch (err) {
        console.log("🚀 ~ validateSchema ~ err:", err)
        return {
            error: err
        }
     }
}
module.exports = {
    validateSchema
}