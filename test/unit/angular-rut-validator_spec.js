(function() {
  'use strict';
  
  describe('Angular Rut Validator',validatorSpec);

  function validatorSpec(){

    //////////////  GLOBALS   ////////////////////////////////
    var scope, filter;
    //////////////  BEFORE EACH ////////////////////////////////
    beforeEach(module('gp.rutValidator'));
    beforeEach(inject(eachSpec));

    function eachSpec($rootScope, $filter){
      scope = $rootScope.$new();
      filter = $filter;
    }

    //////////////////   SPECS //////////////////////////////////
     

    it('Debería retornar "true" para rut válidos utilizando filtro "rutVerifier"', spec1);
    
    function spec1(){
       var rutValido = '162992228';
       var esRutValido = filter('rutVerifier')(rutValido);
       expect(esRutValido).toBe(true);
    }
    
  }


})();