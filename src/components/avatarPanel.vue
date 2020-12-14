<template>
  <div>
    <h1 class="heading">Change avatar</h1>

    <div class="gallery">
      <div
        @click="selectedAvatar = v"
        :class="{ 'gallery-active': selectedAvatar === v }"
        v-for="v in defaulted"
        :key="v"
      >
        <img :src="`/img/avatars/${v}.jpg`" />
      </div>
    </div>

    <div>
      <input
        v-on:change="handleFilesUpload()"
        type="file"
        id="files"
        ref="files"
      />
    </div>

    <button class="input input-bt" @click="submitChanges">Save changes</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaulted: 18,
      selectedAvatar: 1,
      file: null,
    };
  },
  methods: {
    handleFilesUpload() {
      this.file = this.$refs.files.files[0];
    },
    submitChanges() {
      const id = this.$store.getters["user/permissions"].id;

      if (this.file !== null) {
        let formData = new FormData();

        formData.append("file", this.file);

        this.$http.post(`/user/avatar/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      } else {
        const filename = this.selectedAvatar;
        this.$http.post(`/user/avatar/${id}/${filename}`);
      }
    },
  },
};
</script>

<style lang="scss">
.heading {
  color: #2f7e8a;
  text-shadow: 0 0 3px rgba($color: #2f7e8a, $alpha: 0.5);
  padding-bottom: 5px;
  font-size: 14px;
  margin-top: 20px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  &-active {
    width: 75px;
    height: 75px;
    border: 5px solid crimson;
    box-sizing: border-box;
  }
}
</style>