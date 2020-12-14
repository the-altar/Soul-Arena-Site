<template>
  <div>
    <div class="main">
      <div class="main-body-head">
        <div class="main-header">
          <h5>Register A New Account!</h5>
          <p>
            An account isn't required to play, but you'll need one to gain
            access to some features! It's quick and easy to make one!
          </p>
        </div>
      </div>
      <div v-if="!requestSent" class="main-body-content center">
        <input
          class="input"
          v-model="username"
          type="text"
          placeholder="Username"
        />
        <input
          class="input"
          v-model="password"
          type="password"
          placeholder="Password"
        />
        <input
          class="input"
          v-model="email"
          type="text"
          placeholder="your@email.com"
        />
        <button @click="register" class="input input-btn">Register</button>
      </div>

      <div v-else class="main-body-content center">
        <p>If all goes well you'll be redirected soon!</p>
        <p>{{ errMsg }}</p>
      </div>

      <div class="main-body-footer"></div>
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
      email: "",
      password: "",
      username: "",
      errMsg: "",
      requestSent: false,
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