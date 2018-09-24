<template>
  <div id="subscribers">
    <span id="newbie-count" v-if="newbies">{{newbies}} New</span>
    <div id="subscribers-wrapper">
      <div id="subscriber-row" v-for="subscriber in subscribers" :key="subscriber.name">
        <p id="subscriber-name">
          {{subscriber.name}}
        </p>
        <p id="subscriber-email">
          {{subscriber.email}}
        </p>
        <p id="new-subscriber-btns">
          <button>New</button>
          <button>mark as not new</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/services/Api'
export default {
  name: 'subscribers',
  data() {
    return {
      subscribers: [],
      newbies: 0
    }
  },
  methods: {
    async fetchSubscribers() {
      const subscribers = await Api().get('subscribers')
      this.subscribers = subscribers.data
      this.subscribers.forEach(subscriber => {
        if(subscriber.new) this.newbies += 1
      });
    }
  },
  mounted() {
    this.fetchSubscribers()
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#subscribers {
  position: relative;
  #newbie-count {
    @extend %button2-styles;
    background-color: #a9c5e8;
    position: absolute;
    top: -5em;
    left: 10em;
    padding: 0.5em 1em
  }

  #subscribers-wrapper {
    border: 3px solid #fff;
    padding: 2em;
    #subscriber-row {
      display: flex;
      border-bottom: 1px solid #fff;
      align-items: center;
      p {
        color: #fff;
        padding: 1em 2em 1em 0;
      }

      #new-subscriber-btns {
        flex: 1;
        text-align: right;
        button {
          @extend %button2-styles;
        }

        button:first-child {
          background-color: #a9c5e8;
          margin-right: 1em;
        }
      }
    }
  }
}
</style>
