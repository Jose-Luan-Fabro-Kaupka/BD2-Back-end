/* SECURITY CONFIGURATION */
const TOKEN = process.env.TOKEN || ''
const PROTECT_ROUTES = !!(process.env.PROTECT_ROUTES && process.env.PROTECT_ROUTES === 'true')

// APPLICATION CONFIGURATION
const PORT = process.env.PORT || '8081'
const LOG_LEVEL = process.env.LOG_LEVEL || 'warn'

/* DATABASE CONFIGURATION */
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost'
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres' //login.getLogin();
const POSTGRES_PASS = process.env.POSTGRES_PASS || 'postgres123' //login.getSenha();
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'bd2t2'

module.exports = {
  token: TOKEN,
  port: PORT,
  protectRoutes: PROTECT_ROUTES,
  log: {
    level: LOG_LEVEL
  },
  server: {
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASS,
    dbName: POSTGRES_DATABASE
  }
}