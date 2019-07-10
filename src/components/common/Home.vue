<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view ></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from './Tags.vue';
import bus from "./bus";
export default {
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  // computed:{
  //     key() {
  //     return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
  //   }
  // },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },
  // watch:{
  //           $route(to,from){
  //               console.log(from);
  //               // if (from.path == "/零钱提现") {
  //               //         this.renderData(this.$route.query.id)
  //               // }
  //           }
  // },
  activated () {
    // if (this.lastCity !== this.city) {
    //   this.lastCity = this.city
    //   this.getHomeInfo()
    // }
  }
};
</script>
