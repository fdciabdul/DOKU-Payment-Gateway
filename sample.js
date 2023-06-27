const express = require('express');
const app = express();
const { Doku, Library, Api } = require('./src/');


Doku.sharedKey = 'sharedKey';
Doku.mallId = 'mallId';

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  const currency = '360';
  const invoice = 'invoice' + Math.floor(Math.random() * 100);
  const amount = '10000.00';
  const merchant_code = Doku.mallId;

  const params = {
    amount: amount,
    invoice: invoice,
    currency: currency,
  };
  const words = Library.createWords(params);
  const payment_env = Doku.isProduction ? 'production' : 'staging';

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>DOKU Payment Gateway</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.pack.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" rel="stylesheet">

    ${payment_env === 'production' ? `
      <script src="https://staging.doku.com/doku-js/assets/js/doku-1.2.js"></script>
      <link href="https://staging.doku.com/doku-js/assets/css/doku.css" rel="stylesheet">
    ` : `
      <script src="https://pay.doku.com/doku-js/assets/js/doku-1.2.js"></script>
      <link href="https://pay.doku.com/doku-js/assets/css/doku.css" rel="stylesheet">
    `}
  </head>
  <body>

  <form action="" method="POST" id="payment-form">
    <div doku-div='form-payment'>
      <input id="doku-token" name="doku-token" type="hidden" />
      <input id=" doku-pairing-code" name="doku-pairing-code" type="hidden" />
    </div>
  </form>

  <script type="text/javascript">
  $(function() {
   var data = new Object();
   data.req_merchant_code = '${merchant_code}';
   data.req_chain_merchant = 'NA';
   data.req_payment_channel = '15'; // ‘15’ = credit card
   data.req_transaction_id = '${invoice}';
   data.req_currency = '${currency}';
   data.req_amount = '${amount}';
   data.req_words = '${words}';
   data.req_form_type = 'full';
   data.req_server_url = 'charge.php'
  getForm(data, '${payment_env}');
  });
  </script>

  </body>
  </html>
  `);
});

app.listen(3000, () => console.log('Listening on port 3000...'));
