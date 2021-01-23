<template>
  <main id="app">
    <topNav />
    <div id="app-view">
      <aside class="aside aside--top aside--sticky">
        <div class="nav">
          <button class="btn" @click="openGame">
            <p class="btn-inner">
              <img src="~@/assets/img/icons/game.svg" alt="Start Game" />
              play
            </p>
          </button>

          <button class="btn" @click="$router.push('/')">
            <p class="btn-inner">
              <img src="~@/assets/img/icons/homepage.svg" alt="Homepage" />
              home
            </p>
          </button>

          <button
            v-if="isMember"
            @click="$router.push(`/user/${auth.username}`)"
            class="btn"
          >
            <p class="btn-inner">
              <img src="~@/assets/img/icons/user.svg" alt="Login" />
              Profile
            </p>
          </button>
          <button
            v-if="!isMember"
            @click="$router.push('/register')"
            class="btn"
          >
            <p class="btn-inner">
              <img src="~@/assets/img/icons/user.svg" alt="Login" />
              register
            </p>
          </button>
          <button v-if="!isMember" @click="$router.push('/login')" class="btn">
            <p class="btn-inner">
              <img src="~@/assets/img/icons/user.svg" alt="Login" />
              login
            </p>
          </button>

          <button class="btn" @click="$router.push({ name: 'game-manual' })">
            <p class="btn-inner">
              <img src="~@/assets/img/icons/manual.svg" alt="Manual" />
              manual
            </p>
          </button>
        </div>
      </aside>

      <div class="container">
        <banner></banner>
        <router-view></router-view>
      </div>

      <nav-right></nav-right>
    </div>
  </main>
</template>

<script>
import banner from "@/components/banner.vue";
import topNav from "@/components/nav.top.vue";
import navRight from "@/components/nav.right.vue";
export default {
  components: { banner, topNav, navRight },
  methods: {
    openGame() {
      const y = window.top.outerHeight / 2 + window.top.screenY - 550 / 2;
      const x = window.top.outerWidth / 2 + window.top.screenX - 800 / 2;
      window.open(
        "https://game.soul-arena.app/",
        "mywin",
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${775}, height=${550}, top=${y}, left=${x}`
      );
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
    const res = await this.$http.get("/user");
    this.$store.commit("user/setPermissions", res.data);
    this.$colyseus
      .joinOrCreate("lobby", res.data)
      .then((room) => {
        this.$store.commit("lobby/SET_ROOM", room);
      })
      .catch(() => {
        this.$store.commit("lobby/SET_ROOM", null);
      });
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>