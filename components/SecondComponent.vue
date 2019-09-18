<template>
  <section class="section">
    <select
      v-model="selectedSymbol"
      name="symbols"
      class="section__select"
      @change="setSymbol"
    >
      <option v-for="symbol in symbols" :key="symbol" :value="symbol">
        {{ symbol }}
      </option>
    </select>
    <ul
      class="section__diffs"
      :class="{ section__diffs_scrollable: isScrollable }"
      @mouseenter="isScrollable = true"
      @mouseleave="isScrollable = false"
    >
      Diffs list
      <li v-for="(item, index) in diffs" :key="index">
        {{ item[0] }} {{ item[1] }}
      </li>
    </ul>
  </section>
</template>

<script>
import { symbols } from '~/assets/constants'

export default {
  data() {
    return {
      symbols,
      selectedSymbol: 'BTCUSDT',
      diffs: [],
      isScrollable: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const sdk = this.$pluginsApi.plugins.SDK
      const dBus = this.$pluginsApi.plugins.dataBus
      if (!sdk || !dBus) {
        setTimeout(this.init, 100)
      } else {
        dBus.default.subscribe('sendDiff', (diff) => this.diffs.push(diff))
        dBus.default.subscribe('updateSymbol', () => {
          this.diffs = []
        })
        this.setSymbol()
      }
    },
    setSymbol() {
      const dBus = this.$pluginsApi.plugins.dataBus.default
      dBus.publish('updateSymbol', this.selectedSymbol)
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: center;
  padding: 0 10px;
  &__diffs {
    list-style-type: none;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 14px;
    background: #82c4cd;
    color: white;
    align-self: center;
    max-height: 75vh;
    overflow: hidden;
    &_scrollable {
      overflow-y: scroll;
    }
    @media (max-width: 410px) {
      margin-left: 0;
    }
  }
  &__select {
    box-sizing: border-box;
    width: 150px;
    align-self: center;
    outline: none;
    border: none;
    padding: 8px 14px;
    border-radius: 5px;
    background: rgba(48, 56, 65, 0.05);
    grid-column-start: 2;
    transition: opacity 0.3s;
    height: 40px;
    margin-bottom: 20px;
    &::-webkit-input-placeholder {
      color: rgba(48, 56, 65, 0.7);
    }
    &:focus {
      opacity: 0.7;
    }
  }
}
</style>
