<template>
  <div id="checkout-wrapper">
    <form @submit="handleSubmit" id="checkout-form">
      <input type="text" name="name" placeholder="Full Name" />
      <input type="email" name="email" placeholder="Email Address" />
      <input type="text" name="address1" placeholder="Address Line 1" />
      <input type="text" name="address2" placeholder="Address Line 2" />
      <input type="text" name="city" placeholder="City">
      <select name="state">
        <option disabled selected>Select State</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AR">Arkansas</option>
      </select>
      <input type="text" name="zip" placeholder="Zip Code" />
      <input type="submit" value="Checkout" />
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#checkout-wrapper {
  padding: 6em;
  #checkout-form {
    input, select {
      display: block;
      background: none;
      border: none;
      box-shadow: 2px 2px 10px #888;
      outline: none;
      font-size: 1.1em;
      width: 50%;
      padding: 1em;
      border-radius: 5px;
      margin: 1em 0 0 auto;
    }
  }
}
</style>
