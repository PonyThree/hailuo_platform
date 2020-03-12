<template>
  <div style="margin-top:30px;" class="box" v-loading="loadCoperationList">
    <!-- 合作项目展示 -->
    <div class="coperationPro">
      <div class="title">
        <p>前端已展示优质小区</p>
      </div>
      <div class="content">
        <div v-for="(item, index) in coperationList" :key="index" class="list">
          <div class="listItem">
            <div class="upLoad" @click="upLoad(item)">
              <img
                :src="item.joinHandsImage"
                alt="项目图片"
                v-if="item.joinHandsImage"
                style="width:130px;height:90px;overflow:hidden;"
              />
              <!-- <i class="el-icon-plus" v-else size="large" style="width:30px;height:30px;marin:0 auto;font-size:30px;color:#ccc;"></i> -->
            </div>
            <p class="pname">{{ item.name }}</p>
            <p class="address">
              {{ item.provinceName }}{{ item.cityName }}{{ item.countyName }}
            </p>
            <p v-show="1 == 2">{{ item.id }}</p>
          </div>
          <p
            @click="jumpPD1(index, item.id, item.frontShow, item.publishStatus)"
            class="showStyle"
            :style="{
              backgroundColor:
                item.publishStatus == 0 ? '#ccc' : 'rgb(64,159,255)'
            }"
          >
            {{ item.frontShow == 1 ? "不展示" : "展示" }}
          </p>
        </div>
      </div>
    </div>
    <!-- 已发布项目 -->
    <div class="publishPro">
      <div class="title">
        <p>已发布项目</p>
      </div>
      <div class="content">
        <div v-for="(item, index) in publishProject" :key="index" class="list">
          <div class="listItem">
            <div class="upLoad" @click="upLoad(item)">
              <img
                :src="item.joinHandsImage"
                alt="项目图片"
                v-if="item.joinHandsImage"
                style="width:130px;height:90px;overflow:hidden;"
              />
              <i
                class="el-icon-plus"
                v-else
                size="large"
                style="width:30px;height:30px;marin:0 auto;font-size:30px;color:#ccc;"
              ></i>
            </div>
            <p class="pname">{{ item.name }}</p>
            <p class="address">
              {{ item.provinceName }}{{ item.cityName }}{{ item.countyName }}
            </p>
            <p v-show="1 == 2">{{ item.id }}</p>
          </div>
          <p
            @click="jumpPD(index, item.id, item.frontShow, item.publishStatus)"
            class="showStyle"
            :style="{
              backgroundColor:
                item.publishStatus == 0 ? '#ccc' : 'rgb(64,159,255)'
            }"
          >
            {{ item.frontShow == 1 ? "不展示" : "展示" }}
          </p>
        </div>
      </div>
      <!--分页器-->
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next,jumper"
        :total="total"
        class="page"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <!-- 新增弹出框 -->
    <el-dialog
      title="图片上传:"
      :visible.sync="addVisible"
      width="20%"
      @close="insertClose"
    >
      <el-form
        ref="formList"
        :model="formList"
        label-width="80px"
        :label-position="labelPosition"
        :rules="rules"
      >
        <el-form-item label="" style="width:92%;" prop="image">
          <div
            style="width: 80%;height: 100px;display: block;float: left;position: relative;"
            id="aa"
          >
            <img
              :src="imgUrl"
              alt=""
              style="width: 280px;height: 110px;display: block;"
            />
            <img
              src="../../../assets/img/2.png"
              alt=""
              style="width:10%;height:25%;position: absolute; right:-26px;top:0px;"
              @click="show"
            />
          </div>

          <div
            style="position: relative;float:left;display: none;"
            class="22222"
            id="cc"
          >
            <el-upload
              action="auto"
              list-type="picture-card"
              :file-list="fileList"
              with-credentials
              :before-upload="beforeUpload"
              :http-request="uploadSectionFile"
              :on-remove="afterRemove"
              :on-exceed="handleExceed"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="formList.imgUrl" alt="" />
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <span slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                @click="addEdit('formList')"
                class="flag"
                >保存</el-button
              >
              <el-button @click="cancle('formList')">取 消</el-button>
            </span>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
// :show-file-list="false"
// :before-upload="beforeAvatarUpload"
// :on-success="handleAvatarSuccess"
export default {
  inject: ["reload"],
  data() {
    return {
      address: "",
      projectId: "",
      fileList: [],
      dialogVisible: false,
      addVisible: false,
      addVisible1: false,
      labelPosition: "top",
      formList: {
        imgUrl: ""
      },
      index: "",
      imgUrl:
        "https://china185.com/file/image/20190821/6e1cec7f4d0f4e19b590f36e42926632.blob",

      //查询的文本
      searchTxt: "",
      currentPage: 1,
      pageSize: 5,
      total: 100,
      loadCoperationList: false,
      //合作项目列表
      coperationList: [],
      //   已发布项目列表
      publishProject: [],
      rules: {
        href: { required: true, message: "请输入跳转链接", trigger: "blur" },
        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        description: [
          { required: true, message: "请输入图片描述", trigger: "blur" },
          {
            min: 1,
            max: 160,
            message: "长度在 1 到 160个字符",
            trigger: "blur"
          }
        ],
        sort: [
          { required: true, message: "请输入排序数字", trigger: "blur" }
          // { type: 'number', message: '排序必须为数字值',trigger:'blur'}
        ]
      }
    };
  },
  created() {
    this.renderData();
  },
  methods: {
    renderData() {
      this.loadCoperationList = true;
      var lock = setTimeout(() => {
        this.loadCoperationList = false;
        this.renderCoperation();
        this.renderUnShow();
        clearTimeout(lock);
      }, 1000);
    },
    insertClose() {
      this.reload();
    },
    //合作项目图片上传
    handleChange(files) {
      // console.log(files)
    },
    submit(index) {
      console.log(index);
    },
    renderOnePic(id) {
      var params = new URLSearchParams();
      params.append("projectId", id);
      this.$axios
        .post(
          request.testUrl +
            "/project/auth2/project/findJoinHandsImageByProjectId",
          params
        )
        .then(res => {
          if (res.data.code == 0) {
            // console.log(res.data.data)
            this.imgUrl =
              res.data.data.joinHandsImage ||
              "https://china185.com/file/image/20190821/6e1cec7f4d0f4e19b590f36e42926632.blob";
          }
        });
    },

    //图片上传加载弹窗
    upLoad(item) {
      this.addVisible = true;
      this.projectId = item.id;
      // console.log(this.projectId)
      this.renderOnePic(this.projectId);
    },
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
    //新增图片上传 formList
    beforeUpload(file) {
      console.log(file);
      var param = new FormData(); // FormData 对象
      param.append("file", file); // 文件对象
      this.$axios({
        method: "post",
        url: request.testUrl + "/project/auth2/image/upload",
        data: param
      })
        .then(res => {
          if (res.data.code == 0) {
            console.log(res.data.data);
            this.formList.imgUrl = res.data.data;
            this.$message({
              type: "info",
              message: "图片上传成功！"
            });
          }
        })
        .catch(error => {
          console.log(error);
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
      this.formList.imgUrl = "";
    },
    show() {
      document.getElementById("aa").style.display = "none";
      this.formList.imgUrl = "";
      this.imgUrl = "";
      document.getElementById("cc").style.display = "block";
      // console.log(this.formList.imgUrl)
    },
    //新增项目图片保存按钮
    addEdit(formList) {
      this.$refs.formList.validate(valid => {
        if (valid) {
          // this.formList={};
          this.addVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      var params = new URLSearchParams();
      console.log(this.formList.imgUrl);
      if (this.formList.imgUrl !== "") {
        params.append("joinHandsImage", this.formList.imgUrl);
      } else {
        if (this.formList.imgUrl == "" && this.imgUrl == "") {
          this.$message({
            type: "error",
            message: "请先上传一张图片"
          });
          return;
        } else if (this.formList.imgUrl == "" && this.imgUrl != "") {
          params.append("joinHandsImage", this.imgUrl);
        }
      }
      params.append("projectId", this.projectId);
      this.$axios
        .post(
          request.testUrl + "/project/auth2/project/addJoinHandsImage",
          params
        )
        .then(res => {
          if (res.data.code == 0) {
            this.addVisible = false;
            this.$message({
              type: "success",
              message: "上传成功"
            });
            this.reload();
          } else {
            this.$message({
              type: "error",
              message: res.data.msg
            });
          }
        });
    },
    // 新增取消按钮
    cancle() {
      this.addVisible = false;
      // this.$nextTick(()=>{
      // 	this.$refs.formList.resetFields();
      // })
      this.reload();
    },
    // 数据加载 合作项目方
    renderCoperation() {
      this.$axios
        .get(request.testUrl + "/project/auth2/project/findFrontShowProjects")
        .then(res => {
          this.loadCoperationList = true;
          this.coperationList = res.data.data;
        });
    },
    //未展示到前端的项目
    renderUnShow() {
      this.$axios
        .get(request.testUrl + "/project/auth2/project/findHasPublishProject", {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.publishProject = res.data.data.records;
          this.total = res.data.data.total;
        });
    },
    find() {
      this.$axios
        .get(request.testUrl + "/project/auth2/project/findHasPublishProject", {
          params: {
            projectName: this.searchTxt,
            page: this.currentPage,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.publishProject = res.data.data.records;
          this.total = res.data.data.total;
        });
    },
    //展示到小程序端
    jumpPD(i, id, frontShow, publishStatus) {
      // console.log(id+"-------"+frontShow);
      console.log(publishStatus);
      if (publishStatus == 0) {
        this.$message({
          message: "已下线的项目不能再被进行任何操作",
          type: "info"
        });
      } else {
        //判断是否上传了图片,没有上传进行提示上传图片
        console.log(typeof this.publishProject[i]);
        if (this.publishProject[i].joinHandsImage != "") {
          //不下线的项目才可以进行操作
          // if(frontShow==0){
          frontShow = 1;
          // }else{
          // frontShow=0;
          // }
          var params = new URLSearchParams();
          params.append("frontShow", frontShow);
          params.append("projectId", id);
          this.$axios
            .post(
              request.testUrl + "/project/auth2/project/updateFrontShow",
              params
            )
            .then(res => {
              console.log(res.data.data);
              this.renderUnShow();
              this.renderCoperation();
              this.reload();
            });
        } else {
          this.$message({
            type: "info",
            message: "请先上传合作项目图片"
          });
        }
      }
    },
    //不展示到前端
    jumpPD1(i, id, frontShow, publishStatus) {
      frontShow = 0;
      var params = new URLSearchParams();
      params.append("frontShow", frontShow);
      params.append("projectId", id);
      this.$axios
        .post(
          request.testUrl + "/project/auth2/project/updateFrontShow",
          params
        )
        .then(res => {
          console.log(res.data.data);
          this.renderUnShow();
          this.renderCoperation();
          this.reload();
        });
    },
    currentChange(currentPage) {
      // alert(currentPage);
      this.currentPage = currentPage;
      this.renderUnShow();
    },
    sizeChange(pageSize) {
      // alert(pageSize);
      this.pageSize = pageSize;
      this.renderUnShow();
    }
  }
};
</script>
<style scoped>
.el-button--primary {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.coperationPro {
  overflow: hidden;
  width: 69%;
  height: auto;
  border: 1px solid #bbb;
  margin-left: 40px;
  margin: 0 auto;
}
.title {
  overflow: hidden;
  width: 100%;
  height: 50px;
  background-color: rgb(25, 158, 216);
}
.title p {
  font-size: 14px;
  line-height: 50px;
  margin-left: 20px;
}
.content {
  width: 100%;
  height: auto;
  padding-bottom: 30px;
  overflow: hidden;
}
.publishPro {
  overflow: hidden;
  width: 69%;
  margin: 50px auto 0;
  border: 1px solid #bbb;
}
.publishPro .content {
  width: 100%;
  height: auto;
}
.content .list {
  /* background-color: pink; */
  float: left;
}
.content::after {
  display: block;
  content: "", clear：both;
}
.content .list {
  width: 140px;
  height: auto;
  overflow: hidden;
  /* border-radius:5px; */
  margin-left: 18px;
  margin-top: 20px;
  text-align: left;
}
.listItem {
  border: 1px solid #dcdfd6;
  width: 140px;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  padding-bottom: 6px;
  /* background-color: pink; */
}
.listItem p.pname {
  width: 80%;
  font-size: 16px;
  /* color:red; */
  margin: 6px auto;
}

.listItem p.address {
  width: 80%;
  font-size: 12px;
  /* color:green; */
  margin: 0 auto;
}
/* 图片上传样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.coperationPro[data-v-f331fdaa] .el-icon-plus.avatar-uploader-icon {
  position: absolute;
  left: -19px;
  right: 0px;
  top: 0px;
  bottom: 0;
  margin: auto;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.search {
  width: 100%;
  height: 36px;
  margin-top: 20px;
}
.search::after {
  display: block;
  clear: both;
  content: "";
}
.search button {
  float: right;
}
.search .searchIpt {
  float: right;
}
.showStyle {
  width: 84px;
  height: 21px;
  margin: 10px auto 0;
  text-align: center;
}
.upLoad {
  position: relative;
  width: 130px;
  height: 91px;
  margin: 6px auto;
  border: 1px dashed #ccc;
}
.flag {
  margin-left: 130px;
  margin-top: 20px;
}
/* 分页样式 */
.page {
  background-color: rgb(25, 158, 216);
  text-align: center;
  padding: 10px 0;
}
.box >>> .el-upload.el-upload--text {
  position: relative;
  width: 130px !important;
  height: 90px !important;
  margin-top: 6px;
  left: 5px;
  /* background-color: #afa; */
}
.box >>> .el-icon-plus.avatar-uploader-icon {
  position: absolute;
  left: -21px;
  right: 0;
  top: 4px;
  bottom: 0;
  margin: auto;
}
.upLoad >>> .el-icon-plus {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.box >>> .el-dialog.el-dialog--center {
  height: 386px;
}
</style>