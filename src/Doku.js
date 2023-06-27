class Doku {
    static isProduction = false;
  
    // local
    static sandboxPrePaymentUrl = 'https://staging.doku.com/api/payment/PrePayment';
    static sandboxPaymentUrl = 'https://staging.doku.com/api/payment/paymentMip';
    static sandboxDirectPaymentUrl = 'https://staging.doku.com/api/payment/PaymentMIPDirect';
    static sandboxGenerateCodeUrl = 'https://staging.doku.com/api/payment/doGeneratePaymentCode';
  
    // production
    static prePaymentUrl = 'https://pay.doku.com/api/payment/PrePayment';
    static paymentUrl = 'https://pay.doku.com/api/payment/paymentMip';
    static directPaymentUrl = 'https://pay.doku.com/api/payment/PaymentMIPDirect';
    static generateCodeUrl = 'https://pay.doku.com/api/payment/doGeneratePaymentCode';
  
    static sharedKey;
    static mallId;
  
    static getPrePaymentUrl() {
      return Doku.isProduction ? Doku.prePaymentUrl : Doku.sandboxPrePaymentUrl;
    }
  
    static getPaymentUrl() {
      return Doku.isProduction ? Doku.paymentUrl : Doku.sandboxPaymentUrl;
    }
  
    static getDirectPaymentUrl() {
      return Doku.isProduction ? Doku.directPaymentUrl : Doku.sandboxDirectPaymentUrl;
    }
  
    static getGenerateCodeUrl() {
      return Doku.isProduction ? Doku.generateCodeUrl : Doku.sandboxGenerateCodeUrl;
    }
  }
  
  module.exports = Doku;
  