const configs = {
    development: {
        BASE_API_URL: 'http://localhost:4897/',
        AUTH_API_URL: 'http://localhost:4897/',
        STAGE: 'local'
    },
}

const nodeEnv = process.env.NODE_ENV
module.exports = configs[nodeEnv]
