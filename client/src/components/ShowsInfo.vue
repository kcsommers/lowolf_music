<template>
  <div id="shows-info">
    <div id="new-show-wrapper">
      <button @click="addShowClick"><i class="fas fa-plus"></i> Add a show</button>
      <div :class="{showDown: addShow, showFormWrapper: true}">
        <form @submit="handleSubmit">
          <label for="date">Date
            <input required v-model="date" type="text" name="date" placeholder="mm/dd/yyyy" />
          </label>
          <label for="date">Venue
            <input required v-model="venue" type="text" name="venue" />
          </label>
          <label for="date">City
            <input required v-model="city" type="text" name="city" placeholder="Asheville, NC" />
          </label>
          <label for="date">Link
            <input v-model="link" type="text" name="link" />
          </label>
          <input type="submit" value="Add Show" />
        </form>
      </div>
    </div>
    <section id="shows-info-calendar">
      <Calendar :full="true" :page="'admin'" ref="showInfoCal" />
    </section>
  </div>
</template>

<script>
import Api from '@/services/Api'
import Calendar from '@/components/Calendar'
import Vue from 'vue'
export default {
  name: 'shows-info',
  components: {
    Calendar
  },
  data() {
    return {
      date: '',
      venue: '',
      city: '',
      link: '',
      addShow: false
    }
  },
  methods: {
    addShowClick() {
      this.addShow = !this.addShow
    },
    async fetchShows() {
      const shows = await Api().get('shows')
      this.shows = shows.data.upcoming
    },
    async handleSubmit(e) {
      e.preventDefault()
      console.log('submit')
      try {
        const data = {
          date: this.date,
          venue: this.venue,
          city: this.city,
          link: this.link
        }
        const newShow = await Api().post('shows', data)
        this.$refs.showInfoCal.addShow(newShow.data)
      }
      catch(err) {
        console.log('Error creating show', err)
      }
    }
  },
  mounted() {
    this.fetchShows();
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#shows-info {
  #new-show-wrapper {
    padding: 1em 0;
    button {
      @extend %button2-styles;
    }

    .showFormWrapper {
      padding: 2em 0;
      display: none;
      form {
        label {
          color: #fff;
        }
        input[type=text] {
          display: block;
          outline: none;
          border: none;
          background-color: #fff;
          width: 50%;
          font-size: 1.3em; 
          padding: 0.5em;
          margin-bottom: 1em;
        }

        input[type=submit] {
          @extend %button-styles;
          color: #fff;
          border-color: #fff;
        }
      }
    }

    .showDown {
      display: block;
      animation-name: show-down;
      animation-duration: 0.5s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }
  }

  #shows-info-calendar {
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
