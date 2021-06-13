import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import popupModule from './modules/popup'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchField: null,
    searchList: null,
    filesList: null
  },
  mutations: {
    setSearchField(state, payload) {
      state.searchField = payload
    },
    setSearchList(state, payload) {
      state.searchList = null
      if (payload.length) {
        state.searchList = payload
      }
    }
  },
  actions: {
    getPackageList({ commit }, { name, limit, offset }) {
      const url = `http://registry.npmjs.com/-/v1/search?text=${name}&size=${limit}&from=${offset ? offset : 0}`;
      axios.get(url).then((res) => {
        commit('setSearchList', res.data.objects)
      }).catch(e => {
        console.error(e);
      });
    },

  },
  getters: {
    getTenItems(state) {
      return state.searchList
    },
  },
  modules: {
    popup: popupModule
  }
})
