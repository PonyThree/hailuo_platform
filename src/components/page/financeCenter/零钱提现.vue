<template>
  <div id="moneyWithdraw">
    <!-- 条件查询 -->
    <el-form :inline="true" :model="form" class="queryPiece">
        <el-form-item label="交易时间">
            <el-date-picker
                v-model="form.dateStartEnd"
                type="daterange"
                class="datePicker"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2019-01-01">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
    <!-- 信息 -->
    <el-row>
        <el-col :span="24">
            <div class="clientInfo">
                <span>客户姓名：{{ customerName }}</span>
                <span>电话：{{ customerPhone }}</span>
            </div>
        </el-col>
    </el-row>
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
        prop="withdrawalTime"
        label="提现时间"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="walletbalance"
        label="钱包余额"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="amount"
        label="提现金额"
        align='center'>
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                    <span class="W-blue">{{ scope.row.amount }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="orderNumber"
        label="交易单号"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="address"
        label="到账地址"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="withdrawalDetails"
        label="提现详情"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="details(scope.$index)" type="text" size="small" v-if="scope.row.withdrawalDetails === 0">
                    查看
                </el-button>
                <el-button @click.native.prevent="details(scope.$index)" type="text" size="small" class="detaRed" v-else>
                    异常
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pagesize" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'moneyWithdraw',
  data () {
      return {
        form: {},
        tableData: [{
          number: '1',
          withdrawalTime: '2019-5-22',
          walletbalance: '2,000.00',
          amount: '2,000.00',
          orderNumber: '1234341',
          address: '微信',
          withdrawalDetails: 0
        }, {
          number: '2',
          withdrawalTime: '2019-5-22',
          walletbalance: '2,000.00',
          amount: '2,000.00',
          orderNumber: '1234341',
          address: '微信',
          withdrawalDetails: 1
        }, {
          number: '3',
          withdrawalTime: '2019-5-22',
          walletbalance: '2,000.00',
          amount: '2,000.00',
          orderNumber: '1234341',
          address: '微信',
          withdrawalDetails: 0
        }, {
          number: '4',
          withdrawalTime: '2019-5-22',
          walletbalance: '2,000.00',
          amount: '2,000.00',
          orderNumber: '1234341',
          address: '微信',
          withdrawalDetails: 1
        }],
        total:1000,
        pagesize:10,
        currentPage:2,
        tNums: 0,
        customerName: "内马尔",
        customerPhone: "13467731314"
      }
  },
  methods: {
    onSubmit () {
        alert('submit!');
    },
    details (index) {
        this.$router.push('/提现详情');
    }
  },
}
</script>

<style scoped>
    #moneyWithdraw {
        margin: 20px;
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
    .page{
		text-align: right;
        width: 93%;
        padding-left: 7px;
		margin-top:30px;
	}
    .detaRed {
        color: red
    }
    .clientInfo {
        text-align: center;
        margin: 20px 0 30px 0;
        width: 94%;
    }
    .clientInfo span {
        margin: 0 20px;
    }
    #moneyWithdraw >>> .el-form-item--small.el-form-item {
        margin-bottom: 0;
        margin-left: 20px;
    }
    #moneyWithdraw >>> .el-form-item__label {
        color: #fff;
    }
</style>
