<template>
  <div class="calendar-wrapper">
    <div class="dates-links">
      <span @click="this.handleUpcomingClick" class="dates-active">Upcoming Dates</span>
      <span @click="this.handlePastClick">Past Dates</span>
    </div>
    <div class="calendar-row" v-for="(show) in displayedShows" :key="show.id">
      <div class="calendar-row-wrapper">
        <div class="calendar-col show-date">
          <p>{{show.date}}</p>
        </div>
        <div class="calendar-col show-location">
          <p class="show-city">{{show.city}}</p>
          <p class="show-venue"><a :href="show.link" target="_blank">{{show.venue}}</a></p>
        </div>
        <div class="calendar-col show-btns">
          <button class="button">Tickets</button>
          <button class="button">RSVP</button>
        </div>
      </div>
    </div>
    <div class="view-full-calendar">
      <button>View Full Calendar</button>
    </div>
  </div>
</template>

<script>
import Api from '@/services/Api'
export default {
  data() {
    return {
      allShows: [],
      displayedShows: []
    }
  },
  methods: {
    async fetchShows() {
      const shows = await Api().get('shows')
      this.allShows = shows.data
      this.displayedShows = shows.data.upcoming
    },
    handlePastClick() {
      this.displayedShows = this.allShows.past
    },
    handleUpcomingClick() {
      this.displayedShows = this.allShows.upcoming
    }
  },
  mounted() {
    this.fetchShows()
  }
}
</script>
<style lang="scss">
@import '@/css/main.scss';
.calendar-wrapper {
  min-width: 650px;

  .dates-links {
    span {
      margin-right: 0.7em;
    }

    .dates-active {
      color: #a9c5e8;
    }
  }

  .calendar-row {
    .calendar-row-wrapper {
      padding: 0.5em 0;
      border-bottom: 2px solid #444;
      display: flex;
      align-items: center;

      .calendar-col {
        flex: 1;
      }

      .show-date p{
        font-size: 1.3em;
      }

      .show-city {
        font-style: italic;
      }

      .show-venue {
        font-size: 1.2em;
      }

      .show-btns {
        text-align: right;
        button {
          @extend %button2-styles;
        }
      }
    }
  }

  .view-full-calendar {
    text-align: center;
    padding: 1em 0;
    button {
      @extend %button2-styles;
    }
  }
}
</style>

