<template>
  <section id="my-permission">
    <mu-list>
      <template v-for="role in roles">
        <mu-list-item :title="role.name" toggleNested class="role-title">
          <template v-for="permission in role.permissions">
            <mu-list-item slot="nested" :title="permission.name"/>
          </template>
        </mu-list-item>
      </template>
    </mu-list>
  </section>
</template>

<script>
  import myPermission from 'service/my-permission'
  export default{
    created () {
      myPermission.get.bind(this)({}, (data) => {
        this.roles = data
      }, (err) => {
        this.$message.error(err)
      })
    },
    data () {
      return {
        roles: []
      }
    }
  }

</script>

<style scoped>
  #my-permission{
    width: 300px;
    margin-left: 100px;
  }
  #my-permission .mu-list{
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

</style>
