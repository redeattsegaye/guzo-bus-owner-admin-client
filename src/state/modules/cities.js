import { api } from '@utils/axiosHttp'

export const state = {
  cities: [],
}

export const getters = {
  CITIES({ cities }) {
    return cities
  },
}

export const mutations = {
  SET_CITIES(state, newCities) {
    state.cities = newCities
  },
}

export const actions = {
  init({ dispatch }) {
    // dispatch('FETCH_CITIES')
  },
  FETCH_CITIES({ commit }) {
    return api.get(`api/cities`).then((response) => {
      const cities = response.data
      commit('SET_CITIES', cities)
    })
  },
}
