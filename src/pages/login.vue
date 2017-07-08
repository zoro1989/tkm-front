<template>
  <section id="login">
    <h1>登录</h1>
    <mu-text-field label="用户名" v-model="form.email" hintText="请输入账号" labelFloat></mu-text-field>
    <mu-text-field label="新密码" v-model="form.pswd" type="password" hintText="请输入密码" labelFloat></mu-text-field>
    <section class="rememberMe">
      <mu-checkbox label="记住我" v-model="isRememberMe"></mu-checkbox>
    </section>
    <section>
      <mu-raised-button label="登录"  @click="onSubmit" primary/>
      <mu-raised-button label="注册"  @click="onRegister" secondary/>
    </section>
  </section>
</template>
<script>
  import login from 'service/login'
  export default {
    data () {
      return {
        form: {
          email: '',
          pswd: '',
          rememberMe: ''
        },
        isRememberMe: []
      }
    },
    methods: {
      onSubmit () {
        if (this.isRememberMe.length > 0) {
          this.form.rememberMe = true
        } else {
          this.form.rememberMe = false
        }
        login.submitLogin.bind(this)({form: this.form}, (data) => {
          this.$message({
            message: data.resultData.resultMsg,
            type: 'success'
          })
          this.$router.replace('first')
        }, (err) => {
          this.$message.error(err)
        })
      },
      onRegister () {
        this.$router.replace('register')
      }
    }
  }
</script>
<style scoped>
  #login{
    width: 300px;
    margin: 0 auto;
  }
  #login .rememberMe{
    text-align: left;
  }
  #login .rememberMe .mu-checkbox{
    margin-left: 20px;
  }
</style>
