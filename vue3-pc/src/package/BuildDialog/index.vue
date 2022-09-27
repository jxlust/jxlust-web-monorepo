<template>
  <div class="mask" @click="closeDialog" v-show="visible">
    <div class="dialog-container" @click.stop>
      <div class="dialog-header">
        {{ title }}
      </div>
      <div class="dialog-content"> 少时诵诗书所所 ---{{ text }} --- {{ pTitle }} </div>
      <div class="dialog-bottom">
        <button @click="cancelClick">取消</button>
        <button @click="sureClick">确定</button>
      </div>
      <div class="loading" v-if="loadingShow">loading...</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRefs } from 'vue';
  interface DialogInfo {
    pTitle?: string;
    text?: string;
    width?: number | string;
    height?: number | string;
  }
  const props = withDefaults(defineProps<DialogInfo>(), {
    pTitle: '提示',
  });
  type CallBackFnc = (data: any) => void;

  interface ConfigInfo {
    title: string;
    type?: string | number;
    sure?: any;
    close?: CallBackFnc;
    open?: CallBackFnc;
  }
  const dgState = reactive<ConfigInfo>({
    title: props.pTitle,
    close: undefined,
    sure: undefined,
  });

  const visible = ref(false);
  const loadingShow = ref(false);
  const emits = defineEmits(['close']);
  const open = () => {
    visible.value = true;
  };
  const getTestData = () => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve(123456789);
      }, 1000);
    });
  };
  const openDialog = async (config: any) => {
    // dgState.title = config.title;
    // open();
    dgState.sure = config.sure;
    loadingShow.value = true;
    let ret = await getTestData();
    dgState.title = `${config.title}---${ret}`;
    loadingShow.value = false;
  };
  const closeDialog = () => {
    visible.value = false;
    emits('close', true);
  };
  const cancelClick = () => {
    visible.value = false;
  };
  const sureClick = () => {
    visible.value = false;
    dgState?.sure && dgState?.sure(100000);
  };

  const { title } = toRefs(dgState);
  defineExpose({
    openDialog,
    closeDialog,
    open,
  });
</script>

<style>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }

  .dialog-container {
    width: 200px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 99;
  }

  .dialog-header {
    display: flex;
    font-size: 16px;
    color: #333;
    height: 50px;
    align-items: center;
  }
</style>
