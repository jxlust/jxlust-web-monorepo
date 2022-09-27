<template> 接收到：{{ text }} </template>

<script setup lang="ts">
  import { useEventBus } from '@vueuse/core';
  import { ChildEventKey } from './EventKey';

  const text = ref<string>('');
  const { on } = useEventBus<string>(ChildEventKey.TestKey);
  on((msg: any) => {
    console.log(1, msg);
    text.value = msg;
  });
</script>

<style></style>
