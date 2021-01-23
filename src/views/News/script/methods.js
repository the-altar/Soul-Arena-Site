const postComment = async function(e) {
  //`INSERT INTO post ("content",author,thread_id,site_area, quotes) values ($1, $2, $3, $4. $5)`
  const id = this.$store.getters["user/permissions"].id;
  const quotes = this.$store.getters["GET_QUOTES_IDS"];
  try {
    await this.$http.post("/thread/comment", [
      e,
      id,
      this.thread.id,
      0,
      quotes,
    ]);
    this.$store.commit("CLEAR_QUOTES");
    const comments = await this.$http.get(
      `/thread/${this.threadId}/comments/0`
    );
    this.$store.commit("SET_COMMENTS", comments.data)
  } catch (err) {
    alert(err);
  }
};

const date = function(d) {
  const d1 = new Date(d);
  return new Date(d1.valueOf() - d1.getTimezoneOffset() * 60000);
};

export default {
  date,
  postComment,
};
