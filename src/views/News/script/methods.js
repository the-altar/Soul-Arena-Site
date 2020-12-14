const postComment = async function (e) {
    //`INSERT INTO post ("content",author,thread_id,site_area) values ($1, $2, $3, $4)`
    const id = this.$store.getters['user/permissions'].id
    try {
        const res = await this.$http.post("/thread/comment", [e, id, this.thread.id, 0])
        console.log(res)
    } catch (err) {
        alert(err)
    }
}

const date = function (d) {
    const d1 = new Date(d);
    return new Date(d1.valueOf() - d1.getTimezoneOffset() * 60000);
}

export default {
    date,
    postComment
}