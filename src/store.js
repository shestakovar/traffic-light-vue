import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timer: localStorage.getItem('timer') || -1,
    lightstate: localStorage.getItem('lightstate') || -1,
  },
  mutations: {
    updateStorage (state, { timer, lightstate} ) {
      state.timer = timer
      state.lightstate = lightstate
    },
  },
  actions: {
    updateState (context, { timer, lightstate} ) {
      context.commit('updateStorage', { timer, lightstate});
      localStorage.setItem('timer', timer);
      localStorage.setItem('lightstate', lightstate);
    }
  },
})

export default store