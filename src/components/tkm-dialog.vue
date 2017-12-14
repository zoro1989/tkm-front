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
      dialogMsg: {},
      check: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close () {
        this.closeHandler()
        this.hide()
      },
      confirm () {
        this.confirmHandler()
        if (!this.check) {
          this.hide()
        }
      },
      show () {
        this.open = true
      },
      hide () {
        this.open = false
        if (this.confirmHandler) {
          this.confirmHandler = null
        }
        if (this.closeHandler) {
          this.closeHandler = null
        }
      },
      openDialog (confirm, close) {
        this.show()
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
