export const state = {
  drawer: true,
}

export const getters = {
  DRAWER() {
    return state.drawer
  },
}

export const mutations = {
  TOGGLE_DRAWER(state) {
    state.drawer = !state.drawer
  },
}

export const actions = {}
