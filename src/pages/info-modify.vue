<template>
  <section id="info-modify">
    <input type="hidden" v-model="form.id" />
    <mu-text-field label="昵称" v-model="form.nickname" labelFloat hintText="请输入昵称" ></mu-text-field>
    <mu-text-field label="Email（不准修改）" v-model="form.email" :disabled="true"></mu-text-field>
    <mu-raised-button label="确认修改"  @click="onSubmit" primary/>
  </section>
</template>

<script>
  import infoModify from 'service/info-modify'
  export default{
    created () {
      infoModify.get.bind(this)({}, (data) => {
        this.form.id = data.id
        this.form.nickname = data.nickname
        this.form.email = data.email
      }, (err) => {
        this.$message.error(err)
      })
    },
    data () {
      return {
        form: {
          id: '',
          nickname: '',
          email: ''
        }
      }
    },
    methods: {
      onSubmit () {
        infoModify.save.bind(this)({form: this.form}, (data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }, (err) => {
          this.$message.error(err)
        })
      }
    }
  }

</script>

<style scoped>
   #info-modify{
     width: 300px;
   }

</style>
