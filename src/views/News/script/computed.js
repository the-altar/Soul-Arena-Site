const auth = function(){
    return this.$store.getters['user/permissions'];
}
export default {
    auth
}