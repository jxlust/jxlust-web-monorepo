<template>
  <div class="slot">
    <header class="slot-header">
      <slot name="header"></slot>
    </header>
    <section class="slot-content"> 默认中间内容: </section>
    <footer class="slot-footer">
      <div class="slot-footer__item" v-for="l in lists" :key="l">
        <slot name="footer" :data="l"></slot>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
  const lists: string[] = reactive(['tom', 'lili', 'zp', 'bj']);
</script>

<style lang="scss">
  .slot {
    display: flex;
    flex-direction: column;
    width: 100%;

    &-header {
      width: 100%;
      height: 30px;
      background-color: aliceblue;
    }

    &-content {
      width: 100%;
      height: 60px;
      background-color: beige;
    }

    &-footer {
      width: 100%;
      height: 30px;
      background-color: #999;
      color: #fff;

      &__item {
        display: inline;
        margin: 0 10px;
      }
    }
  }
</style>
