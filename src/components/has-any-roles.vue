<template>
  <section id="has-any-roles" v-if="isShow">
    <slot></slot>
  </section>
</template>
<script>
//  import EventBus from 'utilities/event-bus'
  import isArrayContains from 'utilities/is-array-contains'
  export default{
    props: {
      roles: {}
    },
    created () {
//      let roles = EventBus.roles
      let roles = ['SYS_ADMIN']
      if (this.roles) {
        let roleArr = this.roles.split(',')
        roleArr.map((role) => {
          if (isArrayContains(roles, role)) {
            this.isShow = true
          }
        })
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
  #has-any-roles{
    display: inline-block;
  }
</style>
