<template>
  <div id="admin-login">
    <h3 v-show="message">{{message}}</h3>
    <div id="login-wrapper">
      <form @submit="handleSubmit">
        <label for="name">Name:
          <input required v-model="name" type="text" name="name" />
        </label>
        <label for="password">Password:
          <input required v-model="password" type="password" name="password" />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
</template>

<script>
import Api from '@/services/Api'
export default {
  name: 'admin-login',
  data() {
    return {
      name: '',
      password: '',
      message: '',
      tries: 0
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      const data = {
        name: this.name,
        password: this.password
      }
      try {
        const authInfo = await Api().post('/auth/login', data)
        this.requestAdminPage(authInfo.data.user, authInfo.data.token)
      }
      catch(err) {
        this.name = ''
        this.password = ''
        this.message = 'No such luck. Give it another go.'
        this.tries = this.tries + 1
      }
    },
    async requestAdminPage(user, token) {
      try {
        const verified = await Api().get('/admin', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        const authUser = {user: user.name, token}
        localStorage.setItem('authUser', JSON.stringify(authUser));
        this.$router.push('admin')
      }
      catch(err) {
        this.message = 'Unauthorized'
      }
    }
  },
  created() {
    this.$store.commit('pageChange', {page: 'admin-login'})
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#admin-login {
  padding: 8em 0;
  min-height: calc(100vh - 220px);
  background-color: #444;
  h3 {
    background-color: rgba(232, 59, 70, 0.6);
    border: 2px solid #e83b46;
    color: #fff;
    padding: 0.5em 0;
    border-radius: 20px;
    text-align: center;
    width: 60%;
    margin: 1em auto;
  }

  #login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    form {
      width: 60%;
      margin: 0 auto;
      label {
        color: #fff;
      }

      input[type=text], input[type=password] {
        display: block;
        background-color: #fff;
        outline: none;
        border: none;
        font-size: 1.5em;
        padding: 0.5em 1em;
        width: 100%;
        margin-bottom: 1em;
        border-radius: 5px;
      }

      input[type=submit] {
        @extend %button-styles;
        color: #fff;
        border-color: #fff;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
