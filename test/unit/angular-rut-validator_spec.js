(function() {
  'use strict';
  

  //HELPERS GLOBALES
  var listaRutsValidos = [  '11792804-7',
                            '180958193',
                            '223961487',
                            '17.311.978-k',
                            '9.855.029-1',
                            '11.111.111-1',
                            '  6480644-0  '
                        ],
      listaRutsInValidos = [
                              '12804-1',
                              '1809581',
                              'a223961487',
                              '17.a311.978-j',
                              '91',
                              'abxsx',
                              '1.6.2.9.9.2228'
                            ];
          
  /* Filters  Testing */
  describe('Angular Rut Filters',validatorSpec);

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
     

    it('1. Debería retornar "true" para rut válidos utilizando filtro "rutVerifier"', spec1);
    
    function spec1(){
      var esRutValido = false;
       
      listaRutsValidos.forEach(function(rut){
        esRutValido = filter('rutVerifier')(rut);
        expect(esRutValido).toBe(true);
      });
    }


    it('2. Debería retornar "false" para rut inválidos utilizando filtro "rutVerifier"', spec2);

    function spec2(){
      var esRutValido = false;
       
      listaRutsInValidos.forEach(function(rut){
        esRutValido = filter('rutVerifier')(rut);
        expect(esRutValido).toBe(false);
      });
    }

    it('3. Debería retornar un rut formateado segun la opcion de formateo dada utilizando el filtro "rutFormat"', spec3);

    function spec3(){
      var rut = '111111111';
      expect(filter('rutFormat')(rut)).toBe('11.111.111-1');
    }

    it('4. Debería retornar un rut limpio sin rut ni guiones utilizand el filtro "rutCleanFormat"', spec4);

    function spec4(){
      var rut = '11.111.111-1';

      expect(filter('rutCleanFormat')(rut)).toBe('111111111');
    }

    it('5. Debería checkear si el formato es válido utilizando el rut "rutCheckFormat"', spec5);

    function spec5(){
      var esFormatoValido;
      
      listaRutsInValidos.forEach(function(rut){
        esFormatoValido = filter('rutCheckFormat')(rut);
        expect(esFormatoValido).toBe(false);
      });
 
    }
    

    
  }

  /* Directive Testing */

  describe('Angular Rut Validator Directive',validatorDirectiveSpec);

  function validatorDirectiveSpec(){

    //////////////  GLOBALS   ////////////////////////////////
    var scope, element, evt;
    //////////////  BEFORE EACH ////////////////////////////////
    beforeEach(module('gp.rutValidator'));
    beforeEach(inject(eachSpec));

    function eachSpec($rootScope, $compile){
      element = angular.element('<input ng-model="rut" gp-rut-validator>');
      scope = $rootScope.$new();
      
      $compile(element)(scope);
      scope.$digest();
    }

    ////////////////// HELPERS ///////////////////////////////////
    
    function pressKey(keyCode) {

      try {
        
        // Chrome, Safari, Firefox
        evt = new KeyboardEvent('keypress');
        
        delete evt.keyCode;
      
        Object.defineProperty(evt, 'keyCode', {'value': keyCode});
      
      } catch (e) {
        
        // PhantomJS 
        evt = document.createEvent('Events');
        evt.initEvent('keypress', true, true);
        evt.keyCode = keyCode;
      }

      element[0].dispatchEvent(evt);
    }

    function mouseFocus(){
      try {
        
        // Chrome, Safari, Firefox
        evt = new MouseEvent('focusout');
        
      } catch (e) {
        
        // PhantomJS 
        evt = document.createEvent('Events');
        evt.initEvent('focusout', true, true);
      }

      element[0].dispatchEvent(evt);
    }


    //////////////////   SPECS //////////////////////////////////
    it('1. Debería validar rut en el evento de mouse "focusout". ', spec1);
    
    function spec1(){
      
      var ngModelCtrl = element.controller('ngModel');

      listaRutsInValidos.forEach(function(rut){
        
        scope.rut = rut;
        scope.$apply();
        
        mouseFocus();
        
        expect(ngModelCtrl.$error.rutInvalid).toBeDefined();
        expect(ngModelCtrl.$error.rutInvalid).toBe(true);
      });

      listaRutsValidos.forEach(function(rut){
        
        scope.rut = rut;
        scope.$apply();
        
        mouseFocus();
        
        expect(ngModelCtrl.$error.rutInvalid).not.toBeDefined();

      });

      scope.rut = '';
      scope.$apply();
      
      mouseFocus();
      
      expect(ngModelCtrl.$error.rutInvalid).not.toBeDefined();

    }

    it('2. Debería evitar que se introduzcan caracteres no válidos"', spec2);
    
    function spec2(){
      var invalidCharacterKeys = [
                                    'a'.charCodeAt(0),
                                    'z'.charCodeAt(0),
                                    'b'.charCodeAt(0),
                                    '1'.charCodeAt(0)
                                  ],
        ngModelCtrl = element.controller('ngModel');

      invalidCharacterKeys.forEach(function(keyCode){
        pressKey(keyCode);
        scope.$apply();
        //expect(scope.rut).toBe('');
      });

    }

    
  }


})();