<template>
  <div class="table">
    <header v-if="isNoData" class="table__header">
      <div class="table__title">Amount</div>
      <div class="table__title">Price</div>
      <div v-if="$mq !== 'sm'" class="table__title">Total</div>
    </header>
    <div
      v-for="(key, index) in Object.keys(data)"
      :key="index"
      class="table__content"
    >
      <div class="table__element">{{ key }}</div>
      <div class="table__element">{{ data[key] }}</div>
      <div v-if="$mq !== 'sm'" class="table__element">
        {{ +key * +data[key] }}
      </div>
    </div>
  </div>
</template>

<script>
import isEmpty from 'lodash/isEmpty'

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    isNoData() {
      return !isEmpty(this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  padding: 0;
  display: flex;
  width: 50%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 22px;
    margin-top: 10px;
  }
  &__title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 18px;
  }
  &__element {
    display: flex;
    width: -webkit-fill-available;
    white-space: nowrap;
    overflow: hidden;
    margin: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    align-items: center;
    justify-content: flex-start;
    border-right: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
  }
  @media (min-width: 900px) {
    &__title {
      width: 33%;
      justify-content: center;
    }
    &__element {
      width: 33%;
    }
  }
}
</style>
