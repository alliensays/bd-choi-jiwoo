import express from 'express'
import cors from 'cors'
import { sql } from '@vercel/postgres'
import { readStore, writeStore } from './data-layer.js'

const PORT = process.env.PORT || 4000
const hasDatabase = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL)

const app = express()
app.use(cors())
app.use(express.json({ limit: '5mb' }))

async function ensureSchema() {
  if (!hasDatabase) return

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
  } catch (err) {
    console.warn('Unable to ensure database schema:', err)
  }
}

async function getContent() {
  if (!hasDatabase) return readStore()

  try {
    await ensureSchema()
    const result = await sql`
      SELECT data
      FROM site_content
      ORDER BY updated_at DESC
      LIMIT 1
    `

    if (result.rows?.[0]?.data) return result.rows[0].data
  } catch (err) {
    console.warn('Database read failed, using filesystem fallback:', err)
  }

  return readStore()
}

async function saveContent(payload) {
  if (!hasDatabase) return writeStore(payload)

  try {
    await ensureSchema()
    const existing = await sql`
      SELECT id
      FROM site_content
      ORDER BY updated_at DESC
      LIMIT 1
    `

    const jsonPayload = JSON.stringify(payload)

    if (existing.rows?.[0]?.id) {
      await sql`
        UPDATE site_content
        SET data = ${jsonPayload}::jsonb,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existing.rows[0].id}
      `
    } else {
      await sql`
        INSERT INTO site_content (data)
        VALUES (${jsonPayload}::jsonb)
      `
    }

    return true
  } catch (err) {
    console.warn('Database write failed, using filesystem fallback:', err)
    return writeStore(payload)
  }
}

app.get('/api/data', async (req, res) => {
  const data = await getContent()
  if (!data) return res.status(204).send()
  res.json(data)
})

app.post('/api/data', async (req, res) => {
  const body = req.body
  const ok = await saveContent(body)
  if (!ok) return res.status(500).json({ error: 'Failed to write' })
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
