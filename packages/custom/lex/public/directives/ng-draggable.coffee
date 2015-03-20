angular.module('mean.lex').directive('ngDrag', () =>
    (scope, element, attrs) =>
      element.css('cursor','crosshair')
      element.bind('dragstart',(event) =>
        scope.$apply scope.$eval attrs.ngDrag
      )
)

angular.module('mean.lex').directive('ngDrop', () =>
    (scope, element, attrs) =>
      element.bind('drop',(event) =>
        event.preventDefault()
        scope.$apply scope.$eval attrs.ngDrop
        element.css('border-top','1px solid #ddd')
      )
      element.bind('dragenter dragover',(event) =>
        event.preventDefault()
        element.css 'border-top','2px solid #ddd'
      )
      element.bind('dragleave',(event) =>
        event.preventDefault()
        element.css 'border-top','1px solid #ddd'
      )
)
