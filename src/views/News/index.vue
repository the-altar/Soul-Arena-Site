<template>
  <div>
    <div class="main">
      <NewsBody v-if="loaded" :news="this.thread" />
    </div>

    <Comment
      v-for="(comment, key) in this.comments"
      :comment="comment"
      :key="key"
    />

    <div class="main" v-if="auth.authLevel >= 0">
      <TextEditor @content-captured="postComment" :content="''" />
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
      comments: [],
      thread: {},
      loaded: false,
      reply: false,
    };
  },
  components,
  computed,
  methods,
  watchers,
  async created() {
    const id = this.$route.params.id;
    const siteArea = 0;

    try {
      const doc = await this.$http.get(`/thread/${id}/${siteArea}`);
      const comments = await this.$http.get(`/thread/${id}/comments/50`);

      this.thread = { ...doc.data };
      this.comments = { ...comments.data };

      this.loaded = true;
    } catch (err) {
      alert(err);
    }
  },
};
</script>

<style lang="scss">
@import "./style";
</style>