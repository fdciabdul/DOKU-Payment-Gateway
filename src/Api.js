const axios = require('axios');
const Library = require('./Library');
const Doku = require('./Doku');

class Api {
  static proxy = '';

  static async prePayment(data) {
    data.req_basket = Library.formatBasket(data.req_basket);

    return this.getResponse(Doku.getPrePaymentUrl(), data);
  }

  static async payment(data) {
    data.req_basket = Library.formatBasket(data.req_basket);

    return this.getResponse(Doku.getPaymentUrl(), data);
  }

  static async directPayment(data) {
    return this.getResponse(Doku.getDirectPaymentUrl(), data);
  }

  static async generatePaycode(data) {
    return this.getResponse(Doku.getGenerateCodeUrl(), data);
  }

  static async getResponse(url, data) {
    const options = {
      method: 'post',
      url: url,
      data: { data: JSON.stringify(data) },
    };
    if (Api.proxy !== '') {
      options.proxy = Api.proxy;
    }
    const response = await axios(options);

    return response;
  }
}

module.exports = Api;
