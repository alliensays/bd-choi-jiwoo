import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'

const PORT = process.env.PORT || 4000
const DATA_FILE = path.resolve(process.cwd(), 'server', 'data-store.json')

const app = express()
app.use(cors())
app.use(express.json({ limit: '5mb' }))

function readStore() {
  try {
    if (!fs.existsSync(DATA_FILE)) return null
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to read data store', err)
    return null
  }
}

function writeStore(obj) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Failed to write data store', err)
    return false
  }
}

app.get('/api/data', (req, res) => {
  const data = readStore()
  if (!data) return res.status(204).send()
  res.json(data)
})

app.post('/api/data', (req, res) => {
  const body = req.body
  const ok = writeStore(body)
  if (!ok) return res.status(500).json({ error: 'Failed to write' })
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
