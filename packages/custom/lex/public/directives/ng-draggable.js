angular.module('mean.lex').directive('ngDrag', function () {
    return function (scope, element, attrs) {
      element.css('cursor','crosshair')
      element.bind('dragstart',function(event){
        scope.$apply(function (){
            scope.$eval(attrs.ngDrag);
        });
      })
    };
});

angular.module('mean.lex').directive('ngDrop', function () {
    return function (scope, element, attrs) {
      element.bind('drop',function(event){
        event.preventDefault()
        scope.$apply(function (){
            scope.$eval(attrs.ngDrop);
        });
        element.css('border-top','1px solid #ddd')

      })
      element.bind('dragenter dragover',function(event){
        event.preventDefault()
        element.css('border-top','2px solid #ddd')
      })
      element.bind('dragleave',function(event){
        event.preventDefault()
        element.css('border-top','1px solid #ddd')
      })
    };
});
