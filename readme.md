## Angular Rut Validator

Example of usage http://codepen.io/gpincheiraa/pen/Kzmdmg


### Installation

`bower install --save angular-rut-validator`

### Usage

This plugin uses `angular-messages`. 

- Add in your main module the dependency 'gp.rutValidator'
- Add in your input the directive 'gp-rut-validator'
- Add in your form the ng-messages directive and add the `ng-message="rutInvalid"`. 
- The best way for validate this it's using the `ng-model-options="{ updateOn: 'blur' }`, because
  we need check the rut when the user on blur over the input.

In your Javascript

```javascript
  angular
    .module('exampleApp', ['ngMessages','gp.rutValidator']);
```
In your HTML

```html
 <div ng-app="exampleApp">
  <div ng-controller="ExampleController as example">
    <form name="formName">
      <label>Rut</label>
      <input type="text" name="rut" ng-model="example.rut" ng-model-options="{ updateOn: 'blur' }" gp-rut-validator/>
      <div ng-messages="formName.rut.$error">
    <div ng-message="rutInvalid">Rut invalido.</div>
</div>
    </form>
  </div>
</div>
```
