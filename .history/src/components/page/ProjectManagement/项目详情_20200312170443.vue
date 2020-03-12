<template>
  <div>
    <h2>项目详情</h2>
    <div class="container">
      <!-- <div class='content1 content'>
                <div class="text">账号密码</div>
            </div> -->
      <!-- 基本信息 -->
      <div class="content2 content">
        <div class="text">基本信息</div>
        <el-form
          ref="form"
          :data="form.projectInfoVo"
          label-width="120px"
          size="mini"
        >
          <el-form-item prop="name" label="项目名称:">
            <!-- <el-input v-model='form.projectName' style='width:360px;'></el-input> -->
            <span>{{ form.projectInfoVo.name }}</span>
          </el-form-item>
          <el-form-item prop="address" label="项目地址:">
            <template>
              <span>{{ form.projectInfoVo.address }}</span>
            </template>
          </el-form-item>
          <el-form-item prop="qrCode" label="推广活动二维码:" class="qrCode">
            <template>
              <div>
                <img
                  :src="form.projectInfoVo.qrCodeUrl"
                  alt="二维码"
                  class="codePic"
                />
                <a
                  @click.prevent="downLoad(form.projectInfoVo.qrCodeUrl)"
                  class="down"
                  >下载</a
                >
              </div>
            </template>
          </el-form-item>
          <el-form-item
            prop="accountName"
            label="收款账号名称:"
            class="receiptAccount"
          >
            <span>{{ form.projectInfoVo.accountName }}</span>
          </el-form-item>
        </el-form>
      </div>
      <!-- 项目banner -->
      <div class="content content3">
        <div class="text">项目banner</div>
        <el-table :data="bannerTable" v-if="bannerTable.length >= 1">
          <el-table-column prop="" label="序号" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="imgUrl"
            label="图片"
            width="320px"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <span v-show='false'>{{scope.$index}}</span>
                            <span>{{bannerTable[scope.$index].bannerPic}}</span> -->
              <!-- <image :src='bannerTable[scope.$index].bannerPic'></image> -->
              <img
                :src="bannerTable[scope.$index].imgUrl"
                alt=""
                style="width:200px;height:100px;"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="href"
            label="跳转链接设置"
            width="220px"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <span @click='jump(bannerTable[scope.$index].href)'>{{bannerTable[scope.$index].href}}</span> -->
              <span>{{ bannerTable[scope.$index].href }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="图片描述"
            width="160px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="sort" label="排序值" align="center">
          </el-table-column>
          <!-- <el-table-column prop='operation' label='操作'>
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="update(scope.$index, bannerTable[scope.$index])"  size="small" style='color:#00f;' type='text'>
                            修改
                            </el-button>
                            <el-button
                            @click.native.prevent="deletePicInfo(scope.$index, bannerTable[scope.$index])"
                            size="small" style='color:#00f;' type='text'>
                            删除
                            </el-button>
					    </template>
                    </el-table-column> -->
        </el-table>
        <!--分页器-->
        <el-pagination
          background
          :current-page="currentPage"
          :page-sizes="[5, 10, 15]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next,jumper"
          :total="total"
          class="page"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
      <!-- 小区详情 -->
      <div class="content content4">
        <div class="text">小区详情</div>
        <el-form ref="form" :data="form.districtVo">
          <el-row>
            <el-col :span="8">
              <el-form-item label="全部车位:" prop="parkNum">
                <span>{{ form.districtVo.surplusTruckSpace }}个</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="全部业主:" prop="noBuy">
                <span>{{ form.districtVo.ownerNobuy }}位</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="车位配比:" prop="parkRatio">
                <span
                  >{{ form.districtVo.compareA }}：{{
                    form.districtVo.compareB
                  }}个</span
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            v-for="(domain, index) in form.districtVo.policyList"
            :key="index"
            :prop="'telPhoneList.' + index + '.telPhone'"
            :label="'小区政策' + (index + 1) + ':'"
            style="width: 60%;margin-bottom: 0;margin-left:56px;margin-top:20px;"
            label-width="180px"
          >
            <template>
              <div>
                <el-input v-model="domain.policy" :disabled="true">{{
                  domain.policy
                }}</el-input>
              </div>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <!-- 项目介绍 -->
      <div class="content content5">
        <div class="text">项目介绍</div>
        <el-form :data="form.activityInfoList">
          <el-form-item
            style="width: 80%;display:flex;justify-content:center;"
            v-for="(domains, index) in form.activityInfoList"
            inline-message
            :key="index"
          >
            <span style="margin-right:25px;"
              >{{ index + 1 }}.{{ domains.linkName }}</span
            >
            <span v-show="1 == 2">{{ domains.content }}</span>
            <img
              :src="domains.image"
              alt=""
              style="width:200px;height:90px;overflow:hidden;margin:0 25px;"
            />
            <el-button
              type="primary"
              size="mini"
              @click="find(domains.content)"
              style="margin-left:10px;display:inline;"
              >查看</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 项目开盘 -->
      <div class="content content6">
        <div class="text">项目开盘控制</div>
        <el-form ref="form.controllRespDto" :data="form.controllRespDto">
          <el-form-item label="当前状态:">
            <span>{{
              form.controllRespDto.openQuotation == 1 ? "已开盘" : "未开盘"
            }}</span>
          </el-form-item>
          <el-form-item label="开盘时间">
            <el-date-picker
              v-model="form.controllRespDto.startTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              :disabled="true"
            ></el-date-picker>
            <span style="margin:0 20px;">~</span>
            <el-date-picker
              v-model="form.controllRespDto.endTime"
              btype="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              :disabled="true"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <!-- 项目落位 -->
      <div class="content content6">
        <div class="text">项目落位控制</div>
        <el-form
          :data="form.controllRespDto"
          ref="form.controllRespDto"
          label-width="120px"
        >
          <el-form-item label="请设置落位金:" prop="downMoney">
            <span>{{ form.controllRespDto.downMoney }}</span>
            <span>元</span>
          </el-form-item>
          <el-form-item label="可落位开始时间:" inline-message>
            <template>
              <div>
                <el-date-picker
                  label-width="120px"
                  v-model="form.controllRespDto.downStartTime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                  :disabled="true"
                ></el-date-picker>
                <span style="margin:0 5px;">~</span>
                <el-date-picker
                  label-width="120px"
                  v-model="form.controllRespDto.downEndTime"
                  btype="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                  :disabled="true"
                ></el-date-picker>
              </div>
            </template>
          </el-form-item>
          <el-row>
            <el-col :span="6">
              <el-form-item>
                <el-checkbox
                  v-model="downDelOrderCheBox"
                  @change="change1"
                  :disabled="true"
                  >允许落位后取消订单</el-checkbox
                >
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="parkNum">
                <template>
                  <div class="luoweiCondition">
                    &nbsp;&nbsp;&nbsp;&nbsp;一个人可落<span
                      style="margin:0 5px;"
                      >{{ form.controllRespDto.downCarspaceNum }}</span
                    >个位&nbsp;&nbsp;&nbsp;&nbsp; 一个人车位可落<span
                      style="margin:0 5px;"
                      >{{ form.controllRespDto.downLimitNum }}</span
                    >个人
                  </div>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="timing" style="color:#606266">
                落位后，可认购时间开始计时，若超过
                <span>{{ form.controllRespDto.downExpireTime }}</span>
                秒后未认购，则取消落位订单
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 项目认购 -->
      <div class="content content7">
        <div class="text">项目认购控制</div>
        <el-form>
          <el-form-item label="请设置认购金:" prop="subscriptionFee">
            <!-- <el-input v-model='form.controllRespDto.buyMoney' style='width:100px'></el-input>元 -->
            <span>{{ form.controllRespDto.buyMoney }} 元</span>
          </el-form-item>
          <el-row>
            <el-form-item label="可认购开始时间:">
              <template>
                <div>
                  <el-date-picker
                    v-model="form.controllRespDto.buyStartTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp"
                    :disabled="true"
                  ></el-date-picker>
                  <span style="margin:0 5px;">~</span>
                  <el-date-picker
                    v-model="form.controllRespDto.buyEndTime"
                    btype="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp"
                    :disabled="true"
                  ></el-date-picker>
                </div>
              </template>
            </el-form-item>
            <!-- <el-form-item prop='openProjectStatus'>
                            <el-checkbox v-model="form.controllRespDto.openProjectStatus" :checked="form.controllRespDto.openProjectStatus" :disabled="true">与开盘时间一致</el-checkbox>
                        </el-form-item> -->
          </el-row>
        </el-form>
      </div>
      <!-- 展示信息 -->
      <div class="content content8">
        <div class="text">展示信息</div>
        <el-form :data="form.noticeRespDto.services" label-width="100px">
          <el-form-item
            style="margin-left:-111px;"
            v-if="form.noticeRespDto.services.length >= 1"
          >
            <el-row
              v-for="(item, index) in form.noticeRespDto.services"
              :key="index"
            >
              <el-col :span="12">
                <el-form-item label="客服名称:" prop="name">
                  <span>{{ item.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客服电话:" prop="mobile">
                  <span>{{ item.mobile }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item prop="notice" label="项目公告：">
            <span>{{ form.noticeRespDto.notice }}</span>
          </el-form-item>
        </el-form>
      </div>
      <!-- 置业顾问 -->
      <div class="content content9">
        <div class="text">置业顾问管理</div>
        <!--新增成员-->
        <!--表格列表-->
        <el-table
          :data="form.consultantVo"
          border
          style="width:36%;margin:0 auto;display:block"
        >
          <el-table-column prop="num" label="序号" align="center" width="100">
            <template scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="置业顾问名称"
            align="center"
            width="266"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
      <el-button
        type="primary"
        style="margin:0 auto;"
        class="goBack"
        size="middle"
        @click="goBack"
        >返回</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      downOrder: false,
      id: this.$route.query.id,
      dialogVisible: false,
      fileList: [],
      revise: false,
      downDelOrderCheBox: false,
      form: {
        //基本信息
        projectInfoVo: {},
        // 小区详情
        districtVo: {},
        //置业顾问
        consultantVo: [],
        // 展示信息
        noticeRespDto: {
          //联系人 电话
          services: [],
          notice: ""
        },
        // 项目介绍
        activityInfoList: [],
        // 控制
        controllRespDto: {}
      },
      //获取当前日期时间
      currentTime: "",
      num: 0,
      currentPage: 1,
      pageSize: 6,
      total: 100,
      bannerTable: []
    };
  },

  created() {
    this.renderData();
  },
  mounted() {},
  methods: {
    // 初始数据渲染
    renderData() {
      this.$axios
        .get(request.testUrl + "/project/auth2/project/selectProjectInfo", {
          params: {
            projectId: this.id
          }
        })
        .then(res => {
          // console.log(res.data.data);
          if (res.data.data.projectInfoVo != null) {
            //项目基本信息
            this.form.projectInfoVo = res.data.data.projectInfoVo;
          }
          //当数据不为null时 才加载数据
          if (res.data.data.districtVo != null) {
            // 小区政策
            this.form.districtVo = res.data.data.districtVo;
          }

          if (res.data.data.consultantVo.length >= 1) {
            // 置业顾问
            this.form.consultantVo = res.data.data.consultantVo;
          }
          if (res.data.data.noticeRespDto != null) {
            //展示信息
            this.form.noticeRespDto = res.data.data.noticeRespDto;
          }
          if (res.data.data.activityInfoList.length >= 1) {
            // 项目介绍
            this.form.activityInfoList = res.data.data.activityInfoList;
          }
          if (res.data.data.controllRespDto != null) {
            //控制 //落位控制是否取消订单
            if (res.data.data.controllRespDto.downDelOrder == 1) {
              this.downDelOrderCheBox = true;
            } else {
              this.downDelOrderCheBox = false;
            }
            // console.log(this.downDelOrderCheBox);
            //认购控制 与开盘时间是否一致
            if (res.data.data.controllRespDto.openProjectStatus == 1) {
              this.form.controllRespDto = res.data.data.controllRespDto;
              this.form.controllRespDto.buyStartTime =
                res.data.data.controllRespDto.startTime;
              this.form.controllRespDto.buyEndTime =
                res.data.data.controllRespDto.endTime;
            } else {
              //不一致 自定义的时间
              this.form.controllRespDto = res.data.data.controllRespDto;
              this.form.controllRespDto.buyStartTime =
                res.data.data.controllRespDto.buyStartTime;
              this.form.controllRespDto.buyStartTime =
                res.data.data.controllRespDto.buyEndTime;
            }
            //落位控制 是否与开盘时间一致
            if (res.data.data.controllRespDto.buyFollowOpen == 1) {
              this.form.controllRespDto.downStartTime =
                res.data.data.controllRespDto.startTime;
              this.form.controllRespDto.downEndTime =
                res.data.data.controllRespDto.endTime;
            } else {
              //不一致 自定义的时间
              this.form.controllRespDto = res.data.data.controllRespDto;
              this.form.controllRespDto.downStartTime =
                res.data.data.controllRespDto.downStartTime;
              this.form.controllRespDto.downEndTime =
                res.data.data.controllRespDto.downEndTime;
            }
            //是否开盘 状态判断
            this.form.controllRespDto.openQuotation =
              res.data.data.projectInfoVo.openStatus;
          }
          // 项目banner
          this.$axios
            .get(request.testUrl + "/project/auth2/banner/pageSelect", {
              params: {
                projectId: this.id,
                page: this.currentPage,
                pageSize: this.pageSize
              }
            })
            .then(res => {
              if (res.data.code == 0) {
                this.total = res.data.data.total;
                this.bannerTable = res.data.data.records;
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
              // console.log(res.data.data.records)
            });
        });
    },
    //下载
    downLoad(qrCodeUrl) {
      window.location.href =
        request.testUrl + "/project/image/downloadFile?fileUrl=" + qrCodeUrl;
    },
    // 落位取消订单
    change1(val) {
      // alert(val);
    },
    // sizeChange(pageSize){
    //     this.pageSize=pageSize;
    //     this.renderData();
    // },
    //分页控制
    currentChange(currentPage) {
      this.currentPage = currentPage;
      // 项目banner
      this.$axios
        .get(request.testUrl + "/project/auth2/banner/pageSelect", {
          params: {
            projectId: this.id,
            page: this.currentPage,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          if (res.data.data.records.length >= 1) {
            this.bannerTable = res.data.data.records;
          } else {
            this.$message({
              message: "数据已经加载完毕了",
              type: "info"
            });
          }
        });
    },
    update(i) {
      this.revise = true;
    },
    deletePicInfo(i) {
      this.bannerTable.splice(i, 1);
    },
    //增加提示
    addpromptList() {
      this.form.finanPolicy.push({});
      this.num = this.form.finanPolicy.length - 1;
    },
    //删除
    deletepromptList(item) {
      var index = this.form.finanPolicy.indexOf(item);
      if (index !== -1) {
        this.form.finanPolicy.splice(index, 1);
      }
      this.num = this.form.finanPolicy.length - 1;
    },
    //查看详情
    find(jumpUrl) {
      window.location.href = jumpUrl;
    },
    jump(url) {},
    goBack() {
      this.$router.go(-1);
    },
    saveInfo() {
      this.revise = false;
    },
    deletInfo() {
      this.revise = false;
    },
    show() {
      (document.getElementById("aa").style.display = "none"),
        (document.getElementById("cc").style.display = "block");
    },
    //新增图片上传
    //上传前的限制
    uploadSectionFile(param) {
      let fileObj = param.file;

      const isLt2M = fileObj.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return;
      }
      if (fileObj.type === "image/jpeg") {
        this.uploadFile = new File([fileObj], new Date().getTime() + ".jpg", {
          type: "image/jpeg"
        });
      } else if (fileObj.type === "image/png") {
        this.uploadFile = new File([fileObj], new Date().getTime() + ".png", {
          type: "image/png"
        });
      } else {
        this.$message.error("只能上传jpg/png文件");
        return;
      }
    },
    //图片上传
    beforeUpload(file) {
      var param = new FormData(); // FormData 对象
      param.append("file", file); // 文件对象
      this.$axios({
        method: "post",
        url: request.testUrl + "/image/upload",
        data: param
      })
        .then(res => {
          if (res.data.code == 0) {
            this.formList.imgUrl = res.data.data;
            this.$message({
              type: "info",
              message: "图片上传成功！"
            });
          }
        })
        .catch(error => {
          //console.log(error)
        });
    },
    //限制上传个数
    handleExceed(files, fileList) {
      this.$message({
        type: "info",
        message: "只能上传一张图片！"
      });
    },
    //已有的图片删除
    afterRemove(file, fileList) {
      this.$message({
        type: "info",
        message: "已删除原有图片",
        duration: 6000
      });
    }
  }
};
</script>
<style  scoped>
h2 {
  margin-bottom: 20px;
}
.container {
  /* width:100%; */
  margin-top: 40px;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  /* background-color: pink; */
}
.content {
  border: 1px solid #eee;
  margin-bottom: 30px;
  height: auto;
  overflow: hidden;
  border: 1px solid #eee;
}
/* .content1{
        background-color: pink;
    }
    .content2{
        margin-bottom:30px;
        border:1px solid #eee;
    } */
.info {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.text {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: rgb(243, 243, 243);
  margin-bottom: 40px;
  color: #000;
  font-size: 18px;
  letter-spacing: 2px;
  text-indent: 16px;
}
/* .el-button:focus, .el-button:hover {
	    color: #fff;
	    border-color: #999999;
	    background-color: #999999;
    } */
form {
  display: block;
  width: 600px;
  height: auto;
  /* background-color: #ff0; */
  margin: 0 auto;
}

.qrCode {
  margin-left: 40px;
}
.codePic {
  width: 80px;
  height: 80px;
  border: 1px solid #999;
  float: left;
  margin-right: 20px;
}
.down {
  color: cadetblue;
  font-size: 14px;
  margin-left: 20px;
  margin-top: 40px;
  display: inline-block;
}
.down:active {
  color: rgb(50, 65, 87);
}
.down:hover {
  cursor: pointer;
}
.receiptAccount {
  margin-left: 24px;
}
.content3 .el-table {
  border: 1px solid #409eff;
  display: block;
  width: 1026px;
  height: auto;
  /* background-color: pink; */
  margin: 0 auto;
}
.page {
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  margin: 30px auto 0;
  padding: 10px 298px 0 0;
  height: 48px;
  background-color: rgb(25, 158, 216);
}
/* 添加减少符号样式 */
.use {
  display: inline-block;
  /* width:30px;
        height:30px; */
  font-size: 26px;
  /* margin-top:3px; */
  margin-left: 10px;
  color: #ccc;
  line-height: 20px;
  vertical-align: middle;
}
.el-button--primary {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.luoweiCondition {
  display: inline-block;
  font-size: 14px;
  color: #606266;
}
.goBack {
  display: block;
  margin: 0 auto;
}
.datePicker {
  width: 250px;
}
.content9 {
  padding-bottom: 40px;
}
</style>