<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#87ceff"
      text-color="#ffffff"
      active-text-color="#ff0"
      router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon" style='color:#9400D3;padding-right:10px;'></i>
              <span slot="title" style="font-size: 18px;">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                style="padding-left: 50px;"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title" style="font-size: 18px;">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    //判断projectId是否为-1，如果为-1时，侧边导航加上账号管理，如果不为-1,不加上账号管理
    var projectId = localStorage.getItem("projectId");
    var subs = [
      {
        index: "项目管理",
        title: "项目管理"
      },
      // {
      //   index:"项目详情",
      //   title: "项目详情"
      // }
    ];
    // if (projectId == "-1") {
    //   subs.push({
    //     index: "account",
    //     title: "账号管理"
    //   });
    //   subs.push({
    //     index: "traffic",
    //     title: "流量统计"
    //   });
    // }
    return {
      collapse: false,
      items: [
        {
          icon: "iconfont icon-xiangmu",
          index: "1",
          title: "项目管理",
          subs: subs
        },
        {
          icon: "iconfont icon-ren",
          index: "2",
          title: "个人中心",
          subs: [
            {
              index: "设置",
              title: "设置"
            }
          ]
        },
        {
          icon: "iconfont icon-kehuduanguanli",
          index: "3",
          title: "客户端管理",
          subs: [
            {
              index: "首页banner",
              title: "首页banner"
            },
            {
              index: "客户端管理",
              title: "客户端管理"
            },
            {
              index: "合作项目",
              title: "合作项目"
            }
          ]
        },
        {
          icon: "iconfont icon-quyuguanli",
          index: "4",
          title: "区域管理",
          subs: [
            {
              index: "城市管理",
              title: "城市管理"
            },
          ]
        },
       
        {
          icon: "iconfont icon-caiwu",
          index: "5",
          title: "财务中心",
          subs: [
             {
              index: "用户钱包管理",
              title: "用户钱包管理"
            },
            {
              index: "项目财务管理",
              title: "项目财务管理"
            }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  // watch:{
  //           $route(to,from){
  //               console.log(from);
  //               // if (from.path == "/零钱提现") {
  //               //         this.renderData(this.$route.query.id)
  //               // }
  //           }
  // },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.sidebar > ul {
  height: 80%;
}
.el-menu-item.is-active{
    background: rgb(240,240,240)!important;
    color: #000!important;  
}
</style>
