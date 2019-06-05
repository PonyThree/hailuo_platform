<template>
  <div id="applicationWithdrawal">
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
    <el-row>
        <el-col :span="24">
            <div class="tableHead">
                东方大厦
            </div>
        </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
        :data="tableData"
        border
        style="width: 94%">
        <el-table-column
        prop="applicationList"
        label="申请列表"
        width="100"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="applicant"
        label="申请人"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="contactNumber"
        label="联系电话"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="applicationTime"
        label="申请时间"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="withdrawalAmount"
        label="可提现金额"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="cashWithdrawal"
        label="申请提现金额（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="address"
        label="到账地址"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="collectionAccount"
        label="收款账号"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="reviewTime"
        label="审核时间"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="approvalStatus"
        label="审核状态"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="review(scope.row.id)" type="text" size="small" style='color:#409EFF;' v-if="scope.row.approvalStatus === 0">
                    待审核
                </el-button>
                <el-button @click.native.prevent="audited(scope.row.id)" type="text" size="small" style='color:#409EFF;' v-else-if="scope.row.approvalStatus === 1">
                    已审核
                </el-button>
                <el-button @click.native.prevent="dismissed(scope.row.id)" type="text" size="small" style='color:#409EFF;' v-else-if="scope.row.approvalStatus === 2">
                    已驳回
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
  name: 'applicationWithdrawal',
  data () {
      return {
        form: {},
        tableData: [{
          id: "156465",
          applicationList: '1',
          applicant: 'neymar da silva',
          contactNumber: '12346774144',
          applicationTime: '2019-5-2 18:29:54',
          withdrawalAmount: '17.6',
          cashWithdrawal: '12',
          address: '财互通',
          collectionAccount: '1565346567673131',
          reviewTime: '2019-5-2 18:28:08',
          approvalStatus: 0,
          remarks: '我是一个有意思的备注',
          status: 0
        }, {
          id: "456465",
          applicationList: '2',
          applicant: 'kaka',
          contactNumber: '12346774144',
          applicationTime: '2019-5-2 18:29:54',
          withdrawalAmount: '17.6',
          cashWithdrawal: '12',
          address: '支付宝',
          collectionAccount: '1565346567673131',
          reviewTime: '2019-5-2 18:28:08',
          approvalStatus: 1,
          remarks: '我是一个有意思的备注',
          status: 2
        }, {
          id: "423165",
          applicationList: '3',
          applicant: 'wulei',
          contactNumber: '12346774144',
          applicationTime: '2019-5-2 18:29:54',
          withdrawalAmount: '17.6',
          cashWithdrawal: '12',
          address: '微信',
          collectionAccount: '1565346567673131',
          reviewTime: '2019-5-2 18:28:08',
          approvalStatus: 2,
          remarks: '我是一个有意思的备注',
          status: 1
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
    review (id) {
        this.$router.push({
            path: '/审核提现',
            query:{
                id: id
            }
        });
    },
    audited (id) {
        this.$router.push({
            path: '/审核提现',
            query:{
                id: id
            }
        });
    },
    dismissed (id) {
        this.$router.push({
            path: '/审核提现',
            query:{
                id: id
            }
        });
    }
  }
}
</script>

<style scoped>
    #applicationWithdrawal {
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
    .tableHead {
        width: 94%;
        height: 50px;
        line-height: 50px;
        margin: 20px 0 0 0;
        text-align: center;
        color: #fff;
        background-color: #199ED8;
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
    #applicationWithdrawal >>> .el-form-item__label {
        color: #fff;
    }
    #applicationWithdrawal >>> .el-form-item--small.el-form-item {
        margin-bottom: 0;
        margin-left: 20px;
    }
</style>
