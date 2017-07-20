<template>
  <section id="message-push">
    <input type="hidden" v-model="form.id" />
    <mu-text-field label="推送标题" v-model="form.pushTitle" labelFloat hintText="请输入推送标题" ></mu-text-field>
    <mu-text-field label="推送内容" v-model="form.pushContent" labelFloat hintText="请输入推送内容" ></mu-text-field>
    <mu-text-field label="推送tag" v-model="form.pushTag" labelFloat hintText="推送tag" ></mu-text-field>
    <mu-text-field label="推送Alias" v-model="form.pushAlias" labelFloat hintText="推送Alias" ></mu-text-field>
    <section class="button-group">
      <mu-raised-button label="确认修改"  @click="onSubmit" primary/>
    </section>
  </section>
</template>

<script>
  import messagePush from 'service/message-push'
  export default{
    data () {
      return {
        form: {
          pushTitle: '',
          pushContent: '',
          pushTag: '',
          pushAlias: ''
        }
      }
    },
    methods: {
      onSubmit () {
        messagePush.push.bind(this)({form: this.form}, (data) => {
          this.$message({
            message: data.resultData,
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
   #message-push{
     width: 60%;
     margin: 0 auto;
   }

</style>
