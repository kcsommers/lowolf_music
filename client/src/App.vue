<template>
  <div id="app">
    <Nav />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
export default {
  components: {
    Nav,
    Footer
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
