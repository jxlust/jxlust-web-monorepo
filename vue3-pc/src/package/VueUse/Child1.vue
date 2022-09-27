<template>
  {{ text }}
  <button @click="sendBrother">给兄弟发送爱心</button>
</template>

<script setup lang="ts">
  import { useEventBus } from '@vueuse/core';
  import { ChildEventKey } from './EventKey';
  const text = ref<string>('');
  const { on, emit } = useEventBus<string>(ChildEventKey.TestKey);
  on((msg: any) => {
    text.value = msg;
  });
  const sendBrother = () => {
    emit('hhhhhhhh');
  };
</script>

<style></style>
