<template>
  <div id="financeManagement">
    <!-- 财务信息 -->
    <el-row>
        <el-col :span="3">
            <div class="walletBorder active">
                落位总收入<span>({{lwMoney}}万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                认购总收入<span>({{rgMoney}}万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                落位总退款<span>({{tkMoney}}万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                商家已提现<span>({{xmProposed}}万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                商家可提现<span>({{xmCanPropos}}万)</span>
            </div>
        </el-col>
         <el-col :span="3">
            <div class="walletBorder">
                平台总收入<span>({{ptMoney}}万)</span>
            </div>
        </el-col>
        <el-col :span="3">
            <div class="walletBorder">
                平台余额<span>({{ptSurplusMoney}}万)</span>
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
        label="落位收入（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="rgMoney"
        label="认购收入(万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="tkMoney"
        label="所有退款（万元）"
        align='center'>
        </el-table-column>
        <el-table-column  label="平台总收入（万元）" align='center' prop="ptTolMoney">
            <template slot-scope="scope">
                <div>
                    <span>{{tableData[scope.$index].lwMoney+Number(tableData[scope.$index].rgMoney-Number(tableData[scope.$index].tkMoney))}}</span>
                    <!-- <span>{{ptTolMoney}}</span> -->
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="xmMoney"
        label="项目总收入（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="xmProposed"
        label="项目已提现（万元）"
        align='center'>
        </el-table-column>
        <el-table-column
        prop="xmCanPropos"
        label="项目可提现（万元）"
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
                <el-button @click.native.prevent="viewWithdrawal(tableData[scope.$index].paid)" type="text" size="small" style='color:#409EFF;' v-if="tableData[scope.$index].stype==0">
                    查看
                </el-button>
                <el-button type="text" size="small" style='color:#ccc;' v-else>
                    暂无
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
  name: 'financeManagement',
  data () {
      return {
        loading:false,
        form: {},
        tableData: [],
        tableData1: [],
        total:1000,
        pageSize:10,
        currentPage:1,
        tNums: 0,
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
        this.$axios.get(request.testUrl+"/finance/auth2/platformMoney/pageDate",{
            params:{
                current:this.currentPage,
                pageSize:this.pageSize

            }
        }).then(res=>{
            this.loading=true;
            setTimeout(()=>{
                this.loading=false;
                console.log(res.data.data.records);
                this.tableData=res.data.data.records;
                //计算落位总收入
                // this.tableData.forEach(item=>{
                    
                //     // console.log(item);
                //     this.lwTolMoney+=Number(item.lwMoney);
                //     this.rgTolMoney+=Number(item.rgMoney);
                //     this.tkTolMoney+=Number(item.tkMoney);
                //     this.proposedTol+=Number(item.xmProposed);
                //     this.canProposeTol+=Number(item.xmCanPropos);
                //     // tableData[scope.$index].lwMoney+tableData[scope.$index].rgMoney-tableData[scope.$index].tkMoney
                //     this.ptTolMoney+=Number(item.lwMoney)+Number(item.rgMoney)-Number(item.tkMoney);
                // })
                // this.ptBalance=Number(this.ptTolMoney)-Number(this.proposedTol);
            },1000)   
        })
    },
    //列表上金额统计数据加载
    renderMoney(){
        this.$axios.post(request.testUrl+"/finance/auth2/platformMoney/selPlaSumMoney")
        .then(res=>{
            // console.log(res.data.data);
            this.lwMoney=res.data.data.lwMoney;
            this.rgMoney=res.data.data.rgMoney;
            this.tkMoney=res.data.data.tkMoney;
            this.xmProposed=res.data.data.xmProposed;
            this.xmCanPropos=res.data.data.xmCanPropos;
            this.ptMoney=res.data.data.ptMoney;
            this.ptSurplusMoney=res.data.data.ptSurplusMoney;
        })
    },
    currentChange(currentPage){
        // alert(currentPage);
        this.currentPage=currentPage;
    },
    sizeChange(){
        // alert(pageSize);
        this.pageSize=pageSize;
    },
    //条件搜索
    onSubmit () {
        // alert('submit!');
        // alert(this.form.input5);
        if(!this.form.input5){
            this.$message({
                message:'请输入要查询的项目名称',
                type:'error'
            })
        }else{
            //条件搜索
            this.$axios.get(request.testUrl+"/finance/auth2/platformMoney/pageDate",{
                params:{
                    name:this.form.input5,
                    current:1,
                    pageSize:10
                }
            }).then(res=>{
                console.log(res.data.data.records)
                this.tableData=res.data.data.records;
                this.form.input5="";
            })
        }
        // alert(this.form.input5);
    },
    viewRecord (id) {
        // alert(id);
        this.$router.push({
            path: '/项目申请提现',
            query:{
                id: id
            }
        });
    },
    viewWithdrawal (id) {
        alert(id);
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
