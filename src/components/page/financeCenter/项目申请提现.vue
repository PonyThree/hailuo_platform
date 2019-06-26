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
                default-value="2019-01-01" format="yyyy 年 MM 月 dd 日" value-format="timestamp" @blur="getTime" style="width:500px;">
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
        style="width: 94%" v-loading="loading">
        <el-table-column
        prop="applicationList"
        label="申请列表"
        width="100"
        align='center'>
        <template slot-scope="scope">
            <div>
                <span>{{(scope.$index)+1}}</span>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        prop="applicant"
        label="申请人"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="applicantPhone"
        label="联系电话"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="申请时间"
        align='center'>
            <!-- <template slot-scope="scope">
                <div>
                    <span>{{createTime}}</span>
                </div>
            </template> -->
        </el-table-column>
        <el-table-column
        prop="canOutMoney"
        label="可提现金额"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="outMoney"
        label="申请提现金额（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="accountName"
        label="到账地址"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="account"
        label="收款账号"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="modifyTime"
        label="审核时间"
        align='center'>
            <!-- <template slot-scope="scope">
                <div>
                    <span>{{modifyTime}}</span>
                </div>
            </template> -->
        </el-table-column>
        <el-table-column
        prop="status"
        label="审核状态"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="review(scope.row.id)" type="text" size="small" style='color:#409EFF;' v-if="scope.row.status === 0">
                    待审核
                </el-button>
                <el-button @click.native.prevent="audited(scope.row.id)" type="text" size="small" style='color:#409EFF;' v-else-if="scope.row.status === 1">
                    已审核
                </el-button>
                <el-button @click.native.prevent="dismissed(scope.row.id)" type="text" size="small" style='color:#409EFF;' v-else-if="scope.row.status === 2">
                    已驳回
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pageSize" @current-change="currentChange" @size-change="sizeChange" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page'>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'applicationWithdrawal',
  data () {
      return {
        loading:false,
        form: {},
        tableData: [],
        total:1000,
        pageSize:10,
        currentPage:1,
        tNums: 0,
        id:this.$route.query.id,
        //查询开始时间
        staTime:'',
        //查询结束时间
        endTime:''
      }
  },
  created(){
      this.renderTable();
  },
  methods: {
    addZero(n){
    return n<10? '0'+n :n;
    },
    // 时间戳转时间函数
    transformDate(time){
        var t=new Date(time);
        var y=t.getFullYear();
        var mon=t.getMonth()+1;
        var d=t.getDate();
        var h=t.getHours();
        var m=t.getMinutes();
        var s=t.getSeconds();
        return y+'-'+this.addZero(mon)+'-'+this.addZero(d)+"  "+this.addZero(h)+":"+this.addZero(m)+":"+this.addZero(s);
    },
    //提现列表加载
    renderTable(){
        // alert(this.id);
        this.$axios.post(request.testUrl+"/finance/auth2/applyMoney/getPageByPlatfrom",JSON.stringify({
            projectId:this.id,
            pageSize:this.pageSize,
            current:this.currentPage
        })).then(res=>{
            // console.log(res.data.data.records);
            res.data.data.records.forEach(item=>{
                item.createTime=this.transformDate(item.createTime)
                item.modifyTime=this.transformDate(item.modifyTime)
            })
            this.tableData=res.data.data.records;
        })
    },
    getTime(){
        this.staTime=this.form.dateStartEnd[0];
        this.endTime=this.form.dateStartEnd[1];
        console.log(this.staTime,this.endTime);
       
    },
    onSubmit () {
        // alert('submit!');
        this.$axios.post(request.testUrl+"/finance/auth2/applyMoney/getPageByPlatfrom",JSON.stringify({
            projectId:this.id,
            current:this.currentPage,
            pageSize:this.pageSize,
            staTime:this.staTime,
            endTime:this.endTime
        })).then(res=>{
            // console.log(res.data.data.records);
            this.tableData=res.data.data.records;
        })
    },
    
    review (id) {
        // alert(id);
        this.$router.push({
            path: '/审核提现',
            query:{
                id: id
            }
        });
    },
    audited (id) {
        // alert(id);
        this.$router.push({
            path: '/审核状态',
            query:{
                id: id
            }
        });
    },
    dismissed (id) {
        // alert(id);
        this.$router.push({
            path: '/审核状态',
            query:{
                id: id
            }
        });
    },
    currentChange(currentPage){
        // alert(currentPage);
        this.currentPage=currentPage;
    },
    sizeChange(){
        // alert(pageSize);
        this.pageSize=pageSize;
    },
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
