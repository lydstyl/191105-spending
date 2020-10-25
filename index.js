const fs = require('fs')

const settings = require('./settings.js')
const SpendingFile = require('./SpendingFile.js')

let csv = settings.propsInCsv.join('; ') + '\n'

function writeCSV(csv) {
  fs.writeFile(Object.keys({ csv })[0] + '.csv', csv, 'utf8', err => {
    if (err) {
      console.log(err)
    }
  })
}

console.log('settings.invoiceDirectoryPath', settings.invoiceDirectoryPath)
fs.readdir(settings.invoiceDirectoryPath, (err, files) => {
  if (err) {
    console.log('err', err)
  }

  files.forEach(completeFileName => {
    const stats = fs.statSync(
      `${settings.invoiceDirectoryPath}/${completeFileName}`
    )
    if (stats.isDirectory()) {
      console.log('isDirectory', completeFileName)

      return
    }

    const spendingFile = new SpendingFile(completeFileName)
    console.log(spendingFile)

    settings.propsInCsv.forEach(prop => {
      csv += spendingFile[prop] + '; '
    })

    csv += '\n'
  })

  writeCSV(csv)

  console.log('csv.csv ready')
})
