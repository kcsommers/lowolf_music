<template>
  <div id="admin-login">
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
      password: ''
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault()
      const data = {
        name: this.name,
        password: this.password
      }
      const admin = await Api().post('/auth/login', data)
    }
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
#admin-login {
  #login-wrapper {
    min-height: calc(100vh - 220px);
    background-color: #444;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8em 0;

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
