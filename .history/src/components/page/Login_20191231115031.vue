<template>
  <div class="login-wrap">
    <div class="login_box">
      <div class="ms-login">
        <div class="ms-title">欢迎登录</div>
        <p class="ms-tit">海螺找位项目端后台</p>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="ms-content"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              prefix-icon="el-icon-s-custom"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
          </el-form-item>
          <div class="login-btn" @click="submitForm('ruleForm')">
            <img src="../../assets/img/dl.png" />
          </div>
        </el-form>
      </div>
      <div class="login_right">
        <img src="../../assets/img/tu1.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    submitForm() {
      this.$axios
        .post(
          request.testUrl + "/auth/platform/login",
          JSON.stringify(this.ruleForm)
        )
        .then(res => {
          // console.log(res.headers.token);
          // console.log(res.data)
          var token = res.headers.token;
          if (res.data.code == 0) {
            var name = res.data.data.username;
            var id = res.data.data.id;
            localStorage.setItem("realname", res.data.data.realname);
            localStorage.setItem("name", name);
            localStorage.setItem("id", id);
            localStorage.setItem("token", token);
            this.$router.push({ path: "/Index" });
          } else {
            this.$message({
              type: "info",
              message: res.data.msg
            });
          }
        })
        .catch(res => {
          this.$message({
            type: "info",
            message: res.data.msg
          });
        });
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
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login_bg.png) no-repeat;
  background-color: #ccc;
  background-size: 100% 100%;
}
.login_box {
  position: fixed;
  width: 585px;
  height: 342px;
  top: 50%;
  left: 50%;
  min-width: 260px;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 27px 8px #c0c4cc;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  font-family: PingFang SC Heavy;
  font-size: 33px;
  margin: 30px 0px 0px 31px;
  color: rgba(51, 51, 51, 1);
  font-weight: 700;
}
.ms-tit {
  width: 178px;
  height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  margin: 4px 0px 0px 31px;
}
.ms-login {
  position: absolute;
  width: 262px;
  height: 343px;
  background: rgba(255, 255, 255, 0.8);
}
.ms-content {
  padding: 34px 30px;
}
.login-btn {
  width: 100%;
  height: 100%;
  text-align: center;
}
.login-btn img {
  width: 65px;
  height: 65px;
}
.login_right {
  width: 323px;
  height: 343px;
  position: absolute;
  top: -1px;
  right: 0px;
}
.login_right img {
  width: 100%;
  height: 100%;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus {
  border-color: #409eff;
}
.login-wrap >>> .el-input__inner {
  background-color: rgba(245, 245, 245, 1);
}
</style>