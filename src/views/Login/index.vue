<template>
  <div>
    <div class='main'>
      <div class='main-body-head'>
        <div class='main-header'>
          <h5>Log in!</h5>
          <p>Already have an account? Enter your credential below to access it! Oh, you don't have one yet? <router-link :to='"/register"'>Then click here to create one!</router-link></p>
        </div>
      </div>
      <div class='main-body-content center'>
        <input class="input" v-model="username" type="text" placeholder="Username">
        <input class="input" v-model="password" type="password" placeholder="Password">
        <button @click="login()" class="input input-btn">Sign in</button>
      </div>
      <div class='main-body-footer'></div>
    </div>
  </div>
</template>

<script>
import components from "./script/components";
import computed from "./script/computed";
import methods from "./script/methods";
import watchers from "./script/watchers";

export default {
  data() {
    return {
      password:'',
      username:''
    };
  },
  components,
  computed,
  methods,
  watchers,
};
</script>

<style lang="scss">
@import "./style";
</style>