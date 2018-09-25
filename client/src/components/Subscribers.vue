<template>
  <div id="subscribers">
    <span id="newbie-count" v-if="newbies">{{newbies}} New</span>
    <div id="subscribers-wrapper">
      <div id="subscriber-row" v-for="(subscriber, i) in subscribers" :key="subscriber.name">
        <p id="subscriber-name">
          {{subscriber.name}}
        </p>
        <p v-if="subscriber.new" id="new-subscriber-btns">
          <button>New</button>
          <button @click="notNew(subscriber.id, i)">mark as not new</button>
        </p>
        <p id="subscriber-email">
          {{subscriber.email}}
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
    },
    async notNew(id, index) {
      const results = await Api().put(`subscribers/${id}`)
      this.subscribers[index].new = false
      this.newbies -= 1
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
      justify-content: space-between;

      p {
        color: #fff;
        padding: 1em;
        font-size: 1.2em;
      }

      #new-subscriber-btns {
        flex: 1;
        button {
          @extend %button2-styles;
          font-size: 0.8em;
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
