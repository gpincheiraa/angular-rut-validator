(function(window, angular, undefined){

  'use strict';

  angular
    .module('gp.rutValidator', []);
  /*
    Filtro que verifica la validez de formato de un rut dado
  */
  angular
    .module('gp.rutValidator')
    .filter('rutCheckFormat', checkFormatFilter);

  function checkFormatFilter(){
    return function (rut){
      var regexFormatosValidos = (/^(\d{7,8}\-(\d|k))$|^(\d{1,2}\.\d{3}\.\d{3}\-(\d|k){1})$|^(\d{8,9})$/i);

      return (typeof rut === 'string') && regexFormatosValidos.test(rut);
    };
  }

  /*
    Filtro que formatea el rut a un formato válido
  */
  angular
    .module('gp.rutValidator')
    .filter('rutFormat', rutFormatter);

  function rutFormatter(){
    return function (rut){
      
      if(!rut) return '';
      
      rut = rut.match(/[0-9Kk]+/g).join('');
        
      return rut.slice(0,-1).replace((/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g), '$&.') + '-' + rut.slice(-1).toLowerCase();
    };
  }

  angular
    .module('gp.rutValidator')
    .filter('rutCleanFormat', cleanFormatFilter);

  function cleanFormatFilter(){
    return function (rut){
      return rut? rut.match(/[0-9Kk]+/g).join('')
                : '';
    };
  }

  /*
    Filtro que verifica el digito verificador de un rut dado
  */
  angular
    .module('gp.rutValidator')
    .filter('rutVerifier', rutVerifierFilter);

  rutVerifierFilter.$inject = ['rutCheckFormatFilter', 'rutCleanFormatFilter'];

  function rutVerifierFilter(rutCheckFormatFilter, rutCleanFormatFilter){
    return function(rut){
      
      //Quitamos espacios en blanco en caso de traer
      rut = rut.trim();
      //Verificamos si el rut dado tiene un formato válido
      if(!rutCheckFormatFilter(rut)) return false;
      //Extraemos solo lo que necesitamos del rut, los números y el digito verificador
      rut = rutCleanFormatFilter(rut);

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
    };
  }

 /*
    DIRECTIVA VALIDADOR DE RUT:

    Genera errores de la librería ng-messages

  */
  angular
    .module('gp.rutValidator')
    .directive('gpRutValidator', directive);
  
  directive.$inject = ['$filter'];
  
  function directive($filter){
    var ddo = {
      restrict: 'A',
      require: 'ngModel',
      link: linkFn
    };
    return ddo;
    
    function linkFn(scope, element, attrs, ngModel){
      
      //restringe que se ingresen elementos no válidos
      var regexValidKeys = (/[\d\.\-k]/i);
      
      element.bind('keypress', function(e){
        
        var key = String.fromCharCode(e.keyCode);
        
        if (!regexValidKeys.test(key)) {
          e.preventDefault();
          return false;
        }

      });

      //validación se debe realizar al quitar el foco del input
      element.bind('focusout', function(){
        
        var rut = ngModel.$viewValue;
        
        ngModel.$setValidity('rutInvalid', rut? $filter('rutVerifier')(rut) : true);
        
        scope.$apply();

      });

    }
  }

})(window, angular);