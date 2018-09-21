<template>
  <div class="relative-wrapper" id="landing-wrapper">
    <div id="landing-intro">
      <div class="cta">
        <h1>Lo Wolf</h1>
        <h2>Country Pop Hit EP Available Now</h2>
        <button>Buy/Listen</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '@/css/main.scss';
#landing-wrapper {
  #landing-intro {
    text-align: right;
    padding: 15% 20% 25% 20%;

    .cta {
      text-align: center;
      transform: translateX(28%);

      h2 {
        margin: -0.5em 0 0.5em 0;
      }

      button {
        @extend %button-styles;
      }
    }
  }
}
</style>
