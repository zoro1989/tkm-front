<template>
  <section id="has-permission" v-if="isShow">
    <slot></slot>
  </section>
</template>
<script>
//  import EventBus from 'utilities/event-bus'
  import isArrayContains from 'utilities/is-array-contains'
  export default{
    props: {
      permission: {}
    },
    created () {
//      let permissions = EventBus.permissions
      // 权限mock数据
      let permissions = [
        'permission:index',
        'permission:addPermission',
        'permission:deletePermissionById',
        'member:list',
        'member:online',
        'member:changeSessionStatus',
        'member:forbidUserById',
        'member:deleteUserById',
        'permission:addPermission2Role',
        'role:clearRoleByUserIds',
        'role:addRole2User',
        'role:deleteRoleById',
        'role:addRole',
        'role:index',
        'permission:allocation',
        'role:allocation',
        'push:send',
        'push:index']
      if (isArrayContains(permissions, this.permission)) {
        this.isShow = true
      }
    },
    data () {
      return {
        isShow: false
      }
    }
  }
</script>
<style scoped>
  #has-permission{
    display: inline-block;
  }
</style>
