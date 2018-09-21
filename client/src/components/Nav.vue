<template>
  <nav class="nav" id="main-nav" ref="main-nav">
    <div class="nav-wrapper" :style="navStyle" :class="{transparent}">
      <div class="nav-left">
        <div :style="logoStyle" id="logo-wrapper">
          <router-link to="/">Lo Wolf</router-link>
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
    },
    changePage(page) {
      this.$store.commit('pageChange', {page})
    }
  },
  created() {
    EventBus.$on('windowScrolled', this.setNavHeight)
  }
}
</script>
<style lang="scss">
#main-nav {
  position: relative;
  z-index: 1000;

  .transparent-nav {
    height: 100px;
    background-color: rgba(0,0,0,0);
  }

  .color-nav {
    height: 70px;
    background-color: #fdf5e6;
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

