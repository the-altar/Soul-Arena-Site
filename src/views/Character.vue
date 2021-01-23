<template>
  <div>
    <div class="main">
      <div class="main-body-head">
        <div class="main-header">
          <h5>Character and Skills — {{ char.name }}</h5>
          <p>
            Soul-Arena forces you to select 3 characters when you start a new
            game. This page gives you an overview of all characters available in
            the Soul-Arena game. Not only can you view each character's skills,
            you can also discuss the characters by posting comments.
          </p>
        </div>
      </div>
      <div class="main-body-content center">
        <div class="flex flex-col">
          <p class="char-name">
            <img src="~@/assets/img/icons/set.gif" /> {{ char.name }}
          </p>
          <div class="flex char-profile">
            <img
              :src="`http://game.soul-arena.app/uploads/${char.facepic}.jpg`"
              alt=""
            />
            <p>
              {{ char.description }}
            </p>
          </div>
          <p class="char-req">Requirement to unlock:</p>
        </div>

        <div
          v-for="(skill, key) of char.skills.slice(0, 4)"
          :key="key"
          class="char-skill flex flex-col"
        >
          <p class="char-name char-skill-name">
            <img src="~@/assets/img/icons/set.gif" /> {{ skill.name }}
          </p>
          <div class="flex char-profile">
            <img
              :src="`http://game.soul-arena.app/uploads/${skill.skillpic}.jpg`"
              alt=""
            />
            <p>
              {{ skill.description }}
            </p>
          </div>
          <div class="char-skill-footer">
            <div class="flex char-skill-base">
              <p>
                <span class="char-skill-decoration">Cooldown:</span>
                {{ skill.baseCooldown }}
              </p>
              <p class="flex">
                <span class="char-skill-decoration">Reiatsu required:</span>
                <span
                  class="char-skill-wrap"
                  v-for="(cost, ckey) in formatCost(skill.cost)"
                  :key="ckey"
                >
                  <i
                    :class="`char-skill-cost ${reiatsu[cost]}`"
                  ></i>
                </span>
              </p>
            </div>
            <p class="char-skill-classes">
              Classes: {{ classes[skill.class] }},
              {{ persistence[skill.persistence] }}
            </p>
          </div>
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
      char: {
        skills: [],
      },
      reiatsu: ["Hakuda", "Kidou", "Reiryoku", "Zanpakutou", "Random"],
      classes: ["None", "Physical", "Reiatsu", "Strategic", "Affliction"],
      persistence: ["Instant", "Action", "Control"],
    };
  },
  methods: {
    formatCost(cost) {
      const c = [];
      cost.forEach((e, index) => {
        if (e) {
          for (let i = 0; i < e; i++) {
            c.push(index);
          }
        }
      });
      return c;
    },
  },
  async created() {
    const res = await this.$http.get(
      `/character/api/profile/${this.$route.params.characterId}`
    );
    this.char = res.data;
  },
};
</script>

<style lang='scss' scoped>
$energies: (
  Hakuda: #727272,
  Kidou: #027add,
  Reiryoku: #fdc200f8,
  Zanpakutou: #c91a03,
  Random: #141414,
);

@each $energy, $hexColor in $energies {
  .#{$energy} {
    background-color: $hexColor;
  }

  .#{$energy}-glow {
    box-shadow: 0 0 1px 1px $hexColor;
  }
}

.char {
  &-name {
    margin: 0;
    margin-right: auto;
    font-weight: bolder;
    color: #2f7e8a;
    margin-bottom: 5px;
    img {
      margin: 0;
    }
  }

  &-profile {
    width: 100%;
    padding: 5px;
    border-top: 1px dashed rgba(128, 128, 128, 0.445);
    background-color: rgba(201, 201, 201, 0.171);
    border-bottom: 1px dashed rgba(128, 128, 128, 0.445);
    justify-content: flex-start;
    img {
      margin: 0;
      margin-right: 5px;
      border: 1px solid #2b2b2b;
    }
  }

  &-req {
    margin-right: auto;
    font-weight: bold;
    font-size: 11px;
  }

  &-skill {
    margin-top: 15px;
    width: 100%;
    &-classes {
      color: gray;
    }
    &-name {
      color: #dd0028;
    }
    &-footer {
      width: 100%;
      font-size: 11px;
      p {
        margin: 0;
      }
    }
    &-base {
      width: 100%;
      justify-content: space-between;
    }
    &-decoration {
      text-decoration: underline;
      font-weight: bold;
    }
    &-cost {
      display: inline-block;
      height: 10px;
      width: 10px;
      border: 1px solid #2b2b2b;
      box-sizing: border-box;
      margin-left: 2px;
    }

    &-wrap {
      max-height: 10px;
    }
  }
}
</style>