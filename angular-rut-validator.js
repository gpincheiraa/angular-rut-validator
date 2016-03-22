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
          rut = rut.match(/[0-9Kk]+/g).join('');
          return verificarRut(rut);
        }
      };
    }
    
    function verificarRut(rut){
      var factor = 2,
          auxSum = 0,
          digitoVerificador = rut[rut.length - 1],
          l = rut.length - 1,
          digitoCalculado;

      while(l--){
        //+ operador 'unary' para hacer cast a number
        auxSum += +(rut[l]) * factor;
        factor = factor === 7 ? 2
                              : ++factor; //++ a la izquierda
      }

      digitoCalculado = 11 - (auxSum % 11);
      digitoCalculado =  digitoCalculado === 11 ? 0
                                                : (digitoCalculado === 10? 'K' : digitoCalculado);
      return String(digitoCalculado).toLowerCase() === String(digitoVerificador).toLowerCase();
    }
  }

})(window, angular);