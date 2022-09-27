<template>
  <div class="msg">{{ data }} ---- {{ rawData }}</div>
  <div class="content-wrapper">
    <div ref="htmlRef" :class="['content-html', { active: isExpand }]" v-html="htmlStr"></div>
    <iframe title="domChangeIframe" ref="myHackIframeRef" src="" frameborder="0"></iframe>

    <div :class="['content-mask', { none: isExpand }]" v-if="isOver">
      <div class="opt-area" @click="expandAll">{{ !isExpand ? '展开全部' : '收起部分' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { startObserverTarget,testValue } from './useMutation';
  import { data, updateData, rawData } from '@/hooks/useTest2';
  const htmlStr = ref<string>('我的内容');
  const htmlRef = ref();
  const isOver = ref(false);
  const isExpand = ref(false);
  const myHackIframeRef = ref();

  setTimeout(() => {
    updateData('1000');
    const arr: string[] = [];
    // for (let i = 0; i < 10; i++) {
    //   arr.push(`<p>内容啊的理解是否就是理解${i}</p>`);
    // }
    arr.push(
      `<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657375692&t=8e5e365f4ea9592f547f6c85934ebb56" alt="">`,
    );
    for (let i = 0; i < 10; i++) {
      arr.push(`<p>内容啊的理解是否就是理解${i}</p>`);
    }
    htmlStr.value = arr.join('');
  }, 2000);

  const computerHeight = () => {
    let htmlDom: HTMLElement = htmlRef.value;
    console.log('htmlDom cH:', htmlDom.clientHeight, ',htmlDom sH:', htmlDom.scrollHeight);
    if (htmlDom.clientHeight < htmlDom.scrollHeight) {
      //over height
      isOver.value = true;
    } else {
      isOver.value = false;
    }
  };
  const expandAll = () => {
    isExpand.value = !isExpand.value;
  };
  const iframeResizeChange = (e: any) => {
    console.log('iframe resize:', e);
    if (!isOver.value) {
      computerHeight();
    }
  };

  onMounted(() => {
    // computerHeight();
    myHackIframeRef.value.contentWindow.onresize = iframeResizeChange;
    // startObserverTarget(htmlRef.value)
  });
  watchEffect(
    () => {
      // if()
      console.log('htmlStr effect:', htmlStr.value);
      // computerHeight();
    },
    {
      flush: 'post',
    },
  );
</script>

<style lang="scss">
  .content-wrapper {
    width: 100vw;
    height: auto;
    position: relative;

    iframe {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      z-index: -1;
      opacity: 0;
      visibility: hidden;
    }
  }
  .content-html {
    width: 100%;
    max-height: 320px;
    overflow: hidden;
    &.active {
      max-height: initial;
      overflow: auto;
      transition: all 1s;
    }
  }
  .content-mask {
    height: 320px;
    position: absolute;
    bottom: 0px;
    z-index: 99;
    width: 100%;
    background-image: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 20%, transparent 100%);
    &.none {
      background-image: none;
      .opt-area {
        right: 10px;
        left: initial;
      }
    }
    .opt-area {
      position: absolute;
      z-index: 100;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      color: red;
      border: 1px solid red;
      border-radius: 4px;
      background-color: skyblue;
      padding: 2px 5px;
      cursor: pointer;
    }
  }
</style>
