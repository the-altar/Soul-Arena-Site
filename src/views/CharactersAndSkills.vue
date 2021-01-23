<template>
  <div>
    <div class="main">
      <div class="main-body-head">
        <div class="main-header">
          <h5>Characters and Skills</h5>
          <p>
            Soul-Arena forces you to select 3 characters when you start a new
            game. This page gives you an overview of all characters available in
            the Soul-Arena game. Not only can you view each character's skills,
            you can also discuss the characters by posting comments.
          </p>
        </div>
      </div>
      <div class="main-body-content center">
        <div
          v-for="(char, key) of chartList"
          :key="key"
          class="char flex flex-col"
        >
          <p class="char-name">
            <img src="~@/assets/img/icons/set.gif" /> {{ char.name }}
          </p>
          <div class="char-profile flex">
            <img
              class="char-profile-pic"
              :src="`http://game.soul-arena.app/uploads/${char.facepic}.jpg`"
            />
            <p class="char-profile-text">
              {{ char.description }}
            </p>
          </div>
          <router-link class="char-link" :to="{name:'character-page', params:{characterId:char.id}}"
              >More about {{char.name}}</router-link
            >
        </div>
      </div>
      <div class="main-body-footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartList: [],
    };
  },
  async created() {
    const res = await this.$http.get("/character/api/profile");
    this.chartList = res.data;
  },
};
</script>

<style lang='scss' scoped>
.char {
  width: 90%;
  height: 100px;
  margin-bottom: 5px;
  &-name {
      img {
        margin: 0;
      }
      margin-right: auto;
      color: #2f7e8a;
      font-weight: bold;
    }
  &-profile {
    height: 70%;
    width: 100%;
    background-color: rgba(199, 199, 199, 0.13);
    border-top: 1px dashed rgba(128, 128, 128, 0.418);
    border-bottom: 1px dashed rgba(128, 128, 128, 0.418);

    &-pic {
      height: 48px;
      margin: 0;
      margin-right: auto;
      margin-left: 5px;
      border: 1px solid black;
      box-sizing: border-box;
    }

    &-text {
      margin-left: 5px;
      font-size: 11px;
    }
  }

  &-link {
    margin-left: auto;
    text-decoration: none;
    color: #dd0028;
    font-size: 11px;
    font-weight: bold;
  }
}
</style>