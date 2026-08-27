import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { readStore, writeStore } from './data-layer.js'

const tempFile = path.resolve(process.cwd(), 'server', 'data-store.test.json')

test('writes and reads data from a JSON fallback store', async () => {
  const payload = { homeHero: { src: 'demo.jpg' }, ok: true }

  const wrote = await writeStore(payload, tempFile)
  assert.equal(wrote, true)

  const data = await readStore(tempFile)
  assert.deepEqual(data, payload)

  fs.unlinkSync(tempFile)
})
