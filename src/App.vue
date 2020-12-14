<template>
  <main id="app">
    <aside class="aside aside--top aside--smaller">
      <button class="btn reef" @click="openGame">Start Game</button>

      <button class="btn reef" @click="$router.push('/')">Homepage</button>

      <button
        v-if="isMember"
        @click="$router.push(`/user/${auth.username}`)"
        class="btn reef"
      >
        My Account
      </button>

      <button
        v-if="!isMember"
        @click="$router.push('/register')"
        class="btn reef"
      >
        Register
      </button>

      <button v-if="!isMember" @click="$router.push('/login')" class="btn reef">
        Login
      </button>

      <button class="btn reef">Characters</button>

      <button v-if="isMember" @click="logout()" class="btn reef">Logout</button>
    </aside>

    <div class="container">
      <banner></banner>
      <router-view> </router-view>
    </div>

    <aside class="aside aside--top">
      <div class="aside-box">
        <div class="aside-box-head">
          <p>
            <img
              height="10px"
              src="~@/assets/img/icons/right-arrow-white.svg"
            />
            Points ladder
          </p>
        </div>
        <div class="aside-box-body">
          <li>
            <img src="~@/assets/img/icons/star.svg" />
            <img src="https://placewaifu.com/image/75/75" />
            <p>Blackspot</p>
          </li>
          <li>
            <img src="~@/assets/img/icons/insignia.svg" />
            <img src="https://placewaifu.com/image/75/75" />
            <p>Kostas</p>
          </li>
          <li>
            <img src="~@/assets/img/icons/insignia-1.svg" />
            <img src="https://placewaifu.com/image/75/75" />
            <p>Sparks Marshall</p>
          </li>
        </div>
      </div>
      <div class="aside-box">
        <div class="aside-box-head">
          <p>
            <img
              height="10px"
              src="~@/assets/img/icons/right-arrow-white.svg"
            />
            Streak ladder
          </p>
        </div>
        <div class="aside-box-body">
          <li>
            <img src="~@/assets/img/icons/star.svg" />
            <img src="https://placewaifu.com/image/75/75" />
            <p>Blackspot</p>
          </li>
          <li>
            <img src="~@/assets/img/icons/insignia.svg" />
            <img src="https://placewaifu.com/image/75/75" />
            <p>Kostas</p>
          </li>
          <li>
            <img src="~@/assets/img/icons/insignia-1.svg" />
            <img src="https://placewaifu.com/image/75/75" />
            <p>Sparks Marshall</p>
          </li>
        </div>
      </div>
      <div class="aside-box">
        <div class="aside-box-head">
          <p>
            <img
              height="10px"
              src="~@/assets/img/icons/right-arrow-white.svg"
            />
            Latest poll
          </p>
        </div>
        <div class="aside-box-body"></div>
      </div>
    </aside>
  </main>
</template>

<script>
import banner from "@/components/banner.vue";
export default {
  components: { banner },
  methods: {
    openGame() {
      const y = window.top.outerHeight / 2 + window.top.screenY - 550 / 2;
      const x = window.top.outerWidth / 2 + window.top.screenX - 800 / 2;
      window.open(
        "/game",
        "mywin",
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${775}, height=${550}, top=${y}, left=${x}`
      );
    },
    async logout() {
      this.$http.post("/user/logout");
      this.$router.push("/");
      this.$store.commit("user/setPermissions", { authLevel: -1 });
    },
  },
  computed: {
    auth() {
      return this.$store.getters["user/permissions"];
    },
    isVisible() {
      return this.auth.authLevel >= 0;
    },
  },
  async created() {
    try {
      const res = await this.$http.get("/user");
      this.$store.commit("user/setPermissions", res.data);
    } catch (err) {
      alert(err);
    }
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>