<template>
  <div id="transaction-table">
    <div id="trans-tabs">
      <span>{{unfulfilled}} Unfulfilled</span>
      <span>Fulfilled</span>
      <span class="active-tab">All Orders</span>
    </div>
    <div v-if="transactions.length" id="trans-table-wrapper">
      <div class="trans-row">
        <div class="date-col trans-col" id="trans-date">
          <h3>Date</h3>
        </div>
        <div class="trans-col" id="trans-buyer">
          <h3>Buyer</h3>
        </div>
        <div class="trans-col" id="trans-address">
          <h3>Shipping address</h3>
        </div>
      </div>

      <div v-for="(trans, i) in transactions" 
           class="trans-row" 
           :class="{unfulfilled: !trans.fulfilled, fulfilled: trans.fulfilled}"
           @click="openModal(i)"
           :key="trans.id">
        <div class="date-col trans-col">
          <p>{{trans.createdAt.split('T')[0]}}</p>
        </div>
        <div class="trans-col">
          <p>{{trans.buyer}}</p>
          <p>{{trans.email}}</p>
        </div>
        <div class="trans-col">
          <p>{{trans.address}}</p>
        </div>
      </div>

    </div>
    <div v-else id="no-trans-wrapper">
      <h2>No unfulfilled orders.</h2>
    </div>
    <div v-if="showModal">
      <Modal :info="modalInfo" @closeModal="closeModal" @orderFulfilled="orderFulfilled"/>
    </div>
  </div>
</template>

<script>
import Api from '@/services/Api'
import Modal from '@/components/Modal'
export default {
  name: 'transaction-table',
  components: {
    Modal
  },
  data() {
    return {
      transactions: [],
      unfulfilled: 0,
      modalInfo: {},
      showModal: false
    }
  },
  methods: {
    async fetchTransactions() {
      const transactions = await Api().get('transactions')
      transactions.data.forEach((trans) => {
        if(!trans.fulfilled) {
          this.unfulfilled += 1
        }
      });
      this.transactions = transactions.data
    },
    openModal(index) {
      this.modalInfo = this.transactions[index]
      this.modalInfo.transIndex = index
      this.showModal = true
    },
    closeModal() {
      this.modalInfo = {}
      this.showModal = false
    },
    async orderFulfilled(value) {
      const results = await Api().put(`transactions/${value.id}`)
      this.transactions[value.index].fulfilled = true
      this.unfulfilled -= 1
    }
  },
  mounted() {
    this.fetchTransactions()
  }
} 
</script>

<style lang="scss">
@import '@/css/main.scss';
#transaction-table {
  border: 3px solid #fff;
  padding: 2em;
  #trans-tabs {
    margin-bottom: 1em;
    span {
      margin-right: 2em;
      color: #fff;
      cursor: pointer;
    }

    span.active-tab {
      color: #a9c5e8;
    }
  }
  #trans-table-wrapper {

    .unfulfilled {
      background-color: rgba(232, 59, 70, 0.5);
    }

    .trans-row {
      display: flex;
      padding: 1em 0.5em;
      align-items: center;
      border-bottom: 1px solid #fff;
      cursor: pointer;
      h3, p {
        color: #fff;
      }
    }

    .trans-row:hover {
      box-shadow: 1px 6px 15px #000;
    }

    .trans-row:first-child {
      border-bottom: 3px solid #fff;
      padding: 0.5em;
      box-shadow: 1px 6px 15px #000;
    }

    .trans-col {
      flex: 1;
      word-break: break-all;
    }

    .date-col {
      flex: 0.5;
    }
  }

  #no-trans-wrapper {
    text-align: center;
    padding: 4em 0;
  }
}

</style>
