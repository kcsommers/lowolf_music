<template>
  <nav class="nav" id="main-nav" ref="main-nav">
    <div class="nav-wrapper" :style="this.$store.state.navStyle">
      <div class="nav-left">
        <div :style="this.$store.state.logoStyle" id="logo-wrapper">
          <router-link to="/" @click.native="changePage('home')">Lo Wolf</router-link>
        </div>
      </div>
      <div v-if="this.$store.state.page === 'home'" class="nav-right">
        <a @click="handleNavClick" href="#shows-section">Shows</a>
        <a @click="handleNavClick" href="#music-section">Music</a>
        <a @click="handleNavClick" href="#videos-section">Videos</a>
        <a @click="handleNavClick" href="#about-section">About</a>
        <router-link to="/cart" @click.native="changePage('cart')">Cart</router-link>
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
      </div>

      <div v-else class="nav-right">
        <router-link to="/#shows-section">Shows</router-link>
        <router-link to="/#music-section">Music</router-link>
        <router-link to="/#videos-section">Videos</router-link>
        <router-link to="/#about-section">About</router-link>
        <router-link to="/cart" @click.native="changePage('cart')">Cart</router-link>
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
    handleNavClick(e) {
      e.preventDefault()
      let section = document.getElementById(e.target.href.split('/#')[1])
      let top = section.offsetTop - 70
      window.scroll({top, left: 0, behavior: 'smooth'})
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

