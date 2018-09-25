<template>
  <nav class="nav" id="main-nav" ref="main-nav">
    <div class="nav-wrapper" :style="this.$store.state.navStyle">
      <div class="nav-left">
        <div :style="this.$store.state.logoStyle" id="logo-wrapper">
          <router-link to="/" @click.native="changePage('home')">Lo Wolf</router-link>
        </div>
      </div>
      <div class="nav-right">
        <a href="#">About</a>
        <a href="#">Music</a>
        <a href="#">Media</a>
        <router-link to="/cart" @click.native="changePage('cart')">Cart</router-link>
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
      
    }
  },
  methods: {
    setNavHeight() {
      if(this.$store.state.page === 'home') {
        if(window.scrollY > 0) {
          this.$store.state.navStyle.height = '70px'
          this.$store.state.navStyle.backgroundColor = '#fdf5e6'
          this.$store.state.logoStyle.opacity = 1
        }
        else {
          this.$store.state.navStyle.height = '100px'
          this.$store.state.navStyle.backgroundColor = 'rgba(0,0,0,0)'
          this.$store.state.logoStyle.opacity = 0
        }
      }
    },
    changePage(page) {
      this.$store.commit('pageChange', {page})
    }
  },
  created() {
    EventBus.$on('windowScrolled', this.setNavHeight)
    console.log(this.$store.state.navStyle)
  }
}
</script>
<style lang="scss">
#main-nav {
  position: relative;
  z-index: 1000;

  .notHome {
    height: 70px;
    background-color: 'fdf5e6';
  }

  .nav-wrapper {
    .nav-left {
      #logo-wrapper {
        a {
          font-size: 2em;
        }
      }
    }

    .nav-right {
      a {
        margin-left: 2em;

        i {
          font-size: 1.5em;
          transform: translateY(2px);
          color: #a9c5e8;
        }
      }
    }
  }
}
</style>

