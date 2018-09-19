<template>
  <div class="video-slider">
    <div class="video-display">
      <img :src="videos[videoIndex].video" :alt="videos[videoIndex].alt" />
      <div class="video-slider-controls">
        <i @click="arrowClick('left')" class="fas fa-angle-left video-slider-arrow"></i>
        <i @click="playClick" class="fas fa-play play-btn"></i>
        <i @click="arrowClick('right')" class="fas fa-angle-right video-slider-arrow"></i>
      </div>
    </div>
    <div class="video-thumbnails">
      <div v-for="video in videos" class="video-thumbnail" :key="video.id">
        <img @click="handleThumbnailClick" 
             :src="video.video" 
             :alt="video.alt"
             :data-id="video.id"  />
      </div>
    </div>
  </div>
</template>

<script>
import laura_laura from '@/assets/images/laura_laura.jpg'
import laura_laura2 from '@/assets/images/laura_laura2.jpg'
export default {
  name: 'videoSlider',
  data() {
    return {
      videos: [
        {
          video: laura_laura,
          alt: 'Lo Wolf and Laura Blackley',
          id: 0
        },
        {
          video: laura_laura2,
          alt: 'Lo Wolf and Laura Blackley',
          id: 1
        },
        {
          video: laura_laura,
          alt: 'Lo Wolf and Laura Blackley',
          id: 2
        }
      ],
      videoIndex: 0
    }
  },
  methods: {
    handleThumbnailClick(e) {
      console.log(e.target)
      let i = e.target.dataset.id
      console.log(i)
      this.videoIndex = i
    },
    arrowClick(arrow) {
      if(arrow == 'left') {
        this.videoIndex = (this.videoIndex === 0) ? this.videos.length-1 : this.videoIndex - 1
      }
      else {
        this.videoIndex = (this.videoIndex === this.videos.length-1) ? 0 : this.videoIndex + 1
      }
    },
    playClick(e) {
      console.log('PLAY CLICKEd')
    }
  }
}
</script>

<style lang="scss">
.video-slider {
  background-color: #fdf5e7;
  border-radius: 5px;
  .video-display {
    position: relative;
    padding: 2em 2em 1em 2em;
    img {
      width: 100%;
    }

    .video-slider-controls {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .play-btn, .video-slider-arrow {
        color: #f2f2f2;
        cursor: pointer;
      }

      .play-btn {
        font-size: 4em;
        opacity: 0.8;
      }

      .video-slider-arrow {
        font-size: 2em;
        background-color: rgba(68, 68, 68, 0.3);
        padding: 0.5em;
      }
    }
  }

  .video-thumbnails {
    padding: 1em 2em 2em 2em;
    display: flex;
    justify-content: space-between;
    .video-thumbnail {
      flex-basis: 32%;
    }
  }
}
</style>
