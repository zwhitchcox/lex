angular.module('mean.lex').filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered;
    filtered = [];
    angular.forEach(items, function(item) {
      return filtered.push(item);
    });
    filtered.sort(function(a, b) {
      if (a[field] > b[field]) {
        return 1;
      } else {
        return -1;
      }
    });
    if (reverse) {
      filtered.reverse();
    }
    return filtered;
  };
});
