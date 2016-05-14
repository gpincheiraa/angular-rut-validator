(function(){

  'use strict';


  describe('Angular Rut Validator', loginSpecs);

  function loginSpecs(){


    it('Debería restringir caracteres no válidos', spec1);

    function spec1(){
      var rutInput;

      rutInput = element(by.name('rut'));
      
      rutInput.sendKeys('a');

      expect(rutInput.getAttribute('value')).toBe('');

      rutInput.sendKeys('1');

      expect(rutInput.getAttribute('value')).toBe('1');

      rutInput.sendKeys('6');

      expect(rutInput.getAttribute('value')).toBe('16');

      rutInput.sendKeys('j');

      expect(rutInput.getAttribute('value')).toBe('16');

    }
  }

})();