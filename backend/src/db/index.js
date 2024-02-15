import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
  user: 'bazts',
  password: 'JqswtiVDKlnhbGqYfbreyFTRc6Iyff0S',
  database: 'users_myft',
  host: 'dpg-cn6frk6n7f5s73ema1fg-a.oregon-postgres.render.com',
  port: '5432',
  ssl: {
    rejectUnauthorized: false
  }
})
