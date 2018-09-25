<template>
  <main id="checkout">
    <div id="checkout-wrapper">
      <section v-if="showForm" id="form">
        <CheckoutForm :cart="cart" @checkoutComplete="handleComplete" />
      </section>

      <section v-else id="results">
        <CheckoutResults :success="true" />
      </section>
    </div>
  </main>
</template>

<script>
import CheckoutForm from '@/components/CheckoutForm'
import CheckoutResults from '@/components/CheckoutResults'
export default {
  name: 'checkout',
  components: {
    CheckoutForm,
    CheckoutResults
  },
  props: {
    cart: Array
  },
  data() {
    return {
      showForm: true
    }
  },
  methods: {
    handleComplete() {
      this.showForm = false
    }
  },
  created() {
    this.$store.commit('pageChange', {page: 'checkout'})
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#checkout {
  h3 {
    background-color: rgba(232, 59, 70, 0.6);
    border: 2px solid #e83b46;
    color: #fff;
    padding: 0.5em 0;
    border-radius: 20px;
    text-align: center;
    margin-top: -3em;
  }
}
</style>
