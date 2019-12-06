<template>
  <div id="financeManagement">
    <!-- 财务信息 -->
    <el-row>
        <el-col :span="3">
            <div class="walletBorder active">
                落位总收入<span>({{lwMoney}})</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                认购总收入<span>({{rgMoney}})</span>
            </div>
        </el-col>
        <!-- <el-col :span="3">
            <div class="walletBorder">
                总退款<span>({{tkMoney}})</span>
            </div>
        </el-col> -->
        <el-col :span="3">
            <div class="walletBorder">
                商家已提现<span>({{xmProposed}})</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                商家可提现<span>({{xmCanPropos}})</span>
            </div>
        </el-col>
         <el-col :span="3">
            <div class="walletBorder">
                平台总收入<span>({{ptMoney}})</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                平台余额<span>({{ptSurplusMoney}})</span>
            </div>
        </el-col>
    </el-row>
    <!-- 条件查询 -->
    <el-form :inline="true" :model="form" class="queryPiece" >
        <el-form-item style="float:right">
            <el-button @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item class="information" style="float:right">
            <el-input placeholder="请输入项目名称" v-model="form.input5"></el-input>
        </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
        :data="tableData"
        border
        style="width: 94%" v-loading="loading">
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
        prop="lwMoney"
        label="落位收入（元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="rgMoney"
        label="认购收入(元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="tkMoney"
        label="所有退款（元）"
        align='center'>
        </el-table-column>
        <el-table-column  label="平台总收入（元）" align='center' prop="ptMoney">
        </el-table-column>
        <el-table-column
        prop="ptMoney"
        label="项目总收入（元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="xmProposed"
        label="项目已提现（元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="xmCanPropos"
        label="项目可提现（元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="withdrawalsRecord"
        label="提现记录"
        align='center'>
            <template slot-scope="scope">
                <el-button @click.native.prevent="viewRecord(tableData[scope.$index].projectId)" type="text" size="small" style='color:#409EFF;'>
                查看
                </el-button>
            </template>
        </el-table-column>
        <el-table-column
        prop="withdrawalApplication"
        label="提现申请"
        align='center'>
            <template slot-scope="scope">
                <el-button  type="text" size="small"  style='color:#ccc;' v-if="tableData[scope.$index].stype==0">
                    暂无
                </el-button>
                <el-button type="text" size="small" style='color:#409EFF;' v-else @click.native.prevent="viewWithdrawal(tableData[scope.$index].appId)">
                    查看
                </el-button>
            </template>
        </el-table-column>
        
    </el-table>
    <!--分页器-->
    <el-pagination background  :current-page='currentPage' :page-sizes="[5, 10, 15]" :page-size="pageSize" :total="total" layout="total, sizes, prev, pager, next,jumper"  class='page' @size-change="sizeChange" @current-change="currentChange"> 
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'financeManagement',
  data () {
      return {
        loading:false,
        form: {},
        tableData: [],
        tableData1: [],
        total:0,
        pageSize:5,
        currentPage:1,
        tNums: 0,
        appId:'',
        //落位总收入
        lwMoney:0,
        //认购总收入
        rgMoney:0,
        //落位总退款
        tkMoney:0,
        //商家已提现
        xmProposed:0,
        //可提现
        xmCanPropos:0,
        //平台总收入
        ptMoney:0,
        //平台余额
        ptSurplusMoney:0
      }
  },
  created(){
      this.renderDate();
      this.renderMoney();
  },
  methods: {
    // 渲染项目财务管理表数据
    renderDate(){
        var params=new URLSearchParams();
        params.append('currntPage',this.currentPage)
        params.append('pageSize',this.pageSize)
        this.$axios.post(request.testUrl+"/order/auth2/orderForm/getPlaSumData",params).then(res=>{
            if(res.data.code==0){
                    this.loading=true;
                    var lock=setTimeout(()=>{
                    this.loading=false;
                    this.total=res.data.data.total;
                    if(res.data.data!=null){
                        if(res.data.data.records!=null){
                            this.tableData=res.data.data.records;
                            clearTimeout(lock)
                        }else{
                            this.$message({
                                type:'info',
                                message:'数据已经加载完毕'
                            })
                        }
                    }
                },1000)   
            }   
        })
    },
    //列表上金额统计数据加载
    renderMoney(){
        this.$axios(
            {
                method:'post',
                url:request.testUrl+'/order/auth2/orderForm/titleSunMoneyResp',
                // data:{}
            }
        ).then(res=>{
            if(res.data.code==0){
                if(res.data.data!=null){
                    this.lwMoney=res.data.data.lwMoney;
                    this.rgMoney=res.data.data.rgMoney;
                    this.tkMoney=res.data.data.tkMoney;
                    this.xmProposed=res.data.data.xmProposed;
                    this.xmCanPropos=res.data.data.xmCanPropos;
                    this.ptMoney=res.data.data.ptMoney;
                    this.ptSurplusMoney=res.data.data.ptSurplusMoney;
                }else{
                    this.$message({
                        type:'info',
                        message:'暂时没有数据'
                    })
                }
            }else{
                this.$message({
                    type:'error',
                    message:res.data.msg
                })
            }
        })
    },
    currentChange(currentPage){
        this.currentPage=currentPage;
        this.renderDate();
    },
    sizeChange(pageSize){
        this.pageSize=pageSize;
        this.renderDate();
    },
    //条件搜索
    onSubmit () {
        if(!this.form.input5){
            this.$message({
                message:'请输入要查询的项目名称',
                type:'error'
            })
        }else{
            //条件搜索
            var params=new URLSearchParams();
            params.append('currntPage',1)
            params.append('pageSize',this.pageSize)
            if(this.form.input5!=''){
                params.append('name',this.form.input5)
            }
            this.$axios.post(request.testUrl+"/order/auth2/orderForm/getPlaSumData",params).then(res=>{
                // console.log(res.data.data.records)
                if(res.data.code==0){
                    this.total=res.data.data.total;
                    this.tableData=res.data.data.records;
                    this.form.input5="";
                }else{
                    this.$message({
                        type:'error',
                        message:res.data.msg
                    })
                }
                
            })
        }
    },
    // 提现详情到项目申请提现 projectId
    viewRecord (id) {
        this.$router.push({
            path: '/项目申请提现',
            query:{
                id: id
            }
        });
    },
    //提现申请记录到审核提现 appId
    viewWithdrawal (id) {
        this.$router.push({
            path: '/审核提现',
            query:{
                id: id
            }
        });
    },
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
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #409EFF;
        color: #fff;
    }
    .el-pager li.active {
        color: #409EFF;
        cursor: default;
    }
</style>
