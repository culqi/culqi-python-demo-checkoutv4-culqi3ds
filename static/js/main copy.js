import config from "./config/index.js";
import culqiConfig from "./config/checkout.js";
import "./config/culqi3ds.js";
import { generateCardImpl, generateOrderImpl, generateChargeImpl } from "./services/impl/index.js";

let jsonParams = {
  installments: paymenType === "cargo" ? true : false,
  orderId: paymenType === "cargo" ? await generarOrder() : '',
}

async function generarOrder(){
  const { statusCode, data } = await generateOrderImpl();
  if (statusCode === 200) {
    console.log("Order",data);
    return data.id;
  } else {
    console.log('No se pudo obtener la orden');
  }
  return '';
}

culqiConfig(jsonParams);

const deviceId = await Culqi3DS.generateDevice();

if (!deviceId) {
  console.log("Ocurrio un error al generar el deviceID");
}
let tokenId, email, customerId;

window.addEventListener("message", async function (event) {
  if (event.origin === window.location.origin) {
    const { parameters3DS, error } = event.data;

    if (parameters3DS) {
      let statusCode = null;
      if (paymenType === "cargo") {
        const responseCharge = await generateChargeImpl({ tokenId, email, deviceId, parameters3DS });
        statusCode = responseCharge.statusCode;

        if (statusCode === 200) {
          resultdivCard("CARGO CREADO CON ÉXITO");
          Culqi3DS.reset();

        } else {
          resultdivCard("CARGO FALLIDA");
          Culqi3DS.reset();
        }
      }else{
        const responseCard = await generateCardImpl({ customerId, deviceId, email, tokenId, parameters3DS });
        statusCode = responseCard.statusCode;
  
        if (statusCode === 200) {
          resultdivCard("TARJETA CREADA CON ÉXITO");
          Culqi3DS.reset();
  
        } else {
          resultdivCard("CREACIÓN DE TARJETA FALLIDA");
          Culqi3DS.reset();
        }
      }
      
    }

    if (error) {
      resultdiv("Error, revisa la consola");
      console.log("Ocurrió un error: ", error);
    }
  }
},
  false
);

window.culqi = async () => {
  if (Culqi.token) {
    Culqi.close();
    tokenId = Culqi.token.id;
    email = Culqi.token.email;
    customerId = $("#idCustomer").val();
    if (paymenType === "cargo") {
      const { statusCode } = await generateChargeImpl({tokenId, email, deviceId });
      if (statusCode === 200) {
        if(data.action_code === "REVIEW"){
          validationInit3DS({ email, statusCode, tokenId });
        }else{
          $("#response_card").text("ERROR AL REALIZAR EL CARGO");
        }
      } else if (statusCode === 201) {
      $("#response_card").text("CARGO EXITOSO - SIN 3DS");
          Culqi3DS.reset();
        } else {
        $("#response_card").text("CARGO FALLIDO - SIN 3DS");
          Culqi3DS.reset();
      }
    }else{
      const { statusCode } = await generateCardImpl({ customerId, deviceId, email, tokenId });
      if (statusCode === 200) {
        if(data.action_code === "REVIEW"){
          validationInit3DS({ email, statusCode, tokenId });
        }else{
          $("#response_card").text("ERROR AL REALIZAR LA CREACION DE TARJETA");
        }
      } else if (statusCode === 201) {
        $("#response_card").text("TAJETA EXITOSA - SIN 3DS");
            Culqi3DS.reset();
          } else {
          $("#response_card").text("TARJETA FALLIDA - SIN 3DS");
            Culqi3DS.reset();
        }
    }
    

  } else {
    alert(Culqi.error.user_message);
    $('#response-panel').show();
    $('#response').html(Culqi.error.merchant_message);
    $('body').waitMe('hide');
  }
};

const validationInit3DS = ({ statusCode, email, tokenId }) => {
  console.log(statusCode);

    Culqi3DS.settings = {
      charge: {
        totalAmount: config.TOTAL_AMOUNT,
        returnUrl: "http://localhost:5100/card"
      },
      card: {
        email: email,
      }
    };
    Culqi3DS.initAuthentication(tokenId);
}


$("#response-panel").hide();

function resultdivCard(message) {
  $('#response-panel').show();
  $('#response_card').html(message);
  // $('body').waitMe('hide');
}
