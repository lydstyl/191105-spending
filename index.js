const fs = require('fs');

const settings = require('./settings.js');
const SpendingFile = require('./SpendingFile.js');

let csv = settings.propsInCsv.join(', ') + '\n';

fs.readdir(settings.invoiceDirectoryPath, (err, files) => {
  files.forEach(completeFileName => {
    const spendingFile = new SpendingFile(completeFileName);
    console.log(spendingFile);

    settings.propsInCsv.forEach(prop => {
      csv += spendingFile[prop] + ', ';
    });

    csv += '\n';
  });
  fs.writeFile('csv.csv', csv, 'utf8', err => {
    if (err) {
      console.log(err);
    }
  });
  console.log('csv.csv ready');
});
