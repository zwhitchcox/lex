angular.module('mean.lex').directive('ngDrag', (function(_this) {
  return function() {
    return function(scope, element, attrs) {
      element.css('cursor', 'crosshair');
      return element.bind('dragstart', function(event) {
        return scope.$apply(scope.$eval(attrs.ngDrag));
      });
    };
  };
})(this));

angular.module('mean.lex').directive('ngDrop', (function(_this) {
  return function() {
    return function(scope, element, attrs) {
      element.bind('drop', function(event) {
        event.preventDefault();
        scope.$apply(scope.$eval(attrs.ngDrop));
        return element.css('border-top', '1px solid #ddd');
      });
      element.bind('dragenter dragover', function(event) {
        event.preventDefault();
        return element.css('border-top', '2px solid #ddd');
      });
      return element.bind('dragleave', function(event) {
        event.preventDefault();
        return element.css('border-top', '1px solid #ddd');
      });
    };
  };
})(this));
