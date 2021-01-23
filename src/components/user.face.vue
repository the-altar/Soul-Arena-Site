<template>
  <div class="user">
    <img class="user-avatar" :src="`/img/avatars/${user.avatar}`" />
    <div class="user-info">
      <p class="user-info-name">
        {{ user.username }}
        <span
          :class="user.online ? 'user-status-online' : 'user-status-offline'"
        ></span>
      </p>
      <p class="user-info-rank">
        {{ user.rank.rankName }}, Level {{ user.season.seasonLevel }}
      </p>
      <p class="user-info-rank">
        Join date:
        {{ new Date(user.joined_at) | moment("dddd, MMMM Do YYYY") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
};
</script>

<style lang='scss' scoped>
.user {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  &-avatar {
    width: 75px;
    height: 75px;
    box-sizing: border-box;
    float: left;
    border-radius: 50%;
  }

  &-info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    &-name {
      font-size: 16px;
      display: inline-block;
      display: flex;
      align-items: center;
      font-weight: bold;
      margin: 0;
    }

    &-rank {
      font-size: 10px;
      display: inline-block;
      font-weight: bold;
      color: gray;
      margin: 0;
    }
  }
  &-status-online {
    margin-left: 10px;
    display: inline-block;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    background-color: rgb(132, 204, 23);
    box-shadow: 0 0 2px 2px rgba(132, 204, 23, 0.5);
  }
  &-status-offline {
    margin-left: 10px;
    display: inline-block;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    background-color: rgb(245, 0, 41);
    box-shadow: 0 0 2px 2px rgba(245, 0, 41, 0.5);
  }
}
</style>