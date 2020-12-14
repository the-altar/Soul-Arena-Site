<template>
  <div class="main">
    <NewsBody
      v-for="(news, key) in newsList"
      class="main-body"
      :news="news"
      :key="key"
    />
  </div>
</template>

<script>
import NewsBody from "@/components/news.body.vue";
export default {
  components: {
    NewsBody,
  },
  data() {
    return {
      newsList: [],
    };
  },
  async created() {
    try {
      const res = await this.$http.get("/thread/news");
      this.newsList = res.data;
    } catch (err) {
      alert(err);
    }
  },
};
</script>

<style lang="scss">
.news {
  &-title {
    margin: 5px;
    label {
      font-weight: bold;
      font-size: 14px;
    }
  }
}
</style>