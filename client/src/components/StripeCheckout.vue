<template>
  <div id="stripe-checkout-wrapper">
    <div ref="card"></div>
    <form @submit="checkout" id="payment-form">
      <div class="form-row">
        <label for="card-element">
          Credit or debit card
        </label>
        <div id="card-element">
          <!-- A Stripe Element will be inserted here. -->
        </div>

        <!-- Used to display Element errors. -->
        <div id="card-errors" role="alert"></div>
      </div>

      <button>Submit Payment</button>
    </form>
  </div>
</template>

<script>
import Api from '@/services/Api'

let stripe = Stripe(`pk_test_rt248qgTXOkPwG5cBwKzJ4mo`),
    elements = stripe.elements(),
    card = undefined;

var style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: "#32325d"
  }
};

export default {
  name: "stripe-checkout",
  props: {
    buyerInfo: Object,
    cart: Array
  },
  methods: {
    checkout(e) {
      e.preventDefault()
      let info = this.buyerInfo
      let cart = this.cart
      if(!info.name || !info.email || !info.city || !info.state || !info.address1 || !info.zip) {
        this.$emit('error')
      }
      else {
        stripe.createToken(card).then(function(result) {
          if(result.error) {
            console.log(result.error.message)
          }
          else {
            const token = result.token
            Api().post('/transactions/charge', token).then((result) => {
              if(result.data.status === 400) {
                console.log('error')
              }
              else {
                Api().post('/transactions', {info, cart}).then((result) => {
                  console.log('TRANSACTION', result.data)
                  if(result.data.status === 200) {
                    console.log('success')
                  }
                  else {
                    console.log('error')
                  }
                });
              }
            });
          }
        });
      }
    }
  },
  mounted: function () {
    card = elements.create('card', {style: style});
    card.mount('#card-element');
    console.log(this.cart)
  }
};
</script>

<style lang="scss">
@import '@/css/main.scss';
#stripe-checkout-wrapper {
  #payment-form {
    padding: 1em; 
    border-radius: 10px;
    margin: 2em 0;
    color: #fff;
  }

  button {
    @extend %button2-styles;
    width: 100%;
    margin: 2em 0;
  }
}
</style>
