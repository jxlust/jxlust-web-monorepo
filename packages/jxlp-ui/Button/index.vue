<template>
  <div class="jxlp-button">
    <button class="jbutton"> 我是按钮 -- {{ text }}</button>
    <img class="jimg" :src="logo" />
    <span class="jheart" @click="handleHeartClick"></span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
// import shoes from '@img/shoes.png'
// const logo = new URL('../assets/shoes.png', import.meta.url).href
const logo = 'https://img0.baidu.com/it/u=2262828731,2849199006&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800'
type ButtonPropsType = {
  text: string
}
defineProps<ButtonPropsType>()
const emit = defineEmits(['heart-click'])
const handleHeartClick = () => {
  emit('heart-click', 1000);
}
</script>

<script lang="ts">
export default {
  name: 'JxlpButton',
}
</script>
