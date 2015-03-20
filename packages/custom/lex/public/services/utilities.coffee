angular.module('mean.lex').filter('orderObjectBy', () ->
  return (items, field, reverse) ->
    filtered = []
    angular.forEach(items,(item)->filtered.push(item))
    filtered.sort((a, b) -> if a[field] > b[field] then 1 else -1)
    filtered.reverse() if (reverse)
    return filtered
)
