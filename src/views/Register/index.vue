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
              characters long
            </td>
          </tr>
          <tr class="form-data">
            <td class="form-label" colspan="30%">Username</td>
            <td colspan="70%">
              <input
                v-model="username"
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
              <input v-model="password" class="form-input" type="password" />

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

        <button v-if="!requestSent" class="form-btn">Register</button>
        <div v-else>
          <p>You'll be redirected soon!</p>
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <div class="main-body-footer"></div>
    </div>
  </div>
</template>

<script>
import components from "./script/components";

export default {
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
      return r;
    },
    validPassword() {
      if (this.password.length > 5) return true;
      return false;
    },
    confirmedPassword() {
      if (this.password === this.confirmPassword) return true;
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
      } catch (err) {
        alert(err);
        this.errMsg = "It seems something went wrong...";
      }
    },
  },
  components,
};
</script>

<style lang="scss" scoped>
@import "./style";

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>