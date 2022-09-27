<template>
  注册
  <input v-model="userState.code" type="text" />
</template>

<script lang="ts" setup>
  interface UserInfo {
    account?: string;
    pwd?: string;
    code?: number;
  }
  const userState = reactive<UserInfo>({
    code: 100,
  });
</script>
