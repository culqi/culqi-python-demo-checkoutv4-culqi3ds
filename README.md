# DEMO - Culqi Python + Checkout V4 + Culqi 3DS


La demo integra Culqi Python, Checkout V4 , Culqi 3DS y es compatible con la v2.0 del Culqi API, con esta demo podrás generar tokens, cargos, clientes, cards.

## Requisitos

* Python 2.7+
* Afiliate [aquí](https://afiliate.culqi.com/).
* Si vas a realizar pruebas obtén tus llaves desde [aquí](https://integ-panel.culqi.com/#/registro), si vas a realizar transacciones reales obtén tus llaves desde [aquí](https://panel.culqi.com/#/registro) (1).

> Recuerda que para obtener tus llaves debes ingresar a tu CulqiPanel > Desarrollo > ***API Keys***.

![alt tag](http://i.imgur.com/NhE6mS9.png)

> Recuerda que las credenciales son enviadas al correo que registraste en el proceso de afiliación.

* Para encriptar el payload debes generar un id y llave RSA ingresando a CulqiPanel > Desarrollo > RSA Keys.

## Instalación

Ejecuta los siguientes comandos:

```bash
py -m pip install culqi-python-oficial
py -m pip install flask
py -m pip install flask_restful
py -m pip install pycryptodome
py -m pip install flask_cors
```

## Configuración backend

En el archivo **index.py** reemplaza los placeholders con tus propias llaves de prueba:

```python
public_key = "INSERTE_SU_LLAVE_PUBLICA"
private_key = "INSERTE_SU_LLAVE_PRIVADA"
rsa_id = "INSERTE_SU_RSA_ID"
rsa_public_key = "INSERTE_SU_LLAVE_RSA"
```

Usa una llave pública `pk_test_` y una llave privada `sk_test_` de tu comercio,
junto con el ID y la llave pública RSA correspondientes. Los placeholders no son
credenciales funcionales. No hagas commit de tus llaves ni de archivos configurados
con ellas. La llave privada solo debe estar en el backend, nunca en el frontend.
La demo realiza llamadas reales a la API de Culqi; utiliza únicamente datos de prueba.

## Configuración frontend

En `static/js/config/index.js` reemplaza `INSERTE_SU_LLAVE_PUBLICA`,
`INSERTE_SU_RSA_ID` e `INSERTE_SU_LLAVE_RSA` con los mismos valores públicos
configurados en el backend. Configura también los datos del cargo y del cliente.

```js
export default Object.freeze({
    TOTAL_AMOUNT: 600,
    CURRENCY: "PEN",
    PUBLIC_KEY: "INSERTE_SU_LLAVE_PUBLICA",
    RSA_ID: "INSERTE_SU_RSA_ID",
    RSA_PUBLIC_KEY: "INSERTE_SU_LLAVE_RSA",
    COUNTRY_CODE: "PE",
    URL_BASE: "http://localhost:5100"
});
```

## Inicializar la demo

Ejecutar el siguiente comando:

```bash
py index.py
```

## Probar la demo

Para poder visualizar el frontend de la demo ingresar a la siguiente URL:

- Para probar cargos: `http://localhost:5100`
- Para probar creación de cards: `http://localhost:5100/card`

## Documentación

- [Referencia de Documentación](https://docs.culqi.com/)
- [Referencia de API](https://apidocs.culqi.com/)