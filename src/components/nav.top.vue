<template>
  <div class="nav">
    <div class="nav-content">
      <a target="_blank" href="https://discord.com/invite/F6QGtcTqfB" class="flex nav-discord">
        <img src="~@/assets/img/icons/discord.svg" alt="" />
        Discord
      </a>
      <li class="flex">Users online: {{ userCount }}</li>
      <li class="flex" v-if="!isGuest">
        Welcome, <span class="nav-username">{{ auth.username }}</span>
      </li>
      <li v-if="!isGuest" class="flex nav-link">My Account</li>
      <li v-if="!isGuest" @click="logout" class="flex nav-link">Logout</li>
      <li v-if="isGuest" class="flex nav-form">
        Login:
        <input class="flex nav-login" placeholder="username" type="text" />
        <input class="flex nav-login" placeholder="password" type="text" />
      </li>
      <li v-if="isGuest">Lost Password</li>
      <!--<li v-if="isGuest">Register</li>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userCount: 0,
    };
  },
  computed: {
    auth() {
      return this.$store.getters["user/permissions"];
    },
    isVisible() {
      return this.auth.authLevel >= 0;
    },
    isGuest() {
      return this.auth.authLevel < 0;
    },
  },
  methods: {
    async logout() {
      this.$http.post("/user/logout");
      this.$store.commit("lobby/DISCONNECT");
      this.$router.push("/");
      this.$store.commit("user/setPermissions", { authLevel: -1 });
    },
    async whoIsOnline() {
      const c = await this.$http.get("/online");
      this.userCount = c.data.count;
    },
  },
  async created() {
    this.whoIsOnline();
    setInterval(() => {
      this.whoIsOnline();
    }, 300000);
  },
};
</script>

<style lang='scss' scoped>
.nav {
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  width: 1200px;
  height: 40px;
  margin-bottom: 25px;
  text-align: center;
  color: #fafafa;
  background-image: url("~@/assets/img/tag-slanded.png");
  background-repeat: no-repeat;
  background-position: center top;
  border-top: 10px solid #2b2b2b;

  &-content {
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 32px;
    width: 760px;
    background-color: #303030;
    margin-bottom: auto;
    color: rgb(196, 196, 196);
  }

  &-username {
    font-weight: bolder;
  }

  &-link {
    cursor: pointer;
  }

  &-form {
  }

  &-discord {
    img {
      height: 20px;
      margin-right: 5px;
    }
    color: turquoise;
  }

  &-login {
    width: 125px;
    margin: 0 5px 0 5px;
    padding-left: 10px;
    font-size: 11px;
    color: #fafafa;
    background-color: gray;
    border: none;
    border-radius: 10px;
  }
}
</style>