import { createPool } from 'mysql2/promise'
require('dotenv').config()

export async function connect() {
  const connection = await createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'busfind',
    connectionLimit: 10,
  })

  return connection
}
