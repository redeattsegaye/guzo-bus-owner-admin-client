import { api } from '@utils/axiosHttp'

export const state = {
  journies: [],
}

export const getters = {
  JOURNIES({ journies }) {
    return journies
  },
}

export const mutations = {
  SET_JOURNIES(state, newJournies) {
    state.journies = newJournies
  },
}

export const actions = {
  init({ dispatch }) {
    // dispatch('FETCH_JOURNIES')
  },
  FETCH_JOURNIES({ commit }, access_token) {
    return api
      .get(`api/Journies/fetchJournies?access_token=${access_token}`)
      .then((response) => {
        const journies = response.data
        commit('SET_JOURNIES', journies)
      })
  },
  INSERT_JOURNEY({ dispatch }, { access_token, journeyInstance }) {
    return api.post(
      `/api/Journies/insertJourney?access_token=${access_token}`,
      {
        newJourneyInstance: journeyInstance,
      }
    )
  },
  ADD_SOURCE_CITY({ dispatch }, { journeyId, cityName }) {
    // ?access_token=${access_token}
    return api.post(`/api/Journies/${journeyId}/sourceCity`, {
      name: cityName,
      country: 'Ethiopia',
    })
  },
  ADD_DESTINATION_CITY({ dispatch }, { journeyId, cityName }) {
    // ?access_token=${access_token}
    console.log(cityName)
    return api.post(`/api/Journies/${journeyId}/destinationCity`, {
      name: cityName,
      country: 'Ethiopia',
    })
  },
  ADD_TICKETS({ dispatch }, { journeyId, defaultPrice, seats }) {
    return Promise.all(
      seats.map((seat) =>
        api.post(`/api/Journies/${journeyId}/tickets`, {
          name: seat.name,
          row: seat.row,
          column: seat.column,
          price: defaultPrice,
        })
      )
    )
  },
}
