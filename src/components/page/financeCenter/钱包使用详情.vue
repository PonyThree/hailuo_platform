<template>
  <div id="walletDetails">
    <el-row>
        <el-col :span="24">
            <div class="info">
                <div class="header"><p>基本信息</p></div>
                <el-row class="infoDetails">
                    <el-col :span="8">
                        <div class="infoDetailsdes">客户昵称：{{ nickname }} </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="infoDetailsdes">联系电话：{{ phone }} </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="infoDetailsdes">钱包余额：<span class="fontRed">￥{{ money }}</span> </div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="info">
                <div class="header"><p>钱包交易订单详情</p></div>
                <div style="height: 400px;" class="stepsPadding">
                    <el-steps direction="vertical">
                        <el-step description="零钱充值——2019-5-2 16:31:53——+￥2000.00"></el-step>
                        <el-step description="A408车位——落位退款——2019-5-2 16:31:53——+￥2000.00"></el-step>
                        <el-step description="A401车位——落位——2019-5-2 16:31:53——-￥2000.00"></el-step>
                        <el-step description="A402车位——认购——2019-5-2 16:31:53——-￥2000.00"></el-step>
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
  name: 'walletDetails',
  data () {
      return {
        nickname: "neymar da silva",
        phone: "15800001234",
        money: "2000.00"
      }
  }
}
</script>

<style scoped>
    .info {
        width: 100%;
        height: auto;
        border: 1px solid #199ED8;
    }
    .header {
        width: 100%;
        height: 49px;
        line-height: 49px;
        color: #fff;
        background-color: #199ED8;
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
        background-color: #409EFF;
        border-color: #409EFF;
        padding: 12px 30px;
    }
</style>
