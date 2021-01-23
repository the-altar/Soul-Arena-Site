const login = async function() {
  try {
    const res = await this.$http.post("/user/login", {
      username: this.username,
      password: this.password,
    });
    this.$store.commit("user/setPermissions", res.data.userData);
    this.$colyseus
      .joinOrCreate("lobby", res.data.userData)
      .then((room) => {
        this.$store.commit("lobby/SET_ROOM", room);
      })
      .catch(() => {
        this.$store.commit("lobby/SET_ROOM", null);
      });
    this.$router.push("/");
  } catch (err) {
    alert(err);
  }
};

export default {
  login,
};
