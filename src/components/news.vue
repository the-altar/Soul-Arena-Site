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
    margin: 10px;
    color: rgb(114, 114, 114);
    
    label {
      font-weight: bold;
      font-size: 12px;
    }
    input {
      margin: 5px;
      padding: 2px;
      border:none;
      border-radius: 10px;
      background-color: rgb(236, 235, 235);
      color: rgb(107, 106, 106);
    }
  }
}
</style>