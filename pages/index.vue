<template>
  <main class="main">
    <the-header @selectComponent="selectComponent" />
    <section v-show="isFirstActive" class="content">
      <first-component />
    </section>
    <section v-show="!isFirstActive">
      <second-component />
    </section>
  </main>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import FirstComponent from '~/components/FirstComponent'
import SecondComponent from '~/components/SecondComponent'

export default {
  components: {
    TheHeader,
    FirstComponent,
    SecondComponent
  },
  data() {
    return {
      isFirstActive: true
    }
  },
  async mounted() {
    const sdk = this.$pluginsApi.plugins.SDK
    const dBus = this.$pluginsApi.plugins.dataBus
    if (!sdk) {
      await this.$pluginsApi.load({
        url: 'http://localhost:3000/scripts/sdk.js',
        name: 'SDK'
      })
    }
    if (!dBus) {
      await this.$pluginsApi.load({
        url: 'http://localhost:3000/scripts/bus.js',
        name: 'dataBus'
      })
    }
  },
  methods: {
    selectComponent(data) {
      if (data === 'FirstComponent') {
        this.isFirstActive = true
      } else {
        this.isFirstActive = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  font-size: 14px;
}
.content {
  display: flex;
  overflow: hidden;
  margin: auto;
  width: fit-content;
}
@media (max-width: 410px) {
  .content {
    width: 100%;
  }
}
</style>
