<template>
  <div class="video-wrapper">
    <img src="@/assets/images/laura_laura.jpg" alt="Lo Wolf and Laura Blackley" />
    <div class="play-btn-wrapper"><i class="fas fa-play"></i></div>
  </div>
</template>

<script>
export default {
  name: 'Video'
}
</script>

<style lang="scss">
  .video-wrapper {
    position: relative;

    img {
      width: 100%;
    }

    .play-btn-wrapper {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      text-align: center;
      i {
        color: #f2f2f2;
        font-size: 4em;
        opacity: 0.8;
      }
    }
  }
</style>


