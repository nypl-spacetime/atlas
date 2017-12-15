const filterToUrlParam = {
  geometry: (geometry) => geometry,
  'geometry-operation': (operation) => operation,
  since: (since) => since,
  until: (until) => until,
  name: (name) => name ? encodeURI(name) : null,
  types: (types) => Object.keys(types)
    .filter((type) => types[type])
    .join(',')
}

export function filtersToUrlParams (filters) {
  const urlParams = Object.keys(filters)
    .filter((filter) => filterToUrlParam[filter])
    .map((filter) => ({
      key: filter,
      value: filterToUrlParam[filter](filters[filter])
    }))
    .filter((param) => param.value)
    .map((param) => `${param.key}=${param.value}`)
    .join('&')

  if (urlParams) {
    return `?${urlParams}`
  }

  return ''
}

export function typeToText (type) {
  return type.slice(3).replace(/([a-z])([A-Z])/g, '$1 $2')
}

export function roundDecimals (number, decimals) {
  const d = Math.pow(10, decimals)
  return Math.round(number * d) / d
}