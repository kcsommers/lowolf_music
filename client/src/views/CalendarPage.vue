<template>
  <section id="calendar-page">
    <div id="calendar-page-wrapper">
      <Calendar :full="true" />
    </div>
  </section>
</template>

<script>
import Calendar from '@/components/Calendar'
export default {
  name: 'calendar-page',
  components: {
    Calendar
  },
  created() {
    this.$store.commit('pageChange', {page: 'calendar'})
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#calendar-page {
  background-color: #444;
  #calendar-page-wrapper {
    min-height: calc(100vh - 220px);
    padding: 6em;
    .calendar-wrapper {
      border: 3px solid #fff;
      padding: 3em;
      .dates-links {
        span {
          color: #fff;
        }
        .dates-active {
          color: #a9c5e8;
        }
      }

      .calendar-row {
        .calendar-row-wrapper {
          border-color: #fff;
          .calendar-col {
            p {
              color: #fff;
            }
          }
        }
      }
    }
  }

}
</style>
