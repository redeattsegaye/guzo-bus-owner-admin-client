import { api } from '@utils/axiosHttp'

export const state = {
  buses: [],
}

export const getters = {
  BUSES({ buses }) {
    return buses
  },
}

export const mutations = {
  SET_BUSES(state, newBuses) {
    state.buses = newBuses
  },
}

export const actions = {
  init({ dispatch }) {
    // dispatch('FETCH_BUSES')
  },
  FETCH_BUSES({ commit }, access_token) {
    return api
      .get(`api/Buses/fetchBuses?access_token=${access_token}`)
      .then((response) => {
        const buses = response.data
        commit('SET_BUSES', buses)
      })
  },
  INSERT_BUS({ dispatch }, { access_token, busInstance }) {
    return api
      .post(`api/Buses/insertBus?access_token=${access_token}`, {newBusInstance: busInstance})
      .then(() => {
        api
          .get(`api/Buses/fetchBuses?access_token=${access_token}`)
          .then((response) => {
            const buses = response.data
            commit('SET_BUSES', buses)
          })
      })
  },
  INSERT_SEAT({ dispatch }, { access_token, busId, seatInstance }) {
    return api.post(
      `api/Buses/${busId}/seats/?access_token=${access_token}`,
      seatInstance
    )
  },

  EDIT_SEAT({ dispatch }, { access_token, busId, seatInstance }) {
    return api.put(
      `api/Buses/${busId}/seats/${
        seatInstance.id
      }/?access_token=${access_token}`,
      seatInstance
    )
  },
}
