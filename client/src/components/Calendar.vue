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
