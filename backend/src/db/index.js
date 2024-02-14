import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
  user: 'bazts',
  password: 'AntiBazts9*',
  database: 'blog_test',
  host: 'localhost',
  port: 5432
})
