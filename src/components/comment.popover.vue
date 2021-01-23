<template>
  <span>
    <v-popover trigger="hover">
      <!-- This will be the popover target (for the events and position) -->
      <li
        :class="{ 'comment-list-deleted': targetComment.deleted }"
        @click="scrollToPost(id)"
      >
        {{ id }}#
      </li>
      <!-- This will be the content of the popover -->
      <template slot="popover">
        <Comment :comment="targetComment" />
      </template>
    </v-popover>
  </span>
</template>

<script>
import Comment from "@/components/comment.quotes.vue";
export default {
  components: { Comment },
  props: ["id"],
  computed: {
    comments() {
      return this.$store.getters["GET_COMMENTS"];
    },
    targetComment() {
      if (this.$store.getters["GET_MEMORY"][this.id]) {
        return this.$store.getters["GET_MEMORY"][this.id];
      }
      for (const key in this.comments) {
        const comment = this.comments[key];
        if (comment.id == this.id) {
          this.$store.commit("SET_MEMORY", { key: this.id, data: comment });
          return comment;
        }
      }
      return {};
    },
  },
  methods: {
    scrollToPost() {
      this.$scrollTo(`#comment-${this.id}`, 0, {
        offset: -60,
        force: true,
        cancelable: true,
      });
    },
  },
};
</script>

<style lang='scss'>
.comment {
  &-list-deleted {
    text-decoration: line-through underline !important;
  }
}
</style>