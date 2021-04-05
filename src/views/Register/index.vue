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
        <table class="form">
          <!--USERNAME-->
          <tr class="form-desc">
            <td colspan="100%">
              Your username cannot be changed after registration and can only
              contain letters, numbers, dots, underscores and dashes. At least 3
              characters long with a maximum of 16 characters.
            </td>
          </tr>
          <tr class="form-data">
            <td class="form-label" colspan="30%">Username</td>
            <td colspan="70%">
              <input
                v-model="username"
                autocomplete="off"
                class="form-input form-input--large"
                type="text"
              />
              <img
                v-if="validUsername"
                src="~@/assets/img/icons/ok.gif"
                alt="ok"
              />
              <img v-else src="~@/assets/img/icons/nope.gif" alt="nope" />
            </td>
          </tr>
          <!-- PASSWORD -->
          <tr class="form-desc">
            <td colspan="100%">
              Fill in your desired password. This password needs to be at least
              6 characters long and is case sensitive.
            </td>
          </tr>
          <tr class="form-data">
            <td class="form-label" colspan="30%">Password</td>
            <td colspan="70%">
              <input
                v-model="password"
                autocomplete="off"
                class="form-input"
                type="password"
              />

              <img
                v-if="validPassword"
                src="~@/assets/img/icons/ok.gif"
                alt="ok"
              />
              <img v-else src="~@/assets/img/icons/nope.gif" alt="nope" />
            </td>
          </tr>

          <!-- CONFIRM PASSWORD -->
          <tr class="form-desc">
            <td colspan="100%">
              Please fill in your password again to make sure you didn't type
              any mistakes.
            </td>
          </tr>
          <tr class="form-data">
            <td class="form-label" colspan="30%">Confirm password</td>
            <td colspan="70%">
              <input
                autocomplete="off"
                v-model="confirmPassword"
                class="form-input"
                type="password"
              />

              <img
                v-if="confirmedPassword"
                src="~@/assets/img/icons/ok.gif"
                alt="ok"
              />
              <img v-else src="~@/assets/img/icons/nope.gif" alt="nope" />
            </td>
          </tr>

          <!-- EMAIL -->
          <tr class="form-desc">
            <td colspan="100%">
              We won't spam your inbox! This email will be used for things like
              recovering your password. It won't be displayed publicly either.
            </td>
          </tr>
          <tr class="form-data">
            <td class="form-label" colspan="30%">E-mail</td>
            <td colspan="70%">
              <input
                autocomplete="off"
                v-model="email"
                class="form-input form-input--large"
                type="text"
              />

              <img
                v-if="validEmail"
                src="~@/assets/img/icons/ok.gif"
                alt="ok"
              />
              <img v-else src="~@/assets/img/icons/nope.gif" alt="nope" />
            </td>
          </tr>
        </table>
        <p v-if="errMsg" class="form-err">
          {{ errMsg }}
        </p>
        <button @click="register" class="form-btn">Register</button>
      </div>
      <loading v-else class="main-body-content center"></loading>
      <div class="main-body-footer"></div>
    </div>
  </div>
</template>

<script>
import loading from "@/components/loading.vue";
export default {
  components: {
    loading,
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      errMsg: "",
      requestSent: false,
    };
  },
  computed: {
    validUsername() {
      const r = /^([a-zA-Z0-9-_]{3,})$/.test(this.username);
      return r && this.username.length <= 16;
    },
    validPassword() {
      if (this.password.length > 5) return true;
      return false;
    },
    confirmedPassword() {
      if (
        this.password === this.confirmPassword &&
        this.confirmPassword.length > 5
      )
        return true;
      return false;
    },
    validEmail() {
      return /\S+@\S+\.\S+/.test(this.email);
    },
  },
  methods: {
    async register() {
      if (
        !this.validUsername ||
        !this.validPassword ||
        !this.validEmail ||
        !this.confirmedPassword
      )
        return;

      this.requestSent = true;
      try {
        const res = await this.$http.post("/user/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.$store.commit("user/setPermissions", res.data);
        this.$router.push("/");
        this.$colyseus
          .joinOrCreate("lobby", res.data)
          .then((room) => {
            this.$store.commit("lobby/SET_ROOM", room);
          })
          .catch(() => {
            this.$store.commit("lobby/SET_ROOM", null);
          });
      } catch (e) {
        this.reset();
      }
    },
    reset() {
      this.password = "";
      this.username = "";
      this.confirmPassword = "";
      this.email = "";
      this.requestSent = false;
      this.errMsg =
        "There's something wrong. Your username or email are likely already in use.";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style";
</style>