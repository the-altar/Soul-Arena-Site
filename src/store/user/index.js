export default {
    namespaced: true,
    state: {
        authLevel: -1,
        username: '',
        id:null
    },
    getters: {
        id: function(state){
            return state.id
        },
        permissions: function (state) {
            return { ...state }
        },
    },
    mutations: {
        setPermissions: function (state, payload) {
            state.authLevel = payload.authLevel
            state.username = payload.username
            state.id = payload.id
        }
    }
}