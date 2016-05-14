(function(){

  'use strict';

  describe('Sectors Controller', loginSpecs);

  function loginSpecs(){

    it('Debería restringir el ingreso de caracteres no válidos', spec1);

    function spec1(){
      
      browser.get('http://localhost');

      buttonDetails = element(by.css('.plots-list tbody a.btn:nth-child(2)'));

      buttonDetails.click();

      expect(browser.getLocationAbsUrl()).toMatch(plotMatchRegex);
    }


  }

})();