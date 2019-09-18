const formOrderBookUrl = (params) =>
  `${params.url}symbol=${params.symbol}&limit=${params.limit}`

const formWSUrl = (params) =>
  `${params.url}${params.symbol.toLowerCase()}@depth`

export { formWSUrl, formOrderBookUrl }
