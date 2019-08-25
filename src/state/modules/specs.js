import { api } from '@utils/axiosHttp'

export const state = {
  specs: [],
}

export const getters = {
  SPECS({ specs }) {
    return specs
  },
  PROPERTIES: ({ specs }) => (model) => {
    let filtered = specs.filter(({ name }) => name === model)
    if (filtered.length) return filtered[0].properties
    return []
  },
}

export const mutations = {
  SET_SPECS(state, newSpecs) {
    state.specs = newSpecs
  },
}

export const actions = {
  init({ dispatch }) {
    dispatch('FETCH_SPECS')
  },
  FETCH_SPECS({ commit }) {
    return api.get(`/specs`).then((response) => {
      const specs = response.data
      commit('SET_SPECS', specs)
    })
  },
}
