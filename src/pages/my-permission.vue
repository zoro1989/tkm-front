<template>
  <section id="my-permission">
    <mu-list>
      <template v-for="role in roles">
        <mu-list-item :title="role.name" toggleNested class="role-title" :open="open">
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
        roles: [],
        open: false
      }
    }
  }

</script>

<style scoped>
  #my-permission{
    width: 60%;
    margin: 10px auto;
    max-height: calc(100vh - 110px);
    overflow: auto;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

</style>
