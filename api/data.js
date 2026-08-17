import { sql } from '@vercel/postgres'
import fs from 'node:fs'
import path from 'node:path'

const DATA_FILE = path.resolve(process.cwd(), 'server', 'data-store.json')

function readLocalStore() {
  try {
    if (!fs.existsSync(DATA_FILE)) return null
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to read local data store', err)
    return null
  }
}

function writeLocalStore(obj) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Failed to write local data store', err)
    return false
  }
}

async function ensureTable() {
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) return false

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    return true
  } catch (err) {
    console.warn('Database table check failed:', err)
    return false
  }
}

async function readDbStore() {
  try {
    const ready = await ensureTable()
    if (!ready) return null

    const result = await sql`
      SELECT data
      FROM site_content
      ORDER BY updated_at DESC
      LIMIT 1
    `

    return result.rows?.[0]?.data ?? null
  } catch (err) {
    console.warn('Database read failed, using fallback:', err)
    return null
  }
}

async function writeDbStore(payload) {
  try {
    const ready = await ensureTable()
    if (!ready) return false

    const jsonPayload = JSON.stringify(payload)
    const existing = await sql`
      SELECT id
      FROM site_content
      ORDER BY updated_at DESC
      LIMIT 1
    `

    if (existing.rows?.[0]?.id) {
      await sql`
        UPDATE site_content
        SET data = ${jsonPayload}::jsonb,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existing.rows[0].id}
      `
      return true
    }

    await sql`
      INSERT INTO site_content (data)
      VALUES (${jsonPayload}::jsonb)
    `
    return true
  } catch (err) {
    console.warn('Database write failed, using fallback:', err)
    return false
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const dbData = await readDbStore()
      const data = dbData ?? readLocalStore()

      if (!data) {
        return res.status(204).send()
      }

      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      const payload = req.body || {}
      const savedToDb = await writeDbStore(payload)

      if (savedToDb) {
        writeLocalStore(payload)
        return res.status(200).json({ status: 'ok' })
      }

      const localOk = writeLocalStore(payload)
      if (!localOk) {
        return res.status(500).json({ error: 'Failed to write' })
      }

      return res.status(200).json({ status: 'ok', fallback: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('API handler failed', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
