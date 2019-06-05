<template>
  <div id="userWallet">
    <!-- 财务信息 -->
    <el-row>
        <el-col :span="5">
            <div class="walletBorder active">
                零钱总充值<span>(40.7万)</span>
            </div>
        </el-col>
        <el-col :span="5">
            <div class="walletBorder">
                零钱总提现<span>(-26.5万)</span>
            </div>
        </el-col>
        <el-col :span="5">
            <div class="walletBorder">
                客户零钱总支出<span>(-18.7万)</span>
            </div>
        </el-col>
        <el-col :span="5">
            <div class="walletBorder">
                项目总退款<span>(186.3万)</span>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="walletBorder">
                平台钱包余额<span>(186.5万)</span>
            </div>
        </el-col>
    </el-row>
    <!-- 条件查询 -->
    <el-form :inline="true" :model="form" class="queryPiece">
        <!-- <el-form-item label="交易时间">
            <el-date-picker
                v-model="form.dateStartEnd"
                type="daterange"
                class="datePicker"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2019-01-01">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="交易形式">
            <el-select v-model="form.transaction">
                <el-option label="全部" value="all"></el-option>
                <el-option label="零钱充值" value="recharge"></el-option>
                <el-option label="落位退款" value="refund"></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item class="information">
            <el-input placeholder="请输入用户昵称/手机号码" v-model="form.input5" class="input-with-select">
                <el-select v-model="form.select" slot="prepend" placeholder="请选择">
                    <el-option label="手机号" value="phone"></el-option>
                    <el-option label="昵称" value="nickname"></el-option>
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
        </el-table-column>
        <el-table-column
        prop="nickname"
        label="客户昵称"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="phone"
        label="联系电话"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="withdraw"
        label="提现详情"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="withdraw(scope.$index)" type="text" size="small" style='color:#409EFF;'>
                查看
                </el-button>
            </template>
        </el-table-column>
        <el-table-column
        prop="walletbalance"
        label="钱包余额"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="operating"
        label="操作状态"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="details(scope.$index)" type="text" size="small" style='color:#409EFF;'>
                查看
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="totalNum">
        总计：￥{{ tNums }}
    </div>
    <!--分页器-->
    <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'userWalletManagement',
  data () {
      return {
        form: {},
        tableData: [{
          number: '1',
          nickname: '王小虎',
          phone: '15800001234',
          withdraw: '查看',
          walletbalance: '2000.00',
          operating: '查看'
        },{
          number: '2',
          nickname: '王小虎',
          phone: '15800001234',
          withdraw: '查看',
          walletbalance: '2000.00',
          operating: '查看'
        },{
          number: '3',
          nickname: '王小虎',
          phone: '15800001234',
          withdraw: '查看',
          walletbalance: '2000.00',
          operating: '查看'
        }],
        total:1000,
        pagesize:10,
        currentPage:2,
        tNums: 0
      }
  },
  methods: {
    onSubmit () {
        alert('submit!');
    },
    totalNum () {
        this.tableData.forEach((item, index) => {
            this.tNums += parseInt(item.walletbalance)
        })
    },
    withdraw (index) {
        this.$router.push('/零钱提现');
    },
    details (index) {
        this.$router.push('/钱包使用详情');
    }
  },
  mounted () {
     this.totalNum()
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
