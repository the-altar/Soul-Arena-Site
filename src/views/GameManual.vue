<template>
  <div>
    <div class="main">
      <div class="main-body-head">
        <div class="main-header">
          <h5>Game Manual</h5>
          <p>
            For new players entering Soul-Arena.app for the first time, our game
            manual provides you with all the information you need to get started
            right away. It contains info about the game itself, and everything
            related to it.
          </p>
        </div>
      </div>
      <div class="main-body-content center">
        <div class="manual-item flex">
          <div class="manual-item-content flex flex-col">
            <p class="manual-item-content-header">
              <img src="~@/assets/img/icons/set.gif" /> Characters and Skills
            </p>
            <div class="manual-item-content-text">
              Soul Arena focuses on characters and skills. This page gives you
              an overview of all characters available in the Soul-Arena game.
            </div>
            <router-link class="manual-item-content-link" :to="{name:'characters-and-skills'}"
              >See more of characters and skills</router-link
            >
          </div>

          <img
            class="manual-item-thumbnail"
            src="~@/assets/img/thumbnail/1.jpg"
            alt="thumbnail"
          />
        </div>
      </div>
      <div class="main-body-footer"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.manual {
  &-item {
    width: 100%;
    height: 100px;

    &-thumbnail {
      width: 100px;
      margin: 0;
      border: 1px solid black;
    }

    &-content {
      width: 80%;
      height: 100%;
      &-text {
        box-sizing: border-box;
        padding: 5px;
        font-size: 11px;
        height: 60%;
        background-color: rgba(236, 236, 236, 0.479);
        border-top: dashed 1px rgba(128, 128, 128, 0.623);
        border-bottom: dashed 1px rgba(128, 128, 128, 0.623);
      }
      &-header {
        margin: 0;
        margin-right: auto;
        margin-left: 5px;
        color: #2f7e8a;
        font-weight: bold;
        margin-bottom: 5px;
        img {
          margin: 0;
        }
      }
      &-link {
        margin-left: auto;
        margin-right: 10px;
        margin-top: 2px;
        font-weight: bold;
        color: #dd0028;
        font-size: 11px;
        text-decoration: none;
      }
    }
  }
}
</style>