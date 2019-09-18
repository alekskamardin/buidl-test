<template>
  <div
    class="content"
    :class="{ content_scrollable: isScrollable }"
    @mouseenter="isScrollable = true"
    @mouseleave="isScrollable = false"
  >
    <data-table :data="hashedBids" />
    <data-table :data="hashedAsks" />
  </div>
</template>

<script>
import DataTable from './DataTable.vue'
import { formOrderBookUrl, formWSUrl } from '~/assets/utils'
import { orderBookBaseUrl, websocketBaseUrl } from '~/assets/constants'

export default {
  components: {
    DataTable
  },
  data() {
    return {
      hashedBids: {},
      hashedAsks: {},
      cId: null,
      lId: null,
      isScrollable: false,
      orderBookParams: {
        limit: 100,
        symbol: 'BTCUSDT',
        url: orderBookBaseUrl
      },
      wsParams: {
        limit: 100,
        symbol: 'BTCUSDT',
        url: websocketBaseUrl
      }
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    formSnapshotHash(snapshot) {
      const result = {}
      for (const item of snapshot) {
        result[item[0]] = item[1]
      }
      return result
    },
    init() {
      const sdk = this.$pluginsApi.plugins.SDK
      const dBus = this.$pluginsApi.plugins.dataBus
      if (!sdk || !dBus) {
        setTimeout(this.init, 100)
      } else {
        dBus.default.subscribe('updateSymbol', (symbol) => {
          if (this.ws) this.ws.close(4001)
          this.cId = null
          this.orderBookParams.symbol = symbol
          this.wsParams.symbol = symbol
          this.setData()
        })
        this.setData()
      }
    },
    async setData() {
      const sdk = this.$pluginsApi.plugins.SDK.default
      this.ws = sdk.subscribeWS(formWSUrl(this.wsParams))
      this.setWSEvents()
      const data = await sdk.loadData(formOrderBookUrl(this.orderBookParams))
      this.hashedBids = this.formSnapshotHash([...new Set(data.bids)])
      this.hashedAsks = this.formSnapshotHash([...new Set(data.asks)])
      this.lId = data.lastUpdateId
    },
    setWSEvents() {
      this.ws.onmessage = (event) => {
        const payload = JSON.parse(event.data)
        const u = payload.u
        const U = payload.U
        const nextLID = this.lId + 1
        if (u <= this.lId) return

        if (!this.cId && U <= nextLID && nextLID <= u) {
          console.log('start')
          this.cId = u + 1
        }

        if (this.cId === U) {
          console.log('update event')
          this.updateAllData(payload)
          this.cId = u + 1
        }
      }

      this.ws.onerror = () => {
        this.setData()
      }
    },

    updateAllData(payload) {
      this.hashedBids = this.updatePartData(this.hashedBids, payload.b)
      this.hashedAsks = this.updatePartData(this.hashedAsks, payload.a)
    },

    updatePartData(data = [], payload = []) {
      const dBus = this.$pluginsApi.plugins.dataBus.default
      if (payload.length) {
        payload.forEach((item, index) => {
          const [key, value] = item
          if (key === data.key) {
            if (+value) {
              data.key = value
            } else {
              delete data.key
            }
            dBus.publish('sendDiff', item)
          } else if (+value) {
            this.$set(data, key, value)
            dBus.publish('sendDiff', item)
          }
        })
      }
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 88vh;
  &_scrollable {
    overflow-y: scroll !important;
  }
  @media (max-width: 410px) {
    margin: 0 !important;
  }
}
</style>
