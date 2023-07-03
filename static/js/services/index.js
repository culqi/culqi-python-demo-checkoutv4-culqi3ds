import config  from "../config/index.js"
class Service {
  #BASE_URL = config.URL_BASE;

  #http = async ({ endPoint, method = 'POST', body = {}, headers = {} }) => {
    console.log("Llego a http");
    console.log(headers);
    const authentication_3DS = body.authentication_3DS ? {
      eci: body.authentication_3DS.eci,
      xid: body.authentication_3DS.xid,
      cavv: body.authentication_3DS.cavv,
      protocolVersion: body.authentication_3DS.protocolVersion,
      directoryServerTransactionId: body.authentication_3DS.directoryServerTransactionId,
    } : null;
    try {
      const response = await fetch(`${this.#BASE_URL}/${endPoint}`,
        {
          headers: { 'Content-Type': 'application/json', ...headers },
          body: JSON.stringify(body),
          method
        });
      const responseJSON = await response;
      return { statusCode: response.status, data: responseJSON }
    } catch (err) {
      return { statusCode: 502, data: null }
    }
  }

  #http2 = async ({ endPoint, method = "POST", body = {}, headers = {} }) => {
    let statusCode = 502; 
    try {
        const response = await $.ajax({
          type: 'POST',
          url: `${this.#BASE_URL}/${endPoint}`,
          headers: { "Content-Type": "application/json", ...headers },
          data: JSON.stringify(body),
          success: function (data, status, xhr) {
            statusCode = xhr.status;
            //response = data;
          }
        });
        const responseJSON = await response;console.log('statusCode',statusCode);
        return { statusCode: statusCode, data: responseJSON }
      } catch (err) {
        return { statusCode: statusCode, data: null }
      }
    }

  createOrder = async (bodyOrder) => {
    return this.#http2({ endPoint: "generateOrder", body: bodyOrder });
  }

  createCard = async (bodyCard) => {
    console.log("Entro createCard");
    console.log(JSON.stringify(bodyCard));
    return this.#http({ endPoint: "culqi/generateCards", body:bodyCard});
  }
  createCharge = async (bodyCharge) => {
    console.log(JSON.stringify(bodyCharge));
    return this.#http({ endPoint: "culqi/generateCharge", body:bodyCharge});
  }
}
export default Service;
