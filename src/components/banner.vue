<template>
  <section class='banner' :style='{ backgroundImage:`url(${banner})`, }'></section>
</template>

<script>
export default {
  props:['bannerId'],
  computed: {
    banner() {
      return `/img/mainsite/${this.bannerId}.png`;
    },
  },
};
</script>

<style lang="scss" >
.banner {
  width: 500px;
  height: 175px;
  line-height: 10rem;
  text-align: center;
  background-color: #f7f7f7;
  border: 5px solid white;
  box-sizing: border-box;
  box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: 0.25);
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 10px;
  box-shadow: 18px 18px 36px #d5d5d5, -18px -18px 36px #ffffff;
}
</style>
