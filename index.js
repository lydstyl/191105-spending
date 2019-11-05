const fs = require('fs');
const path = require('path');

const settings = require('./settings.js');

class SpendingFile {
  constructor(completeFileName) {
    this.completeName = completeFileName;
    this.extname = this.getExtName();
    this.name = this.getName();
    this.minusSplitedName = this.getMinusSplitedName();

    this.dateRegex = /((2019|2020|19|20)[0-9]{4})/;
    this.date = this.getDate();

    this.priceRegex = /[0-9]{1,5}(e|E|\.)[0-9]{0,2}$|[0-9]{1,5}(\.)[0-9]{0,2}[eE]$/;
    this.price = this.getPrice();
  }

  getName() {
    return this.completeName.split(this.extname)[0];
  }

  getExtName() {
    return path.extname(this.completeName);
  }

  getMinusSplitedName() {
    return this.name.split('-');
  }

  getDate() {
    if (this.minusSplitedName[0].match(this.dateRegex)) {
      let date = this.minusSplitedName[0].match(this.dateRegex)[0];
      if (date.length > 6) {
        date = date.slice(2, 8);
      }
      this.date = date;

      return true;
    }
    return false;
  }

  getPrice() {
    if (this.minusSplitedName.length > 1) {
      if (
        this.minusSplitedName[this.minusSplitedName.length - 1].match(
          this.priceRegex
        )
      ) {
        let price = this.minusSplitedName[
          this.minusSplitedName.length - 1
        ].match(this.priceRegex)[0];

        price = price.replace(/e$/i, '');
        price = price.replace(/e/i, '.');
        price = Number.parseFloat(price);

        return price;
      }
    }
    return false;
  }
}

fs.readdir(settings.invoiceDirectoryPath, (err, files) => {
  files.forEach(completeFileName => {
    const spendingFile = new SpendingFile(completeFileName);
    if (spendingFile.minusSplitedName.length > 1 && spendingFile.price) {
      console.log(spendingFile.minusSplitedName, spendingFile.price);
    }
  });
});
