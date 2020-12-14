export default {
    computed:{
        isAdmin(){
            return this.$store.getters['user/permissions'].authLevel > 99
        },
        isMember(){
            return this.$store.getters['user/permissions'].authLevel >= 0
        } 
    }
}