<template>
  <div>
    <div class="main">
      <div class="main-body-head">
        <div class="main-header">
          <h5>Log in!</h5>
          <p>
            Already have an account? Enter your credential below to access it!
            Oh, you don't have one yet?
            <router-link :to="'/register'"
              >Then click here to create one!</router-link
            >
          </p>
        </div>
      </div>
      <div v-if="!loginRequest" class="main-body-content center">
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

        <p class="err">{{ err }}</p>
        <button @click="login()" class="input input-btn">Sign in</button>
      </div>
      <loading v-else class="main-body-content center"></loading>
      <div class="main-body-footer"></div>
    </div>
  </div>
</template>

<script>
import loading from "../../components/loading.vue";
import components from "./script/components";
import computed from "./script/computed";
import methods from "./script/methods";
import watchers from "./script/watchers";

export default {
  components: { loading },
  data() {
    return {
      password: "",
      username: "",
      loginRequest: false,
      err: "",
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
.err {
  font-size: 11px;
  color: firebrick;
  margin: 10px;
}
</style>