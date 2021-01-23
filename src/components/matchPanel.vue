<template>
  <div class="match">
    <div class="match-stats">
      <div class="match-stats-item">
        <p>
          {{ user.season.wins }}
        </p>
        <p>Wins</p>
      </div>
      <div class="match-stats-item">
        <p>
          {{ user.season.losses }}
        </p>
        <p>losses</p>
      </div>
      <div class="match-stats-item">
        <p>+{{ user.season.maxStreak }}</p>
        <p>Max Streak</p>
      </div>
    </div>
    <h5 class="match-header">Ladder games played in the last 24 hours</h5>
    <div class="match-results">
      <div v-for="(game, key) in ladder" :key="key" class="match-game">
        <p
          :class="
            game.winner_id === game.players[0].id
              ? 'match-winner'
              : 'match-loser'
          "
        >
          {{ game.players[0].username }}
        </p>
        <p class="match-versus">vs</p>
        <p
          :class="
            game.winner_id === game.players[1].id
              ? 'match-winner'
              : 'match-loser'
          "
        >
          {{ game.players[1].username }}
        </p>
      </div>
    </div>

    <h5 class="match-header">Quick games played in the last 24 hours</h5>
    <div class="match-results">
      <div v-for="(game, key) in quick" :key="key" class="match-game">
        <p
          :class="
            game.winner_id === game.players[0].id
              ? 'match-winner'
              : 'match-loser'
          "
        >
          {{ game.players[0].username }}
        </p>
        <p class="match-versus">vs</p>
        <p
          :class="
            game.winner_id === game.players[1].id
              ? 'match-winner'
              : 'match-loser'
          "
        >
          {{ game.players[1].username }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      ladder: [],
      quick: [],
    };
  },
  async created() {
    if (this.user.id === -1) return;
    const res = await this.$http.get(`/user/match-history/${this.user.id}`);
    for (const match of res.data) {
      if (match.game_room === 0) this.ladder.push(match);
      else if (match.game_room === 1) this.quick.push(match);
    }
  },
};
</script>

<style lang='scss' scoped>
.match {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  &-stats {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    &-item {
      width: 75px;
      height: 75px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: rgb(73, 73, 73);
      font-size: 11px;
      justify-content: center;
      background-color: rgb(226, 226, 226);
      border-radius: 10px;
    }
  }
  &-header {
    color: gray;
  }
  &-results {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &-game {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-loser {
    width: 150px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: rgba(51, 124, 153, 0.274);
    color: #fafafa;
  }
  &-winner {
    width: 150px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fafafa;
    background-color: rgb(51, 124, 153);
  }

  &-versus {
  }
}
</style>