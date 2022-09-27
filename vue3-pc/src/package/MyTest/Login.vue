<template>
  登陆 {{ msg }}
  <input v-model="userState.account" type="text" />
  <div @click="testClick">pluginData:{{ pluginData }}</div>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['update']);

  interface UserInfo {
    account?: string;
    pwd?: string;
    code?: number;
  }
  const pluginData = inject('pluginData');
  const globalProperties: any = getCurrentInstance()?.appContext.app.config.globalProperties;
  const msg = globalProperties.$translate('data.msg');
  const userState = reactive<UserInfo>({
    account: '',
  });
  const testClick = () => {
    emit('update', 123);
  };
  defineOptions({
    name: 'MyLogin',
  });
</script>
