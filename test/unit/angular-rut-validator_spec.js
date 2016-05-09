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
      var listaRutsValidos = [
                              '11792804-7',
                              '180958193',
                              '223961487',
                              '17.311.978-k',
                              '9.855.029-1',
                              '11.111.111-1'
                            ],
          esRutValido = false;
       
       listaRutsValidos.forEach(function(rut){
          esRutValido = filter('rutVerifier')(rut);
          expect(esRutValido).toBe(true);
       });   
    }


    it('Debería retornar "false" para rut inválidos utilizando filtro "rutVerifier"', spec2);

    function spec2(){
      var listaRutsInValidos = [
                              '11792804-1',
                              '1809581',
                              'a223961487',
                              '17.a311.978-j',
                              '91',
                              'abxsx',
                              '1.6.2.9.9.228'
                            ],
          esRutValido = true;
       
       listaRutsInValidos.forEach(function(rut){
          esRutValido = filter('rutVerifier')(rut);
          console.log(rut, esRutValido);
          expect(esRutValido).toBe(false);
       }); 
    }
    
  }


})();