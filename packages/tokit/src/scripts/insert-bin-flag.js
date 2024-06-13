import fs from 'fs'

const FLAG = '#!/usr/bin/env node'

const bin = fs.readFileSync('./bin/run.js', 'utf8')
const [firstLine] = bin.split('\n')

if (firstLine !== FLAG) {
  fs.writeFileSync('./bin/run.js', `${FLAG}\n${bin}`)
  console.log('Inserted bin flag')
}
