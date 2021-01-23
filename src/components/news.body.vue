<template>
  <div>
    <div class="main-body-head">
      <div class="main-icon">
        <img :src="`/img/avatars/${news.author.avatar}`" />
      </div>
      <div class="main-header">
        <h5>
          <img src="~@/assets/img/icons/right-arrow-blue.svg" height="10px" />{{
            news.title
          }}
        </h5>
        <p>
          posted by:
          <router-link
            :to="{ name: 'user', params: { username: news.author.username } }"
            >{{ news.author.username }}</router-link
          >, on
          {{
            new Date(news.created_at) | moment("dddd, MMMM Do YYYY, h:mm:ss a")
          }}
        </p>
      </div>
    </div>

    <div v-if="readOnly" class="main-body-content" v-html="news.content"></div>
    <div class="news-title" v-if="!readOnly">
      <label>banner url: </label>
      <input v-model="news.meta.bannerUrl" type="text" />
    </div>
    <TextEditor
      @close-editor="readOnly = true"
      v-if="!readOnly"
      :content="news.content"
      @content-captured="updatePost"
    />

    <div class="main-body-footer">
      <img
        v-if="isAdmin"
        @click="readOnly = false"
        src="~@/assets/img/icons/edit.svg"
      />
      <a @click="seeNews(news.title, news.id)">
        <img src="~@/assets/img/icons/comments.svg" /> leave a comment ({{
          news.post_count
        }})
      </a>
    </div>
  </div>
</template>

<script>
import TextEditor from "@/components/textEditor.vue";
export default {
  props: ["news"],
  components: {
    TextEditor,
  },
  methods: {
    date(d) {
      const d1 = new Date(d);
      return new Date(d1.valueOf() - d1.getTimezoneOffset() * 60000);
    },
    async updatePost(e) {
      try {
        const res = await this.$http.put("/thread", [
          this.news.id,
          e,
          this.news.meta,
        ]);
        this.news.content = res.data.content;
      } catch (err) {
        alert(err);
      }
    },
    seeNews(title, id) {
      this.$router.push(`/news/${id}/${title.trim().split(" ").join("-")}`);
    },
  },
  computed: {
    isAdmin() {
      return this.$store.getters["user/permissions"].authLevel >= 99;
    },
  },
  data() {
    return {
      readOnly: true,
    };
  },
};
</script>

<style>
</style>