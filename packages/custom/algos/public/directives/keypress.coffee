# angular.module('mean.lex').directive 'ngKeyPress', () ->
#   return (scope, element, attrs) ->
#     element.bind "keydown keypress", (event) ->
#       if (event.which == 83 and (event.metaKey or event.ctrlKey))
#           scope.$apply scope.sol()
#           event.preventDefault();
