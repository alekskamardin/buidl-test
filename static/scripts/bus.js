class DataBus {
  constructor() {
    this.subs = {}
    this.subId = -1
  }
  subscribe(event, listener) {
    if (!this.subs[event]) {
      this.subs[event] = []
    }
    const id = `${++this.subId}`
    this.subs[event].push({
      id,
      listener
    })
    return id
  }
  publish(event, data) {
    const sub = this.subs[event]
    if (!sub || !sub.length) {
      return
    }
    sub.forEach((element) => element.listener(data))
  }
  unsubscribe(id) {
    for (const sub in this.subs) {
      if (!this.subs[sub]) return
      const items = this.subs[sub]
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          items.splice(i, 1)
          return id
        }
      }
    }
  }
}

export default new DataBus()
