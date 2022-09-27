<template>
  <div class="async-test">
    <div class="async-item" v-for="n in list" :key="n"> 异步数据-{{ n }} </div>
  </div>
</template>

<script setup lang="ts">
  const getTestData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data: number[] = [1, 2, 3, 4, 6, 7, 8, 19, 22, 199];
        resolve(data);
      }, 3000);
    });
  };

  const listTest = await getTestData();
  const list = reactive(listTest as number[]);
  // const list = reactive<number[]>([])
  console.log(list);
  setTimeout(() => {
    list.push(9999);
  }, 1000);
  // const setLists = () => {
  //   setTimeout(() => {
  //     list.push(...[1,2,3,4,5])
  //   }, 3000);
  // }
  // setLists();
</script>

<style></style>
