<template>
  <div class="test-item">
    <button @click="changeMsg">change</button>
    <div class="text">{{ message }} -- {{ test }}</div>
  </div>

  <div class="test-item">
    <button @click="changeMsg2">change</button>
    <div class="text">{{ myMessage }}</div>
  </div>

  <div class="test-item">
    {{ myObjOnly }}
  </div>

  <WatchTest />
</template>

<script setup lang="ts">
  import { Ref } from 'vue';

  import WatchTest from './watch.vue';
  import { MyRef } from './MyRef';
  interface UserInfo {
    name?: string;
    age?: number;
  }
  let message: Ref<UserInfo> = shallowRef({
    name: 'zhang san',
  });
  let test = ref('1');
  const changeMsg = () => {
    message.value.name = 'li shi';
    // triggerRef(message)
    // message.value = { name: 'zhao tian', age: 19 };
    test.value = '100';
  };

  //custom ref use

  let myMessage = MyRef<string>('xiao zi');
  const changeMsg2 = () => {
    myMessage.value = 'zhang fei';
  };

  //reactive
  const myObj = reactive({
    count: 1,
  });
  myObj.count++;
  const myObjOnly = readonly(myObj);

  //shallowReactive 只响应式第一层
  const shallowMsg = shallowReactive({
    test: 'test',
    nav: {
      info: {
        text: 'xxxx',
      },
    },
  });
  console.log(shallowMsg);
  //toRef toRefs
  let refObj = reactive({
    foo: 1,
    bar: 2,
  });
  let { foo, bar } = toRefs(refObj);
  console.log(foo, bar);
  //toRaw 转回普通对象
</script>

<style></style>
