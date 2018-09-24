<template>
  <div class="calendar-wrapper">
    <div class="dates-links">
      <span @click="this.handleUpcomingClick" class="dates-active">Upcoming Dates</span>
      <span @click="this.handlePastClick">Past Dates</span>
    </div>
    <div class="calendar-row" v-for="(show, i) in displayedShows" :key="show.id">
      <div v-if="full || i < 4" class="calendar-row-wrapper">
        <div class="calendar-col show-date">
          <p>{{show.date}}</p>
        </div>
        <div class="calendar-col show-location">
          <p class="show-city">{{show.city}}</p>
          <p class="show-venue">
            <a :href="show.link" target="_blank">{{show.venue}}</a>
          </p>
        </div>
        <div class="calendar-col show-btns">
          <div v-if="page === 'admin'" id="show-admin-btns">
            <button id="going-btn">Going: {{show.rsvp}}</button>
            <button @click="deleteShow(show.id)" class="delete-btn">Delete Show</button>
          </div>
          <div v-else id="show-rsvp-btns">
            <a :href="show.link" class="button">Tickets</a>
            <button v-if="displaying === 'upcoming'" @click="rsvpClick(show.id)" class="button">RSVP</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="page !== 'admin'" class="view-full-calendar">
      <button>View Full Calendar</button>
    </div>
  </div>
</template>

<script>
import Api from '@/services/Api'
export default {
  name: 'calendar',
  props: {
    full: Boolean,
    page: String
  },
  data() {
    return {
      allShows: [],
      displayedShows: [],
      displaying: '',
      rsvpd: false
    }
  },
  methods: {
    async fetchShows() {
      const shows = await Api().get('shows')
      this.allShows = shows.data
      this.displayedShows = this.allShows.upcoming
      this.displaying = 'upcoming'
    },
    addShow(show) {
      this.allShows.upcoming.push(show)
      this.displayedShows = this.allShows.upcoming
    },
    handlePastClick() {
      this.displayedShows = this.allShows.past
      this.displaying = 'past'
    },
    handleUpcomingClick() {
      this.displayedShows = this.allShows.upcoming
      this.displaying = 'upcoming'
    },
    async deleteShow(id) {
      if(this.displaying === 'upcoming') {
        this.allShows.upcoming = this.allShows.upcoming.filter((show) => show.id !== id);
        this.displayedShows = this.allShows.upcoming
      }
      else {
        this.allShows.past = this.allShows.past.filter((show) => show.id !== id);
        this.displayedShows = this.allShows.past
      }
      const response = await Api().delete(`/shows/${id}`)
    },
    async rsvpClick(id) {
      const response = await Api().put(`/shows/rsvp/${id}`)
      this.rsvpd = true
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
        a, button {
          @extend %button2-styles;
          margin-left: 1em;
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

