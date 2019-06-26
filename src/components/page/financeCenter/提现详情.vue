<template>
  <div id="walletDetails">
    <el-row>
        <el-col :span="24">
            <div class="info">
                <div class="header"><p>基本信息</p></div>
                <el-row class="infoDetails">
                    <el-col :span="8">
                        <div class="infoDetailsdes">客户昵称：{{ userName }}</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="infoDetailsdes">联系电话：{{ mobile }}</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="infoDetailsdes">提现金额：<span class="fontRed">￥{{ cashMoney }}</span></div>
                    </el-col>
                </el-row>
                <el-row class="infoDetails">
                    <el-col :span="8">
                        <div class="infoDetailsdes">支付流水号：{{ payForWater }}</div>
                    </el-col>
                    <el-col :span="8" v-if="arriveAddress">
                        <div class="infoDetailsdes">提现到账：{{ arriveAddress }}</div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="info">
                <div class="header"><p>钱包提现交易详情</p></div>
                <div style="height: 400px;" class="stepsPadding">
                    <el-steps direction="vertical">
                        <el-step :title="showTitle()" :description="desc()" v-if="status==1||status==2"></el-step>
                        <el-step  :description="errDesc()" v-if="status==3"></el-step>
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
        id:this.$route.query.id,
        userName: "",
        mobile: "",
        cashMoney: "",
        payForWater: "",
        arriveAddress: "",
        //提现状态
        status:'',
        //提现申请时间
        applyForTime:'',
        //提现状态
        statusName:'',
        //提现账户
        arriveAddress:'',
        //提现到账时间
        arriveTime:'',

      }
  },
  created(){
    //   console.log(this.id);
      this.renderData(this.$route.query.id);
  },
  methods:{
      renderData(id){
          this.$axios.get(request.testUrl+"/user/auth2/userCashRecording/userCashRecordInfo",{
              params:{
                  id:id
              }
          }).then(res=>{
              console.log(res.data.data);
              this.userName=res.data.data.userName;
              this.mobile=res.data.data.mobile;
              this.cashMoney=res.data.data.cashMoney;
              this.payForWater=res.data.data.payForWater;
              this.arriveAddress=res.data.data.arriveAddress;
              this.status=res.data.data.status;
              this.applyForTime=res.data.data.applyForTime;
              this.statusName=res.data.data.statusName;
              this.arriveAddress=res.data.data.arriveAddress;
              this.arriveTime=res.data.data.arriveTime;
              console.log(this.status);
          })
      },
    addZero(n){
        return n<10? '0'+n :n;
    },
    // 时间戳转时间函数
    transformDate(time){
        var t=new Date(time);
        var y=t.getFullYear();
        var mon=t.getMonth()+1;
        var d=t.getDate();
        // var h=t.getHours();
        // var m=t.getMinutes();
        // var s=t.getSeconds();
        // +"  "+this.addZero(h)+":"+this.addZero(m)+":"+this.addZero(s)
        return y+'-'+this.addZero(mon)+'-'+this.addZero(d);
    },
    desc(){
        return "提现申请时间"+"-------"+this.transformDate(this.applyForTime)+"-------"+"提现状态"+"-------"+this.statusName+"------"+"提现到账时间"+"------"+this.transformDate(this.arriveTime);
    },
    errDesc(){
        return "提现申请时间"+"------"+this.transformDate(this.applyForTime)+"-------"+"提现状态"+"-------"+this.statusName;
    },
    showTitle(){
        return "提现账户"+"------"+this.arriveAddress;
    },
    
  },
  watch:{
      $route(to,from){
          console.log(from);
          if (from.path == "/零钱提现") {
                this.renderData(this.$route.query.id)
          }
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
