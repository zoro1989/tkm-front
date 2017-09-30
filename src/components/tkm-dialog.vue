<template>
  <mu-dialog ref="mu-dialog" :open="open" :title="title" @close="close">
    <slot>确定吗？</slot>
    <mu-flat-button slot="actions" @click="close" primary :label="cancelLabel"/>
    <mu-flat-button slot="actions" primary @click="confirm" :label="confirmLabel"/>
  </mu-dialog>
</template>
<script>
  export default {
    data () {
      return {
        open: false
      }
    },
    props: {
      cancelLabel: {},
      confirmLabel: {},
      title: {},
      dialogMsg: {}
    },
    methods: {
      close () {
        this.open = false
        this.closeHandler()
        this.closeHandler = null
      },
      confirm () {
        this.open = false
        this.confirmHandler()
        this.confirmHandler = null
      },
      openDialog (confirm, close) {
        this.open = true
        this.closeHandler = close
        this.confirmHandler = confirm
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
