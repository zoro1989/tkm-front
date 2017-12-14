<template>
  <section id="tkm-form">
    <slot ref="components"></slot>
  </section>
</template>

<script>
  import {validate} from 'service/validate'
  export default{
    methods: {
      checkValid (validateItems) {
        console.log(validateItems)
        if (!validate(validateItems)) {
          return false
        } else {
          return true
        }
      }
    }
  }

</script>

<style scoped>
</style>
