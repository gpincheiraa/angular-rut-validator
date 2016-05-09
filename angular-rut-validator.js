(function(window, angular, undefined){

  'use strict';

  angular
    .module('gp.rutValidator', ['ngMessages'])
    .directive('gpRutValidator', directive);
  
  directive.$inject = ['$compile'];
  function directive($compile){
    var ddo = {
      restrict: 'A',
      require: 'ngModel',
      link: linkFn
    };
    return ddo;
    
    function linkFn(scope, element, attrs, ngModel){
      ngModel.$validators.rutInvalid = function(rut) {
        if(rut){
          return verificadorDeRut(rut);
        }
      };
    }
    
    function verificadorDeRut(rut){
       
      /* 
         Vamos a prevenir que la función sea invocada si se reciben datos que no sean de tipo string o que contengan un número
         de dígitos que no valga la pena que verifiquemos. 
         La expresión regular busca si se entrega una cantidad de digitos entre 1 y 7, cantidad que no es suficiente
         para poder ser dividida en 2 partes para poder verificar el digito verificador. Una explicación más detallada y paso
         a paso de la expresión regular en este link -> https://regex101.com/r/gY1cP9/2
      */

      //FALTA REGEXP QUE COMPARE QUE TENGA UN FORMATO VÁLIDO, POR EJEMPLO QUE NO SEA 1.6299.22-2-8
      if(typeof rut !== 'string' || (/\b(\d{1,7}|[a-z]+)\b/i).test(rut.replace(/[\.\-]/g,''))) return false;
      
      //Extraemos solo lo que necesitamos del rut, los números y el digito verificador
      rut = rut.match(/[0-9Kk]+/g).join('');

      /*
        Definimos una variable que irá aumentando en cada vuelta del ciclo
        representando la serie 2,3,4,5,6,7. En caso que este factor llegue 
        al número final de esta serie, se reinicia a 2.
      */
      var factor = 2,
      /*
        La variable suma irá guardando la suma parcial de la multiplicación entre el factor y el digito
        del rut correspondiente 
      */
      suma = 0,
      /*
        Ya que nos interesa sólo calcular lo que está a la izquierda del dígito verificador,
      nuestro iterador partirá desde el digito anterior al digito verificador en reversa (link del cálculo del rut).
      */
      l = rut.length - 1,
      /*
        La función slice (link acá -> https://goo.gl/7KgPVV) permite utilizar como argumento un número negativo.
        Al hacer esto definimos cuantos caracteres desde el final del array queremos abarcar. En nuestro 
        caso queremos solo abarcar el último dígito. En caso se resultar ser una 'K', no aseguramos que siempre sea minúscula
      */
      digitoOriginal = rut.slice(-1).toLowerCase(),
      //variable a la cuál asignaremos el dígito final calculado
      digitoCalculado;
       
      /*En javascript los operadores se evalúan después de las aserciones como while o if
       considerando que queremos recorrer hasta el dígito 0 y que este es considerado un falsy value (revisar este link-> https://goo.gl/uX5yf4) utilizamos el siguiente ciclo while 
      */
      while(l--){
        suma += +rut[l]*factor;
        factor = factor === 7 ? 2
                              : ++factor;
      }
      //si 11 menos el modulo de la suma obtenida es 11, digito verificador es 0, si 
      digitoCalculado = 11 - (suma % 11);
      digitoCalculado =  digitoCalculado === 11 ? 0
                                                : ( digitoCalculado === 10? 'k' : digitoCalculado);
      //convertimos en string el digito calculado y retornamos el resultado de la comparación con el digito verificador
      return (''+digitoCalculado) === digitoOriginal;
    }

  }

})(window, angular);