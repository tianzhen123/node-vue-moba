<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header">
        <span>请先登录</span>
      </div>
      <el-form :model="model" ref="form" @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" :min="1" :max="10" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login",this.model);
      localStorage.token = res.data.token; // 浏览器存储,下次打开页面还可以用
    //   sessionStorage.token = res.token; // 页面关闭就会失效
    this.$router.push('/');
    this.$message({
        type:'sucess',
        message: '登录成功'
    })
    }
  }
};
</script>
<style scoped>
.login-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>
