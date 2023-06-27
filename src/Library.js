const Doku = require('./Doku');

class Library {
  static createWords(data) {
    if (data.device_id !== undefined) {
      if (data.pairing_code !== undefined) {
        return sha1(data.amount + Doku.mallId + Doku.sharedKey + data.invoice + data.currency + data.token + data.pairing_code + data.device_id);
      } else {
        return sha1(data.amount + Doku.mallId + Doku.sharedKey + data.invoice + data.currency + data.device_id);
      }
    } else if (data.pairing_code !== undefined) {
      return sha1(data.amount + Doku.mallId + Doku.sharedKey + data.invoice + data.currency + data.token + data.pairing_code);
    } else if (data.currency !== undefined) {
      return sha1(data.amount + Doku.mallId + Doku.sharedKey + data.invoice + data.currency);
    } else {
      return sha1(data.amount + Doku.mallId + Doku.sharedKey + data.invoice);
    }
  }

  static formatBasket(data) {
    let parseBasket = null;

    if (Array.isArray(data)) {
      data.forEach(basket => {
        parseBasket = basket.name + ',' + basket.amount + ',' + basket.quantity + ',' + basket.subtotal + ';';
      });
    } else if (typeof data === 'object') {
      Object.values(data).forEach(basket => {
        parseBasket = basket.name + ',' + basket.amount + ',' + basket.quantity + ',' + basket.subtotal + ';';
      });
    }

    return parseBasket;
  }
}

module.exports = Library;
