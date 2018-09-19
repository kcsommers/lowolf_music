<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  components: {
    Nav
  },
  methods: {
    handleScroll() {
      EventBus.$emit('windowScrolled')
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss">

</style>
