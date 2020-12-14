<template>
  <div>
    <news />
    <div v-if="isVisible" class="main">
      <div class="news-title">
        <label>Tittle: </label>
        <input v-model="title" type="text" />
      </div>
      <TextEditor @content-captured="saveContent" :content="''" />
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
      title: "",
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