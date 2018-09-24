<template>
  <div v-bind:style="this.wrapperStyle" class="parallax-wrapper">
    <img :src="this.image" :style="{minWidth: '900px'}" />
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    section: String
  },
  data() {
    return {
      wrapperStyle: {
        position: 'absolute',
        width: '100%',
        top: 0, 
        transform: 'translateY(0)',
        zIndex: -500,
        backgroundColor: '#fff'
      }
    }
  },
  methods: {
    handleScroll() {
      if(this.$store.state.page === 'home') {
        let section = document.getElementById(String(this.section))
        let sectionInfo = section.getBoundingClientRect()
        let imageInfo = section.lastChild.firstChild.getBoundingClientRect()
        let translate = (this.section == 'landing-section') ? 
        ((window.scrollY / 2)).toString() + 'px' :
        (((window.innerHeight - sectionInfo.y) / 2) - (imageInfo.height / 2)).toString() + 'px'
        this.wrapperStyle.transform = `translateY(${translate})`
      }
    }
  },
  created() {
    EventBus.$on('windowScrolled', this.handleScroll)
  }
}
</script>

