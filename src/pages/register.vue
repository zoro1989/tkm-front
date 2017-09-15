<template>
  <section id="login">
    <h1>注册</h1>
    <mu-text-field label="姓名" v-model="form.nickname" hintText="请输入姓名" labelFloat></mu-text-field>
    <mu-text-field label="用户名" v-model="form.username" hintText="请输入邮件地址" labelFloat></mu-text-field>
    <mu-text-field label="密码" v-model="form.password" type="password" hintText="请输入密码" labelFloat></mu-text-field>
    <mu-text-field label="密码" type="password" hintText="请再次输入密码" labelFloat></mu-text-field>
    <section>
      <mu-text-field label="验证码" v-model="form.vcode" hintText="请输入验证码" labelFloat></mu-text-field>
      <img :src="vcodeurl" @click="changeVCode"/>
    </section>
    <section>
      <mu-raised-button label="注册"  @click="onRegister" secondary/>
      <mu-raised-button label="登录"  @click="onSubmit" primary/>
    </section>
  </section>
</template>
<script>
  import register from 'service/register'
  export default {
    data () {
      return {
        form: {
          nickname: '',
          username: '',
          password: '',
          vcode: ''
        },
        vcodeurl: ''
      }
    },
    methods: {
      onSubmit () {
        this.$router.replace('login')
      },
      onRegister () {
        register.submitRegister.bind(this)({form: this.form}, (data) => {
          this.$message({
            message: data.message,
            type: 'success'
          })
          this.$router.replace('member-list')
        }, (err) => {
          this.$message.error(err)
        })
      },
      changeVCode () {
        register.changeVCode.bind(this)({}, (data) => {
          this.vcodeurl = data
        }, (err) => {
          this.$message.error(err)
        })
      }
    }
  }
</script>
<style scoped>
  #login{
    width: 300px;
    margin: 0 auto;
  }
</style>
