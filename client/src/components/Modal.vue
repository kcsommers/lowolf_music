<template>
  <section class="modal-section">
    <div class="modal-wrapper">
      <div class="modal-content">
        <h5 class="modal-title">Transaction Details</h5>
        <h3>{{info.buyer}}</h3>
        <h4>{{info.email}}</h4>
        <p>{{info.address}}</p>
        <hr />
        <p v-for="item in info.items" :key="item.id">
          {{item.name}}
        </p>
        <button @click="$emit('orderFulfilled', {id: info.id, index: info.transIndex})">Mark as fulfilled</button>
      </div>
      <i @click="$emit('closeModal')" class="fas fa-times"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: 'modal',
  props: {
    info: Object
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log(this.info)
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';

.modal-section {
  position: fixed;
  background-color: rgba(0,0,0,0.3);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;

  .modal-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    position: relative;
    .modal-content {
      flex-basis: 50%;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 1px 6px 15px #000;
      padding: 2em;

      h3, h4, p {
        color: #444;
      }

      hr {
        margin: 0.5em 0;
      }

      .modal-title {
        text-align: right;
        color: #444;
      }

      p {
        margin-bottom: 1em;
      }

      button {
        @extend %button2-styles;
      }
    }
    i {
      position: absolute;
      top: 1em;
      right: 2em;
      font-size: 4em;
      color: #fff;
      z-index: 5000;
      cursor: pointer;
    }
  }
}

</style>
