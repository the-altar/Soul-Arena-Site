<template>
  <nav class="nav nav--top">
    <div class="nav-box">
      <div class="nav-box-head">
        <p class="nav-box-head-title">Ladderboard</p>
        <p class="nav-box-head-short">Who ranks among the best</p>
      </div>
      <div class="nav-box-body">
        <div
          v-for="(user, key) in topLadder"
          :key="user.id"
          class="nav-box-body-list"
        >
          <p class="nav-user-rank">#{{ key + 1 }}</p>
          <img class="nav-user-avatar" :src="`/img/avatars/${user.avatar}`" />
          <div class="nav-user-name">
            <p class="nav-user-name-top">{{ user.username }}</p>
            <p class="nav-user-name-bottom">Level: {{ user.season_level }}</p>
          </div>
          <p class="nav-user-exp">{{ user.experience }}<span>xp</span></p>
        </div>
      </div>
    </div>

    <div class="nav-box">
      <div class="nav-box-head">
        <p class="nav-box-head-title">Highest Streaks</p>
        <p class="nav-box-head-short">There's no stopping them</p>
      </div>
      <div class="nav-box-body">
        <div
          v-for="(user, key) in topStreak"
          :key="user.id"
          class="nav-box-body-list"
        >
          <p class="nav-user-rank">#{{ key + 1 }}</p>
          <img class="nav-user-avatar" :src="`/img/avatars/${user.avatar}`" />
          <div class="nav-user-name">
            <p class="nav-user-name-top">{{ user.username }}</p>
            <p class="nav-user-name-bottom">
              Max Streak: +{{ user.max_streak }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      topLadder: [],
      topStreak: [],
    };
  },
  async created() {
    const topLadder = await this.$http.get("/ladder");
    const topStreak = await this.$http.get("/streak");

    this.topLadder = topLadder.data;
    this.topStreak = topStreak.data;
  },
};
</script>

<style lang='scss' scoped>
.nav {
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &--top {
    align-self: flex-start;
  }

  &-box {
    width: 250px;
    margin-bottom: 10px;
    background-color: #fafafa;
    box-shadow: 18px 18px 36px #d5d5d5, -18px -18px 36px #ffffff;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 50px;
    &--top {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      overflow: hidden;
    }

    &-head {
      height: 50px;
      background-color: #363636;
      color: #fafafa;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 10px;
      box-sizing: border-box;
      background-image: url("~@/assets/img/container_bg.png");
      &-title {
        font-weight: bold;
        font-size: 12px;
        margin: 0;
      }
      &-short {
        font-size: 10px;
        margin: 0;
      }
    }

    &-body {
      &-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }

  &-nav {
    align-self: flex-start;
  }

  &-user {
    &-rank {
      margin: 0 5px 0 10px;
      color: #2b2b2b;
      font-size: 10px;
      font-weight: bolder;
    }
    &-avatar {
      margin: 5px;
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }

    &-name {
      margin: 5px;
      font-size: 12px;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      &-bottom {
        font-size: 10px;
        color: rgb(109, 109, 109);
      }
      p {
        margin: 0;
      }
    }

    &-exp {
      font-size: 12px;
      margin-left: auto;
      margin-right: 10px;
      color: gray;
    }
  }
}
</style>