<!--
 * @Descripttion: 
 * @version: 
 * @Author: jxlust jxljxufe@163.com
 * @Date: 2022-06-07 17:18:12
 * @LastEditors: jxlust
 * @LastEditTime: 2022-06-07 17:33:16
-->
<template>
  <button @click="changeMsg">change</button>
  <button @click="stopWatch">stop</button>
</template>

<script setup lang="ts">
  const objInfo = reactive({
    name: 'li li',
    age: 20,
    info: {
      color: 'red',
    },
  });

  watch(objInfo, (newV, oldV) => {
    console.log(newV, oldV);
  });
  watch(
    () => objInfo.name,
    (newV, oldV) => {
      console.log(newV, oldV);
    },
  );
  // defineExpose()
  const message = ref('hhh');
  const message2 = ref('uuuu');

  const stopEv = watchEffect(
    (oninvalidate) => {
      console.log('message:', message.value);
      console.log('message2:', message2.value);

      oninvalidate(() => {
        //处理防抖 节流等
        console.log('update before..');
      });
    },
    {
      // flush: 'post',
      // onTrigger(e){
      //   debugger;
      // }
    },
  );

  const changeMsg = () => {
    message.value = '123456';
  };
  const stopWatch = stopEv;
</script>

<style></style>
