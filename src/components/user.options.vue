<template>
  <div class="menu">
    <button
      @click.self="emitComponent('avatar-panel')"
      class="menu-item"
      v-if="id === user.id"
    >
      Update avatar
    </button>
    <button @click.self="emitComponent('match-panel')" class="menu-item">
      Match history
    </button>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    emitComponent(payload) {
      this.$emit("update", payload);
    },
  },
  computed: {
    user() {
      return this.$store.getters["user/permissions"];
    },
  },
};
</script>

<style lang='scss' scoped>
.menu {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-item {
    width: 150px;
    height: 50px;
    border: none;
    color: gray;
    font-size: 12px;
    margin-right: 1px;
    background-color: rgb(233, 233, 233);
  }
}
</style>