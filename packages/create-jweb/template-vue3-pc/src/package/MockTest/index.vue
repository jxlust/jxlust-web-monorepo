<template>
  <div class="mock">
    <div class="mock-get-test">
      <div class="item" v-for="item in getTestList" :key="item">
        {{ item }}
      </div>
    </div>
    <div class="mock-btn">
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import request from '@/utils/http/request';

  // interface StateInfo{
  //   getTestList: any[]
  // }
  const state = reactive({
    getTestList: [],
  });
  const { getTestList } = toRefs(state);

  const getTestData = async () => {
    try {
      let ret = await request({
        url: '/test/getData',
        method: 'get',
        params: {
          userName: '',
          pageNum: 1,
          pageSize: 10,
        },
      });
      const { data } = ret;
      console.log('ret:', ret);
      state.getTestList = data as any;
    } catch (error) {}
  };
  const submit = async () => {
    try {
      const ret = await request({
        url: '/user/doSave',
        method: 'post',
        data: {
          name: 'zz',
        },
      });
      console.log('save:', ret);
    } catch (error) {}
  };
  onMounted(() => {});
  getTestData();
</script>

<style></style>
