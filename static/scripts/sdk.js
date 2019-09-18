class BinanceSDK {
  async loadData(url) {
    try {
      const response = await fetch(`/api/proxy/url/fetch?url=${encodeURI(url)}`)
      return response.json()
    } catch (e) {}
  }

  subscribeWS(url) {
    return new WebSocket(url)
  }
}

export default new BinanceSDK({})
