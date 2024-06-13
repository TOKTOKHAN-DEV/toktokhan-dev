const fs = require('fs')
const path = require('path')

const getTitles = (dir) => {
  const files = fs.readdirSync(dir)
  const titles = files.map((file) => path.parse(file).name)
  return titles
}
export const imgUrl = (title: string) => {
  const titles = getTitles('apps/docs/static/img/ui')
  console.log('titles', titles)
  return `static/img/ui/${title}`
}
