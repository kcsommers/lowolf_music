<template>
  <nav class="nav" id="main-nav" ref="main-nav">
    <div class="nav-wrapper" v-bind:style="navStyle">
      <div class="nav-left">
        <div :style="logoStyle" id="logo-wrapper">
          <p>Lo Wolf</p>
        </div>
      </div>
      <div class="nav-right">
        <a href="#">About</a>
        <a href="#">Music</a>
        <a href="#">Media</a>
        <a href="#">Store</a>
        <a href="#">Contact</a>
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
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
      navStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100px',
        alignItems: 'center',
        padding: '0 4em',
        position: 'fixed',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        transition: 'all 0.6s ease'
      },
      logoStyle: {
        opacity: 0,
        transition: 'all 0.6s ease'
      }
    }
  },
  methods: {
    setNavHeight() {
      if(window.scrollY > 0) {
        this.navStyle.height = '70px'
        this.navStyle.backgroundColor = '#fdf5e6'
        this.logoStyle.opacity = 1
      }
      else {
        this.navStyle.height = '100px'
        this.navStyle.backgroundColor = 'rgba(0,0,0,0)'
        this.logoStyle.opacity = 0
      }
    }
  },
  created() {
    EventBus.$on('windowScrolled', this.setNavHeight)
  }
}
</script>
