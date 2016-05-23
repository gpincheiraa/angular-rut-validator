## Angular Rut Validator

[travis-image]: https://travis-ci.org/gpincheiraa/angular-rut-validator.png
[travis-url]: https://travis-ci.org/gpincheiraa/angular-rut-validator

[coveralls-image]: https://coveralls.io/repos/github/gpincheiraa/angular-rut-validator/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/gpincheiraa/angular-rut-validator?branch=master


[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]



Ejemplo de uso http://codepen.io/gpincheiraa/pen/Kzmdmg


### Instalación

`bower install --save angular-rut-validator`

### Uso

Para usar este plugin

- Agrega a tu módulo principal la dependencia 'gp.rutValidator'
- Agrega en tu input la directiva 'gp-rut-validator'
- Agrega entre tus mensajes `ng-message="rutInvalid"`
- Opcionalmente puedes agregar el mensaje  `ng-message="invalidFormat"`. 

- Formatos válidos: 
  1. Sólo números. Ej: 162992228
  2. Números, puntos y guión. Ej: 16.299.222-8
  3. Números y guión. Ej: 16299222-8

*Notas*
- No se permite ingresar caracteres que no sean guion,punto o dígitos con excepción de la letra k.
- El validador se activa cuando se quita el foco del input


Javascript

```javascript
  angular
    .module('exampleApp', ['ngMessages','gp.rutValidator']);
```
HTML

```html
 <div ng-app="exampleApp">
  <div ng-controller="ExampleController as example">
    <form name="formName">
      <label>Rut</label>
      <input type="text" name="rut" ng-model="example.rut" gp-rut-validator/>
      <div ng-messages="formName.rut.$error">
        <div ng-message="rutInvalid">Rut invalido.</div>
      </div>
    </form>
  </div>
</div>
```

## Filtros disponibles

Estos son los filtros que están disponibles a través de esta directiva. Recuerda que estos filtros son solo formateadores y no 
verifican si la entrada dada es un rut válido.

  **rutCheckFormat** : Filtro que sirve para validar si el formato entregado es válido
 
  Uso:
   
  ```javascript
    var rut = '11.111.111-1', 
        isValid = $filter('rutCheckFormat')(rut); //true
      
    rut = '1.1.11.11aab1-1';
    isValid = $filter('rutCheckFormat')(rut); //false
   ```

 **rutCleanFormat** : Filtro que sirve para quitar todos los caracteres y dejar solo los números de un rut
 
  Uso: 
  
  ```javascript
    var rut = $filter('rutCleanFormat')('11.111.111-1'); //111111111
  ```

 **rutFormat** : Filtro que sirve para formatear un rut al formato de guiones y puntos
 
  Uso: 
  
  ```javascript
    var rut = $filter('rutFormat')('222222222'); //22.222.222-2
  ```
