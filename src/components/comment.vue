<template>
  <div
    v-if="content && !content.deleted"
    class="main comment"
    :id="`comment-${content.id}`"
  >
    <div class="comment-author">
      <img :src="`/img/avatars/${content.author.avatar}`" />
      <p style="margin-left: 10px">
        <span class="comment-username" :class="content.author.rank">{{
          content.author.username
        }}</span>
        <br />
        <span class="comment-rank">{{ content.author.rank }}</span>
      </p>

      <p class="comment-date">
        {{ new Date(content.created_at) | moment("from", "now") }}
        <br />
        #{{ content.id }}
      </p>
    </div>

    <div v-if="content.quotes.length" class="comment-replies">
      <comment-popover v-for="id in content.quotes" :id="id" :key="id" />
    </div>

    <div class="comment-text" v-html="content.content"></div>

    <div v-if="content.replies.length" class="comment-quotes">
      <comment-popover v-for="id in content.replies" :id="id" :key="id" />
    </div>

    <footer v-if="auth.authLevel >= 0" class="comment-options">
      <button v-if="comment.author.id === userId || auth.authLevel > 0">edit</button>
      <button v-if="auth.authLevel > 0" @click="deletePost">delete</button>
      <button v-if="!isQuoted" @click="quoteComment()">quote</button>
      <button v-else @click="unquoteComment()">unquote</button>
    </footer>
  </div>
  <div
    v-else
    class="main comment comment-deleted"
    :id="`comment-${content.id}`"
  >
    This post has been deleted
  </div>
</template>

<script>
import CommentPopover from "@/components/comment.popover.vue";
export default {
  components: {
    CommentPopover,
  },
  props: ["comment"],
  data() {
    return {
      content: {},
    };
  },
  methods: {
    quoteComment() {
      this.quoted = true;
      this.$store.commit("ADD_QUOTE", {
        quoteId: this.content.id,
        body: this.content,
      });
    },
    unquoteComment() {
      this.quoted = true;
      this.$store.commit("REMOVE_QUOTE", this.content.id);
    },
    async deletePost() {
      try {
        await this.$http.delete(
          `/thread/comment/${this.content.id}/${this.content.author.id}`
        );
        this.$set(this.content, "deleted", true);
      } catch (e) {
        alert(e)
      }
    },
  },
  computed: {
    userId(){
      return this.$store.getters['user/id']
    },
    auth() {
      return this.$store.getters["user/permissions"];
    },
    isQuoted() {
      return this.$store.getters["IS_QUOTED"](this.content.id);
    },
    comments() {
      return this.$store.getters["GET_COMMENTS"];
    },
  },
  created() {
    this.content = this.comment;
  },
};
</script>

<style lang='scss'>
.comment {
  &-replies {
    margin: 5px;
    li {
      cursor: pointer;
      list-style-position: inside;
      margin: 2px;
      font-size: 12px;
      color: #335281;
      text-decoration: underline;
      text-decoration-color: #2144796e;
    }
  }
  &-quotes {
    margin: 5px;
    display: flex;
    li {
      cursor: pointer;
      list-style-position: inside;
      display: inline-block;
      margin: 2px 5px 2px 2px;
      font-size: 12px;
      color: #816233;
      text-decoration: underline;
      text-decoration-color: #533c1b6e;
    }
  }

  &-deleted {
    font-size: 10px;
    color: gray;
  }
}
</style>