const fs = require('fs');
const path = require('path');

const settings = require('./settings.js');

class SpendingFile {
  constructor(completeFileName) {
    this.completeName = completeFileName;

    this.name = this.getName();
    this.extname = this.getExtName();
    this.minusSplitedName = this.getMinusSplitedName();
  }

  getName() {
    return this.completeName.split(path.extname(this.completeName))[0];
  }

  getExtName() {
    return path.extname(this.completeName);
  }

  getMinusSplitedName() {
    return this.completeName
      .split(path.extname(this.completeName))[0]
      .split('-');
  }

  //file.match(/[0-9]/);
}

fs.readdir(settings.invoiceDirectoryPath, (err, files) => {
  files.forEach(completeFileName => {
    console.log(new SpendingFile(completeFileName));
  });
});
