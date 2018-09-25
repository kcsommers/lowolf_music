<template>
  <div class="album-wrapper">
    <div class="album-image">
      <img src="@/assets/images/countrypop.png" alt="Country Pop Hit">
    </div>
    <div class="album-info">
      <p class="album-name">Country Pop Hit EP <a href="https://itunes.apple.com/us/album/country-pop-hit-ep/id1238955286"><i class="fab fa-itunes"></i></a><a href="https://lowolf.bandcamp.com/album/country-pop-hit"><i class="fab fa-bandcamp"></i></a></p>
      <p class="album-year">2017</p>
      <div class="tracklist">
        <p class="track"><span>1. Kill No More</span><span><i class="far fa-play-circle"></i></span></p>
        <p class="track"><span>2. Plug in the Iron</span><span><i class="far fa-play-circle"></i></span></p>
        <p class="track"><span>3. Dog 1</span><span><i class="far fa-play-circle"></i></span></p>
        <p class="track"><span>4. Gone are the Days</span><span><i class="far fa-play-circle"></i></span></p>
      </div>
      <form @submit="handleSubmit" class="add-to-cart-form">
        <input type="submit" value="Add to Cart" />
        <select v-model="selected">
          <option v-for="(option) in options" 
                  v-bind:value="option.id" 
                  v-bind:key="option.id">
            {{option.text}}
          </option>
        </select>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Album',
  data() {
    return {
      selected: 8,
      options: [
        {
          text: 'Country Pop Hit EP - Hard Copy', 
          id: 8
        },
        {
          text: 'Country Pop Hit EP - Digital Download',
          id: 9
        }
      ]
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      let cart = sessionStorage.hasOwnProperty('loCart') ? JSON.parse(sessionStorage.getItem('loCart')) : {items: []}
      cart.items.push(this.selected)
      sessionStorage.setItem('loCart', JSON.stringify(cart))
    },
    playAudio(track) {
      const audio = new Audio(track)
      audio.play()
    }
  }
}
</script>
<style lang="scss">
  @import '@/css/main.scss';
  .album-wrapper {
    display: flex;

    .album-image {
      flex: 0.6;
      min-width: 300px;
    }

    .album-info {
      flex: 1;
      padding-left: 2em;

      .album-name {
        font-size: 2em;
        a {
          margin: 0 0.2em;

          i {
            color: #a9c5e8;
          }
        }
      }

      .album-year {
        font-style: italic;
      }

      .tracklist {
        margin: 1em 0 2em 0;
        .track {
          font-size: 1em;
          border-bottom: 1px solid #444;
          padding: 0.2em;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          transition: all 0.2s ease;
        }
        .track:hover {
          box-shadow: 2px 5px 15px #888;
        }
      }

      .add-to-cart-form {
        select {
          font-size: 0.8em;
          background-color: #fff;
          border: none;
          outline: none;
          box-shadow: 2px 5px 10px #888;
          font-size: 1em;
          margin-left: 1em;

          option {
            padding: 2em;
            background: none;
          }
        }

        input[type=submit] {
          @extend %button2-styles
        }
      }
    }
  }
</style>


