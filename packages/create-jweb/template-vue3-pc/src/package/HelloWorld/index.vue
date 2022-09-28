<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { v4 as uuidv4 } from 'uuid';
  import { useCounterStore } from '@/stores/counter';

  const uuid = uuidv4();
  const route = useRoute();
  console.log(route);
  withDefaults(defineProps<{ msg?: string }>(), {
    msg: 'default',
  });

  const counterStore = useCounterStore();

  const { count, doubleCount, testData } = storeToRefs(counterStore);
  // const { count, doubleCount } = counterStore;
  const { increment, getTestData } = counterStore;
  // with autocompletion ✨
  // counter.$patch({ count: counter.count + 1 });
  // or using an action instead
  setTimeout(() => {
    getTestData().then((data) => {
      console.log('data:', data);
    });
  }, 1000);

  const unsubscribe = counterStore.$onAction(
    ({
      name, // name of the action
      store, // store instance, same as `someStore`
      args, // array of parameters passed to the action
      after, // hook after the action returns or resolves
      onError, // hook if the action throws or rejects
    }) => {
      // a shared variable for this specific action call
      const startTime = Date.now();
      // this will trigger before an action on `store` is executed
      console.log(`Start "${name}" with params [${args.join(', ')}].store:${store}`);
      // this will trigger if the action succeeds and after it has fully run.
      // it waits for any returned promised
      after((result) => {
        console.log(`Finished "${name}" after ${Date.now() - startTime}ms.\nResult: ${result}.`);
      });
      // this will trigger if the action throws or returns a promise that rejects
      onError((error) => {
        console.warn(`Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`);
      });
    },
  );
</script>

<template>
  <div>
    <h1>{{ msg }} --- {{ route.path }}</h1>
    <div class="test">
      {{ count }} --- {{ doubleCount }}
      <button @click="increment">increment</button>
      <button @click="unsubscribe">unsubscribe</button>
    </div>
    <div class="test">{{ testData }}</div>

    <div>uuid:{{ uuid }}</div>
    <p>
      <router-link to="/vueApi">Go to Home</router-link>
      <router-link to="/test">Go to About</router-link>
    </p>
  </div>
</template>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
