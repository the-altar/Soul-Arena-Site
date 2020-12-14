const register = async function () {
    this.requestSent = true

    try {
        const res = await this.$http.post("/user/register", {
            username: this.username,
            email: this.email,
            password: this.password
        })

        if (res.data.success) {
            const d = this.$http.get("/user")
            this.$store.commit("user/setPermissions", d.data)
            this.$router.push("/")
        } else {
            this.errMsg = "It seems something is wrong..."
        }
    } catch (err) {
        alert(err)
    }
}

export default {
    register
}