<template>
  <main id="checkout-results">
    <div id="checkout-results-wrapper">
      <div class="checkout-result" v-if="success">
        <h2>Thank you for your order!</h2>
        <h4>Your items will be shipped within 2-3 business days.</h4>
      </div>
      <div class="checkout-result" v-else>
        <h2>Hmm... something has gone awry</h2>
        <h4>We were unable to process your order, your card was not charge. Please try again later.</h4>
      </div>
      <router-link id="back-home" to="/">Back to Home Page</router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'checkout-results',
  props: {
    success: Boolean
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#checkout-results {
  min-height: calc(100vh - 220px);
  display: flex;
  align-items: center;

  #checkout-results-wrapper {
    padding: 0 15em;

    .checkout-result {
      padding: 3em 0;
    }

    #back-home {
      @extend %button2-styles;
    }
  }
}
</style>
