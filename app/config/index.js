require('dotenv').config()

const config = {
    server: {
        port: process.env.PORT || 3000
    },
    logs: {
        format: process.env.LOG_FORMAT || 'dev',
    }
}



module.exports = {
    config
}