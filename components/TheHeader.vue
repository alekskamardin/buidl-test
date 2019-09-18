<template>
  <header class="header">
    <div class="header__item" @click="select('FirstComponent')">OrderBook</div>
    <div class="header__item" @click="select('SecondComponent')">Symbols</div>
  </header>
</template>

<script>
export default {
  methods: {
    select(data) {
      this.$emit('selectComponent', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  &__item {
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 14px;
    background: #82c4cd;
    text-decoration: none;
    color: white;
    font-weight: bold;
    margin: 0 10px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
