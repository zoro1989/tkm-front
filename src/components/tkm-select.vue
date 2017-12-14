<template>
  <mu-select-field class="tkm-select" :value="content" :labelFocusClass="['label-foucs']"
                   :label="label" :errorText="errorText"  @change="onChange">
    <slot></slot>
  </mu-select-field>
</template>
<script>
  import isEmpty from 'utilities/is-empty'
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      notEmpty: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        errorText: ''
      }
    },
    methods: {
      onChange (value) {
        this.$emit('update:content', value + '')
      },
      isNotEmpty () {
        if (!this.notEmpty) {
          this.errorText = ''
          return true
        }
        if (isEmpty(this.content)) {
          this.errorText = '该项不能为空~！'
          return false
        } else {
          this.errorText = ''
          return true
        }
      }
    }
  }
</script>
<style scoped>
</style>
