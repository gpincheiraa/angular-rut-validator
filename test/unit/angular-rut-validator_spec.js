(function() {
  'use strict';
  

  //HELPERS GLOBALES
  var listaRutsValidos = [  '11792804-7',
                            '180958193',
                            '223961487',
                            '17.311.978-k',
                            '9792547k',
                            '9.855.029-1',
                            '11.111.111-1',
                            '  6480644-0  ',
                            '116342616-8',
                            '1163426168'
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
        expect(esRutValido).toBe(true, 'Rut analizado: ' + rut);
      });
    }


    it('2. Debería retornar "false" para rut inválidos utilizando filtro "rutVerifier"', spec2);

    function spec2(){
      var esRutValido = false;
       
      listaRutsInValidos.forEach(function(rut){
        esRutValido = filter('rutVerifier')(rut);
        expect(esRutValido).toBe(false, 'Rut analizado: ' + rut);
      });
    }

    it('3. Debería retornar un rut formateado segun la opcion de formateo dada utilizando el filtro "rutFormat"', spec3);

    function spec3(){
      var rut = '111111111';
      expect(filter('rutFormat')(rut)).toBe('11.111.111-1');
      expect(filter('rutFormat')(null)).toBe('');
    }

    it('4. Debería retornar un rut limpio sin rut ni guiones utilizand el filtro "rutCleanFormat"', spec4);

    function spec4(){
      var rut = '11.111.111-1';

      expect(filter('rutCleanFormat')(rut)).toBe('111111111');
      expect(filter('rutCleanFormat')(null)).toBe('');
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
      scope.rut = '';
      $compile(element)(scope);
      scope.$digest();
    }

    ////////////////// HELPERS ///////////////////////////////////
    
    function pressKey(keyCode) {

      evt = document.createEvent('Events');
      evt.initEvent('keypress', true, true);
      evt.keyCode = keyCode;

      return element[0].dispatchEvent(evt);
    }

    function mouseFocus(){
      evt = document.createEvent('Events');
      evt.initEvent('focusout', true, true);
      
      return element[0].dispatchEvent(evt);
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

    it('2. Debería validar los caractéres introducidos', spec2);
    
    function spec2(){
      var validCharacterKeys = [
                                '1'.charCodeAt(0),
                                '2'.charCodeAt(0),
                                '.'.charCodeAt(0),
                                '-'.charCodeAt(0),
                                'k'.charCodeAt(0),
                                'K'.charCodeAt(0)

                                ],
          invalidCharacterKeys = [
                                  'x'.charCodeAt(0),
                                  'z'.charCodeAt(0),
                                  'b'.charCodeAt(0),
                                  '#'.charCodeAt(0)
                                ];
      
      validCharacterKeys.forEach(function(keyCode){
        expect(pressKey(keyCode)).toBe(true);
      });
      
      invalidCharacterKeys.forEach(function(keyCode){
        expect(pressKey(keyCode)).toBe(false);
      });
    }

    
  }


})();