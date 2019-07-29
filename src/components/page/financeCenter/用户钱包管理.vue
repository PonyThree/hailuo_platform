<template>
  <div id="userWallet">
    <!-- 财务信息 -->
    <el-row>
        <el-col :span="5">
            <div class="walletBorder active">
                零钱总充值<span>({{chargeMoneyCountTwo}})</span>
            </div>
        </el-col>
        <el-col :span="5">
            <div class="walletBorder">
                零钱总提现<span>({{cashMoneyCountTwo}})</span>
            </div>
        </el-col>
        <el-col :span="5">
            <div class="walletBorder">
                客户零钱总支出<span>({{useMoneyCountTwo}})</span>
            </div>
        </el-col>
        <el-col :span="5">
            <div class="walletBorder">
                项目总退款<span>({{refundMoneyCountTwo}})</span>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="walletBorder">
                平台钱包余额<span>({{balanceMoneyCountTwo}})</span>
            </div>
        </el-col>
    </el-row>
    <!-- 条件查询 -->
    <el-form :inline="true" :model="form" class="queryPiece">
        <el-form-item class="information">
            <el-input placeholder="请输入用户昵称/手机号码" v-model="form.input5" class="input-with-select">
                <el-select v-model="form.select" slot="prepend" placeholder="请选择">
                    <el-option label="手机号" value="0"></el-option>
                    <el-option label="昵称" value="1"></el-option>
                </el-select>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
        :data="tableData"
        border
        style="width: 94%">
        <el-table-column
        prop="number"
        label="序号"
        width="100"
        align='center'>
        <template slot-scope="scope">
            <div>
                <span>{{parseInt(scope.$index)+1}}</span>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        prop="userName"
        label="客户昵称"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="mobile"
        label="联系电话"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="withdraw"
        label="提现详情"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="withdraw(tableData[scope.$index].userId)" type="text" size="small" style='color:#409EFF;'>
                查看
                </el-button>
            </template>
        </el-table-column>
        <el-table-column
        prop="balance"
        label="钱包余额"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="operating"
        label="操作状态"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="details(tableData[scope.$index].userId)" type="text" size="small" style='color:#409EFF;'>
                查看
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="totalNum">
            总计：￥{{ moneyCount }}
    </div>
    <!--分页器-->
    <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pageSize" @current-change="currentChange" @size-change="sizeChange" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'userWalletManagement',
  data () {
      return {
        form: {},
        tableData: [],
        total:10,
        pageSize:10,
        currentPage:1,
        moneyCount: 0,
        //总余额
        balanceMoneyCountTwo:'',
        //提现
        cashMoneyCountTwo:'',
        //充值
        chargeMoneyCountTwo:'',
        //支出
        useMoneyCountTwo:'',
        //退款
        refundMoneyCountTwo:'',
      }
  },
  created(){
    //   列表数据加载
    this.renderData();
    //金额加载
    this.renderMoney();
  },
  methods: {
    onSubmit () {
        var obj={};
        if(this.form.select==0){
            obj.mobile=this.form.input5;
        }else{
            obj.userName=this.form.input5;
        }
        obj.page=this.currentPage;
        obj.pageSize=this.pageSize;
        this.$axios.get(request.testUrl+"/user/auth2/userMoney/listUserMoneyInfo",{
            params:obj
        }).then(res=>{
            this.tableData=res.data.data.records;
            this.total=res.data.data.total;
            this.moneyCount=res.data.data.records[0].moneyCount;
        })
    },
    totalNum () {
        this.tableData.forEach((item, index) => {
            this.tNums += parseInt(item.walletbalance)
        })
    },
    withdraw (userId) {
        this.$router.push({
            path:'/零钱提现',
            query:{
                userId:userId
            }
        });
    },
    details (userId) {
        this.$router.push({
            path:'/钱包使用详情',
            query:{
                userId:userId
            }
        });
    },
  
    //列表数据加载
    renderData(){
        this.$axios.get(request.testUrl+"/user/auth2/userMoney/listUserMoneyInfo",{
            params:{
                page:this.currentPage,
                pageSize:this.pageSize
            }
        }).then(res=>{
            if(res.data.data.records!=null){
                this.tableData=res.data.data.records;
                this.total=res.data.data.total;
            }else{
                this.$message({
                    type:'info',
                    message:'数据已经加载完毕'
                })
            }
            this.moneyCount=res.data.data.records[0].moneyCount;
        })
    },
    //金钱数据加载
    renderMoney(){
        this.$axios.get(request.testUrl+"/user/auth2/user/moneyStatistical").then(res=>{
            if(res.data.data!=null){
                this.balanceMoneyCountTwo=res.data.data.balanceMoneyCountTwo;
                this.cashMoneyCountTwo=res.data.data.cashMoneyCountTwo;
                this.chargeMoneyCountTwo=res.data.data.chargeMoneyCountTwo;
                this.useMoneyCountTwo=res.data.data.useMoneyCountTwo;
                this.refundMoneyCountTwo=res.data.data.refundMoneyCountTwo;
            }else{
                this.$message({
                    type:'info',
                    message:'金钱汇总暂时没有数据'
                })
            }
            
        })
    },
    currentChange(currentPage){
    // alert(currentPage);
    this.currentPage=currentPage;
    this.renderData();
    },
    sizeChange(pageSize){
        // alert(pageSize);
        this.pageSize=pageSize;
        this.renderData();
    },
  },

  mounted () {
     this.totalNum()
  },
  watch:{
      $route(to,from){
          console.log(to,from)
          
      }
  }
}
</script>

<style scoped>
    #userWallet {
        margin: 20px;
    }
    .walletBorder {
        width: 170px;
        height: 34px;
        line-height: 34px;
        border: 1px solid #199ED8;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    }
    .walletBorder span {
        color: #f00;
        padding-left: 5px;
    }
    .active{
        background-color: #0079FE;
        color: #fff;
    }
    .active span {
        color: #fff
    }
    .queryPiece {
        width: 94%;
        height: 55px;
        margin: 20px 0;
        padding-top: 20px;
        color: #fff;
        background-color: #199ED8;
    }
    .queryPiece .datePicker {
        width: 250px;
    }
    .totalNum {
        width: 94%;
        height: 49px;
        line-height: 50px;
        text-align: center;
        color: red;
        border: 1px solid #ebeef5;
        background: #f5f7fa;
    }
    .page{
        text-align: right;
        width: 93%;
        padding-left: 7px;
		margin-top:30px;
        /* background-color: #ff0; */
	}
    .information >>> .el-form-item__content {
        width:500px;
    }
    .information >>> .el-select--small {
       width:100px; 
    }
    #userWallet >>> .el-form-item__label {
        color: #fff;
    }
    #userWallet >>> .el-form-item--small.el-form-item {
        margin-bottom: 0;
        margin-left: 20px;
    }
</style>
