<template>
  <div>
    <div class="main">
      <div class="main-body-content">
        <userface v-if="user" :user="user"></userface>
        <user-options
          @update="updateDynamicComponent"
          :id="user.id"
        ></user-options>
        <component :is="dynamicComponent" :user="user"></component>
      </div>
      <div class="main-body-footer"></div>
    </div>
  </div>
</template>

<script>
import components from "./script/components";
import computed from "./script/computed";
import watchers from "./script/watchers";

export default {
  data() {
    return {
      user: false,
      dynamicComponent: "",
    };
  },
  components,
  computed,
  methods: {
    updateDynamicComponent(e) {
      this.dynamicComponent = e;
    },
  },
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