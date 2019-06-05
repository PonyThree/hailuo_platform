<template>
  <div id="walletDetails">
    <el-row>
        <el-col :span="24">
            <div class="info">
                <div class="header"><p>提现审核表</p></div>
                <el-row class="infoDetails">
                    <el-col :span="8">
                        <div class="infoDetailsdes">项目名称：{{ projectName }}</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="infoDetailsdes">申请人：{{ applicant }}</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="infoDetailsdes">联系电话：{{ phone }}</div>
                    </el-col>
                </el-row>
                <el-row class="infoDetails">
                    <el-col :span="8">
                        <div class="infoDetailsdes">可提现金额（元）：<span class="fontRed">{{ cashWithdrawal }}</span></div>
                    </el-col>
                    <el-col :span="8">
                        <div class="infoDetailsdes">申请提现金额（元）：<span class="fontRed">{{ applyCashWithdrawal }}</span></div>
                    </el-col>
                    <el-col :span="8">
                        <div class="infoDetailsdes">到账地址：{{ arrival }}</div>
                    </el-col>
                </el-row>
                <el-row class="infoDetails">
                    <el-col :span="24">
                        <div class="infoRemarks">备注：{{ remarks }}</div>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
    <!-- 0:待审核   1：已驳回   2：已审核 -->
    <el-row class="walletButton" v-if="this.status === 0">
        <el-button type="primary" @click="handClickDetermine">确定</el-button>
        <el-button @click="handClickReject">驳回</el-button>
        <el-button @click="handClickCancel">取消</el-button>
    </el-row>
    <el-row class="walletButton" v-else-if="this.status === 1">
        <el-button type="info" disabled>已驳回</el-button>
        <el-button @click="handClickModify">修改</el-button>
    </el-row>
    <el-row class="walletButton" v-else-if="this.status === 2">
        <el-button type="primary" disabled>已审核</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'walletDetails',
  data () {
    return {
        projectName: "东方大厦",
        applicant: "neymar da silva",
        phone: "15800001234",
        cashWithdrawal: "2000.00",
        applyCashWithdrawal: "2000.00",
        arrival: "财务通13134543113445533",
        remarks: "我是一个备注",
        status: 0
    }
  },
  methods: {
      handClickDetermine () {
        this.$confirm('是否确定审核通过?', '审核状态', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$message({
                type: 'success',
                message: '审核通过!'
            });
            this.status = 2
        }).catch(() => {
            this.$message({
                type: 'warning',
                message: '取消审核'
            });      
        });
      },
      handClickReject () {
        this.$confirm('是否驳回审核?', '审核状态', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$message({
                type: 'success',
                message: '驳回通过!'
            });
            this.status = 1
        }).catch(() => {
            this.$message({
                type: 'warning',
                message: '取消驳回'
            });      
        });
      },
      handClickCancel () {
        this.$router.go(-1)
      },
      handClickModify () {
        this.$confirm('是否修改?', '审核状态', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.status = 0
        }).catch(() => {
            this.$message({
                type: 'warning',
                message: '取消修改'
            });      
        });
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
    .infoRemarks {
        width: 90%;
        margin: 0 auto;
        text-align: left;
    }
    .walletButton {
        text-align: center;
    }
    .walletButton button {
        padding: 12px 30px;
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
    }
</style>
