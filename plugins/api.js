class Api {
  constructor() {
    this.plugins = {}
  }
  async load({ url = '', name = '' }) {
    if (!url || !name) return
    this.plugins[name] = await import(/* webpackIgnore: true */ url)
  }
  remove(name) {
    delete this.plugins[name]
  }
  info() {
    return this.plugins
  }
}

export default {
  install(Vue) {
    Vue.prototype.$pluginsApi = new Api()
  }
}
