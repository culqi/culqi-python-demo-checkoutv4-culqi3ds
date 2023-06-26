import config from "./index.js";

const culqiConfig = () => {

Culqi.publicKey = config.PUBLIC_KEY;

xculqirsaid: 'INSERTE_SU_RSA_ID';
rsapublickey: 'INSERTE_SU_LLAVE_RSA';

excludencryptoperations: [''];

  Culqi.settings({
    currency: config.CURRENCY,
    amount: config.TOTAL_AMOUNT,
    title: 'TAXI MAXIN', //Obligatorio para yape
    culqiclient: 'magento',
    culqiclientversion: '3.0'
  });

  Culqi.options({
    lang: 'auto',
    installments: true,
    paymentMethods: {
      tarjeta: true,
      bancaMovil: false,
      agente: false,
      billetera: false,
      cuotealo: false,
      yape: false,
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
