<template>
  <mu-text-field class="tkm-input" :label="label" :value="content" :errorText="errorText"
                 :hintText="placeholder" @change="onChange"></mu-text-field>
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
      placeholder: {
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
      onChange (e) {
        this.$emit('update:content', e.target.value)
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
