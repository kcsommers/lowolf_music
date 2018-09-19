<template>
  <nav class="nav" id="main-nav" ref="main-nav">
    <div class="nav-wrapper" v-bind:style="styleObject">
      <div class="nav-left">
        <div id="logo-wrapper">
          <p>Lo Wolf</p>
        </div>
      </div>
      <div class="nav-right">
        <a href="#">About</a>
        <a href="#">Music</a>
        <a href="#">Media</a>
        <a href="#">Store</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  nav: '',
  data() {
    return {
      styleObject: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100px',
        alignItems: 'center',
        padding: '0 4em',
        position: 'fixed',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        transition: 'all 0.6s ease'
      }
    }
  },
  methods: {
    setNavHeight() {
      if(window.scrollY > 0) {
        this.styleObject.height = '70px'
        this.styleObject.backgroundColor = '#fdf5e6'
      }
      else {
        this.styleObject.height = '100px'
        this.styleObject.backgroundColor = 'rgba(0,0,0,0)'
      }
    }
  },
  created() {
    EventBus.$on('windowScrolled', this.setNavHeight)
  }
}
</script>
