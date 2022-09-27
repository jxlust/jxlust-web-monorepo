<template>
  <div>
    <div class="tabs">
      <div class="tab" v-for="tab in compLists" :key="tab.id" @click="tabClick(tab)">
        {{ tab.name }}
      </div>
    </div>

    <div class="tab-content">
      <keep-alive :include="includeComp">
        <component :is="currentComponent" @update="handleUpdate" />
      </keep-alive>
    </div>

    <div class="test-content">
      <button @click="changeSlot">动态插槽</button>
      <SlotTest>
        <template #footer="{ data }">
          {{ data }}
        </template>
        <template #[slotKey]> 我是动态插入内容 </template>
      </SlotTest>
    </div>

    <div class="test-content">
      <Suspense>
        <template #default>
          <AsyncCompHigh />
        </template>
        <template #fallback>
          <div class="loading">加载中...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Login from './Login.vue';
  import Register from './Register.vue';
  import ShowText from './ShowText.vue';
  import SlotTest from './SlotTest.vue';
  import ErrorComponent from '@/components/base/Error.vue';
  import LoadingComponent from '@/components/base/Loading.vue';
  interface MyComponent {
    name: string;
    comp: any;
    id: number;
  }
  type Comp = Pick<MyComponent, 'comp'>;
  const includeComp = ['MyLogin', 'Register'];
  const lists: MyComponent[] = [
    {
      id: 1,
      name: 'login',
      comp: markRaw(Login),
    },
    {
      id: 2,
      name: 'register',
      comp: markRaw(Register),
    },
    {
      id: 3,
      name: 'text',
      comp: markRaw(ShowText),
    },
  ];

  const compLists = ref<MyComponent[]>(lists);

  const currentComponent = ref<Comp>(lists[0].comp);

  const tabClick = (item: MyComponent) => {
    currentComponent.value = item.comp;
  };

  const slotKey = ref<string>('');
  const keyLists: string[] = ['default', 'header', 'footer'];
  const changeSlot = () => {
    let index = (Math.random() * 3) | 0;
    console.log(index);
    slotKey.value = keyLists[index];
  };

  //异步组件
  // const AsyncComp = defineAsyncComponent(() => import('@/package/MyTest/AsyncComponent.vue'));
  //异步组件高级用法
  const AsyncCompHigh = defineAsyncComponent({
    // 工厂函数
    loader: () => import('@/package/MyTest/AsyncComponent.vue'),
    // 加载异步组件时要使用的组件
    loadingComponent: LoadingComponent,
    // 加载失败时要使用的组件
    errorComponent: ErrorComponent,
    // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
    delay: 200,
    // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
    // 默认值：Infinity（即永不超时，单位 ms）
    timeout: 1000,
    // 定义组件是否可挂起 | 默认值：true
    suspensible: true,
    /**
     *
     * @param {*} error 错误信息对象
     * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
     * @param {*} fail  一个函数，指示加载程序结束退出
     * @param {*} attempts 允许的最大重试次数
     */
    onError(error, retry, fail, attempts) {
      if (error.message.match(/fetch/) && attempts <= 3) {
        // 请求发生错误时重试，最多可尝试 3 次
        retry();
      } else {
        // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
        // 必须调用其中一个才能继续错误处理。
        fail();
      }
    },
  });

  const handleUpdate = (test) => {
    console.log('handleUpdate:', test);
  };
</script>

<style lang="scss">
  .tabs {
    display: flex;
    align-items: center;

    .tab {
      width: 100px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid skyblue;
    }
  }

  .tab-content {
    background-color: beige;
  }

  .test-content {
    padding: 30px 0;
  }
</style>
