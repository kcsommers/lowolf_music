<template>
  <div id="subscribe-wrapper">
    <h2>Join the mailing list!</h2>
    <form @submit="handleSubmit" method="POST" id="subscribe-form">
      <input required v-model="name" type="text" name="name" placeholder="Full Name" />
      <input required v-model="email" type="email" name="email" placeholder="Email" />
      <input type="submit" value="Subscribe" />
    </form>
  </div>
</template>

<script>
import Api from '@/services/Api'
export default {
  name: 'subscribe',
  data() {
    return {
      name: '',
      email: ''
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      const data = {
        name: this.name,
        email: this.email
      }
      const response = await Api().post('subscribers/subscribe', data)
    }
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#subscribe-wrapper {
  background-color: #333;
  text-align: center;
  color: #fff;
  padding: 6em;

  h2 {
    color: #fff;
  }

  #subscribe-form {
    input {
      display: block;
      border: none;
      outline: none;
      background-color: #fff;
    }

    input[type=text], input[type=email] {
      width: 100%;
      font-size: 1.2em;
      padding: 1em;
      margin: 1em auto;
    }

    input[type=submit] {
      @extend %button2-styles;
      margin: 0 auto;
    }
  }
}
</style>
