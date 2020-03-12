<template>
  <div id="moneyWithdraw">
    <!-- 条件查询 -->
    <el-form :inline="true" :model="form" class="queryPiece">
        <el-form-item label="交易时间" @blur="timeChange">
            <el-date-picker
                v-model="form.dateStartEnd"
                type="daterange"
                class="datePicker"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2019-01-01" format="yyyy-MM-dd">
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
                <span>客户姓名：{{ userName }}</span>
                <span>电话：{{ mobile }}</span>
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
        <template slot-scope="scope">
            <div>
                <span>{{(scope.$index)+1}}</span>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        prop="applyForTime"
        label="提现时间"
        align='center'>
        <!-- <template slot-scope="scope">
            <div>
                <span>{{time}}</span>
            </div>
        </template> -->
        </el-table-column>
        <el-table-column
        prop="balance"
        label="钱包余额"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="cashMoney"
        label="提现金额"
        align='center'>
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                    <span class="W-blue">{{ scope.row.cashMoney }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="orderNo"
        label="交易单号"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="arriveAddress"
        label="到账地址"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="withdrawalDetails"
        label="提现详情"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="details(tableData[scope.$index].recordId)" type="text" size="small" v-if="scope.row.status==1||scope.row.status==2">
                    查看
                </el-button>
                <el-button @click.native.prevent="details(tableData[scope.$index].recordId)" type="text" size="small" class="detaRed" v-if="scope.row.status==3">
                    异常
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pageSize" layout="total, sizes, prev, pager, next,jumper" :total="total" class='page' @current-change="currentChange" @size-change="sizeChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'moneyWithdraw',
  data () {
      return {
        time:'',
        //客户名称
        userName:'',
        //联系电话
        mobile:'',
        startTime:'',
        endTime:'',
        userId:this.$route.query.userId,
        form: {},
        tableData: [],
        total:100,
        pageSize:10,
        currentPage:1,
        tNums: 0,
      }
  },
  created(){
      this.renderData(this.$route.query.userId);
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
        // var h=t.getHours();
        // var m=t.getMinutes();
        // var s=t.getSeconds();
        // +"  "+this.addZero(h)+":"+this.addZero(m)+":"+this.addZero(s)
        return y+'-'+this.addZero(mon)+'-'+this.addZero(d);
    },
    onSubmit () {
        // alert('submit!');
        // console.log(this.form.dateStartEnd)
        var timeArr=this.form.dateStartEnd;
        this.startTime=this.transformDate(timeArr[0].getTime());
        this.endTime=this.transformDate(timeArr[1].getTime());
        // console.log(this.startTime+"---"+this.endTime);
        var obj={};
        obj.pageSize=this.pageSize;
        obj.page=this.currentPage;
        obj.userId=this.userId;
        if(this.startTime==this.endTime){
            obj.today=this.startTime;
        }else{
            obj.startTime=this.startTime;
            obj.endTime=this.endTime;
        }
        this.$axios.get(request.testUrl+"/user/auth2/userCashRecording/userCashRecordList",{
            params:obj
        }).then(res=>{
            // console.log(res.data.data.records);
            this.tableData=res.data.data.records;
        })
        
    },
    details (recordId) {
        this.$router.push({
            path:'/提现详情',
            query:{
                id:recordId
            }
        });
    },
    //加载数据
    renderData(userId){
        this.$axios.get(request.testUrl+"/user/auth2/userCashRecording/userCashRecordList",{
            params:{
                pageSize:this.pageSize,
                page:this.currentPage,
                userId:userId
            }
        }).then(res=>{
            // this.tableData.forEach(item=>{
            //     this.time=this.transformDate(item.applyForTime);
            // })
            this.total=res.data.data.total;
            if(res.data.data.records.length>=1){
                this.tableData=res.data.data.records;
                for(var i=0;i<res.data.data.records.length;i++){
                    if(res.data.data.records[i].applyForTime!=""){
                        this.tableData[i].applyForTime=this.transformDate(res.data.data.records[i].applyForTime);
                    }else{
                        this.tableData[i].applyForTime="";
                    }
                }
                // console.log(this.tableData);
                this.userName=res.data.data.records[0].userName;
                this.mobile=res.data.data.records[0].mobile;
            }else{
                this.$message({
                    type:'info',
                    message:'数据加载完毕'
                })
            }
            
            // this.tableData.time=res.data.data.records.applyForTime
        })
    },
    timeChange(){
        // console.log(this.startTime)
        // console.log(this.endTime)
    },
    currentChange(currentPage){
        // alert(currentPage);
        this.currentPage=currentPage;
        this.renderData();
    },
    sizeChange(){
        // alert(pageSize);
        this.pageSize=pageSize;
        this.renderData();
    },
  },
  watch:{
      $route(to,from){
        //   console.log(to);
        //   console.log(from.query.userId);
        if (from.path == "/用户钱包管理") {
            this.renderData(this.$route.query.userId);
        }
          
      }
  }
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
    .W-blue{
        color:#00f;
    }
</style>
