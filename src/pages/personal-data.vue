<template>
  <section id="personal-data">
    <mu-text-field label="昵称" v-model="form.nickname" disabled></mu-text-field>
    <mu-text-field label="Email/帐号" v-model="form.email" disabled></mu-text-field>
    <mu-text-field label="创建时间" v-model="form.createTime" disabled></mu-text-field>
    <mu-text-field label="最后登录时间" v-model="form.lastLoginTime" disabled></mu-text-field>
  </section>

</template>

<script>
  import personalData from 'service/personal-data'
  import EventBus from 'utilities/event-bus'
  import timestampToDateTime from 'filters/timestamp-to-date-time'
  export default{
    created () {
      personalData.get.bind(this)({}, (data) => {
        data.createTime = timestampToDateTime(data.createTime)
        data.lastLoginTime = timestampToDateTime(data.lastLoginTime)
        this.form = data
      }, (err) => {
        this.$message.error(err)
      })
      personalData.getRoleAndPermissions.bind(this)({}, (data) => {
        EventBus.permissions = data.permissions
        EventBus.roles = data.roles
      }, (err) => {
        console.log('权限获取失败：' + err)
      })
    },
    data () {
      return {
        form: {
          nickname: '',
          email: '',
          createTime: '',
          lastLoginTime: ''
        }
      }
    },
    methods: {
      onSubmit () {

      }
    }
  }

</script>

<style scoped>
  #personal-data{
    width: 300px;
  }
</style>
