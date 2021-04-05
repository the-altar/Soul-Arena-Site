<template>
  <div>
    <news />
    <div v-if="isVisible" class="main">
      <div class="news-title">
        <label>Tittle: </label>
        <input v-model="title" type="text" />
        <br />
        <label>News banner: </label>
        <input v-model="bannerUrl" type="text" />
        <label>is news: </label>
        <input v-model="isNews" type="checkbox" />
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
      bannerUrl: null,
      isNews: false,
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