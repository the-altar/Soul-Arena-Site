export default {
    namespaced: true,
    state: {
        authLevel: -1,
        username: '',
        id:null
    },
    getters: {
        userData: function (state) {
            return state.user
        },
        permissions: function (state) {
            return { ...state }
        }
    },
    mutations: {
        setPermissions: function (state, payload) {
            state.authLevel = payload.authLevel
            state.username = payload.username
            state.id = payload.id
        }
    }
}