<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">海螺找位平台端</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号">
            <el-button slot="prepend">
              <i class="iconfont icon-zhanghao"></i>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend">
              <i class="iconfont icon-mima"></i>
            </el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </div>
      </el-form>
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
      // console.log(JSON.stringify(this.ruleForm));
      // /auth/platform/login
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
  background: url(../../assets/img/park.jpg) no-repeat;
  background-color: #ccc;
  background-size: 100% 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 25px;
  margin-top: 20px;
  color: #409eff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  overflow: hidden;
}
.ms-content {
  padding: 20px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
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
</style>