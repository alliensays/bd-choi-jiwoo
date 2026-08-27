import fs from 'node:fs'
import path from 'node:path'

const DEFAULT_DATA_FILE = path.resolve(process.cwd(), 'server', 'data-store.json')

export async function readStore(filePath = DEFAULT_DATA_FILE) {
  try {
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error('Failed to read data store', err)
    return null
  }
}

export async function writeStore(obj, filePath = DEFAULT_DATA_FILE) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Failed to write data store', err)
    return false
  }
}
