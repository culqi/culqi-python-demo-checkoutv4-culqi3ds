import Service from "../index.js"
import config,{ customerInfo } from "../../config/index.js"

const service = new Service();

export const generateOrderImpl = async () => {
  const bodyRequest = {
    amount: config.TOTAL_AMOUNT,
    currency_code: config.CURRENCY,
    description: 'Venta de prueba',
    order_number: 'pedido-' +(new Date).getTime(),
    client_details: {
      first_name: customerInfo.firstName,
      last_name: customerInfo.lastName,
      email: customerInfo.email,
      phone_number: customerInfo.phone
    },
  }
  return service.createOrder(bodyRequest);
}

export const generateCardImpl = async ({ customerId, email, tokenId, deviceId, parameters3DS = null }) => {
  var data_fraud = {
     first_name : $('#f_name').val(),
     last_name: $('#l_name').val(),
     email: email,
     phone_number: $('#phone').val(),
     device_finger_print_id: deviceId
  }

  var data = {
    amount : config.TOTAL_AMOUNT,
    currency_code : config.CURRENCY,
    email : email,
    token_id : tokenId,
    customer_id : customerId,
    antifraud_details : data_fraud
    };
    console.log("json jdd");
    console.log(data);


  return service.createCard(parameters3DS ? { ...data, authentication_3DS: { ...parameters3DS } } : data);
}

export const generateChargeImpl = async ({tokenId,  email, deviceId, parameters3DS = null}) => {
  var data_fraud = {
     first_name : $('#f_name').val(),
     last_name: $('#l_name').val(),
     email: email,
     phone_number: $('#phone').val(),
     device_finger_print_id: deviceId

}
  var data = {
    amount : config.TOTAL_AMOUNT,
    currency_code : config.CURRENCY,
    email : email,
    source_id : tokenId,
    antifraud_details : data_fraud
    };
    console.log("json");
    console.log(data);

    return service.createCharge(parameters3DS ? { ...data, authentication_3DS: { ...parameters3DS } } : data);
}