<template>
  <div class="show-text">
    <teleport to="body">
      <div class="fixed-msg"> 我是传送过来的数据 </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup></script>
<style>
  .fixed-msg {
    position: absolute;
    top: 0;
    right: 0;
    color: red;
  }
</style>
