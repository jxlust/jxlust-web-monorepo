<template>
  <div>
    <div class="test"> time: {{ formatTime }} </div>
    <div class="test">time2: {{ formatTime2 }}</div>

    <div class="scroll-test" v-html="scrollText" ref="scrollRef"> </div>
    <div class="scroll-data">{{ x }} ----- {{ yInt }}</div>

    <div class="mouse-text">{{ mx }} --- {{ my }}</div>
    <div class="dark">{{ isDark }}</div>

    <div class="storage-show" @click="setLocalClick">
      {{ store }}
    </div>

    <div class="event-bus">
      <Child1 />
      <Child2 />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useNow, useDateFormat, useScroll, useMouse, usePreferredDark } from '@vueuse/core';
  import { useMyStorage } from './useMyStorage';
  import Child1 from './Child1.vue';
  import Child2 from './Child2.vue';
  // console.log(useNow())
  const formatTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss');
  console.log(`formatTime:`, formatTime);

  const myDate = ref(Date.now());
  const formatTime2 = useDateFormat(myDate, 'YYYY-MM-DD HH:mm:ss');

  const scrollText = new Array(10).fill(`<p>洛杉矶撒了房间啊龙卷风</p>`).join('');

  const scrollRef = ref<HTMLElement | null>();
  const { x, y } = useScroll(scrollRef, { throttle: 200 });
  const yInt = computed(() => unref(y) | 0);
  // console.log(1,unref(x), unref(y));
  console.log(useScroll(scrollRef));

  onMounted(() => {});

  const { x: mx, y: my } = useMouse();

  // is user prefers dark theme
  const isDark = usePreferredDark();
  const { store, setLocal } = useMyStorage();

  // persist state in localStorage
  const setLocalClick = () => {
    setLocal({ age: 10000 });
    console.log('mystore:', store);
  };
</script>

<style>
  .scroll-test {
    position: relative;
    width: 100%;
    max-height: 100px;
    background-color: skyblue;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
