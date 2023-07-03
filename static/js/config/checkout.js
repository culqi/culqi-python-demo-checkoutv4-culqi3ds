import config from "./index.js";

const culqiConfig = (jsonParams) => {

Culqi.publicKey = config.PUBLIC_KEY;


  Culqi.settings({
    currency: config.CURRENCY,
    amount: config.TOTAL_AMOUNT,
    order: jsonParams.orderId,
    title: 'TAXI MAXIN', //Obligatorio para yape
    xculqirsaid: config.RSA_ID,
    rsapublickey: config.RSA_PUBLIC_KEY,
    excludencryptoperations: [''],
  });

  Culqi.options({
    lang: 'auto',
    installments: jsonParams.installments,
    paymentMethods: {
      tarjeta: true,
      bancaMovil: true,
      agente: true,
      billetera: true,
      cuotealo: true,
      yape: true,
    },
    style: {
      //logo: 'https://culqi.com/LogoCulqi.png',
      bannerColor: '', // hexadecimal
      buttonBackground: '', // hexadecimal
      menuColor: '', // hexadecimal
      linksColor: '', // hexadecimal
      buttonText: '', // texto que tomará el botón
      buttonTextColor: '', // hexadecimal
      priceColor: '' // hexadecimal
    }
  });
}
export default culqiConfig;
