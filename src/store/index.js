import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import lobby from "./lobby";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    quotes: [],
    comments: [],
    memory: {},
  },
  mutations: {
    ADD_QUOTE: function(state, payload) {
      state.quotes.push({
        quoteId: payload.quoteId,
        body: payload.body,
      });
    },
    REMOVE_QUOTE: function(state, id) {
      for (let i = state.quotes.length - 1; i >= 0; i--) {
        if (state.quotes[i].quoteId === id) {
          state.quotes.splice(i, 1);
          return;
        }
      }
    },
    CLEAR_QUOTES: function(state) {
      state.quotes = [];
    },
    SET_COMMENTS: function(state, comments) {
      state.comments = comments;
    },
    SET_MEMORY: function(state, payload) {
      Vue.set(state.memory, payload.key, payload.data);
    },
    RESET_COMMENT_SECTION: function(state) {
      state.memory = {};
      state.comments = [];
    },
  },
  getters: {
    GET_COMMENTS: function(state) {
      const coms = [];
      let i = 0;
      for (const k in state.comments) {
        const comment = state.comments[k];
        coms.push({ ...comment, index: i });
        i++;
      }
      return coms;
    },

    GET_QUOTES: function(state) {
      return state.quotes;
    },
    GET_QUOTES_IDS: function(state) {
      const arr = [];
      for (const q of state.quotes) {
        arr.push(q.quoteId);
      }
      return arr;
    },
    IS_QUOTED: function(state) {
      return (id) => {
        for (const quote of state.quotes) {
          if (quote.quoteId === id) return true;
        }
        return false;
      };
    },

    GET_MEMORY: function(state) {
      return state.memory;
    },
  },
  actions: {},
  modules: {
    user,
    lobby
  },
});
