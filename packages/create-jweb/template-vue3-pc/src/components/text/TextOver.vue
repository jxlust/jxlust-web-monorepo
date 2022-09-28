<script lang="ts" setup>
  import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue';
  import './index.scss';
  interface MyProps {
    text?: string;
    msg?: string | number | boolean;
  }

  const props = withDefaults(defineProps<MyProps>(), {
    text: '默认值',
    msg: false,
  });

  const textItemRef = ref();
  const isMore = ref(false);
  const isOver = ref(false);
  const computeElementHeight = (el: HTMLElement) => {
    console.log('el:clientHeight:', el.clientHeight);
    console.log('el:scrollHeight:', el.scrollHeight);
    if (el.clientHeight < el.scrollHeight) {
      //不全溢出行数了
      isOver.value = true;
      isMore.value = false;
      let textContent = props.text;
      console.log('textconent:', textContent);
    } else {
      //显示全了
      isOver.value = false;
      isMore.value = false;
    }
  };
  const moreSwitchClick = () => {
    if (isOver.value) {
      isMore.value = !isMore.value;
    }
  };
  onMounted(() => {
    console.log('textItemRef:', textItemRef);
    computeElementHeight(textItemRef.value);
  });
</script>

<template>
  <div class="j-textwrapper">
    <div :class="['j-textwrapper__text', { more: isMore }]" ref="textItemRef">
      {{ text }}
      <div class="operate-line" v-if="isOver && isMore" @click="moreSwitchClick">
        <slot name="up">
          <el-icon>
            <ArrowUpBold color="red" />
          </el-icon>
        </slot>
      </div>
    </div>

    <div class="operate-fixed" v-if="isOver && !isMore" @click="moreSwitchClick">
      <slot name="down">
        <span class="text-ellipsis">...</span>
        <el-icon><ArrowDownBold color="red" /> </el-icon>
      </slot>
    </div>
  </div>
  <div class="margin"></div>
  <el-button type="primary">Primary</el-button>
</template>

<style lang="scss" scoped>
  .margin {
    color: red;
    position: relative;
  }
</style>
