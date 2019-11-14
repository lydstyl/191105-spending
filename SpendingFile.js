const path = require('path');

module.exports = class SpendingFile {
  constructor(completeFileName) {
    this.completeName = completeFileName;
    this.extname = this.getExtName();
    this.name = this.getName();
    this.minusSplitedName = this.getMinusSplitedName();

    this.date = this.getDate();

    this.price = this.getPrice();

    this.getContent();

    this.price = this.setCommaPrice();
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
    const dateRegex = /((2019|2020|19|20)[0-9]{4})/;
    if (this.minusSplitedName[0].match(dateRegex)) {
      let date = this.minusSplitedName[0].match(dateRegex)[0];
      if (date.length > 6) {
        date = date.slice(2, 8);
      }

      this.parsedDate = new Date(
        parseInt(`20${date.slice(0, 2)}`, 10),
        parseInt(date.slice(2, 4)) - 1,
        parseInt(date.slice(4, 6))
      );

      this.year = this.parsedDate.getFullYear();

      this.month = this.parsedDate.getMonth();
      this.day = this.parsedDate.getDate();

      return date;
    }
    return false;
  }

  getPrice() {
    const priceRegex = /[0-9]{1,5}(e|E|\.)[0-9]{0,2}$|[0-9]{1,5}(\.)[0-9]{0,2}[eE]$/;
    if (this.minusSplitedName.length > 1) {
      if (
        this.minusSplitedName[this.minusSplitedName.length - 1].match(
          priceRegex
        )
      ) {
        let price = this.minusSplitedName[
          this.minusSplitedName.length - 1
        ].match(priceRegex)[0];

        price = price.replace(/e$/i, '');
        price = price.replace(/e/i, '.');
        price = Number.parseFloat(price);

        this.hasPrice = true;

        return price;
      }
    }
    this.hasPrice = false;
    return false;
  }

  setCommaPrice() {
    this.commaPrice = this.price.toString(10).replace('.', ',');
    return this.commaPrice;
  }

  getContent() {
    if (this.minusSplitedName.length === 1) {
      this.content = this.minusSplitedName[0];
    } else {
      if (this.hasPrice) {
        this.minusSplitedName.pop();
      }
      if (
        this.minusSplitedName[0].match(
          /(19|20)((0([1-9]))|(1[0-2]))([0-3][0-9])/
        )
      ) {
        this.minusSplitedName.shift();
      }

      this.content = this.minusSplitedName.join(' ');
    }
  }
};
