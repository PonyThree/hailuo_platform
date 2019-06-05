<template>
  <div id="financeManagement">
    <!-- 财务信息 -->
    <el-row>
        <el-col :span="3">
            <div class="walletBorder active">
                落位总收入<span>(40.7万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                认购总收入<span>(-26.5万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                落位总退款<span>(-18.7万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                商家已提现<span>(186.3万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                商家可提现<span>(186.5万)</span>
            </div>
        </el-col>
         <el-col :span="3">
            <div class="walletBorder">
                平台总收入<span>(186.3万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                平台余额<span>(186.5万)</span>
            </div>
        </el-col>
    </el-row>
    <!-- 条件查询 -->
    <el-form :inline="true" :model="form" class="queryPiece">
        <el-form-item class="information">
            <el-input placeholder="请输入项目名称" v-model="form.input5"></el-input>
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
        prop="projectName"
        label="项目名称"
        width="100"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="region"
        label="区域"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="fallingIncome"
        label="落位收入（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="subscriptionIncome"
        label="认购收入(万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="fallbackRefund"
        label="所有退款（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="platformRevenue"
        label="平台总收入（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="projectIncome"
        label="项目总收入（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="beenWithdrawn"
        label="项目已提现（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="beWithdrawn"
        label="项目可提现（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="withdrawalsRecord"
        label="提现记录"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="viewRecord(scope.row.id)" type="text" size="small" style='color:#409EFF;'>
                查看
                </el-button>
            </template>
        </el-table-column>
        <el-table-column
        prop="withdrawalApplication"
        label="提现申请"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="viewWithdrawal(scope.row.id)" type="text" size="small" style='color:#409EFF;' v-if="scope.row.withdrawalApplication === 0">
                    查看
                </el-button>
                <el-button type="text" size="small" style='color:#ccc;' v-else>
                    暂无
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
  name: 'financeManagement',
  data () {
      return {
        form: {},
        tableData: [{
          id: '156486',
          projectName: '蓝湖郡',
          region: '重庆',
          fallingIncome: '200',
          subscriptionIncome: '123',
          fallbackRefund: '210',
          platformRevenue: '1344',
          projectIncome: '1234',
          beenWithdrawn: '456',
          beWithdrawn: '111',
          withdrawalsRecord: 0,
          withdrawalApplication: 0
        }, {
          id: '54815',
          projectName: '迪拜大楼',
          region: '迪拜',
          fallingIncome: '200',
          subscriptionIncome: '123',
          fallbackRefund: '210',
          platformRevenue: '1344',
          projectIncome: '1234',
          beenWithdrawn: '456',
          beWithdrawn: '111',
          withdrawalsRecord: 0,
          withdrawalApplication: 1
        }, {
          id: '54468489',
          projectName: '来福士',
          region: '重庆',
          fallingIncome: '200',
          subscriptionIncome: '123',
          fallbackRefund: '210',
          platformRevenue: '1344',
          projectIncome: '1234',
          beenWithdrawn: '456',
          beWithdrawn: '111',
          withdrawalsRecord: 0,
          withdrawalApplication: 0
        }],
        total:1000,
        pagesize:10,
        currentPage:2,
        tNums: 0
      }
  },
  methods: {
    onSubmit () {
        // alert('submit!');
        // alert(this.form.input5);
        if(!this.form.input5){
            this.$message({
                message:'请输入要查询的项目名称',
                type:'error'
            })
        }
        alert(this.form.input5);
    },
    viewRecord (id) {
        this.$router.push({
            path: '/项目申请提现',
            query:{
                id: id
            }
        });
    },
    viewWithdrawal (id) {
        this.$router.push({
            path: '/审核提现',
            query:{
                id: id
            }
        });
    },
    // search(){
    //     alert(form.input5);
    // }
  }
}
</script>

<style scoped>
    #financeManagement {
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
    #financeManagement >>> .el-form-item__label {
        color: #fff;
    }
    #financeManagement >>> .el-form-item--small.el-form-item {
        margin-bottom: 0;
        margin-left: 20px;
    }
</style>
