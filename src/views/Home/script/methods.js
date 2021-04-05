const saveContent = async function(e) {
  const author = this.auth.id;
  const siteArea = 0;
  const title = this.title;
  const content = e;
  const meta = { bannerUrl: this.bannerUrl, isNews: this.isNews };
  try {
    this.$http.post("/thread", [siteArea, title, content, author, meta]);
  } catch (err) {
    alert(err);
  }
};
export default {
  saveContent,
};
