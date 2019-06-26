<template>
  <div id="walletDetails">
    <el-row>
      <el-col :span="24">
        <div class="info">
          <div class="header">
            <p>基本信息</p>
          </div>
          <el-row class="infoDetails">
            <el-col :span="8">
              <div class="infoDetailsdes">客户昵称：{{ userName }}</div>
            </el-col>
            <el-col :span="8">
              <div class="infoDetailsdes">联系电话：{{ mobile }}</div>
            </el-col>
            <el-col :span="8">
              <div class="infoDetailsdes">
                钱包余额：
                <span class="fontRed">￥{{ balance }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="info">
          <div class="header">
            <p>钱包交易订单详情</p>
          </div>
          <div style="height: 400px;overflow-y:auto;" class="stepsPadding">
            <el-steps direction="vertical" style>
              <el-step
                v-for="item in activities"
                :key="item.recordId"
                :description="desc(item)"
                style="font-size:16px;"
              >
                <!-- <template>
                               <div>
                                    <span>{{item.truckSpaceName}}---{{item.useForName}}{{item.useTime}}</span>
                               </div>
                </template>-->
              </el-step>
              <!-- <el-step description="A408车位——落位退款——2019-5-2 16:31:53——+￥2000.00"></el-step>
                        <el-step description="A401车位——落位——2019-5-2 16:31:53——-￥2000.00"></el-step>
              <el-step description="A402车位——认购——2019-5-2 16:31:53——-￥2000.00"></el-step>-->
            </el-steps>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="walletButton">
      <el-button type="primary">确定</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "walletDetails",
  data() {
    return {
      userId: this.$route.query.userId,
      userName: "",
      mobile: "",
      balance: "",
      activities: []
    };
  },
  created() {
    //数据加载
    this.renderData(this.$route.query.userId);
  },
  methods: {
    renderData(userId) {
      this.$axios
        .get(
          request.testUrl +
            "/user/auth2/userMoneyUseRecording/platformBalanceUseRecord",
          {
            params: {
              userId
            }
          }
        )
        .then(res => {
          console.log(res.data.data);
          this.activities = res.data.data;
          this.userName = res.data.data[0].userName;
          this.mobile = res.data.data[0].mobile;
          this.balance = res.data.data[0].balance;
        });
    },
    desc(item) {
      console.log(item.truckSpaceName);
      return (
        item.truckSpaceName +
        "------" +
        item.useForName +
        "------" +
        item.useTime +
        "------" +
        item.useMoney
      );
    }
  },
  watch: {
    $route(to, from) {
      if (from.path == "/用户钱包管理") {
        this.renderData(this.$route.query.userId);
      }
    }
  },
  computed: {}
};
</script>

<style scoped>
.info {
  width: 100%;
  height: auto;
  border: 1px solid #199ed8;
}
.header {
  width: 100%;
  height: 49px;
  line-height: 49px;
  color: #fff;
  background-color: #199ed8;
}
.header p {
  padding-left: 20px;
}
.fontRed {
  color: red;
}
.infoDetails {
  background-color: #fff;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 14px;
}
.stepsPadding {
  padding: 50px;
}
.infoDetailsdes {
  width: 70%;
  margin: 0 auto;
  text-align: left;
}
.walletButton {
  text-align: center;
}
#walletDetails >>> .is-text {
  width: 18px;
  height: 18px;
  margin-left: 3px;
  background: #c0c4cc;
}
#walletDetails >>> .el-row {
  padding-bottom: 40px;
}
#walletDetails >>> .el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  padding: 12px 30px;
}
</style>
