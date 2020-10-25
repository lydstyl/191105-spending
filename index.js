const fs = require('fs')

const settings = require('./settings.js')
const SpendingFile = require('./SpendingFile.js')

let csv = settings.propsInCsv.join('; ') + '\n'

function writeCSV(csv) {
  const d = new Date()

  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'aout',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ]

  const csvName = `Point des factures ${d.getFullYear()} au ${d.getDate()} ${
    months[d.getMonth()]
  }.csv`

  fs.writeFile(csvName, csv, 'utf8', err => {
    if (err) {
      console.log('writeFile err', err)
    }
  })
}

let total = 0

fs.readdir(settings.invoiceDirectoryPath, (err, files) => {
  if (err) {
    console.log('readdir err', err)
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

    total = +total + +parseFloat(spendingFile.price.replace(',', '.'))
    total = total.toFixed(2)

    settings.propsInCsv.forEach(prop => {
      csv += spendingFile[prop] + '; '
    })

    csv += '\n'
  })

  writeCSV(csv)

  console.log('\ntotal', `${total} €`)

  console.log('\ncsv ready !')
})
