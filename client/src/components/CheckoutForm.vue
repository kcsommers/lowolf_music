<template>
  <div id="checkout-form">
    <div id="checkout-form-wrapper">
      <form>
        <div class="checkout-input-wrapper">
          <span v-show="errMsg"><i class="fas fa-asterisk"></i>Required</span>
          <input v-model="buyerInfo.name" type="text" name="name" placeholder="Full Name" />
        </div>
        <div class="checkout-input-wrapper">
          <span v-show="errMsg"><i class="fas fa-asterisk"></i>Required</span>
          <input v-model="buyerInfo.email" type="email" name="email" placeholder="Email Address" />
        </div>
        <div class="checkout-input-wrapper">
          <span v-show="errMsg"><i class="fas fa-asterisk"></i>Required</span>
          <input v-model="buyerInfo.address1" type="text" name="address1" placeholder="Address Line 1" />
        </div>
        <div class="checkout-input-wrapper">
          <span v-show="errMsg"><i class="fas fa-asterisk"></i>Required</span>
          <input v-model="buyerInfo.address2" type="text" name="address2" placeholder="Address Line 2" />
        </div>
        <div class="checkout-input-wrapper">
          <span v-show="errMsg"><i class="fas fa-asterisk"></i>Required</span>
          <input v-model="buyerInfo.city" type="text" name="city" placeholder="City">
        </div>
        <div class="checkout-input-wrapper">
          <span v-show="errMsg"><i class="fas fa-asterisk"></i>Required</span>
          <select v-model="buyerInfo.state" name="state">
            <option v-for="state in states" 
                  :key="state.abbreviation"
                  :value="state.abbreviation">
              {{state.name}}
            </option>
        </select>
        </div>
        <div class="checkout-input-wrapper">
          <span v-show="errMsg"><i class="fas fa-asterisk"></i>Required</span>
          <input v-model="buyerInfo.zip" type="text" name="zip" placeholder="Zip Code" />
        </div>
      </form>
    </div>
    <div id="checkout-buttons">
      <div id="checkout-details">
        <p v-for="item in itemCounts" :key="item[0]">
          {{item[1]}} X {{ item[0] }}
        </p>
        <p>Order total: ${{totalAmount}}</p>
      </div>
      <StripeCheckout v-on:error="updateMessage" 
                      :buyerInfo="buyerInfo"
                      :cart="cart"
                      @checkoutComplete="handleComplete" />
      <h3 v-show="errMsg">{{errMsg}}</h3>
    </div>
  </div>
</template>

<script>
import states from '@/assets/states.js'
import StripeCheckout from '@/components/StripeCheckout'
export default {
  name: 'checkout-form',
  components: {
    StripeCheckout
  },
  props: {
    cart: Array
  },
  data() {
    return {
      buyerInfo: {
        name: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: 'AL',
        zip: '',
      },
      errMsg: '',
      showButtons: false,
      noDisplay: true,
      states: states,
      itemCounts: {}
    }
  },
  computed: {
    totalAmount() {
      let total = 0;
      this.cart.forEach((item) => {total += item.item.price})
      return total.toFixed(2)
    }
  },
  methods: {
    countItems() {
      this.cart.forEach((item) => {
        if(this.itemCounts.hasOwnProperty(item.item.id)) {
          this.itemCounts[item.id][1] += 1
        }
        else {
          this.itemCounts[item.item.id] = [item.item.name, 1]
        }
      })
    },
    updateMessage() {
      this.errMsg = 'Please fill out required fields'
    },
    handleComplete() {
      this.$emit('checkoutComplete')
    }
  },
  created() {
    this.countItems()
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#checkout-form {
  display: flex;
  padding: 10em 6em;

  #checkout-form-wrapper, #checkout-buttons {
    flex: 1;
  }

  #checkout-form-wrapper {
    padding-right: 2em;
    form {
      .checkout-input-wrapper {
        position: relative;
        span {
          color: #e83b46;
          font-size: 0.9em;
          position: absolute;
          top: -1.4em;

          i {
            color: #e83b46;
            font-size: 0.3em;
            position: relative;
            top: -0.5em;
            padding: 0 0.5em;
          }
        }

        input, select {
          display: block;
          background: none;
          border: none;
          box-shadow: 2px 2px 10px #888;
          outline: none;
          font-size: 1.1em;
          width: 100%;
          padding: 1em;
          border-radius: 5px;
          margin-bottom: 1.5em;
        }
      }
    }
  }
}

#checkout-buttons {

  #checkout-details {
    text-align: right;
    p {
      font-size: 1.3em;
      margin-bottom: 0.5em;
    }

    p:last-child {
      border-top: 2px solid #444;
      padding-top: 0.5em;
    }
  }
}

</style>
