<template>
  <section
    class="banner"
    :style="{ backgroundImage: `url(${newsList[selected].meta.bannerUrl})` }"
  >
    <div class="banner-body">
      <p class="banner-title">{{ newsList[selected].title }}</p>
      <div class="banner-news-count">
        <li
          v-for="i of newsList.length"
          :class="{ 'banner--active': selected == i - 1 }"
          :key="i"
        ></li>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newsList: [{ meta: {} }],
      selected: 0,
    };
  },
  async created() {
    try {
      const res = await this.$http.get("/thread/news");
      this.newsList = res.data;
    } catch (err) {
      alert(err);
    }

    setInterval(() => {
      this.selected = (this.selected + 1) % this.newsList.length;
    }, 15000);
  },
};
</script>

<style lang="scss" >
.banner {
  width: 500px;
  height: 175px;
  text-align: center;
  background-color: #f7f7f7;
  border: 5px solid white;
  box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 10px;
  box-shadow: 5px 5px 16px #d5d5d5, -5px -5px 16px #ffffff;
  position: relative;

  &-body {
    width: 100%;
    height: 100px;
    bottom: 0;
    position: absolute;
    background: linear-gradient(
      to top,
      rgba(37, 37, 37, 0.7),
      rgba(0, 0, 0, 0)
    );
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding-bottom: 20px;
    padding-left: 20px;
    box-sizing: border-box;
  }

  &-title {
    color: #fafafa;
    font-size: 12px;
    font-weight: bolder;
    text-shadow: 0 0 5px 2px #fafafa;
    margin: 0;
  }

  &-news-count {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background-color: rgb(31, 31, 31);
      margin: 5px;
    }
  }

  &--active {
    background-color: turquoise !important;
    box-shadow: 0 0 5px 2px turquoise !important;
  }
}
</style>
