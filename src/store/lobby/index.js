export default {
  namespaced: true,
  state: {
    room: null,
  },
  getters: {
    GET_ROOM: function(state) {
      return state.room;
    },
  },
  mutations: {
    SET_ROOM: function(state, room) {
      state.room = room;
    },
    DISCONNECT: function(state) {
      state.room.leave();
      state.room = null;
    },
  },
};
