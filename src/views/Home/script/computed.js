const isVisible = function () {
    return this.$store.getters['user/permissions'].authLevel >= 99;
}

const auth = function(){
    return this.$store.getters['user/permissions'];
}

export default {
    auth,
    isVisible
}