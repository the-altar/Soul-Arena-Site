<template>
  <div class="main">
    <div class="comment-author">
      <img :src="`/img/avatars/${comment.author.avatar}`" />
      <p style="margin-left: 10px">
        <span class="comment-username" :class="comment.author.rank">{{
          comment.author.username
        }}</span>
        <br />
        <span class="comment-rank">{{ comment.author.rank }}</span>
      </p>

      <p class="comment-date">
        {{ date(comment.created_at) | moment("from", "now") }}
      </p>
    </div>
    <div class="comment-text" v-html="comment.content"></div>

    <footer v-if="auth.authLevel >= 0" class="comment-options">
      <button>edit</button>
      <button>delete</button>
      <button @click="reply = true">reply</button>
    </footer>

    <div v-if="reply" class="quote">
      <TextEditor @content-captured="replyToComment" :content="''" />
    </div>
  </div>
</template>

<script>
import TextEditor from "@/components/textEditor.vue";

export default {
  components: { TextEditor },
  props: ["comment"],
  data() {
    return {
      reply: false,
    };
  },
  methods: {
    date(d) {
      const d1 = new Date(d);
      return new Date(d1.valueOf() - d1.getTimezoneOffset() * 60000);
    },
    replyToComment(e) {
      console.log(e);
    },
  },
  computed:{
    auth(){
         return this.$store.getters['user/permissions'];
    }
  }
};
</script>

<style>
</style>