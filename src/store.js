import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
const SET_TOKEN = 'SET_TOKEN';

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'session',
    paths: ['token', 'authenticated'],
  })],

  state: {
    token: null,
    authenticated: false,
  },

  actions: {
    setAuthenticated: ({ commit }, authenticated) => commit(SET_AUTHENTICATED, authenticated),

    setToken: ({ commit }, token) => commit(SET_TOKEN, token),

    clearAuthentication: ({ commit }) => {
      commit(SET_TOKEN, null);
      commit(SET_AUTHENTICATED, false);
    }
  },

  mutations: {
    [SET_AUTHENTICATED](state, authenticated) {
      state.authenticated = authenticated;
    },

    [SET_TOKEN](state, token) {
      state.token = token;
    },
  },
});
