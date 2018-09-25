<template>
  <main id="cart">
    <div id="cart-wrapper">
      <h2>Your Cart:</h2>
      <div v-if="items.length > 0" id="items-display">
        <div v-for="(item, i) in items" :key="i" class="item-wrapper">
          <div class="item-image">
            <img src="@/assets/images/countrypop.png" alt="Country Pop Hit" />
          </div>
          <div class="item-info">
            <h3>{{item.item.name}}</h3>
            <p>${{item.item.price}}.00</p>
          </div>
          <div class="item-actions">
            <div class="item-quantity">
              <span>Quantity: </span><span><i @click="updateQuantity(-1)" class="fas fa-minus"></i><span id="quantity">{{item.quantity}}</span><i @click="updateQuantity(1)" class="fas fa-plus"></i></span>
            </div>
            <button>Remove from Cart</button>
          </div>
        </div>
        <div id="checkout-link-wrapper">
          <div id="total-wrapper">
            <p>Order Total: ${{total}}.00</p>
          </div>
          <router-link id="checkout-link" :to="{name: 'checkout', query: {cart: items}}">Proceed to Checkout</router-link>
        </div>
      </div>

      <div v-else id="no-items-display">
        <h2>Your cart is empty.</h2>
      </div>
    </div>
  </main>
</template>

<script>
import Api from '@/services/Api'
export default {
  name: 'cart',
  data() {
    return {
      items: [],
      total: 0
    }
  },
  methods: {
    async fetchItems() {
      this.items = []
      let cart = (sessionStorage.hasOwnProperty('loCart')) ? JSON.parse(sessionStorage.loCart) : null
      if(cart && cart.items.length) {
        let data = {items: cart.items}
        const items = await Api().post('/items', data)
        this.items.push({
          item: items.data[0], 
          id: items.data[0].id, 
          quantity: 1
        })
        
        items.data.forEach((item, i) => {
          console.log(i)
          this.total += item.price
          if(i > 0) {
            let obj = this.items.find((el) => el.id === item.id)
            if(obj) {
              obj.quantity += 1
            }
            else {
              this.items.push({
                item: item,
                id: item.id,
                quantity: 1
              })
            }
          }
        })
        console.log(this.items)
      }
      else {
        console.log('NO ITEMS IN CART')
      }
    },
    updateQuantity(num) {

    }
  },
  created() {
    this.$store.commit('pageChange', {page: 'cart'})
  },
  mounted() {
    this.fetchItems()
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#cart-wrapper {
  min-height: calc(100vh - 220px);
  padding: 8em 6em 6em 6em;
  #checkout-link {
    @extend %button2-styles;
  }

  #items-display {
    padding: 2em 0;
    .item-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #444;
      padding: 1em 0;

      .item-info {
        flex: 1;
        padding-left: 5em;
      }

      .item-actions {
        flex: 1;
        text-align: right;

        .item-quantity {
          padding: 1em 0;
          span:first-child {
            margin-right: 1em;
          }

          #quantity {
            font-size: 1.5em;
            padding: 0 0.5em;
          }
        }

        button {
          @extend %button2-styles;
          background-color: #e83b46;
          color: #fff;
          font-size: 0.8em;
        }
      }

      .item-image {
        flex-basis: 20%;
      }
    }
  }

  #checkout-link-wrapper {
    #total-wrapper {
      padding: 1em 0;
      font-size: 1.7em;
    }

    text-align: right;
  }
}
</style>
