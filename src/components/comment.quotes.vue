<template>
  <div
    v-if="comment && !comment.deleted"
    class="main comment"
    :id="`comment-${comment.id}`"
  >
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
        {{ new Date(comment.created_at) | moment("from", "now") }}
        <br />
        #{{ comment.id }}
      </p>
    </div>

    <div class="comment-text" v-html="comment.content"></div>
  </div>

  <div v-else class="main comment comment-deleted" :id="`comment-${comment.id}`">
    This post has been deleted!
  </div>
</template>

<script>
export default {
  props: ["comment"],
};
</script>
