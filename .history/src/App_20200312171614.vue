<!--
 * @Author: your name
 * @Date: 2019-09-11 16:11:04
 * @LastEditTime: 2020-03-12 17:16:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \海螺平台github版本\src\App.vue
 -->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"> </router-view>
  </div>
</template>
<script>
// 解决刷新页面
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style>
@import "./assets/css/main.css";
/* @import "./assets/css/color-dark.css";     深色主题 */
@import "./assets/css/theme-green/color-green.css";
</style>