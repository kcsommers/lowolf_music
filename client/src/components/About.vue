<template>
  <div id="about-wrapper">
    <div id="bio-wrapper">
      <p id="bio" ref="bio">
        Lo Wolf writes and performs from her Asheville, NC home. Her latest recording, Country Pop Hit, has been called "equal parts timeless and modern" and she infuses poetry, praise, and grit into her original compositions. She is a classically trained harpist gone folk singer, so yankee she's southern, and very happy to be here.
      </p>
    </div>
    <div id="go-to-blog">
      <button>Go To Blog</button>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>
<style lang="scss">
  @import '@/css/main.scss';
  #about-wrapper {
    padding: 2em 6em;
    #bio-wrapper {
      #bio {
        border: 5px solid #444;
        padding: 2em;
        font-size: 1.3em;
        margin-bottom: 2em;
      }
    }
    #go-to-blog {
      text-align: center;
      button {
        @extend %button2-styles;
      }
    }
  }
</style>

