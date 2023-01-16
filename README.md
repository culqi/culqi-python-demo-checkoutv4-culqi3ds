# DEMO - Culqi Python + Checkout V4 + Culqi 3DS


La demo integra Culqi Python, Checkout V4 , Culqi 3DS y es compatible con la v2.0 del Culqi API, con esta demo podrás genera token, cargos, clientes, card.

## Requisitos

* Python 2.7+
* Afiliate [aquí](https://afiliate.culqi.com/).
* Si vas a realizar pruebas obtén tus llaves desde [aquí](https://integ-panel.culqi.com/#/registro), si vas a realizar transacciones reales obtén tus llaves desde [aquí](https://panel.culqi.com/#/registro) (1).

> Recuerda que para obtener tus llaves debes ingresar a tu CulqiPanel > Desarrollo > ***API Keys***.

![alt tag](http://i.imgur.com/NhE6mS9.png)

> Recuerda que las credenciales son enviadas al correo que registraste en el proceso de afiliación.

## Instalación

Ejecuta los siguientes comandos:

```bash
py -m pip install pytest
py -m pip install python-dotenv
py -m pip install culqi
py -m pip install jsonschema

```

## Inicializar del proyecto

Ejecutar el siguiente comando:

```bash
py index.py
```

## Probar la demo

Para poder visualizar el formulario de pago de la demo ingresar a la siguiente URL:

- Para probar cargos: `http://localhost:5000`
- Para probar creación de cards: `http://localhost:5000/cards`