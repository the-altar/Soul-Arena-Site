<template>
  <div>
    <div class="main">
      <div class="main-body-head">
        <div class="main-header main-header--large">
          <h5>My Account</h5>
        </div>
      </div>
      <div class="main-body-content">
        <div v-if="user">
          <img class="user-avatar" :src="`/img/avatars/${user.avatar}`" />
          <p class="user-name">{{ user.username }}</p>
          <p class="user-rank">{{ user.rank.rankName }}</p>
          <div>
            <button v-if="auth.id === user.id">change avatar</button>
          </div>
        </div>

        <avatar-panel></avatar-panel>
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
      user: false,
    };
  },
  components,
  computed,
  methods,
  watchers,
  async created() {
    try {
      const res = await this.$http.post(`/user/${this.$route.params.username}`);
      this.user = res.data;
    } catch (err) {
      alert(err);
    }
  },
};
</script>

<style lang="scss">
@import "./style";
</style>