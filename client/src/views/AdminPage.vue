<template>
  <main id="admin-page">
    <div id="admin-wrapper">
      <h5>Dashboard</h5>
      <section id="transactions-section">
        <h2 class="admin-title">Orders</h2>
        <TransactionTable />
      </section>

      <section id="show-info-section">
        <h2 class="admin-title">Shows</h2>
        <ShowsInfo />
      </section>

      <section id="subscribers-section">
        <h2 class="admin-title">Subscribers</h2>
        <Subscribers />
      </section>
    </div>
  </main>
</template>

<script>
import Api from '@/services/Api'
import TransactionTable from '@/components/TransactionTable'
import ShowsInfo from '@/components/ShowsInfo'
import Subscribers from '@/components/Subscribers'
export default {
  name: 'admin-page',
  components: {
    TransactionTable,
    ShowsInfo,
    Subscribers,
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      try {

      }
      catch(err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.$store.dispatch('changePage')
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#admin-page {
  h5 {
    color: #fff;
    text-align: right;
  }
  .admin-title {
    border-bottom: 3px solid #fff;
    margin: 1em 0;
    padding-bottom: 0.5em;
  }
  #admin-wrapper {
    background-color: #444;
    padding: 8em 6em 8em 6em;

    h2 {
      color: #fff;
    }
  }
}

</style>
