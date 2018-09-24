<template>
  <main id="home">
    <section class="section" id="landing-section">
      <Landing />
      <ParallaxBackground :image="require('@/assets/images/lo_paisley.png')" :section="'landing-section'" />
    </section>

      <section class="section" id="shows-section">
        <h2 class="section-title">Shows</h2>
        <Calendar :full="false" />
      </section>

      <section class="section" id="music-section">
        <h2 class="section-title">Music</h2>
        <Music />
        <ParallaxBackground :image="require('@/assets/images/paisley2_yellow.png')" :section="'music-section'" />
      </section>

      <section class="section" id="videos-section">
        <h2 class="section-title">Videos</h2>
        <Videos />
      </section>
    <section class="section" id="about-section">
      <About />
      <ParallaxBackground :image="require('@/assets/images/about_bg.png')" :section="'about-section'" />
    </section>

    <section class="section" id="subscribe-section">
      <Subscribe />
    </section>
  </main>
</template>

<script>
// @ is an alias to /src
import ParallaxBackground from '@/components/ParallaxBackground'
import Landing from '@/components/Landing'
import Calendar from '@/components/Calendar'
import Music from '@/components/Music'
import Videos from '@/components/Videos'
import About from '@/components/About'
import Subscribe from '@/components/Subscribe'

export default {
  name: 'home',
  components: {
    ParallaxBackground,
    Landing,
    Calendar,
    Music,
    Videos,
    About,
    Subscribe
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#home {
  .section {
    position: relative;
  }

  #landing-section, #about-section, {
    overflow: hidden;
  }

  #shows-section, #music-section, #videos-section {
    padding: 2em 6em;
  }

  #music-section {
    .parallax-wrapper {
      opacity: 1;
      margin-top: 6em;
      margin-left: -5em;
    }
  }
}
</style>

